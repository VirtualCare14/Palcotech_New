# Palcotech Engineering (Next.js 15 + MongoDB + Cloudinary)

Production-ready full-stack engineering company website built with:
- Next.js 15 App Router + TypeScript
- Tailwind CSS + Framer Motion + Lucide icons
- MongoDB Atlas (Mongoose)
- Admin authentication with NextAuth (Credentials)
- Cloudinary signed uploads (server-side signature endpoint)

## Quick start

### 1) Install
```bash
npm install
```

### 2) Environment variables
Copy `.env.example` → `.env.local` and fill in:
- `MONGODB_URI`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- Cloudinary variables (`CLOUDINARY_URL` recommended)

### 3) Run
```bash
npm run dev
```

Open: http://localhost:3000

## Admin
- Login URL: `/admin/login`
- Default credentials (can be overridden via env):
  - Email: `palcotech@gmail.com`
  - Password: `pal@123`

## Guides
- [MongoDB setup](./docs/mongodb-setup.md)
- [Cloudinary setup](./docs/cloudinary-setup.md)
- [Installation guide](./docs/installation-guide.md)
- [Deployment guide](./docs/deployment-guide.md)
