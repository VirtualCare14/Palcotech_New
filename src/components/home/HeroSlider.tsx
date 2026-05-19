"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type HeroSlide = {
  src: string;
  title: string;
  sub: string;
};

export function HeroSlider({
  slides: customSlides,
  onSlideChange,
  isBackground = false,
}: {
  slides?: HeroSlide[];
  onSlideChange?: (index: number) => void;
  isBackground?: boolean;
}) {
  const defaultSlides = useMemo(
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

  const slides = useMemo(() => {
    const s = customSlides && customSlides.length > 0 ? customSlides : defaultSlides;
    return s.filter(slide => slide.src && slide.src.trim() !== "");
  }, [customSlides, defaultSlides]);

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % slides.length);
    }, 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  useEffect(() => {
    onSlideChange?.(index);
  }, [index, onSlideChange]);

  if (slides.length === 0) return null;

  const slide = slides[index];
  const animType = index % 4; // Cycle through 4 different animations

  const variants = {
    enter: ({ direction, type }: { direction: number; type: number }) => {
      switch (type) {
        case 1: // Fade & Zoom In
          return { opacity: 0, scale: 1.1, x: 0, y: 0 };
        case 2: // Slide Vertical
          return { y: direction > 0 ? "100%" : "-100%", x: 0, opacity: 0, scale: 1 };
        case 3: // Simple Crossfade
          return { opacity: 0, x: 0, y: 0, scale: 1 };
        case 0: // Slide Horizontal
        default:
          return { x: direction > 0 ? "100%" : "-100%", y: 0, opacity: 0, scale: 1 };
      }
    },
    center: {
      zIndex: 1,
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
    },
    exit: ({ direction, type }: { direction: number; type: number }) => {
      switch (type) {
        case 1: // Fade & Zoom Out
          return { opacity: 0, scale: 0.95, x: 0, y: 0 };
        case 2: // Slide Vertical
          return { y: direction < 0 ? "100%" : "-100%", x: 0, opacity: 0, scale: 1 };
        case 3: // Simple Crossfade
          return { opacity: 0, x: 0, y: 0, scale: 1 };
        case 0: // Slide Horizontal
        default:
          return { x: direction < 0 ? "100%" : "-100%", y: 0, opacity: 0, scale: 1 };
      }
    },
  };

  return (
    <div className={cn("relative overflow-hidden w-full h-full bg-white", !isBackground && "rounded-2xl")}>
      <div className="relative w-full h-full">
        <AnimatePresence initial={false} custom={{ direction, type: animType }}>
          <motion.div
            key={slide.src}
            custom={{ direction, type: animType }}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.7,
              ease: [0.4, 0.0, 0.2, 1], // Smooth easing
            }}
            className="absolute inset-0 bg-white"
          >
            <Image
              src={slide.src}
              alt="Hero Slider Image"
              fill
              priority
              className="object-contain"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        {slides.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={cn(
                  "transition-all duration-300 rounded-full",
                  i === index ? "h-2 w-10 bg-sky-600" : "h-2 w-2 bg-slate-300 hover:bg-slate-400"
                )}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
