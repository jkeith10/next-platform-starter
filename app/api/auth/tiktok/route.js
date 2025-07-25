import { NextResponse } from 'next/server';

// TikTok OAuth configuration
const TIKTOK_CLIENT_ID = process.env.TIKTOK_CLIENT_ID;
const TIKTOK_CLIENT_SECRET = process.env.TIKTOK_CLIENT_SECRET;
const TIKTOK_REDIRECT_URI = process.env.TIKTOK_REDIRECT_URI || `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`;

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const action = searchParams.get('action');

        if (action === 'initiate') {
            // Generate OAuth URL for TikTok
            const state = generateRandomState();
            const scope = 'user.info.basic,video.list,video.upload';
            
            const authUrl = `https://www.tiktok.com/v2/auth/authorize/?client_key=${TIKTOK_CLIENT_ID}&scope=${scope}&response_type=code&redirect_uri=${encodeURIComponent(TIKTOK_REDIRECT_URI)}&state=${state}`;
            
            return NextResponse.json({ 
                authUrl,
                state 
            });
        }

        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    } catch (error) {
        console.error('TikTok auth error:', error);
        return NextResponse.json({ error: 'Authentication initialization failed' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { code, state } = await request.json();

        if (!code) {
            return NextResponse.json({ error: 'Authorization code is required' }, { status: 400 });
        }

        // Exchange authorization code for access token
        const tokenResponse = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache',
            },
            body: new URLSearchParams({
                client_key: TIKTOK_CLIENT_ID,
                client_secret: TIKTOK_CLIENT_SECRET,
                code: code,
                grant_type: 'authorization_code',
                redirect_uri: TIKTOK_REDIRECT_URI,
            }),
        });

        if (!tokenResponse.ok) {
            const errorData = await tokenResponse.text();
            console.error('Token exchange error:', errorData);
            return NextResponse.json({ error: 'Failed to exchange authorization code' }, { status: 400 });
        }

        const tokenData = await tokenResponse.json();
        
        // Get user information
        const userResponse = await fetch('https://open.tiktokapis.com/v2/user/info/', {
            headers: {
                'Authorization': `Bearer ${tokenData.access_token}`,
            },
        });

        if (!userResponse.ok) {
            return NextResponse.json({ error: 'Failed to get user information' }, { status: 400 });
        }

        const userData = await userResponse.json();

        // Store user session/tokens (implement your session management here)
        // For now, we'll return the data to be handled by the client
        const sessionData = {
            access_token: tokenData.access_token,
            refresh_token: tokenData.refresh_token,
            expires_in: tokenData.expires_in,
            user: userData.data.user,
        };

        // Set session cookie
        const response = NextResponse.json({ 
            success: true, 
            user: userData.data.user 
        });

        // Store tokens securely (you might want to use a database or secure session store)
        response.cookies.set('tiktok_access_token', tokenData.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: tokenData.expires_in,
        });

        response.cookies.set('tiktok_refresh_token', tokenData.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60, // 30 days
        });

        return response;

    } catch (error) {
        console.error('TikTok auth callback error:', error);
        return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
    }
}

function generateRandomState() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
} 