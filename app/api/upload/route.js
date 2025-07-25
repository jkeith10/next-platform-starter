import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('video');
        const caption = formData.get('caption') || '';
        const scheduleTime = formData.get('scheduleTime');
        const accessToken = request.cookies.get('tiktok_access_token')?.value;

        if (!accessToken) {
            return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
        }

        if (!file) {
            return NextResponse.json({ error: 'Video file is required' }, { status: 400 });
        }

        // Validate file type
        if (!file.type.startsWith('video/')) {
            return NextResponse.json({ error: 'Invalid file type. Only video files are allowed.' }, { status: 400 });
        }

        // Validate file size (TikTok has limits)
        const maxSize = 100 * 1024 * 1024; // 100MB
        if (file.size > maxSize) {
            return NextResponse.json({ error: 'File too large. Maximum size is 100MB.' }, { status: 400 });
        }

        // Generate unique filename
        const fileName = `${uuidv4()}-${file.name}`;
        const uploadDir = join(process.cwd(), 'uploads');
        const filePath = join(uploadDir, fileName);

        // Save file temporarily
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filePath, buffer);

        try {
            // Upload to TikTok
            const uploadResult = await uploadToTikTok(filePath, caption, scheduleTime, accessToken);

            // Clean up temporary file
            await writeFile(filePath, ''); // Clear file content
            // Note: In production, you might want to use a proper file deletion method

            return NextResponse.json({
                success: true,
                video_id: uploadResult.video_id,
                message: 'Video uploaded successfully'
            });

        } catch (uploadError) {
            console.error('TikTok upload error:', uploadError);
            return NextResponse.json({ 
                error: 'Failed to upload video to TikTok',
                details: uploadError.message 
            }, { status: 500 });
        }

    } catch (error) {
        console.error('Upload API error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}

async function uploadToTikTok(filePath, caption, scheduleTime, accessToken) {
    try {
        // Step 1: Initialize upload
        const initResponse = await fetch('https://open.tiktokapis.com/v2/video/init/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                post_info: {
                    title: caption,
                    description: caption,
                    privacy_level: 'public', // or 'private'
                    disable_duet: false,
                    disable_comment: false,
                    disable_stitch: false,
                },
                source_info: {
                    source: 'FILE_UPLOAD',
                    video_size: 0, // Will be set by TikTok
                    chunk_size: 0, // Will be set by TikTok
                    total_chunk_count: 0, // Will be set by TikTok
                }
            }),
        });

        if (!initResponse.ok) {
            const errorData = await initResponse.json();
            throw new Error(`Upload initialization failed: ${errorData.message || 'Unknown error'}`);
        }

        const initData = await initResponse.json();
        const { upload_url, video_id } = initData.data;

        // Step 2: Upload video file
        const videoBuffer = await readFile(filePath);
        const uploadResponse = await fetch(upload_url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'video/mp4',
            },
            body: videoBuffer,
        });

        if (!uploadResponse.ok) {
            throw new Error('Failed to upload video file');
        }

        // Step 3: Complete upload
        const completeResponse = await fetch('https://open.tiktokapis.com/v2/video/complete/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                video_id: video_id,
            }),
        });

        if (!completeResponse.ok) {
            const errorData = await completeResponse.json();
            throw new Error(`Upload completion failed: ${errorData.message || 'Unknown error'}`);
        }

        const completeData = await completeResponse.json();

        // Step 4: Schedule post if scheduleTime is provided
        if (scheduleTime) {
            const scheduleResponse = await fetch('https://open.tiktokapis.com/v2/video/schedule/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    video_id: video_id,
                    schedule_time: new Date(scheduleTime).getTime() / 1000, // Convert to Unix timestamp
                }),
            });

            if (!scheduleResponse.ok) {
                console.warn('Failed to schedule video, but upload was successful');
            }
        }

        return {
            video_id: video_id,
            status: 'uploaded',
            scheduled: !!scheduleTime,
        };

    } catch (error) {
        console.error('TikTok upload error:', error);
        throw error;
    }
}

// Helper function to read file (you might want to use a proper file system library)
async function readFile(filePath) {
    const fs = await import('fs/promises');
    return await fs.readFile(filePath);
} 