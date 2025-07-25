import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const accessToken = request.cookies.get('tiktok_access_token')?.value;

        if (accessToken) {
            // Revoke the access token with TikTok
            try {
                await fetch('https://open.tiktokapis.com/v2/oauth/revoke/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        client_key: process.env.TIKTOK_CLIENT_ID,
                        client_secret: process.env.TIKTOK_CLIENT_SECRET,
                        token: accessToken,
                    }),
                });
            } catch (error) {
                console.error('Token revocation error:', error);
                // Continue with local cleanup even if TikTok revocation fails
            }
        }

        // Clear cookies
        const response = NextResponse.json({ success: true });
        
        response.cookies.delete('tiktok_access_token');
        response.cookies.delete('tiktok_refresh_token');

        return response;

    } catch (error) {
        console.error('Disconnect error:', error);
        return NextResponse.json({ error: 'Disconnect failed' }, { status: 500 });
    }
} 