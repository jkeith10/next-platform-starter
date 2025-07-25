import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const accessToken = request.cookies.get('tiktok_access_token')?.value;
        const refreshToken = request.cookies.get('tiktok_refresh_token')?.value;

        if (!accessToken) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        // Verify token is still valid by making a test API call
        try {
            const userResponse = await fetch('https://open.tiktokapis.com/v2/user/info/', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (!userResponse.ok) {
                // Token might be expired, try to refresh
                if (refreshToken) {
                    const refreshed = await refreshAccessToken(refreshToken);
                    if (refreshed) {
                        // Get user info with new token
                        const newUserResponse = await fetch('https://open.tiktokapis.com/v2/user/info/', {
                            headers: {
                                'Authorization': `Bearer ${refreshed.access_token}`,
                            },
                        });

                        if (newUserResponse.ok) {
                            const userData = await newUserResponse.json();
                            const response = NextResponse.json({ 
                                authenticated: true, 
                                user: userData.data.user 
                            });

                            // Set new tokens
                            response.cookies.set('tiktok_access_token', refreshed.access_token, {
                                httpOnly: true,
                                secure: process.env.NODE_ENV === 'production',
                                sameSite: 'lax',
                                maxAge: refreshed.expires_in,
                            });

                            return response;
                        }
                    }
                }

                return NextResponse.json({ error: 'Token expired' }, { status: 401 });
            }

            const userData = await userResponse.json();
            return NextResponse.json({ 
                authenticated: true, 
                user: userData.data.user 
            });

        } catch (error) {
            console.error('Token verification error:', error);
            return NextResponse.json({ error: 'Token verification failed' }, { status: 401 });
        }

    } catch (error) {
        console.error('Auth status check error:', error);
        return NextResponse.json({ error: 'Authentication check failed' }, { status: 500 });
    }
}

async function refreshAccessToken(refreshToken) {
    try {
        const response = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache',
            },
            body: new URLSearchParams({
                client_key: process.env.TIKTOK_CLIENT_ID,
                client_secret: process.env.TIKTOK_CLIENT_SECRET,
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
            }),
        });

        if (!response.ok) {
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('Token refresh error:', error);
        return null;
    }
} 