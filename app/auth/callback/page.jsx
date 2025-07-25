'use client';

import { useEffect, useState, Suspense } from 'react';
import { Card } from '../../../components/card';
import { useSearchParams } from 'next/navigation';

function AuthCallbackContent() {
    const [status, setStatus] = useState('processing');
    const [message, setMessage] = useState('Processing authentication...');
    const searchParams = useSearchParams();

    useEffect(() => {
        const handleCallback = async () => {
            try {
                const code = searchParams.get('code');
                const state = searchParams.get('state');
                const error = searchParams.get('error');

                if (error) {
                    setStatus('error');
                    setMessage(`Authentication failed: ${error}`);
                    return;
                }

                if (!code) {
                    setStatus('error');
                    setMessage('No authorization code received');
                    return;
                }

                // Send the authorization code to our backend
                const response = await fetch('/api/auth/tiktok', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        code,
                        state,
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Authentication failed');
                }

                const data = await response.json();
                
                setStatus('success');
                setMessage('Authentication successful! Redirecting to dashboard...');
                
                // Redirect to dashboard after a short delay
                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 2000);

            } catch (error) {
                console.error('Auth callback error:', error);
                setStatus('error');
                setMessage(`Authentication failed: ${error.message}`);
            }
        };

        handleCallback();
    }, [searchParams]);

    const getStatusColor = () => {
        switch (status) {
            case 'success':
                return 'text-green-400';
            case 'error':
                return 'text-red-400';
            default:
                return 'text-blue-400';
        }
    };

    const getStatusIcon = () => {
        switch (status) {
            case 'success':
                return '✅';
            case 'error':
                return '❌';
            default:
                return '⏳';
        }
    };

    return (
        <div className="py-8">
            <div className="max-w-2xl mx-auto">
                <Card className="text-center">
                    <div className="py-12">
                        <div className="text-6xl mb-6">
                            {getStatusIcon()}
                        </div>
                        <h1 className="text-3xl font-bold mb-4">
                            TikTok Authentication
                        </h1>
                        <p className={`text-lg ${getStatusColor()}`}>
                            {message}
                        </p>
                        
                        {status === 'processing' && (
                            <div className="mt-6">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
                            </div>
                        )}
                        
                        {status === 'error' && (
                            <div className="mt-6">
                                <a 
                                    href="/auth/tiktok" 
                                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                                >
                                    Try Again
                                </a>
                            </div>
                        )}
                        
                        {status === 'success' && (
                            <div className="mt-6">
                                <div className="animate-pulse text-green-400">
                                    Redirecting...
                                </div>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default function AuthCallbackPage() {
    return (
        <Suspense fallback={
            <div className="py-8">
                <div className="max-w-2xl mx-auto">
                    <Card className="text-center">
                        <div className="py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-4"></div>
                            <p>Loading...</p>
                        </div>
                    </Card>
                </div>
            </div>
        }>
            <AuthCallbackContent />
        </Suspense>
    );
} 