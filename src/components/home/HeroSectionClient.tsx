"use client";

import { useState } from "react";
import Link from "next/link";
import { BadgeCheck, ShieldCheck, Truck, Headphones, ArrowRight, CheckCircle2 } from "lucide-react";
import { HeroSlider, type HeroSlide } from "./HeroSlider";
import { motion } from "framer-motion";

interface HeroSectionClientProps {
  heroHeading: string;
  heroSubheadingHtml: string;
  heroCtaText: string;
  heroCtaUrl: string;
  heroSlides: HeroSlide[];
}

export function HeroSectionClient({
  heroHeading,
  heroSubheadingHtml,
  heroCtaText,
  heroCtaUrl,
  heroSlides,
}: HeroSectionClientProps) {

  const features = [
    { icon: ShieldCheck, title: "ISO Certified", desc: "Standardized quality", color: "bg-blue-500/10 text-blue-600" },
    { icon: Truck, title: "Fast Delivery", desc: "Pan-India support", color: "bg-amber-500/10 text-amber-600" },
    { icon: Headphones, title: "Expert Support", desc: "24/7 technical help", color: "bg-emerald-500/10 text-emerald-600" },
    { icon: CheckCircle2, title: "Genuine Parts", desc: "100% original", color: "bg-purple-500/10 text-purple-600" },
  ];

  return (
    <section 
      id="hero-section"
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-white"
    >
      {/* Background Slider */}
      <div className="absolute inset-0 z-0">
        <HeroSlider slides={heroSlides} isBackground />

        
        {/* Updated Overlay: Dark gradient from the left only */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-slate-950/85 via-slate-900/40 to-transparent lg:from-slate-950/80" />
      </div>

      <div className="relative z-10 w-full pt-20 pb-12 sm:pt-24 lg:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* Top Badge */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.25em] text-white backdrop-blur-md mb-6 sm:px-4 sm:py-2 sm:text-[10px] sm:mb-8"
            >
              <BadgeCheck className="h-3.5 w-3.5 text-accent sm:h-4 sm:w-4" />
              Trusted Industrial Partner
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl mb-6 leading-[1.1] sm:mb-8"
            >
              {heroHeading}
            </motion.h1>

            {/* Subheading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose max-w-2xl text-base leading-relaxed text-slate-200 mb-8 font-medium sm:text-lg sm:mb-10 lg:text-xl"
              dangerouslySetInnerHTML={{ __html: heroSubheadingHtml }}
            />

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-3 sm:flex-row sm:gap-4 mb-12 sm:mb-16"
            >
              <Link
                href={heroCtaUrl}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-primary/20 transition hover:scale-105 active:scale-95 sm:rounded-2xl sm:px-10 sm:py-4"
              >
                {heroCtaText}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20 active:scale-95 sm:rounded-2xl sm:px-8 sm:py-4"
              >
                Explore Catalog
              </Link>
            </motion.div>

            {/* Features Row - Fully Responsive */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mt-8 border-t border-white/10 pt-8 sm:mt-12 sm:pt-10">
              {features.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                  className="group relative flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 shadow-sm backdrop-blur-sm transition-all hover:bg-white/10 sm:gap-4 sm:rounded-2xl sm:p-4"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white sm:h-10 sm:w-10 sm:rounded-xl">
                    <item.icon className="h-4 w-4 text-accent sm:h-5 sm:w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[11px] font-bold text-white uppercase tracking-wider truncate sm:text-xs">{item.title}</h3>
                    <p className="text-[9px] text-slate-300 font-bold whitespace-nowrap truncate sm:text-[10px]">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
