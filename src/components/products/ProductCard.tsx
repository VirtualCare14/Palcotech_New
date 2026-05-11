"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

export interface ProductCardData {
  _id: string;
  name: string;
  slug: string;
  shortDetails: string;
  images: any[];
}

export function ProductCard({ product }: { product: ProductCardData }) {
  // Access the URL correctly from the images array (can be string or object with .url)
  const firstImage = product.images?.[0];
  const imageUrl = typeof firstImage === 'string' 
    ? (firstImage.trim() || "/images/placeholder.svg")
    : (firstImage?.url?.trim() || "/images/placeholder.svg");

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white shadow-sm transition-all hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-50">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Quality Badge */}
        <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-primary backdrop-blur-md shadow-sm">
          <ShieldCheck className="h-3.5 w-3.5" />
          Certified
        </div>

        {/* Floating Action Button */}
        <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Link
            href={`/products/${product.slug}`}
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white shadow-xl shadow-primary/20 hover:bg-primary/90"
          >
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <div className="mb-2">
          <Link
            href={`/products/${product.slug}`}
            className="text-lg font-bold tracking-tight text-slate-900 transition-colors hover:text-primary lg:text-xl"
          >
            {product.name}
          </Link>
        </div>

        <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-slate-500">
          {product.shortDetails || "Premium engineering solution designed for durability and high performance in industrial applications."}
        </p>

        <div className="mt-auto pt-4">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary/90 active:scale-95"
          >
            View Details
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
