"use client";
import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHoveringHero, setIsHoveringHero] = useState(false);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      if (target.closest("#hero-section")) {
        setIsHoveringHero(true);
      } else {
        setIsHoveringHero(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden lg:block"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        animate={{
          scale: isHoveringHero ? 2.5 : 1,
          rotate: isHoveringHero ? 360 : 0,
        }}
        transition={{
          rotate: { repeat: Infinity, duration: 4, ease: "linear" },
          scale: { type: "spring", stiffness: 300, damping: 20 },
        }}
        className="flex h-8 w-8 items-center justify-center"
      >
        {/* Stylized Screw/Gear Icon */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
        >
          <circle cx="12" cy="12" r="10" strokeDasharray="4 4" />
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
          <path d="M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 22L22 2" strokeWidth="1" opacity="0.5" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
