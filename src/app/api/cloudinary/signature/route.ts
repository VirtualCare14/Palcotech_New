import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { cloudinarySignature, getCloudinaryEnv } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { cloudName, apiKey, apiSecret } = getCloudinaryEnv();
  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      { success: false, message: "Cloudinary env vars are missing" },
      { status: 500 },
    );
  }

  const body = await req.json().catch(() => ({}));
  const folder = String(body.folder || "palcotech").trim();

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = cloudinarySignature({ folder, timestamp: String(timestamp) }, apiSecret);

  return NextResponse.json({
    success: true,
    message: "Cloudinary signature generated",
    cloudName,
    apiKey,
    timestamp,
    folder,
    signature,
  });
}
