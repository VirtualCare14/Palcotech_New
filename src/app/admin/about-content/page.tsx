import Link from "next/link";
import { getAboutContent } from "@/lib/data";
import { updateAboutContent } from "@/actions/aboutContent";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

export const dynamic = "force-dynamic";

export default async function AdminAboutContentPage() {
  const content: any = await getAboutContent();
  const banner = content?.banner || {};
  const intro = content?.intro || {};
  const missionVision = content?.missionVision || {};
  const body = content?.body || {};

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">About Page Content</h1>
            <p className="mt-1 text-sm text-slate-600">
              Update the About page sections (banner, intro, mission/vision, body).
            </p>
          </div>
          <Link className="text-sm font-semibold text-sky-700 hover:text-sky-800" href="/admin">
            ← Dashboard
          </Link>
        </div>

        <form action={updateAboutContent} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-2">
                <div className="text-sm font-medium text-slate-700">Banner title</div>
                <input
                  name="bannerTitle"
                  defaultValue={banner?.title || ""}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-sky-200 focus:ring"
                />
              </label>
              <label className="block sm:col-span-2">
                <div className="text-sm font-medium text-slate-700">Banner subtitle</div>
                <input
                  name="bannerSubtitle"
                  defaultValue={banner?.subtitle || ""}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-sky-200 focus:ring"
                />
              </label>
            </div>

            <div>
              <div className="text-sm font-medium text-slate-700">Our approach (title)</div>
              <input
                name="approachTitle"
                defaultValue={body?.title || ""}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-sky-200 focus:ring"
                placeholder="Our Approach"
              />
            </div>

            <div>
              <div className="text-sm font-medium text-slate-700">Our approach (rich text)</div>
              <div className="mt-1">
                <RichTextEditor
                  name="approachHtml"
                  defaultValue={body?.html || body?.text || ""}
                  placeholder="Write approach content…"
                  minHeight={140}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-lg font-semibold text-slate-900">Top cards</div>
              <p className="mt-1 text-sm text-slate-600">Order on website: Who we are → Mission → Vision</p>

              <div className="mt-4 grid gap-4">
                <div>
                  <div className="text-sm font-medium text-slate-700">Who we are (rich text)</div>
                  <div className="mt-1">
                    <RichTextEditor
                      name="whoWeAreHtml"
                      defaultValue={intro?.html || intro?.text || ""}
                      placeholder="Write who we are…"
                    />
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  <div>
                    <div className="text-sm font-medium text-slate-700">Mission (rich text)</div>
                    <div className="mt-1">
                      <RichTextEditor
                        name="missionHtml"
                        defaultValue={missionVision?.missionHtml || missionVision?.mission || ""}
                        placeholder="Write mission…"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-700">Vision (rich text)</div>
                    <div className="mt-1">
                      <RichTextEditor
                        name="visionHtml"
                        defaultValue={missionVision?.visionHtml || missionVision?.vision || ""}
                        placeholder="Write vision…"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button className="mt-6 w-full rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700">
            Save About Content
          </button>
        </form>
      </div>
    </div>
  );
}
