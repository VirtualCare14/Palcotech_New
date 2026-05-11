import { connectToDatabase } from "@/lib/db";
import { CategoryModel } from "@/models/Category";
import { SiteSettingsModel } from "@/models/SiteSettings";
import { HomeContentModel } from "@/models/HomeContent";
import { AboutContentModel } from "@/models/AboutContent";

export async function getSiteSettings() {
  await connectToDatabase();

  const existing = await SiteSettingsModel.findOne({ key: "global" }).lean();
  if (existing) return existing;

  const created = await SiteSettingsModel.create({ key: "global" });
  return created.toObject();
}

export async function getNavbarCategories() {
  await connectToDatabase();
  const cats = await CategoryModel.find({}, { name: 1, slug: 1 })
    .sort({ createdAt: -1 })
    .lean();

  return cats.map((c) => ({ name: c.name, slug: c.slug }));
}

export async function getHomeContent() {
  await connectToDatabase();
  const existing = await HomeContentModel.findOne({ key: "home" }).lean();
  if (existing) return existing;
  const created = await HomeContentModel.create({ key: "home" });
  return created.toObject();
}

export async function getAboutContent() {
  await connectToDatabase();
  const existing = await AboutContentModel.findOne({ key: "about" }).lean();
  if (existing) return existing;
  const created = await AboutContentModel.create({ key: "about" });
  return created.toObject();
}

