import Link from "next/link";
import { type HeroSlide } from "@/components/home/HeroSlider";
import { getHomeContent } from "@/lib/data";

import { connectToDatabase } from "@/lib/db";
import { ProductModel } from "@/models/Product";
import { ProductCard, type ProductCardData } from "@/components/products/ProductCard";
import { HeroSectionClient } from "@/components/home/HeroSectionClient";

export const dynamic = "force-dynamic";

export default async function Home() {
  const homeContent: any = await getHomeContent();
  let featured: ProductCardData[] = [];
  let hot: ProductCardData[] = [];
  let dbOk = true;

  const heroSlides: HeroSlide[] =
    homeContent?.hero?.slides?.map((item: any) => ({
      src: String(item?.src || item?.url || ""),
      title: String(item?.title || item?.heading || "Premium Engineering Products"),
      sub: String(item?.sub || item?.subtitle || "Quality-focused manufacturing and dependable delivery."),
    })) ?? [];

  try {
    await connectToDatabase();

    const [featuredDocs, hotDocs] = await Promise.all([
      ProductModel.find(
        { isFeatured: true },
        { name: 1, slug: 1, shortDetails: 1, images: 1 },
      )
        .sort({ updatedAt: -1 })
        .limit(6)
        .lean(),
      ProductModel.find(
        { isHot: true },
        { name: 1, slug: 1, shortDetails: 1, images: 1 },
      )
        .sort({ updatedAt: -1 })
        .limit(6)
        .lean(),
    ]);

    featured = featuredDocs.map((p: any) => ({
      _id: String(p._id),
      name: p.name || "Untitled Product",
      slug: p.slug,
      shortDetails: p.shortDetails || "",
      images: p.images || [],
    }));

    hot = hotDocs.map((p: any) => ({
      _id: String(p._id),
      name: p.name || "Untitled Product",
      slug: p.slug,
      shortDetails: p.shortDetails || "",
      images: p.images || [],
    }));
  } catch {
    dbOk = false;
  }

  const heroHeading = homeContent?.hero?.heading || "Palcotech Engineering";
  const heroSubheadingHtml =
    homeContent?.hero?.subheadingHtml ||
    homeContent?.hero?.subheading ||
    "We build and supply modern engineering solutions with professional service, fast delivery, and dependable quality.";
  const heroCtaText = homeContent?.hero?.ctaText || "Get Quote";
  const heroCtaUrl = homeContent?.hero?.ctaUrl || "/contact";

  const whyCards =
    homeContent?.whyChooseUs ||
    [
      { title: "High Quality Products", desc: "Strong quality checks and consistent standards." },
      { title: "ISO Certified", desc: "Process-driven manufacturing and documentation." },
      { title: "Fast Delivery", desc: "Reliable dispatch and support." },
      { title: "Affordable Pricing", desc: "Great value without compromising quality." },
      { title: "Custom Engineering", desc: "Tailored specs for your application needs." },
      { title: "24/7 Support", desc: "Quick responses for urgent queries." },
    ];

  const stats = homeContent?.stats ?? [
    { label: "Years Experience", value: "15+" },
    { label: "Happy Clients", value: "120+" },
    { label: "Industrial Categories", value: "12" },
  ];

  return (
    <div className="bg-transparent overflow-hidden">
      <HeroSectionClient
        heroHeading={heroHeading}
        heroSubheadingHtml={heroSubheadingHtml}
        heroCtaText={heroCtaText}
        heroCtaUrl={heroCtaUrl}
        heroSlides={heroSlides}
      />

      <section className="bg-white/55 py-12 backdrop-blur-sm sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-700 sm:text-xs">Hot products</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">Most requested items</h2>
            </div>
            <Link href="/products" className="text-sm font-bold text-sky-700 transition hover:text-sky-800 sm:text-base">
              Browse all →
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {hot.length ? (
              hot.map((p) => <ProductCard key={p._id} product={p} />)
            ) : (
              <div className="col-span-full rounded-3xl border border-slate-200 bg-white p-8 text-sm text-slate-600 shadow-sm">
                {dbOk ? (
                  "No hot products selected yet. Use the admin hot page to mark products."
                ) : (
                  "Database is not connected yet. Please check your MongoDB settings."
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white/75 py-12 backdrop-blur-sm sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500 sm:text-xs">Featured products</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">Top picks this season</h2>
            </div>
            <Link href="/products" className="text-sm font-bold text-sky-700 transition hover:text-sky-800 sm:text-base">
              View all products →
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {featured.length ? (
              featured.map((p) => <ProductCard key={p._id} product={p} />)
            ) : (
              <div className="col-span-full rounded-3xl border border-slate-200 bg-slate-50 p-8 text-sm text-slate-600 shadow-sm">
                {dbOk ? (
                  "No featured products selected yet. Use the admin panel to mark featured products."
                ) : (
                  "Database is not connected yet. Please check your MongoDB settings."
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-sky-50 p-6 shadow-sm sm:rounded-[2.5rem] sm:p-10 lg:p-16">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-cyan-400/15 blur-3xl" />
              <div className="absolute -right-10 -bottom-10 h-56 w-56 rounded-full bg-sky-400/15 blur-3xl" />
              <svg className="absolute inset-0 h-full w-full opacity-[0.2]" aria-hidden="true">
                <defs>
                  <pattern id="statsDots" width="36" height="36" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" fill="rgba(2,132,199,0.25)" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#statsDots)" />
              </svg>
            </div>

            <div className="relative">
              <div className="text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-sky-700 sm:text-xs">Our track record</p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                  Numbers that build trust
                </h2>
              </div>

              <div className="mt-10 grid gap-6 sm:grid-cols-3 sm:gap-4 lg:gap-8">
                {stats.map((item: any) => (
                  <div
                    key={item.label}
                    className="rounded-3xl border border-white/70 bg-white/70 p-6 text-center shadow-sm backdrop-blur sm:p-8"
                  >
                    <div className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                      <span className="bg-gradient-to-r from-cyan-600 to-sky-600 bg-clip-text text-transparent">
                        {item.value}
                      </span>
                    </div>
                    <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600 sm:text-xs">
                      {item.label}
                    </div>
                    <div className="mt-4 h-1 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 mx-auto opacity-80" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white/55 py-12 backdrop-blur-sm sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-700 sm:text-xs">Why choose us</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                Trusted by engineering buyers across India
              </h2>
            </div>
            <p className="max-w-xl text-base text-slate-600 lg:mb-1">
              We combine product excellence, quick delivery and full service support for every industrial application.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {whyCards.map((card: any) => (
              <div
                key={card.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:bg-cyan-50/50 sm:rounded-3xl sm:p-8"
              >
                <div className="text-lg font-bold text-slate-900 sm:text-xl">{card.title}</div>
                <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
