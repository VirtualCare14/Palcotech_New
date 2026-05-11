import Link from "next/link";
import Image from "next/image";
import { connectToDatabase } from "@/lib/db";
import { MediaModel } from "@/models/Media";
import { CloudinaryUploader } from "@/components/admin/CloudinaryUploader";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  await connectToDatabase();
  const items = await MediaModel.find({}).sort({ createdAt: -1 }).limit(40).lean();

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Media Manager</h1>
            <p className="mt-1 text-sm text-slate-600">
              Upload images/files to Cloudinary and reuse their URLs anywhere (products, hero slider, logo).
            </p>
          </div>
          <Link className="text-sm font-semibold text-sky-700 hover:text-sky-800" href="/admin">
            ← Dashboard
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <CloudinaryUploader defaultFolder="palcotech" />
          </div>

          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-lg font-semibold text-slate-900">Recent uploads</div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {items.length ? (
                  items.map((m: any) => (
                    <div key={String(m._id)} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                      <div className="relative aspect-[4/3] bg-slate-50">
                        {m.url ? (
                          <Image src={m.url} alt={m.alt || "Media"} fill className="object-cover" />
                        ) : null}
                      </div>
                      <div className="space-y-2 p-3">
                        <div className="line-clamp-2 text-xs text-slate-600">{m.folder || "palcotech"}</div>
                        <div className="break-all text-xs text-slate-900">{m.url}</div>
                        <a
                          href={m.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-900 hover:border-sky-200 hover:bg-sky-50"
                        >
                          Open
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full rounded-2xl border border-slate-200 bg-slate-50 p-8 text-sm text-slate-600">
                    No uploads yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

