"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import { slugify } from "@/lib/slug";
import { ProductModel } from "@/models/Product";

const ProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  shortDetails: z.string().optional(),
  categoryId: z.string().optional(),
  imageUrls: z.string().optional(),
  weight: z.string().optional(),
  ratedPower: z.string().optional(),
  color: z.string().optional(),
  drivenType: z.string().optional(),
  warranty: z.string().optional(),
  businessType: z.string().optional(),
  type: z.string().optional(),
  certification: z.string().optional(),
  application: z.string().optional(),
  isHot: z.preprocess((value) => String(value || "false") === "true", z.boolean()).optional(),
  isFeatured: z.preprocess((value) => String(value || "false") === "true", z.boolean()).optional(),
});

const FlagSchema = z.object({
  id: z.string().min(1),
  flag: z.enum(["isFeatured", "isHot"]),
  value: z.preprocess((value) => String(value || "false") === "true", z.boolean()),
});

function parseImageUrls(value?: string) {
  return (
    value
      ?.split(",")
      .map((url) => url.trim())
      .filter(Boolean)
      .map((url) => ({ url })) ?? []
  );
}

export async function createProduct(formData: FormData) {
  await requireAdmin();
  const raw = Object.fromEntries(formData.entries());
  const parsed = ProductSchema.safeParse(raw);
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message || "Invalid data");

  await connectToDatabase();

  await ProductModel.create({
    name: parsed.data.name,
    slug: slugify(parsed.data.name),
    shortDetails: parsed.data.shortDetails || "",
    images: parseImageUrls(parsed.data.imageUrls),
    category: parsed.data.categoryId || null,
    weight: parsed.data.weight || "",
    ratedPower: parsed.data.ratedPower || "",
    color: parsed.data.color || "",
    drivenType: parsed.data.drivenType || "",
    warranty: parsed.data.warranty || "",
    businessType: parsed.data.businessType || "",
    type: parsed.data.type || "",
    certification: parsed.data.certification || "",
    application: parsed.data.application || "",
    isHot: parsed.data.isHot ?? false,
    isFeatured: parsed.data.isFeatured ?? false,
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
  redirect("/admin/products");
}

export async function updateProduct(formData: FormData) {
  await requireAdmin();
  const raw = Object.fromEntries(formData.entries());
  const parsed = ProductSchema.safeParse(raw);
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message || "Invalid data");
  const id = String(raw.id || "");
  if (!id) throw new Error("Missing id");

  await connectToDatabase();

  await ProductModel.findByIdAndUpdate(
    id,
    {
      name: parsed.data.name,
      slug: slugify(parsed.data.name),
      shortDetails: parsed.data.shortDetails || "",
      images: parseImageUrls(parsed.data.imageUrls),
      category: parsed.data.categoryId || null,
      weight: parsed.data.weight || "",
      ratedPower: parsed.data.ratedPower || "",
      color: parsed.data.color || "",
      drivenType: parsed.data.drivenType || "",
      warranty: parsed.data.warranty || "",
      businessType: parsed.data.businessType || "",
      type: parsed.data.type || "",
      certification: parsed.data.certification || "",
      application: parsed.data.application || "",
      isHot: parsed.data.isHot ?? false,
      isFeatured: parsed.data.isFeatured ?? false,
    },
    { new: true },
  );

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
  redirect("/admin/products");
}

export async function toggleProductFlag(formData: FormData) {
  await requireAdmin();
  const raw = Object.fromEntries(formData.entries());
  const parsed = FlagSchema.safeParse(raw);
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message || "Invalid data");

  await connectToDatabase();
  await ProductModel.findByIdAndUpdate(parsed.data.id, {
    [parsed.data.flag]: parsed.data.value,
  });

  revalidatePath("/admin/products");
  revalidatePath("/admin/featured");
  revalidatePath("/admin/hot");
  revalidatePath("/");
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) throw new Error("Missing id");

  await connectToDatabase();
  await ProductModel.findByIdAndDelete(id);

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
}
