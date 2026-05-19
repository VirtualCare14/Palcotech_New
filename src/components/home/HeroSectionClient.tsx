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
    <section id="hero-section" className="w-full bg-white flex flex-col">
      {/* Full Width Slider (Responsive aspect ratio on mobile to eliminate vertical whitespace) */}
      <div className="w-full aspect-[16/9] sm:aspect-auto sm:h-[50vh] sm:min-h-[400px] relative z-0 bg-white">
        <HeroSlider slides={slides} onSlideChange={onSlideChange} isBackground={true} />
      </div>

      {/* Text Content Below Slider */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 py-12 sm:py-16 text-center">
        <motion.div
          key={active} // Re-animate text when active slide changes
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 sm:space-y-6 flex flex-col items-center"
        >
          <div className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-sky-800 sm:px-4 sm:py-2 sm:text-[10px] sm:tracking-[0.25em]">
            {heroTagline || "Trusted Industrial Partner"}
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {(current?.title || heroHeading || "Palcotech Engineering").trim()}
          </h1>

          {current?.sub?.trim() ? (
            <p className="text-base leading-relaxed text-slate-600 sm:text-lg sm:leading-8 max-w-2xl mx-auto">
              {current.sub}
            </p>
          ) : null}

          <div className="pt-6">
            <Link
              href={heroCtaUrl}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-600/30 transition-all hover:bg-sky-500 hover:scale-105 hover:shadow-sky-600/40"
            >
              {heroCtaText}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
