'use client';

import { useState, useEffect } from 'react';
import { Card } from '../../components/card';

export default function DashboardPage() {
    const [user, setUser] = useState(null);
    const [videos, setVideos] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
        // Check if user is authenticated
        checkAuthStatus();
        // Load user's videos
        loadVideos();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const response = await fetch('/api/auth/status');
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            } else {
                // Redirect to login if not authenticated
                window.location.href = '/auth/tiktok';
            }
        } catch (error) {
            console.error('Auth check failed:', error);
        }
    };

    const loadVideos = async () => {
        try {
            const response = await fetch('/api/videos');
            if (response.ok) {
                const data = await response.json();
                setVideos(data.videos || []);
            }
        } catch (error) {
            console.error('Failed to load videos:', error);
        }
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('video', file);
        formData.append('caption', 'Uploaded via automation app');
        formData.append('scheduleTime', ''); // Immediate upload

        setUploading(true);
        setUploadProgress(0);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                alert('Video uploaded successfully!');
                loadVideos(); // Refresh video list
            } else {
                const error = await response.json();
                alert(`Upload failed: ${error.error}`);
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Upload failed. Please try again.');
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    };

    const disconnectAccount = async () => {
        if (confirm('Are you sure you want to disconnect your TikTok account?')) {
            try {
                const response = await fetch('/api/auth/disconnect', {
                    method: 'POST',
                });
                
                if (response.ok) {
                    window.location.href = '/';
                }
            } catch (error) {
                console.error('Disconnect failed:', error);
            }
        }
    };

    if (!user) {
        return (
            <div className="py-8">
                <div className="max-w-4xl mx-auto">
                    <Card className="text-center">
                        <div className="py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-4"></div>
                            <p>Loading...</p>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="py-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">Dashboard</h1>
                    <button
                        onClick={disconnectAccount}
                        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                        Disconnect Account
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* User Info */}
                    <Card className="lg:col-span-1">
                        <h2 className="text-2xl font-semibold mb-4">Account Info</h2>
                        <div className="space-y-3">
                            <div>
                                <label className="text-sm text-gray-400">Username</label>
                                <p className="font-medium">{user.username || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-400">Display Name</label>
                                <p className="font-medium">{user.display_name || 'N/A'}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-400">Followers</label>
                                <p className="font-medium">{user.follower_count || 0}</p>
                            </div>
                        </div>
                    </Card>

                    {/* Upload Section */}
                    <Card className="lg:col-span-2">
                        <h2 className="text-2xl font-semibold mb-4">Upload Video</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Select Video File
                                </label>
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={handleFileUpload}
                                    disabled={uploading}
                                    className="block w-full text-sm text-gray-400
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-lg file:border-0
                                        file:text-sm file:font-medium
                                        file:bg-blue-600 file:text-white
                                        hover:file:bg-blue-700
                                        disabled:opacity-50"
                                />
                            </div>

                            {uploading && (
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Uploading...</span>
                                        <span>{uploadProgress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div 
                                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${uploadProgress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}

                            <div className="text-sm text-gray-400">
                                <p>• Maximum file size: 100MB</p>
                                <p>• Supported formats: MP4, MOV, AVI</p>
                                <p>• Videos will be posted immediately</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Recent Videos */}
                <Card className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4">Recent Videos</h2>
                    {videos.length === 0 ? (
                        <p className="text-gray-400">No videos uploaded yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {videos.map((video) => (
                                <div key={video.id} className="border border-gray-700 rounded-lg p-4">
                                    <div className="aspect-video bg-gray-800 rounded mb-3 flex items-center justify-center">
                                        <span className="text-gray-400">Video Preview</span>
                                    </div>
                                    <h3 className="font-medium mb-2">{video.title || 'Untitled'}</h3>
                                    <p className="text-sm text-gray-400 mb-2">
                                        {new Date(video.created_at).toLocaleDateString()}
                                    </p>
                                    <span className={`inline-block px-2 py-1 rounded text-xs ${
                                        video.status === 'published' ? 'bg-green-600 text-white' :
                                        video.status === 'processing' ? 'bg-yellow-600 text-white' :
                                        'bg-gray-600 text-white'
                                    }`}>
                                        {video.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
} 