"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import { SiteSettingsModel } from "@/models/SiteSettings";

const Schema = z.object({
  companyName: z.string().optional(),
  logoUrl: z.string().optional(),
  phones: z.string().optional(),
  whatsappNumber: z.string().optional(),
  whatsappMessage: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  googleMapsEmbedUrl: z.string().optional(),
  gstNumber: z.string().optional(),
  workingHours: z.string().optional(),
  // Theme fields
  primaryColor: z.string().optional(),
  accentColor: z.string().optional(),
  heroOverlayColor: z.string().optional(),
  heroOverlayOpacity: z.string().optional(),
});

export async function updateSiteSettings(formData: FormData) {
  await requireAdmin();
  const raw = Object.fromEntries(formData.entries());
  const parsed = Schema.safeParse(raw);
  if (!parsed.success) throw new Error("Invalid data");

  const phones =
    parsed.data.phones
      ?.split(",")
      .map((p) => p.trim())
      .filter(Boolean) ?? [];

  await connectToDatabase();

  await SiteSettingsModel.findOneAndUpdate(
    { key: "global" },
    {
      $set: {
        companyName: parsed.data.companyName || "Palcotech Engineering",
        logoUrl: parsed.data.logoUrl || "",
        phones,
        whatsappNumber: parsed.data.whatsappNumber || "",
        whatsappMessage: parsed.data.whatsappMessage || "",
        email: parsed.data.email || "",
        address: parsed.data.address || "",
        googleMapsEmbedUrl: parsed.data.googleMapsEmbedUrl || "",
        gstNumber: parsed.data.gstNumber || "",
        workingHours: parsed.data.workingHours || "",
        // Theme fields
        primaryColor: parsed.data.primaryColor || "#0f172a",
        accentColor: parsed.data.accentColor || "#f59e0b",
        heroOverlayColor: parsed.data.heroOverlayColor || "#000000",
        heroOverlayOpacity: parseFloat(parsed.data.heroOverlayOpacity || "0.5"),
      },
    },
    { upsert: true },
  );

  revalidatePath("/", "layout"); // Revalidate all pages for theme changes
  revalidatePath("/");
  revalidatePath("/contact");
  revalidatePath("/products");
  revalidatePath("/admin/site-settings");
}
