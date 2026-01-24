"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

type SmoothScrollProps = {
  children: React.ReactNode;
  onScroll?: (scrollY: number) => void;
};

export default function SmoothScroll({
  children,
  onScroll,
}: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.5, // Slower, smoother scroll animation
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.2, // Reduce scroll speed (lower = slower)
      touchMultiplier: 1, // Reduce touch scroll speed too
    });

    lenisRef.current = lenis;

    // Listen to Lenis scroll events and pass scroll position to parent
    lenis.on("scroll", (e: Lenis) => {
      onScroll?.(e.scroll);
    });

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [onScroll]);

  return <>{children}</>;
}
