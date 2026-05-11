"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useTransition, useState } from "react";
import { Search, Filter, ChevronDown, ChevronUp, X } from "lucide-react";
import { cn } from "@/lib/utils";

function updateParams(current: URLSearchParams, patch: Record<string, string>) {
  const next = new URLSearchParams(current.toString());
  for (const [k, v] of Object.entries(patch)) {
    if (!v) next.delete(k);
    else next.set(k, v);
  }
  return next;
}

export function FiltersClient({
  categories = [],
}: {
  categories?: { name: string; slug: string }[];
}) {
  const router = useRouter();
  const sp = useSearchParams();
  const [pending, start] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const values = useMemo(
    () => ({
      q: sp.get("q") || "",
      category: sp.get("category") || "",
      certification: sp.get("certification") || "",
      application: sp.get("application") || "",
      businessType: sp.get("businessType") || "",
      type: sp.get("type") || "",
    }),
    [sp],
  );

  function set(patch: Record<string, string>) {
    start(() => {
      const next = updateParams(new URLSearchParams(sp.toString()), patch);
      router.replace(`/products?${next.toString()}`, { scroll: false });
    });
  }

  const activeFiltersCount = Object.values(values).filter(v => v !== "").length;

  return (
    <div className="space-y-4">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:hidden"
      >
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
          <Filter className="h-4 w-4" />
          Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </div>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      <div className={cn(
        "rounded-2xl border border-slate-200/70 bg-white/75 p-5 shadow-sm backdrop-blur transition-all lg:block",
        isOpen ? "block" : "hidden"
      )}>
        <div className="hidden items-center justify-between border-b border-slate-100 pb-4 lg:flex">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wider">
            <Filter className="h-4 w-4" />
            Product Filters
          </div>
          {activeFiltersCount > 0 && (
            <button 
              onClick={() => router.replace("/products")}
              className="text-[10px] font-bold text-sky-600 hover:text-sky-700"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="mt-4 space-y-5 lg:mt-6">
          <label className="block">
            <div className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-500">Quick Search</div>
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 transition-focus focus-within:border-primary/40">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                value={values.q}
                onChange={(e) => set({ q: e.target.value })}
                placeholder="Product name…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
              {values.q && (
                <button onClick={() => set({ q: "" })} className="text-slate-400">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </label>

          {categories.length ? (
            <label className="block">
              <div className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-500">Industry Category</div>
              <select
                value={values.category}
                onChange={(e) => set({ category: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none hover:border-primary/20"
              >
                <option value="">All industries</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
          ) : null}

          {[
            { key: "certification", label: "Certification", placeholder: "ISO, CE, etc." },
            { key: "application", label: "Application", placeholder: "Industrial, Marine, etc." },
            { key: "businessType", label: "Business Type", placeholder: "Manufacturer, Supplier..." },
            { key: "type", label: "Product Type", placeholder: "Manual, Automatic..." },
          ].map((f) => (
            <label className="block" key={f.key}>
              <div className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-500">{f.label}</div>
              <div className="relative group">
                <input
                  value={(values as any)[f.key]}
                  onChange={(e) => set({ [f.key]: e.target.value } as any)}
                  placeholder={f.placeholder}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 outline-none hover:border-primary/20 placeholder:text-slate-400"
                />
                {(values as any)[f.key] && (
                  <button 
                    onClick={() => set({ [f.key]: "" } as any)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </label>
          ))}

          <button
            type="button"
            disabled={pending || activeFiltersCount === 0}
            onClick={() =>
              start(() => {
                router.replace("/products");
                setIsOpen(false);
              })
            }
            className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-slate-800 disabled:opacity-30 disabled:bg-slate-100 disabled:text-slate-400"
          >
            {pending ? "Applying..." : "Reset All Filters"}
          </button>
        </div>
      </div>
    </div>
  );
}
