import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { ProductCard, type ProductCardData } from "@/components/products/ProductCard";
import { connectToDatabase } from "@/lib/db";
import { ProductModel } from "@/models/Product";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  await connectToDatabase();

  const product: any = await ProductModel.findOne({ slug }).lean();
  if (!product) notFound();

  const specs = [
    { label: "Weight", value: String(product.weight || "") },
    { label: "Rated Power", value: String(product.ratedPower || "") },
    { label: "Color", value: String(product.color || "") },
    { label: "Driven Type", value: String(product.drivenType || "") },
    { label: "Warranty", value: String(product.warranty || "") },
    { label: "Business Type", value: String(product.businessType || "") },
    { label: "Type", value: String(product.type || "") },
    { label: "Certification", value: String(product.certification || "") },
    { label: "Application", value: String(product.application || "") },
  ].filter((s) => Boolean(s.value));

  const relatedDocs = await ProductModel.find(
    { _id: { $ne: product._id } },
    { name: 1, slug: 1, shortDetails: 1, images: 1 },
  )
    .sort({ createdAt: -1 })
    .limit(4)
    .lean();

  const related: ProductCardData[] = relatedDocs.map((p: any) => ({
    _id: String(p._id),
    name: p.name,
    slug: p.slug,
    shortDetails: p.shortDetails,
    images: p.images,
  }));

  const images = product.images?.length ? product.images : [];
  const heroImg = images?.[0]?.url || "";

  return (
    <div className="bg-white">
      <Container className="py-10">
        <nav className="text-sm text-slate-600">
          <Link className="hover:text-sky-700" href="/">
            Home
          </Link>{" "}
          /{" "}
          <Link className="hover:text-sky-700" href="/products">
            Products
          </Link>{" "}
          / <span className="text-slate-900">{product.name}</span>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
              {heroImg ? (
                <Image
                  src={heroImg}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="grid h-full w-full place-items-center text-sm text-slate-500">
                  No image
                </div>
              )}
            </div>

            {images.length > 1 ? (
              <div className="mt-3 grid grid-cols-4 gap-3">
                {images.slice(0, 4).map((img: any, idx: number) => (
                  <div
                    key={idx}
                    className="relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
                  >
                    {img.url ? (
                      <Image
                        src={img.url}
                        alt={img.alt || product.name}
                        fill
                        sizes="120px"
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div>
            <h1 className="text-3xl font-semibold text-slate-900">{product.name}</h1>
            {product.shortDetails ? (
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {product.shortDetails}
              </p>
            ) : null}

            {specs.length ? (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 px-5 py-3 text-sm font-semibold text-slate-900">
                  Specifications
                </div>
                <table className="w-full text-sm">
                  <tbody>
                    {specs.map((s) => (
                      <tr key={s.label} className="border-t border-slate-100">
                        <td className="w-40 px-5 py-3 font-medium text-slate-700">
                          {s.label}
                        </td>
                        <td className="px-5 py-3 text-slate-600">{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}

            {product.descriptionHtml ? (
              <div className="prose prose-slate mt-8 max-w-none">
                {/* eslint-disable-next-line react/no-danger */}
                <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
              </div>
            ) : null}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
              >
                Get Quote
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-sky-200 hover:bg-sky-50"
              >
                Back to Products
              </Link>
            </div>
          </div>
        </div>

        {related.length ? (
          <section className="mt-14">
            <h2 className="text-xl font-semibold text-slate-900">Related Products</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </section>
        ) : null}
      </Container>
    </div>
  );
}
