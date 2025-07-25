# TikTok Automation App Setup Guide

This is a TikTok automation platform that allows users to upload and schedule videos to their TikTok accounts.

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# TikTok API Configuration
TIKTOK_CLIENT_ID=your_tiktok_client_id_here
TIKTOK_CLIENT_SECRET=your_tiktok_client_secret_here
TIKTOK_REDIRECT_URI=https://your-domain.com/auth/callback

# Webhook Configuration
TIKTOK_WEBHOOK_SECRET=your_webhook_secret_here
TIKTOK_VERIFY_TOKEN=your_webhook_verify_token_here

# App Configuration
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

## TikTok Developer Portal Setup

1. Go to [TikTok for Developers](https://developers.tiktok.com/)
2. Create a new app
3. Configure the following settings:
   - **App Name**: Your app name
   - **App Description**: Description of your automation app
   - **Platform**: Web
   - **Category**: Content Creation
   - **Redirect URI**: `https://your-domain.com/auth/callback`
   - **Webhook URL**: `https://your-domain.com/api/webhooks/tiktok`
   - **Webhook Verify Token**: Use a secure random string
   - **Webhook Secret**: Use a secure random string

4. Request the following permissions:
   - `user.info.basic` - Read user profile information
   - `video.list` - Read user's video list
   - `video.upload` - Upload videos to TikTok

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables (see above)

3. Run the development server:
   ```bash
   npm run dev
   ```

## Features

### Pages
- `/` - Home page with authentication links
- `/terms` - Terms of Service
- `/privacy` - Privacy Policy
- `/auth/tiktok` - TikTok OAuth initiation
- `/auth/callback` - OAuth callback handler
- `/dashboard` - User dashboard for video management

### API Routes
- `/api/auth/tiktok` - TikTok authentication handler
- `/api/auth/status` - Check authentication status
- `/api/auth/disconnect` - Disconnect TikTok account
- `/api/upload` - Video upload endpoint
- `/api/videos` - Fetch user's videos
- `/api/webhooks/tiktok` - TikTok webhook endpoint

## Usage

1. Users visit the home page and click "Connect TikTok Account"
2. They're redirected to TikTok for authorization
3. After authorization, they're redirected back to the callback page
4. Upon successful authentication, they're taken to the dashboard
5. In the dashboard, users can:
   - View their account information
   - Upload videos
   - View their recent videos
   - Disconnect their account

## Security Considerations

- All tokens are stored as HTTP-only cookies
- Webhook signatures are verified
- File uploads are validated for type and size
- OAuth state parameter is used to prevent CSRF attacks

## Deployment

This app is configured for deployment on Netlify. The `netlify.toml` file includes the necessary configuration for serverless functions and redirects.

## Webhook Events Handled

- `video_upload_complete` - When a video upload finishes
- `video_upload_failed` - When a video upload fails
- `video_status_update` - When video status changes
- `user_revoke` - When user revokes access

## File Structure

```
app/
├── api/
│   ├── auth/
│   │   ├── tiktok/route.js
│   │   ├── status/route.js
│   │   └── disconnect/route.js
│   ├── upload/route.js
│   ├── videos/route.js
│   └── webhooks/tiktok/route.js
├── auth/
│   ├── tiktok/page.jsx
│   └── callback/page.jsx
├── dashboard/page.jsx
├── terms/page.jsx
├── privacy/page.jsx
└── page.jsx
```

## Troubleshooting

1. **Authentication fails**: Check your TikTok app credentials and redirect URI
2. **Upload fails**: Verify file size and format requirements
3. **Webhooks not working**: Ensure webhook URL is publicly accessible and signature verification is correct

## Legal Compliance

- Ensure your app complies with TikTok's Developer Terms of Service
- Implement proper data handling according to privacy laws
- Include clear Terms of Service and Privacy Policy pages 