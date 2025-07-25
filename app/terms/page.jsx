import { Card } from '../../components/card';

export const metadata = {
    title: 'Terms of Service',
    description: 'Terms of Service for TikTok Automation App'
};

export default function TermsPage() {
    return (
        <div className="py-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                
                <Card className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                    <p className="mb-4">
                        By accessing and using this TikTok automation service, you accept and agree to be bound by the terms and provision of this agreement.
                    </p>
                </Card>

                <Card className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">2. Service Description</h2>
                    <p className="mb-4">
                        This service provides automated TikTok video creation and posting capabilities. Users can upload content, configure automation settings, and schedule posts to their TikTok accounts.
                    </p>
                </Card>

                <Card className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>You must have a valid TikTok account and comply with TikTok's Terms of Service</li>
                        <li>You are responsible for all content uploaded and posted through this service</li>
                        <li>You must not violate any copyright, trademark, or other intellectual property rights</li>
                        <li>You must not use the service for spam, harassment, or illegal activities</li>
                    </ul>
                </Card>

                <Card className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">4. TikTok API Compliance</h2>
                    <p className="mb-4">
                        This service integrates with TikTok's API and must comply with TikTok's Developer Terms of Service. Users are responsible for ensuring their use of the service complies with TikTok's policies.
                    </p>
                </Card>

                <Card className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">5. Privacy and Data</h2>
                    <p className="mb-4">
                        We collect and process data as described in our Privacy Policy. By using this service, you consent to such processing and warrant that all data provided is accurate.
                    </p>
                </Card>

                <Card className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">6. Service Availability</h2>
                    <p className="mb-4">
                        We strive to maintain high service availability but do not guarantee uninterrupted access. The service may be temporarily unavailable for maintenance or updates.
                    </p>
                </Card>

                <Card className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
                    <p className="mb-4">
                        We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.
                    </p>
                </Card>

                <Card className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">8. Termination</h2>
                    <p className="mb-4">
                        We may terminate or suspend your access to the service at any time, with or without cause, with or without notice.
                    </p>
                </Card>

                <Card className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
                    <p className="mb-4">
                        We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of the new terms.
                    </p>
                </Card>

                <Card className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
                    <p className="mb-4">
                        If you have any questions about these Terms of Service, please contact us through our support channels.
                    </p>
                </Card>

                <p className="text-sm text-gray-400 mt-8">
                    Last updated: {new Date().toLocaleDateString()}
                </p>
            </div>
        </div>
    );
} 