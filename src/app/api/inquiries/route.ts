import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import { rateLimit } from "@/lib/rateLimit";
import { InquiryModel } from "@/models/Inquiry";

const Schema = z.object({
  productLookingFor: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  mobile: z.string().optional().nullable(),
  meta: z.any().optional().nullable(),
});

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  const rl = rateLimit(`inquiry:${ip}`, 10, 60 * 60 * 1000);
  if (!rl.ok) {
    return NextResponse.json(
      { success: false, message: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  const body = await req.json().catch(() => ({}));
  const parsed = Schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, message: "Invalid payload." }, { status: 400 });
  }

  try {
    await connectToDatabase();
    await InquiryModel.create({
      productLookingFor: parsed.data.productLookingFor || "",
      name: parsed.data.name || "",
      mobile: parsed.data.mobile || "",
      meta: parsed.data.meta ?? null,
    });

    return NextResponse.json({ success: true, message: "Inquiry received." });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Inquiry route error:", error);
    return NextResponse.json(
      { success: false, message: "Unable to submit inquiry. Please try again later." },
      { status: 503 },
    );
  }
}

