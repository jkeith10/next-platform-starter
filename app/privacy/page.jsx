import { Card } from '../../components/card';

export const metadata = {
    title: 'Privacy Policy',
    description: 'Privacy Policy for TikTok Automation App'
};

export default function PrivacyPage() {
    return (
        <div className="py-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                
                <Card className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-medium mb-2">Account Information</h3>
                            <p>When you connect your TikTok account, we collect:</p>
                            <ul className="list-disc list-inside ml-4 mt-2">
                                <li>Your TikTok username and profile information</li>
                                <li>Access tokens for API integration</li>
                                <li>Account permissions and scopes</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-2">Content Data</h3>
                            <p>We process the content you upload for automation:</p>
                            <ul className="list-disc list-inside ml-4 mt-2">
                                <li>Video files and metadata</li>
                                <li>Posting schedules and preferences</li>
                                <li>Automation settings and configurations</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-2">Usage Data</h3>
                            <p>We collect usage information to improve our service:</p>
                            <ul className="list-disc list-inside ml-4 mt-2">
                                <li>Service usage patterns and analytics</li>
                                <li>Error logs and performance data</li>
                                <li>Feature usage and preferences</li>
                            </ul>
                        </div>
                    </div>
                </Card>

                <Card className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>To provide and maintain our TikTok automation service</li>
                        <li>To authenticate and authorize your TikTok account access</li>
                        <li>To process and schedule your video uploads</li>
                        <li>To send you service-related notifications</li>
                        <li>To improve our service and develop new features</li>
                        <li>To comply with legal obligations and TikTok&apos;s API requirements</li>
                    </ul>
                </Card>

                <Card className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">3. TikTok API Integration</h2>
                    <p className="mb-4">
                        Our service integrates with TikTok&apos;s API to provide automation features. By using our service, you authorize us to:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Access your TikTok account on your behalf</li>
                        <li>Upload and post videos according to your settings</li>
                        <li>Read your account information and post history</li>
                        <li>Manage your posting schedule and preferences</li>
                    </ul>
                    <p className="mt-4 text-sm text-gray-400">
                        This integration is subject to TikTok&apos;s own privacy policy and terms of service.
                    </p>
                </Card>

                <Card className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">4. Data Storage and Security</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-medium mb-2">Data Storage</h3>
                            <p>Your data is stored securely using industry-standard encryption and security measures.</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-2">Data Retention</h3>
                            <p>We retain your data only as long as necessary to provide our service and comply with legal obligations.</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-2">Security Measures</h3>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Encryption of data in transit and at rest</li>
                                <li>Secure API authentication and authorization</li>
                                <li>Regular security audits and updates</li>
                                <li>Access controls and monitoring</li>
                            </ul>
                        </div>
                    </div>
                </Card>

                <Card className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">5. Data Sharing and Disclosure</h2>
                    <p className="mb-4">We do not sell, trade, or otherwise transfer your personal information to third parties, except:</p>
                    <ul className="list-disc list-inside space-y-2">
                        <li>To TikTok&apos;s API as required for service functionality</li>
                        <li>To comply with legal requirements or court orders</li>
                        <li>To protect our rights, property, or safety</li>
                        <li>With your explicit consent</li>
                    </ul>
                </Card>

                <Card className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">6. Your Rights and Choices</h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-medium mb-2">Access and Control</h3>
                            <p>You have the right to:</p>
                            <ul className="list-disc list-inside ml-4 mt-2">
                                <li>Access your personal data</li>
                                <li>Correct inaccurate information</li>
                                <li>Request deletion of your data</li>
                                <li>Export your data</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-2">Account Disconnection</h3>
                            <p>You can disconnect your TikTok account at any time, which will revoke our access to your TikTok data.</p>
                        </div>
                    </div>
                </Card>

                <Card className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">7. Cookies and Tracking</h2>
                    <p className="mb-4">
                        We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized features.
                    </p>
                </Card>

                <Card className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">8. Children&apos;s Privacy</h2>
                    <p className="mb-4">
                        Our service is not intended for users under 13 years of age. We do not knowingly collect personal information from children under 13.
                    </p>
                </Card>

                <Card className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">9. International Data Transfers</h2>
                    <p className="mb-4">
                        Your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.
                    </p>
                </Card>

                <Card className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">10. Changes to This Policy</h2>
                    <p className="mb-4">
                        We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page.
                    </p>
                </Card>

                <Card className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
                    <p className="mb-4">
                        If you have any questions about this privacy policy or our data practices, please contact us through our support channels.
                    </p>
                </Card>

                <p className="text-sm text-gray-400 mt-8">
                    Last updated: {new Date().toLocaleDateString()}
                </p>
            </div>
        </div>
    );
} 