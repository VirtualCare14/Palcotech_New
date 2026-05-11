# Cloudinary Setup (Palcotech Engineering)

## 1) Create Cloudinary credentials
1. Sign in to Cloudinary.
2. From the dashboard, copy **Cloud name**, **API Key**, and **API Secret**.

## 2) Add environment variables
Create `.env.local` from `.env.example` and set either:

### Option A (recommended)
```bash
CLOUDINARY_URL="cloudinary://API_KEY:API_SECRET@CLOUD_NAME"
```

### Option B
```bash
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
```

## 3) Image optimization
`next.config.ts` already allows `res.cloudinary.com` as a remote image host for Next.js `<Image />`.

## 4) Upload flow used by this app
This project exposes a signed upload helper endpoint:

`POST /api/cloudinary/signature`

It returns `{ signature, timestamp, folder, apiKey, cloudName }` which can be used by the admin UI to upload files directly to Cloudinary.

> Tip: Never expose your API secret in client-side code. Keep it only in server environment variables.

