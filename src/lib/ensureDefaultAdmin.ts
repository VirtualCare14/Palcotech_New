import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db";
import { AdminUserModel } from "@/models/AdminUser";

declare global {
  // eslint-disable-next-line no-var
  var __palcotechAdminSeeded: boolean | undefined;
}

export async function ensureDefaultAdmin() {
  if (global.__palcotechAdminSeeded) return;

  const email = (process.env.ADMIN_EMAIL || "palcotech@gmail.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "pal@123";

  await connectToDatabase();

  const existing = await AdminUserModel.findOne({ email }).lean();
  if (!existing) {
    const passwordHash = await bcrypt.hash(password, 12);
    await AdminUserModel.create({ email, passwordHash, role: "admin" });
  }

  global.__palcotechAdminSeeded = true;
}

