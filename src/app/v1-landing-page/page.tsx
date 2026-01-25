"use client";

import { useState, useEffect } from "react";
import Landing from "@/components/landing";
import MobileLanding from "@/components/mobile-landing";

export default function Home() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      // Tablet and mobile: up to 1024px (includes most tablets in portrait and landscape)
      setIsMobile(window.innerWidth <= 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Don't render anything until we know the device type
  if (isMobile === null) {
    return null;
  }

  return isMobile ? <MobileLanding /> : <Landing />;
}
