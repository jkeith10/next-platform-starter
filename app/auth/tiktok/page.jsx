'use client';

import { useState } from 'react';
import { Card } from '../../components/card';

export default function TikTokAuthPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const initiateAuth = async () => {
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('/api/auth/tiktok?action=initiate');
            
            if (!response.ok) {
                throw new Error('Failed to initiate authentication');
            }

            const data = await response.json();
            
            // Redirect to TikTok OAuth
            window.location.href = data.authUrl;

        } catch (error) {
            console.error('Auth initiation error:', error);
            setError('Failed to start authentication. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="py-8">
            <div className="max-w-2xl mx-auto">
                <Card className="text-center">
                    <div className="py-12">
                        <div className="text-6xl mb-6">📱</div>
                        <h1 className="text-3xl font-bold mb-4">
                            Connect Your TikTok Account
                        </h1>
                        <p className="text-lg text-gray-300 mb-8">
                            Connect your TikTok account to start automating your video uploads and posts.
                        </p>

                        {error && (
                            <div className="bg-red-600 text-white p-4 rounded-lg mb-6">
                                {error}
                            </div>
                        )}

                        <button
                            onClick={initiateAuth}
                            disabled={isLoading}
                            className="bg-red-500 hover:bg-red-600 disabled:bg-gray-600 text-white font-medium py-3 px-8 rounded-lg transition-colors flex items-center justify-center mx-auto"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                    Connecting...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.69-1.35 3.94-.96 1.45-2.29 2.48-3.87 3.12-1.58.64-3.39.88-5.13.82-1.72-.06-3.38-.47-4.89-1.23-1.51-.76-2.83-1.86-3.86-3.23-1.03-1.37-1.73-2.95-2.06-4.64-.33-1.69-.28-3.43.14-5.09.42-1.66 1.23-3.18 2.38-4.47 1.15-1.29 2.64-2.32 4.28-3.01 1.64-.69 3.42-1.03 5.21-1.01.01-1.48.01-2.96.01-4.44z"/>
                                    </svg>
                                    Connect TikTok Account
                                </>
                            )}
                        </button>

                        <div className="mt-8 text-sm text-gray-400">
                            <p className="mb-2">By connecting your account, you agree to:</p>
                            <ul className="space-y-1">
                                <li>• Allow us to post videos on your behalf</li>
                                <li>• Access your TikTok account information</li>
                                <li>• Manage your video uploads and scheduling</li>
                            </ul>
                        </div>

                        <div className="mt-6 text-xs text-gray-500">
                            <p>
                                <a href="/terms" className="underline hover:text-gray-400">Terms of Service</a>
                                {' • '}
                                <a href="/privacy" className="underline hover:text-gray-400">Privacy Policy</a>
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
} 