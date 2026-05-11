import { Container } from "@/components/Container";
import { FiltersClient } from "@/components/products/FiltersClient";
import { ProductCard, type ProductCardData } from "@/components/products/ProductCard";
import { connectToDatabase } from "@/lib/db";
import { CategoryModel } from "@/models/Category";
import { ProductModel } from "@/models/Product";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = (await searchParams) || {};

  const q = String(sp.q || "").trim();
  const certification = String(sp.certification || "").trim();
  const application = String(sp.application || "").trim();
  const businessType = String(sp.businessType || "").trim();
  const type = String(sp.type || "").trim();
  const category = String(sp.category || "").trim();

  const filter: any = {};
  if (q) filter.name = { $regex: q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" };
  if (certification) filter.certification = certification;
  if (application) filter.application = application;
  if (businessType) filter.businessType = businessType;
  if (type) filter.type = type;

  let cards: ProductCardData[] = [];
  let categories: { name: string; slug: string }[] = [];
  let dbOk = true;
  try {
    await connectToDatabase();

    const [cats, selectedCategory] = await Promise.all([
      CategoryModel.find({}, { name: 1, slug: 1 }).sort({ name: 1 }).lean(),
      category ? CategoryModel.findOne({ slug: category }, { _id: 1 }).lean() : null,
    ]);

    categories = (cats || []).map((c: any) => ({ name: c.name, slug: c.slug }));
    if (selectedCategory?._id) filter.category = selectedCategory._id;

    const products = await ProductModel.find(filter, {
      name: 1,
      slug: 1,
      shortDetails: 1,
      images: 1,
    })
      .sort({ createdAt: -1 })
      .limit(60)
      .lean();

    cards = products.map((p: any) => ({
      _id: String(p._id),
      name: p.name || "Untitled Product",
      slug: p.slug,
      shortDetails: p.shortDetails,
      images: p.images,
    }));
  } catch {
    dbOk = false;
  }

  return (
    <div className="bg-transparent">
      <Container className="py-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold text-slate-900">Products</h1>
          <p className="text-sm text-slate-600">
            Search and filter our catalog. Add products from the admin panel to see them here.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-4 xl:col-span-3">
            <FiltersClient categories={categories} />
          </div>
          <div className="lg:col-span-8 xl:col-span-9">
            {cards.length ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {cards.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200/70 bg-white p-8 text-sm text-slate-600 shadow-sm">
                {dbOk ? (
                  <>
                    No products found. Add products from{" "}
                    <Link className="font-semibold text-sky-700 hover:text-sky-800" href="/admin/products">
                      Admin → Products
                    </Link>

                    .
                  </>
                ) : (
                  <>Database is not connected yet. Please check MongoDB settings.</>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
