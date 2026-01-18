"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroVideoProps {
  containerRef?: React.RefObject<HTMLDivElement>;
}

export default function HeroVideo({ containerRef }: HeroVideoProps) {
  const scrollVideoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // GSAP ScrollTrigger video scrubbing
  useEffect(() => {
    const video = scrollVideoRef.current;
    if (!video || !containerRef?.current) return;

    const fps = 30;
    const frameDuration = 1000 / fps; // ~33ms per frame
    let lastFrameTime = 0;

    // Wait for video metadata to load
    const handleLoadedMetadata = () => {
      // Pause the video initially
      video.pause();

      const totalFrames = Math.floor(video.duration * fps);

      // Create ScrollTrigger for video scrubbing
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0,
        onUpdate: (self) => {
          const now = Date.now();
          
          // Throttle to 30fps
          if (now - lastFrameTime < frameDuration) {
            return;
          }
          
          lastFrameTime = now;
          
          // Calculate target frame based on scroll progress
          const targetFrame = Math.floor(self.progress * totalFrames);
          const targetTime = (targetFrame / fps);
          
          // Jump directly to the frame (no interpolation)
          if (Math.abs(video.currentTime - targetTime) > 0.001) {
            video.currentTime = targetTime;
          }
        }
      });
    };

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    } else {
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [containerRef, isMobile]);

  return (
    <div className="absolute inset-0 w-full h-full bg-black">
      {/* Video Section */}
      <video
        ref={scrollVideoRef}
        src={isMobile ? "/video-mobile.mp4" : "/final.mp4"}
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
