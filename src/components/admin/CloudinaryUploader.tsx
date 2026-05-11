"use client";

import { useMemo, useState } from "react";

type UploadResult = {
  secure_url?: string;
  url?: string;
  public_id?: string;
  width?: number;
  height?: number;
  bytes?: number;
  format?: string;
  resource_type?: string;
};

export function CloudinaryUploader({
  defaultFolder = "palcotech",
  onUploaded,
}: {
  defaultFolder?: string;
  onUploaded?: (url: string) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [folder, setFolder] = useState(defaultFolder);
  const [alt, setAlt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string>("");

  const canUpload = useMemo(() => !!file && !loading, [file, loading]);

  async function upload() {
    if (!file) return;
    setError(null);
    setLoading(true);
    setUploadedUrl("");

    try {
      // 1) Get signed params from server
      const sigRes = await fetch("/api/cloudinary/signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder }),
      });

      const sig = await sigRes.json();
      if (!sigRes.ok || !sig?.success) throw new Error(sig?.message || "Failed to get signature");

      // 2) Upload to Cloudinary as resource_type=auto (supports images + common formats)
      const endpoint = `https://api.cloudinary.com/v1_1/${sig.cloudName}/auto/upload`;
      const form = new FormData();
      form.append("file", file);
      form.append("api_key", sig.apiKey);
      form.append("timestamp", String(sig.timestamp));
      form.append("signature", sig.signature);
      form.append("folder", sig.folder);

      const uploadRes = await fetch(endpoint, { method: "POST", body: form });
      const uploaded: UploadResult = await uploadRes.json();
      if (!uploadRes.ok) throw new Error((uploaded as any)?.error?.message || "Upload failed");

      const url = uploaded.secure_url || uploaded.url;
      if (!url) throw new Error("Cloudinary did not return a URL");

      // 3) Save to DB so admin can reuse / browse later
      await fetch("/api/admin/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          publicId: uploaded.public_id,
          folder,
          alt,
          width: uploaded.width,
          height: uploaded.height,
          bytes: uploaded.bytes,
          format: uploaded.format,
          resourceType: uploaded.resource_type,
        }),
      });

      setUploadedUrl(url);
      onUploaded?.(url);
    } catch (e: any) {
      setError(e?.message || "Upload error");
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    if (!uploadedUrl) return;
    try {
      await navigator.clipboard.writeText(uploadedUrl);
    } catch {
      // ignore
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-lg font-semibold text-slate-900">Upload to Cloudinary</div>
      <p className="mt-1 text-sm text-slate-600">
        Upload any common format (uses Cloudinary <span className="font-medium">auto</span> upload).
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <div className="text-sm font-medium text-slate-700">File</div>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
          />
        </label>

        <label className="block">
          <div className="text-sm font-medium text-slate-700">Folder</div>
          <input
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-sky-200 focus:ring"
            placeholder="palcotech/products"
          />
        </label>

        <label className="block">
          <div className="text-sm font-medium text-slate-700">Alt (optional)</div>
          <input
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-sky-200 focus:ring"
            placeholder="e.g., Product image"
          />
        </label>
      </div>

      {error ? (
        <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <button
        type="button"
        disabled={!canUpload}
        onClick={upload}
        className="mt-4 w-full rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {uploadedUrl ? (
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <div className="text-xs font-semibold text-slate-600">Uploaded URL</div>
          <div className="mt-1 break-all text-sm text-slate-900">{uploadedUrl}</div>
          <button
            type="button"
            onClick={copy}
            className="mt-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:border-sky-200 hover:bg-sky-50"
          >
            Copy URL
          </button>
        </div>
      ) : null}
    </div>
  );
}

