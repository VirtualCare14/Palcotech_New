import Link from "next/link";
import { getHomeContent } from "@/lib/data";
import { updateHomeContent } from "@/actions/homeContent";
import { CloudinaryUploader } from "@/components/admin/CloudinaryUploader";

export const dynamic = "force-dynamic";

export default async function AdminHomeContentPage() {
  const content: any = await getHomeContent();

  const hero = content?.hero || {};
  const slides = (hero?.slides || []) as any[];
  const stats = (content?.stats || []) as any[];
  const why = (content?.whyChooseUs || []) as any[];

  const slideAt = (i: number) => slides[i] || {};
  const statAt = (i: number) => stats[i] || {};
  const whyAt = (i: number) => why[i] || {};

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Homepage Content</h1>
            <p className="mt-1 text-sm text-slate-600">
              Update hero text (tagline/title), slider images, stats and Why Choose Us blocks.
            </p>
          </div>
          <Link className="text-sm font-semibold text-sky-700 hover:text-sky-800" href="/admin">
            ← Dashboard
          </Link>
        </div>

        <form action={updateHomeContent} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <div className="text-sm font-medium text-slate-700">Hero heading</div>
              <input
                name="heroHeading"
                defaultValue={hero?.heading || ""}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-sky-200 focus:ring"
              />
            </label>

            <label className="block sm:col-span-2">
              <div className="text-sm font-medium text-slate-700">Hero tagline</div>
              <input
                name="heroTagline"
                defaultValue={hero?.tagline || "Trusted Industrial Partner"}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-sky-200 focus:ring"
                placeholder="Trusted Industrial Partner"
              />
            </label>

            <label className="block">
              <div className="text-sm font-medium text-slate-700">CTA text</div>
              <input
                name="heroCtaText"
                defaultValue={hero?.ctaText || ""}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-sky-200 focus:ring"
              />
            </label>
            <label className="block">
              <div className="text-sm font-medium text-slate-700">CTA link</div>
              <input
                name="heroCtaUrl"
                defaultValue={hero?.ctaUrl || ""}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-sky-200 focus:ring"
                placeholder="/contact"
              />
            </label>

            <div className="sm:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-900">Hero slider (4 images)</div>
                  <p className="mt-1 text-xs text-slate-600">
                    Upload from your computer (Cloudinary) and paste/select the URL into each slide.
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <CloudinaryUploader defaultFolder="palcotech/hero" />
              </div>

              <div className="mt-5 grid gap-4">
                {[1, 2, 3, 4].map((n) => {
                  const s = slideAt(n - 1);
                  return (
                    <div key={n} className="rounded-2xl border border-slate-200 bg-white p-4">
                      <div className="text-sm font-semibold text-slate-900">Slide {n}</div>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <label className="block sm:col-span-2">
                          <div className="text-xs font-semibold text-slate-600">Image URL</div>
                          <input
                            name={`heroSlide${n}ImageUrl`}
                            defaultValue={s?.src || s?.url || ""}
                            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-sky-200 focus:ring"
                            placeholder="https://res.cloudinary.com/.../image/upload/..."
                          />
                        </label>
                        <label className="block">
                          <div className="text-xs font-semibold text-slate-600">Title</div>
                          <input
                            name={`heroSlide${n}Title`}
                            defaultValue={s?.title || ""}
                            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-sky-200 focus:ring"
                          />
                        </label>
                        <label className="block">
                          <div className="text-xs font-semibold text-slate-600">Product details</div>
                          <input
                            name={`heroSlide${n}Sub`}
                            defaultValue={s?.sub || ""}
                            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-sky-200 focus:ring"
                          />
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="sm:col-span-2 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="text-lg font-semibold text-slate-900">Stats (3)</div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[1, 2, 3].map((n) => {
                  const s = statAt(n - 1);
                  return (
                    <div key={n} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="text-sm font-semibold text-slate-900">Stat {n}</div>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <label className="block">
                          <div className="text-xs font-semibold text-slate-600">Value</div>
                          <input
                            name={`stat${n}Value`}
                            defaultValue={s?.value || ""}
                            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-sky-200 focus:ring"
                            placeholder={n === 1 ? "15+" : n === 2 ? "120+" : "12"}
                          />
                        </label>
                        <label className="block">
                          <div className="text-xs font-semibold text-slate-600">Label</div>
                          <input
                            name={`stat${n}Label`}
                            defaultValue={s?.label || ""}
                            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-sky-200 focus:ring"
                            placeholder={n === 1 ? "Years Experience" : n === 2 ? "Happy Clients" : "Industrial Categories"}
                          />
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="sm:col-span-2 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="text-lg font-semibold text-slate-900">Why choose us (6)</div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[1, 2, 3, 4, 5, 6].map((n) => {
                  const w = whyAt(n - 1);
                  return (
                    <div key={n} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="text-sm font-semibold text-slate-900">Card {n}</div>
                      <div className="mt-3 space-y-3">
                        <label className="block">
                          <div className="text-xs font-semibold text-slate-600">Title</div>
                          <input
                            name={`why${n}Title`}
                            defaultValue={w?.title || ""}
                            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-sky-200 focus:ring"
                          />
                        </label>
                        <label className="block">
                          <div className="text-xs font-semibold text-slate-600">Description</div>
                          <input
                            name={`why${n}Desc`}
                            defaultValue={w?.desc || ""}
                            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-sky-200 focus:ring"
                          />
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <button className="mt-6 w-full rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700">
            Save Homepage Content
          </button>
        </form>
      </div>
    </div>
  );
}
