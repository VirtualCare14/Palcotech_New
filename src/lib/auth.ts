import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db";
import { ensureDefaultAdmin } from "@/lib/ensureDefaultAdmin";
import { AdminUserModel } from "@/models/AdminUser";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toLowerCase().trim();
        const password = credentials?.password ?? "";

        if (!email || !password) return null;

        try {
          await connectToDatabase();
          await ensureDefaultAdmin();

          const user = await AdminUserModel.findOne({ email }).lean();
          if (!user) return null;

          const ok = await bcrypt.compare(password, user.passwordHash);
          if (!ok) return null;

          return {
            id: String(user._id),
            email: user.email,
            name: user.email,
            role: user.role,
          } as any;
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error("Auth authorize error:", error);
          throw new Error("Unable to access admin database at this time.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = (user as any).id;
        token.role = (user as any).role ?? "admin";
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).uid = token.uid;
      (session as any).role = token.role;
      return session;
    },
  },
};

