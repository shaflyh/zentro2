"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-900" />
});

export default function SplineBackground() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      {/* {shouldLoad && <Spline scene="https://prod.spline.design/GjZqt5ajJpZwSkLN/scene.splinecode" />} */}
      {/* Peformance Test Spline */}
      {shouldLoad && <Spline scene="https://prod.spline.design/ePCnXvzRZlbURLkt/scene.splinecode" />}
    </div>
  );
}
