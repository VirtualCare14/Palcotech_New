import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { connectToDatabase } from "@/lib/db";
import { MediaModel } from "@/models/Media";

async function requireAuth(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return null;
  }
  return token;
}

export async function GET(req: NextRequest) {
  const token = await requireAuth(req);
  if (!token) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  await connectToDatabase();
  const items = await MediaModel.find({}).sort({ createdAt: -1 }).limit(100).lean();
  return NextResponse.json({ success: true, items });
}

export async function POST(req: NextRequest) {
  const token = await requireAuth(req);
  if (!token) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body?.url) {
    return NextResponse.json({ success: false, message: "Missing url" }, { status: 400 });
  }

  await connectToDatabase();
  const created = await MediaModel.create({
    url: String(body.url),
    publicId: String(body.publicId || ""),
    folder: String(body.folder || ""),
    alt: String(body.alt || ""),
    width: Number(body.width || 0),
    height: Number(body.height || 0),
    bytes: Number(body.bytes || 0),
    format: String(body.format || ""),
  });

  return NextResponse.json({ success: true, item: created.toObject() });
}

export async function DELETE(req: NextRequest) {
  const token = await requireAuth(req);
  if (!token) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ success: false, message: "Missing id" }, { status: 400 });

  await connectToDatabase();
  await MediaModel.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}

