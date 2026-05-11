"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/db";
import { requireAdmin } from "@/lib/requireAdmin";
import { slugify } from "@/lib/slug";
import { CategoryModel } from "@/models/Category";

const CreateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
});

export async function createCategory(formData: FormData) {
  await requireAdmin();
  const raw = Object.fromEntries(formData.entries());
  const parsed = CreateSchema.safeParse(raw);
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message || "Invalid data");

  await connectToDatabase();
  const slug = slugify(parsed.data.name);
  await CategoryModel.create({
    name: parsed.data.name,
    slug,
    description: parsed.data.description || "",
    imageUrl: parsed.data.imageUrl || "",
  });

  revalidatePath("/admin/categories");
  revalidatePath("/");
  revalidatePath("/products");
}

export async function deleteCategory(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) throw new Error("Missing id");

  await connectToDatabase();
  await CategoryModel.findByIdAndDelete(id);

  revalidatePath("/admin/categories");
  revalidatePath("/");
  revalidatePath("/products");
}

