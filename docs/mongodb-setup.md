# MongoDB Atlas Setup (Palcotech Engineering)

## 1) Create Atlas cluster
1. Sign in to MongoDB Atlas.
2. Create a new cluster (M0 free tier is fine for dev).

## 2) Create a database user
1. Go to **Database Access** → **Add New Database User**.
2. Create a user with **Read and write** permissions for the project.

## 3) Allow network access
1. Go to **Network Access**.
2. Add your IP for development.
3. For production (Vercel/Render/etc.) you can temporarily allow `0.0.0.0/0` (not ideal) or use provider-specific IP allow lists.

## 4) Get the connection string
1. Go to **Database** → **Connect** → **Drivers**.
2. Copy the connection string and replace username/password and database name as needed.

## 5) Add to environment variables
Create `.env.local` from `.env.example` and set:

```bash
MONGODB_URI="mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority"
```

## 6) Verify
Run the app:

```bash
npm run dev
```

When you visit the site, it will connect using Mongoose and create default documents (site settings + default admin when you first attempt login).

