"use client";

import { useState } from "react";
import { CloudinaryUploader } from "./CloudinaryUploader";

export function ProductImageManager({ defaultUrls = "" }: { defaultUrls?: string }) {
  const [urls, setUrls] = useState(defaultUrls);

  const handleUploaded = (url: string) => {
    setUrls((prev) => {
      const current = prev.trim();
      if (!current) return url;
      return `${current}, ${url}`;
    });
  };

  return (
    <div className="space-y-4">
      <label className="block">
        <div className="text-sm font-medium text-slate-700">Image URLs (comma separated)</div>
        <textarea
          name="imageUrls"
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-sky-200 focus:ring"
          placeholder="https://res.cloudinary.com/... , https://..."
          rows={3}
        />
      </label>

      <div className="rounded-2xl border border-dashed border-slate-200 p-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Quick Upload</div>
        <CloudinaryUploader onUploaded={handleUploaded} defaultFolder="palcotech/products" />
      </div>
    </div>
  );
}
