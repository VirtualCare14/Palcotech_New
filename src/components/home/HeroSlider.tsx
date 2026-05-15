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
    // Filter out slides with empty src
    return s.filter(slide => slide.src && slide.src.trim() !== "");
  }, [customSlides, defaultSlides]);

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  useEffect(() => {
    onSlideChange?.(index);
  }, [index, onSlideChange]);

  if (slides.length === 0) return null;

  const slide = slides[index];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0
    })
  };

  return (
    <div className={cn("relative overflow-hidden w-full h-full", !isBackground && "rounded-[2.1rem]")}>
      <div className={cn("relative w-full h-full", !isBackground && "aspect-[4/3] min-h-[200px] sm:aspect-[16/9] sm:min-h-[400px]")}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={slide.src}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute inset-0"
          >
            <Image
              src={slide.src}
              alt="Engineering Slider"
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots Overlay */}
        {slides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/20 px-3 py-2 backdrop-blur-md z-10 sm:bottom-10 sm:gap-3 sm:px-4 sm:py-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={cn(
                  "transition-all duration-300 rounded-full",
                  i === index ? "h-2 w-8 bg-white sm:h-1.5 sm:w-8" : "h-2 w-2 bg-white/40 hover:bg-white/60 sm:h-1.5 sm:w-1.5"
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
