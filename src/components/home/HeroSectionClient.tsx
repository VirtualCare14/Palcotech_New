"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroSlider, type HeroSlide } from "./HeroSlider";
import { motion } from "framer-motion";

interface HeroSectionClientProps {
  heroHeading: string;
  heroTagline: string;
  heroCtaText: string;
  heroCtaUrl: string;
  heroSlides: HeroSlide[];
}

export function HeroSectionClient({
  heroHeading,
  heroTagline,
  heroCtaText,
  heroCtaUrl,
  heroSlides,
}: HeroSectionClientProps) {
  const [active, setActive] = useState(0);

  const fallbackSlides = useMemo<HeroSlide[]>(
    () => [
      {
        src: "/images/slider/slide-1.svg",
        title: "Premium Engineering Products",
        sub: "Quality-focused manufacturing and dependable delivery.",
      },
      {
        src: "/images/slider/slide-2.svg",
        title: "Reliable Industrial Solutions",
        sub: "Built for performance, safety and long life.",
      },
      {
        src: "/images/slider/slide-3.svg",
        title: "Fast Support & Service",
        sub: "Quick responses and customer-first approach.",
      },
      {
        src: "/images/slider/slide-4.svg",
        title: "Pan-India Supply",
        sub: "Trusted products for multiple industries and cities.",
      },
    ],
    [],
  );

  const slides = useMemo(
    () => (heroSlides?.length ? heroSlides : fallbackSlides),
    [heroSlides, fallbackSlides],
  );

  const current = slides[Math.min(active, Math.max(0, slides.length - 1))];

  const onSlideChange = useCallback((i: number) => {
    setActive(i);
  }, []);

  return (
    <section id="hero-section" className="relative overflow-hidden">
      {/* Light blue theme background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-cyan-50" />
        <div className="absolute -left-28 top-14 h-72 w-72 rounded-full bg-sky-300/25 blur-3xl" />
        <div className="absolute -right-28 bottom-10 h-80 w-80 rounded-full bg-cyan-300/25 blur-3xl" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.25]" aria-hidden="true">
          <defs>
            <pattern id="heroDots" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.25" fill="rgba(2, 132, 199, 0.22)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroDots)" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="grid items-center gap-6 lg:gap-10 lg:grid-cols-12">
          {/* Content first on mobile, right side on desktop */}
          <div className="order-1 lg:order-2 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 sm:space-y-5"
            >
              <div className="inline-flex items-center rounded-full border border-sky-200 bg-white/70 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-sky-800 backdrop-blur sm:px-4 sm:py-2 sm:text-[10px] sm:tracking-[0.25em]">
                {heroTagline || "Trusted Industrial Partner"}
              </div>

              <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                <span className="bg-gradient-to-r from-sky-800 to-cyan-700 bg-clip-text text-transparent">
                  {(current?.title || heroHeading || "Palcotech Engineering").trim()}
                </span>
              </h1>

              {current?.sub?.trim() ? (
                <p className="text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                  {current.sub}
                </p>
              ) : null}

              <div className="pt-2">
                <Link
                  href={heroCtaUrl}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition hover:bg-blue-800 sm:w-auto sm:px-6 sm:py-3"
                >
                  {heroCtaText}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Slider frame (left side on desktop) */}
          <div className="order-2 lg:order-1 lg:col-span-7">
            <div className="relative">
              <div className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-sky-500/25 via-cyan-500/15 to-indigo-500/15 blur-2xl" />
              <div className="relative rounded-[2.25rem] bg-gradient-to-br from-sky-300/35 via-white/40 to-cyan-300/25 p-px shadow-xl">
                <div className="rounded-[2.25rem] border border-white/70 bg-white/70 p-2 backdrop-blur sm:p-3">
                  <HeroSlider slides={slides} onSlideChange={onSlideChange} isBackground={false} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
