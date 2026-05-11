import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import { slugify } from "@/lib/slug";
import { ProductModel } from "@/models/Product";

const ImageSchema = z.object({
  url: z.string().min(1),
  publicId: z.string().optional().default(""),
  alt: z.string().optional().default(""),
});

const CreateSchema = z.object({
  name: z.string().min(1),
  shortDetails: z.string().optional().default(""),
  images: z.array(ImageSchema).optional().default([]),

  weight: z.string().optional().default(""),
  ratedPower: z.string().optional().default(""),
  color: z.string().optional().default(""),
  drivenType: z.string().optional().default(""),
  warranty: z.string().optional().default(""),
  businessType: z.string().optional().default(""),
  type: z.string().optional().default(""),
  certification: z.string().optional().default(""),
  application: z.string().optional().default(""),

  isHot: z.boolean().optional().default(false),
  isFeatured: z.boolean().optional().default(false),
});

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const parsed = CreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, message: "Invalid payload" }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const doc = await ProductModel.create({
      ...parsed.data,
      slug: slugify(parsed.data.name),
    });
    return NextResponse.json({ success: true, message: "Product created.", id: String(doc._id) });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Admin product create error:", err);
    return NextResponse.json(
      { success: false, message: "Database connection failed" },
      { status: 503 },
    );
  }
}

