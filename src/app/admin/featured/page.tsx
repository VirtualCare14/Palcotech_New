import Link from "next/link";
import { connectToDatabase } from "@/lib/db";
import { ProductModel } from "@/models/Product";
import { toggleProductFlag } from "@/actions/products";

export const dynamic = "force-dynamic";

export default async function AdminFeaturedPage() {
  await connectToDatabase();
  const products = await ProductModel.find(
    {},
    { name: 1, slug: 1, isFeatured: 1, updatedAt: 1 },
  )
    .sort({ updatedAt: -1 })
    .limit(80)
    .lean();

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Featured Products</h1>
            <p className="mt-1 text-sm text-slate-600">
              Toggle products that should appear in the homepage “Featured products” section.
            </p>
          </div>
          <Link className="text-sm font-semibold text-sky-700 hover:text-sky-800" href="/admin">
            ← Dashboard
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-3">
            {products.length ? (
              products.map((p: any) => (
                <div
                  key={String(p._id)}
                  className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{p.name}</div>
                    <a className="text-xs text-sky-700 hover:text-sky-800" href={`/products/${p.slug}`}>
                      /products/{p.slug}
                    </a>
                  </div>

                  <form action={toggleProductFlag} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={String(p._id)} />
                    <input type="hidden" name="flag" value="isFeatured" />
                    <input type="hidden" name="value" value={String(!p.isFeatured)} />
                    <button
                      type="submit"
                      className={`rounded-full px-4 py-2 text-xs font-semibold shadow-sm transition ${
                        p.isFeatured
                          ? "bg-sky-600 text-white hover:bg-sky-700"
                          : "border border-slate-200 bg-white text-slate-900 hover:border-sky-200 hover:bg-sky-50"
                      }`}
                    >
                      {p.isFeatured ? "Featured" : "Mark as Featured"}
                    </button>
                  </form>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
                No products found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

