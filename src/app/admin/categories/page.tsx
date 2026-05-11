import Link from "next/link";
import { connectToDatabase } from "@/lib/db";
import { CategoryModel } from "@/models/Category";
import { createCategory, deleteCategory } from "@/actions/categories";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  await connectToDatabase();
  const categories = await CategoryModel.find({}).sort({ createdAt: -1 }).lean();

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Categories</h1>
            <p className="mt-1 text-sm text-slate-600">
              Categories automatically appear in the navbar and filters.
            </p>
          </div>
          <Link className="text-sm font-semibold text-sky-700 hover:text-sky-800" href="/admin">
            ← Dashboard
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-lg font-semibold text-slate-900">Add Category</div>
            <form action={createCategory} className="mt-4 space-y-3">
              <label className="block">
                <div className="text-sm font-medium text-slate-700">Name</div>
                <input
                  name="name"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-sky-200 focus:ring"
                  placeholder="e.g., Motors"
                  required
                />
              </label>
              <label className="block">
                <div className="text-sm font-medium text-slate-700">Description (optional)</div>
                <textarea
                  name="description"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-sky-200 focus:ring"
                  rows={3}
                />
              </label>
              <label className="block">
                <div className="text-sm font-medium text-slate-700">Image URL (optional)</div>
                <input
                  name="imageUrl"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-sky-200 focus:ring"
                  placeholder="(we’ll add Cloudinary upload in Media Manager)"
                />
              </label>
              <button className="w-full rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700">
                Save
              </button>
              <p className="text-xs text-slate-500">
                Note: Category image upload will be handled via Cloudinary in the Media section.
              </p>
            </form>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-lg font-semibold text-slate-900">All Categories</div>
            <div className="mt-4 space-y-3">
              {categories.length ? (
                categories.map((c: any) => (
                  <div
                    key={String(c._id)}
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{c.name}</div>
                      <div className="text-xs text-slate-500">/{c.slug}</div>
                    </div>
                    <form action={deleteCategory}>
                      <input type="hidden" name="id" value={String(c._id)} />
                      <button className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100">
                        Delete
                      </button>
                    </form>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                  No categories yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
