"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, Search, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function NavbarClient({
  companyName,
  logoUrl,
  phone,
  categories = [],
}: {
  companyName: string;
  logoUrl?: string;
  phone?: string;
  categories?: { name: string; slug: string }[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nav = useMemo(
    () => [
      { href: "/", label: "Home" },
      { href: "/about", label: "About Us" },
      { href: "/products", label: "Products" },
      { href: "/contact", label: "Contact Us" },
    ],
    [],
  );

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const sp = new URLSearchParams();
    if (query.trim()) sp.set("q", query.trim());
    router.push(`/products?${sp.toString()}`);
    setOpen(false);
  }

  const hasLogo = logoUrl && logoUrl.trim() !== "";

  return (
    <>
      <header 
        className={cn(
          "sticky top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8",
          scrolled ? "py-1 bg-white/90 backdrop-blur-md shadow-sm" : "py-3 bg-white"
        )}
      >
        <div 
          className={cn(
            "mx-auto max-w-7xl flex items-center justify-between gap-3 px-2 transition-all duration-300"
          )}
        >
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-11 w-11 overflow-hidden rounded-xl border border-slate-100 bg-slate-50 transition-transform group-hover:scale-105">
              {hasLogo ? (
                <Image
                  src={logoUrl!}
                  alt={`${companyName} logo`}
                  fill
                  className="object-contain p-1"
                />
              ) : (
                <div className="grid h-full w-full place-items-center bg-primary text-white text-sm font-bold">
                  {companyName.charAt(0)}
                </div>
              )}
            </div>
            <div className="leading-tight">
              <div className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                {companyName}
              </div>
              <div className="text-[11px] uppercase tracking-widest text-slate-500 font-bold">Engineering Solutions</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((i) => {
              const isActive = pathname === i.href;
              if (i.href !== "/products" || !categories?.length) {
                return (
                  <Link 
                    key={i.href} 
                    href={i.href} 
                    className={cn(
                      "px-4 py-2.5 rounded-xl text-base font-bold transition-all hover:bg-primary/5",
                      isActive ? "text-primary" : "text-slate-600 hover:text-primary"
                    )}
                  >
                    {i.label}
                  </Link>
                );
              }

              return (
                <div key={i.href} className="relative group/nav">
                  <Link 
                    href={i.href} 
                    className={cn(
                      "flex items-center gap-1 px-4 py-2.5 rounded-xl text-base font-bold transition-all hover:bg-primary/5",
                      isActive ? "text-primary" : "text-slate-600 hover:text-primary"
                    )}
                  >
                    {i.label}
                    <ChevronDown className="h-4 w-4 transition-transform group-hover/nav:rotate-180" />
                  </Link>
                  <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all duration-300 group-hover/nav:visible group-hover/nav:opacity-100">
                    <div className="w-64 rounded-2xl border border-slate-200/70 bg-white p-2 shadow-2xl">
                      <Link
                        href="/products"
                        className="block rounded-xl px-4 py-2.5 text-base font-bold text-slate-900 hover:bg-primary/5 hover:text-primary"
                      >
                        All Products
                      </Link>
                      <div className="my-2 h-px bg-slate-100" />
                      <div className="max-h-72 overflow-auto custom-scrollbar">
                        {categories.map((c) => (
                          <Link
                            key={c.slug}
                            href={`/products?category=${encodeURIComponent(c.slug)}`}
                            className="block rounded-xl px-4 py-2 text-base text-slate-600 hover:bg-primary/5 hover:text-primary transition-colors font-medium"
                          >
                            {c.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <form
              onSubmit={submitSearch}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 transition-all focus-within:border-primary/50 focus-within:bg-white"
            >
              <Search className="h-4 w-4 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products…"
                className="w-48 bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </form>

            {phone ? (
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-base font-bold text-white shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
              >
                <Phone className="h-4 w-4" />
                Contact
              </a>
            ) : null}
          </div>

          <button
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm hover:bg-primary/5 hover:text-primary lg:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-8 w-8" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-slate-950/40 backdrop-blur-md lg:hidden"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 z-[101] h-full w-[85%] max-w-sm bg-white border-l border-slate-100 shadow-2xl lg:hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                <div className="font-bold text-2xl text-slate-900">Menu</div>
                <button
                  className="rounded-xl bg-slate-50 p-2 text-slate-500 hover:bg-slate-100"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-7 w-7" />
                </button>
              </div>

              <div className="p-6 h-[calc(100%-80px)] overflow-y-auto">
                <form onSubmit={submitSearch} className="flex gap-2 mb-8">
                  <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5">
                    <Search className="h-5 w-5 text-slate-400" />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search products…"
                      className="w-full bg-transparent text-lg text-slate-900 outline-none"
                    />
                  </div>
                </form>

                <nav className="space-y-1">
                  {nav.map((i) => (
                    <div key={i.href}>
                      <Link
                        href={i.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block rounded-xl px-4 py-3 text-[17px] font-bold transition-all",
                          pathname === i.href
                            ? "bg-primary/10 text-primary"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                        )}

                      >
                        {i.label}
                      </Link>

                      {i.href === "/products" && categories?.length ? (
                        <div className="ml-6 mt-1 space-y-1 border-l-2 border-slate-100 pl-4">
                          {categories.map((c) => (
                            <Link
                              key={c.slug}
                              href={`/products?category=${encodeURIComponent(c.slug)}`}
                              onClick={() => setOpen(false)}
                              className="block rounded-xl px-4 py-2 text-[16px] font-bold text-slate-500 hover:text-primary transition-colors"

                            >
                              {c.name}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </nav>

                {phone ? (
                  <a
                    href={`tel:${phone}`}
                    className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-6 py-3.5 text-lg font-bold text-white shadow-xl shadow-primary/20 transition-all active:scale-95"

                  >
                    <Phone className="h-6 w-6" />
                    Call Us Now
                  </a>
                ) : null}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
