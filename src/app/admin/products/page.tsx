import Link from "next/link";
import { connectToDatabase } from "@/lib/db";
import { CategoryModel } from "@/models/Category";
import { ProductModel } from "@/models/Product";
import { createProduct, deleteProduct, toggleProductFlag } from "@/actions/products";
import { ProductImageManager } from "@/components/admin/ProductImageManager";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  await connectToDatabase();
  const [categories, products] = await Promise.all([
    CategoryModel.find({}, { name: 1 }).sort({ name: 1 }).lean(),
    ProductModel.find({}, { name: 1, slug: 1, createdAt: 1, isFeatured: 1, isHot: 1 })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean(),
  ]);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Products</h1>
            <p className="mt-1 text-sm text-slate-600">
              Add, edit, delete and manage product settings across your store.
            </p>
          </div>
          <Link className="text-sm font-semibold text-sky-700 hover:text-sky-800" href="/admin">
            ← Dashboard
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-lg font-semibold text-slate-900">Add Product</div>
            <form action={createProduct} className="mt-5 space-y-4">
              <label className="block">
                <div className="text-sm font-medium text-slate-700">Name</div>
                <input
                  name="name"
                  className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-200 focus:ring"
                  placeholder="Product name"
                  required
                />
              </label>
              <label className="block">
                <div className="text-sm font-medium text-slate-700">Short details</div>
                <textarea
                  name="shortDetails"
                  className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-200 focus:ring"
                  rows={3}
                />
              </label>

              <label className="block">
                <div className="text-sm font-medium text-slate-700">Category</div>
                <select
                  name="categoryId"
                  className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                  defaultValue=""
                >
                  <option value="">Uncategorized</option>
                  {categories.map((c: any) => (
                    <option key={String(c._id)} value={String(c._id)}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>

              <ProductImageManager />

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["weight", "Weight"],
                  ["ratedPower", "Rated power"],
                  ["color", "Color"],
                  ["drivenType", "Driven type"],
                  ["warranty", "Warranty"],
                  ["businessType", "Business type"],
                  ["type", "Type"],
                  ["certification", "Certification"],
                  ["application", "Application"],
                ].map(([name, label]) => (
                  <label className="block" key={name}>
                    <div className="text-sm font-medium text-slate-700">{label}</div>
                    <input
                      name={name}
                      className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-200 focus:ring"
                    />
                  </label>
                ))}
              </div>

              <button className="w-full rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700">
                Save Product
              </button>
            </form>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="text-lg font-semibold text-slate-900">Recent Products</div>
            <div className="mt-4 space-y-3">
              {products.length ? (
                products.map((p: any) => (
                  <div
                    key={String(p._id)}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="text-sm font-semibold text-slate-900">{p.name}</div>
                        <a
                          className="text-xs text-sky-700 hover:text-sky-800"
                          href={`/products/${p.slug}`}
                        >
                          /products/{p.slug}
                        </a>
                        <div className="mt-2 flex flex-wrap gap-2 text-xs">
                          <span className={`rounded-full px-2 py-1 ${p.isFeatured ? "bg-sky-100 text-sky-700" : "bg-slate-100 text-slate-600"}`}>
                            Featured: {p.isFeatured ? "Yes" : "No"}
                          </span>
                          <span className={`rounded-full px-2 py-1 ${p.isHot ? "bg-rose-100 text-rose-700" : "bg-slate-100 text-slate-600"}`}>
                            Hot: {p.isHot ? "Yes" : "No"}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={`/admin/products/${String(p._id)}`}
                          className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 transition hover:border-sky-200 hover:bg-sky-50"
                        >
                          Edit
                        </Link>
                        <form action={toggleProductFlag} className="inline">
                          <input type="hidden" name="id" value={String(p._id)} />
                          <input type="hidden" name="flag" value="isFeatured" />
                          <input type="hidden" name="value" value={String(!p.isFeatured)} />
                          <button
                            type="submit"
                            className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 transition hover:border-sky-200 hover:bg-sky-50"
                          >
                            {p.isFeatured ? "Unfeature" : "Feature"}
                          </button>
                        </form>
                        <form action={toggleProductFlag} className="inline">
                          <input type="hidden" name="id" value={String(p._id)} />
                          <input type="hidden" name="flag" value="isHot" />
                          <input type="hidden" name="value" value={String(!p.isHot)} />
                          <button
                            type="submit"
                            className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 transition hover:border-sky-200 hover:bg-sky-50"
                          >
                            {p.isHot ? "Remove Hot" : "Mark Hot"}
                          </button>
                        </form>
                        <form action={deleteProduct} className="inline">
                          <input type="hidden" name="id" value={String(p._id)} />
                          <button
                            type="submit"
                            className="rounded-full border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                          >
                            Delete
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
                  No products yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
