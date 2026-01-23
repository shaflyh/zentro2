"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-900" />,
});

type SplineCardsProps = {
  isVisible?: boolean;
};

export default function SplineCards({ isVisible = true }: SplineCardsProps) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Don't render Spline when not visible (saves performance)
  const shouldRenderSpline = shouldLoad && isVisible;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      {shouldRenderSpline && (
        <Spline scene="https://prod.spline.design/XktkHipP1RPxYBA8/scene.splinecode" />
      )}
    </div>
  );
}
