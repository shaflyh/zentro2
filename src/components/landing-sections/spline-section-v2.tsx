"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-white animate-pulse" />,
});

export default function SplineSection() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[200vh] bg-white">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="w-full h-full">
          {isInView && (
            <Spline scene="https://prod.spline.design/ocFNpAmFv5FZ9vcB/scene.splinecode" />
          )}
        </div>
      </div>
    </section>
  );
}
