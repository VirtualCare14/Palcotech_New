import { notFound } from "next/navigation";
import Link from "next/link";
import { connectToDatabase } from "@/lib/db";
import { ProductModel } from "@/models/Product";
import { CategoryModel } from "@/models/Category";
import { updateProduct } from "@/actions/products";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  await connectToDatabase();
  
  const [product, categories] = await Promise.all([
    ProductModel.findById(id).lean(),
    CategoryModel.find({}, { name: 1 }).sort({ name: 1 }).lean(),
  ]);

  if (!product) notFound();

  // Convert images array back to string for the input
  const imageUrlsString = (product.images || [])
    .map((img: any) => img.url)
    .filter(Boolean)
    .join(", ");

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Edit Product</h1>
            <p className="mt-1 text-sm text-slate-600">Update details for {product.name}</p>
          </div>
          <Link
            className="text-sm font-semibold text-sky-700 hover:text-sky-800"
            href="/admin/products"
          >
            ← Back to Products
          </Link>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <form action={updateProduct} className="space-y-6">
            <input type="hidden" name="id" value={id} />
            
            <label className="block">
              <div className="text-sm font-medium text-slate-700">Name</div>
              <input
                name="name"
                defaultValue={product.name}
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-200 focus:ring"
                required
              />
            </label>

            <label className="block">
              <div className="text-sm font-medium text-slate-700">Short details</div>
              <textarea
                name="shortDetails"
                defaultValue={product.shortDetails}
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-200 focus:ring"
                rows={3}
              />
            </label>

            <label className="block">
              <div className="text-sm font-medium text-slate-700">Category</div>
              <select
                name="categoryId"
                className="mt-1 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
                defaultValue={String(product.category || "")}
              >
                <option value="">Uncategorized</option>
                {categories.map((c: any) => (
                  <option key={String(c._id)} value={String(c._id)}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <div className="text-sm font-medium text-slate-700">Image URLs (comma separated)</div>
              <input
                name="imageUrls"
                defaultValue={imageUrlsString}
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-200 focus:ring"
                placeholder="https://res.cloudinary.com/... , https://..."
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { name: "weight", label: "Weight", val: product.weight },
                { name: "ratedPower", label: "Rated power", val: product.ratedPower },
                { name: "color", label: "Color", val: product.color },
                { name: "drivenType", label: "Driven type", val: product.drivenType },
                { name: "warranty", label: "Warranty", val: product.warranty },
                { name: "businessType", label: "Business type", val: product.businessType },
                { name: "type", label: "Type", val: product.type },
                { name: "certification", label: "Certification", val: product.certification },
                { name: "application", label: "Application", val: product.application },
              ].map((f) => (
                <label className="block" key={f.name}>
                  <div className="text-sm font-medium text-slate-700">{f.label}</div>
                  <input
                    name={f.name}
                    defaultValue={f.val}
                    className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-200 focus:ring"
                  />
                </label>
              ))}
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="isFeatured" 
                  value="true" 
                  defaultChecked={product.isFeatured}
                  className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                />
                <span className="text-sm font-medium text-slate-700">Featured</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="isHot" 
                  value="true" 
                  defaultChecked={product.isHot}
                  className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500"
                />
                <span className="text-sm font-medium text-slate-700">Hot</span>
              </label>
            </div>

            <button className="w-full rounded-2xl bg-sky-600 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700">
              Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
