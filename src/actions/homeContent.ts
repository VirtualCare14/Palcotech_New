"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import { HomeContentModel } from "@/models/HomeContent";

const Schema = z.object({
  heroHeading: z.string().optional(),
  heroTagline: z.string().optional(),
  heroCtaText: z.string().optional(),
  heroCtaUrl: z.string().optional(),

  // Fixed 4 hero slides editor (each slide has imageUrl + title + sub)
  heroSlide1ImageUrl: z.string().optional(),
  heroSlide1Title: z.string().optional(),
  heroSlide1Sub: z.string().optional(),
  heroSlide2ImageUrl: z.string().optional(),
  heroSlide2Title: z.string().optional(),
  heroSlide2Sub: z.string().optional(),
  heroSlide3ImageUrl: z.string().optional(),
  heroSlide3Title: z.string().optional(),
  heroSlide3Sub: z.string().optional(),
  heroSlide4ImageUrl: z.string().optional(),
  heroSlide4Title: z.string().optional(),
  heroSlide4Sub: z.string().optional(),

  // Stats (3 blocks)
  stat1Value: z.string().optional(),
  stat1Label: z.string().optional(),
  stat2Value: z.string().optional(),
  stat2Label: z.string().optional(),
  stat3Value: z.string().optional(),
  stat3Label: z.string().optional(),

  // Why choose us (6 cards)
  why1Title: z.string().optional(),
  why1Desc: z.string().optional(),
  why2Title: z.string().optional(),
  why2Desc: z.string().optional(),
  why3Title: z.string().optional(),
  why3Desc: z.string().optional(),
  why4Title: z.string().optional(),
  why4Desc: z.string().optional(),
  why5Title: z.string().optional(),
  why5Desc: z.string().optional(),
  why6Title: z.string().optional(),
  why6Desc: z.string().optional(),
});

function slide(imageUrl?: string, title?: string, sub?: string) {
  const src = String(imageUrl || "").trim();
  if (!src) return null;
  return {
    src,
    title: String(title || "").trim(),
    sub: String(sub || "").trim(),
  };
}

export async function updateHomeContent(formData: FormData) {
  await requireAdmin();
  const raw = Object.fromEntries(formData.entries());
  const parsed = Schema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Invalid data");
  }

  const slides = [
    slide(parsed.data.heroSlide1ImageUrl, parsed.data.heroSlide1Title, parsed.data.heroSlide1Sub),
    slide(parsed.data.heroSlide2ImageUrl, parsed.data.heroSlide2Title, parsed.data.heroSlide2Sub),
    slide(parsed.data.heroSlide3ImageUrl, parsed.data.heroSlide3Title, parsed.data.heroSlide3Sub),
    slide(parsed.data.heroSlide4ImageUrl, parsed.data.heroSlide4Title, parsed.data.heroSlide4Sub),
  ].filter(Boolean);

  const stats = [
    { value: parsed.data.stat1Value || "15+", label: parsed.data.stat1Label || "Years Experience" },
    { value: parsed.data.stat2Value || "120+", label: parsed.data.stat2Label || "Happy Clients" },
    { value: parsed.data.stat3Value || "12", label: parsed.data.stat3Label || "Industrial Categories" },
  ];

  const whyChooseUs = [
    { title: parsed.data.why1Title || "High Quality Products", desc: parsed.data.why1Desc || "" },
    { title: parsed.data.why2Title || "ISO Certified", desc: parsed.data.why2Desc || "" },
    { title: parsed.data.why3Title || "Fast Delivery", desc: parsed.data.why3Desc || "" },
    { title: parsed.data.why4Title || "Affordable Pricing", desc: parsed.data.why4Desc || "" },
    { title: parsed.data.why5Title || "Custom Engineering", desc: parsed.data.why5Desc || "" },
    { title: parsed.data.why6Title || "24/7 Support", desc: parsed.data.why6Desc || "" },
  ].filter((c) => String(c.title).trim());

  await connectToDatabase();

  await HomeContentModel.findOneAndUpdate(
    { key: "home" },
    {
      $set: {
        hero: {
          heading: parsed.data.heroHeading || "",
          tagline: parsed.data.heroTagline || "",
          ctaText: parsed.data.heroCtaText || "",
          ctaUrl: parsed.data.heroCtaUrl || "",
          slides,
        },
        whyChooseUs,
        stats,
      },
    },
    { upsert: true },
  );

  revalidatePath("/");
  revalidatePath("/admin/home-content");
}
