"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import { AboutContentModel } from "@/models/AboutContent";

const Schema = z.object({
  bannerTitle: z.string().optional(),
  bannerSubtitle: z.string().optional(),

  whoWeAreHtml: z.string().optional(),
  missionHtml: z.string().optional(),
  visionHtml: z.string().optional(),

  approachTitle: z.string().optional(),
  approachHtml: z.string().optional(),
});

export async function updateAboutContent(formData: FormData) {
  await requireAdmin();
  const raw = Object.fromEntries(formData.entries());
  const parsed = Schema.safeParse(raw);
  if (!parsed.success) throw new Error("Invalid data");

  await connectToDatabase();

  await AboutContentModel.findOneAndUpdate(
    { key: "about" },
    {
      $set: {
        banner: {
          title: parsed.data.bannerTitle || "",
          subtitle: parsed.data.bannerSubtitle || "",
        },
        intro: {
          html: parsed.data.whoWeAreHtml || "",
        },
        missionVision: {
          missionHtml: parsed.data.missionHtml || "",
          visionHtml: parsed.data.visionHtml || "",
        },
        body: {
          title: parsed.data.approachTitle || "",
          html: parsed.data.approachHtml || "",
        },
      },
    },
    { upsert: true },
  );

  revalidatePath("/about");
  revalidatePath("/admin/about-content");
}
