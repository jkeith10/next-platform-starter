import { NextResponse } from 'next/server';
import crypto from 'crypto';

// TikTok webhook configuration
const TIKTOK_WEBHOOK_SECRET = process.env.TIKTOK_WEBHOOK_SECRET;

export async function POST(request) {
    try {
        const body = await request.text();
        const signature = request.headers.get('x-tiktok-signature');
        const timestamp = request.headers.get('x-tiktok-timestamp');

        // Verify webhook signature
        if (!verifyWebhookSignature(body, signature, timestamp)) {
            console.error('Invalid webhook signature');
            return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
        }

        const event = JSON.parse(body);
        console.log('TikTok webhook event:', event);

        // Handle different webhook events
        switch (event.event_type) {
            case 'video_upload_complete':
                await handleVideoUploadComplete(event);
                break;
            case 'video_upload_failed':
                await handleVideoUploadFailed(event);
                break;
            case 'video_status_update':
                await handleVideoStatusUpdate(event);
                break;
            case 'user_revoke':
                await handleUserRevoke(event);
                break;
            default:
                console.log('Unhandled webhook event type:', event.event_type);
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Webhook processing error:', error);
        return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
    }
}

export async function GET(request) {
    // Handle webhook verification challenge
    const { searchParams } = new URL(request.url);
    const challenge = searchParams.get('hub.challenge');
    const verifyToken = searchParams.get('hub.verify_token');

    if (challenge && verifyToken === process.env.TIKTOK_VERIFY_TOKEN) {
        console.log('Webhook verification successful');
        return new NextResponse(challenge, { status: 200 });
    }

    return NextResponse.json({ error: 'Invalid verification token' }, { status: 403 });
}

function verifyWebhookSignature(body, signature, timestamp) {
    if (!TIKTOK_WEBHOOK_SECRET || !signature || !timestamp) {
        return false;
    }

    const expectedSignature = crypto
        .createHmac('sha256', TIKTOK_WEBHOOK_SECRET)
        .update(`${timestamp}.${body}`)
        .digest('hex');

    return crypto.timingSafeEqual(
        Buffer.from(signature, 'hex'),
        Buffer.from(expectedSignature, 'hex')
    );
}

async function handleVideoUploadComplete(event) {
    try {
        const { video_id, user_id, upload_time } = event.data;
        
        console.log(`Video upload completed: ${video_id} for user ${user_id}`);
        
        // Update your database with the successful upload
        // await updateVideoStatus(video_id, 'uploaded', upload_time);
        
        // Send notification to user (email, push notification, etc.)
        // await sendUploadNotification(user_id, video_id);
        
    } catch (error) {
        console.error('Error handling video upload complete:', error);
    }
}

async function handleVideoUploadFailed(event) {
    try {
        const { video_id, user_id, error_code, error_message } = event.data;
        
        console.log(`Video upload failed: ${video_id} for user ${user_id} - ${error_message}`);
        
        // Update your database with the failed upload
        // await updateVideoStatus(video_id, 'failed', null, error_message);
        
        // Send error notification to user
        // await sendErrorNotification(user_id, video_id, error_message);
        
    } catch (error) {
        console.error('Error handling video upload failed:', error);
    }
}

async function handleVideoStatusUpdate(event) {
    try {
        const { video_id, user_id, status, updated_time } = event.data;
        
        console.log(`Video status updated: ${video_id} for user ${user_id} - ${status}`);
        
        // Update your database with the new status
        // await updateVideoStatus(video_id, status, updated_time);
        
        // Handle specific status changes
        switch (status) {
            case 'published':
                // await handleVideoPublished(video_id, user_id);
                break;
            case 'rejected':
                // await handleVideoRejected(video_id, user_id);
                break;
            case 'processing':
                // await handleVideoProcessing(video_id, user_id);
                break;
        }
        
    } catch (error) {
        console.error('Error handling video status update:', error);
    }
}

async function handleUserRevoke(event) {
    try {
        const { user_id } = event.data;
        
        console.log(`User revoked access: ${user_id}`);
        
        // Remove user's tokens and data from your system
        // await revokeUserAccess(user_id);
        
        // Clean up user's scheduled uploads
        // await cancelUserUploads(user_id);
        
    } catch (error) {
        console.error('Error handling user revoke:', error);
    }
} 