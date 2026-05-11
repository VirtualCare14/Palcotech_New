# Deployment Guide (Palcotech Engineering)

## Recommended: Vercel

### 1) Push to GitHub
Commit the project and push to GitHub.

### 2) Import in Vercel
1. Create a new Vercel project from your repo.
2. Framework preset: **Next.js**

### 3) Configure environment variables
Add these in Vercel Project Settings → Environment Variables:
- `NEXTAUTH_URL` (your production URL)
- `NEXTAUTH_SECRET` (long random string)
- `MONGODB_URI` (MongoDB Atlas connection string)
- `CLOUDINARY_URL` (or `CLOUDINARY_*`)
- (optional) `ADMIN_EMAIL`, `ADMIN_PASSWORD`

### 4) MongoDB network access
If you use IP allow lists, allow the deployment environment. Many teams temporarily allow `0.0.0.0/0` and later tighten rules.

### 5) Deploy
Trigger a deployment from Vercel.

## After deployment
- Visit `/admin/login` and sign in.
- Add categories/products and update Site Settings to populate navbar/footer and contact information.

