import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const accessToken = request.cookies.get('tiktok_access_token')?.value;

        if (!accessToken) {
            return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
        }

        // Fetch user's videos from TikTok API
        const response = await fetch('https://open.tiktokapis.com/v2/video/list/', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            console.error('TikTok API error:', response.status, response.statusText);
            return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 400 });
        }

        const data = await response.json();
        
        // Transform the data to match our frontend expectations
        const videos = data.data.videos?.map(video => ({
            id: video.id,
            title: video.title,
            description: video.description,
            status: video.status,
            created_at: video.create_time,
            view_count: video.stats?.view_count || 0,
            like_count: video.stats?.like_count || 0,
            comment_count: video.stats?.comment_count || 0,
            share_count: video.stats?.share_count || 0,
            cover_image_url: video.cover_image_url,
            video_url: video.video_url,
        })) || [];

        return NextResponse.json({ 
            videos,
            total: data.data.cursor?.total || videos.length,
            has_more: data.data.cursor?.has_more || false,
        });

    } catch (error) {
        console.error('Videos API error:', error);
        return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
    }
} 