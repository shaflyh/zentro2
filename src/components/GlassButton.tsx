"use client";

import { useRef, useEffect, ReactNode } from "react";
import { BorderBeam } from "@/components/BorderBeam";

interface GlassButtonProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  variant?: "default" | "cta";
  onClick?: () => void;
}

export default function GlassButton({
  children,
  className = "",
  contentClassName = "",
  variant = "default",
  onClick,
}: GlassButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const specularRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const specular = specularRef.current;

    if (!button || !specular) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      specular.style.background = `radial-gradient(
        circle at ${x}px ${y}px,
        rgba(255,255,255,0.25) 0%,
        rgba(255,255,255,0.1) 30%,
        rgba(255,255,255,0) 60%
      )`;
    };

    const handleMouseLeave = () => {
      specular.style.background = "none";
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const buttonClass = variant === "cta" ? "glass-button-cta" : "glass-button";

  return (
    <button
      ref={buttonRef}
      className={`${buttonClass} ${className}`}
      onClick={onClick}
    >
      <div className="glass-filter" />
      <div className="glass-overlay" />
      <div ref={specularRef} className="glass-specular" />
      <div className={`glass-content flex items-center ${contentClassName}`}>
        {children}
      </div>
      <BorderBeam
        size={100}
        duration={12}
        borderWidth={2}
        colorFrom="#FF6B9D"
        colorTo="#E91E8C"
      />
    </button>
  );
}

// SVG Filter component to be included once in the page
export function GlassFilter() {
  return (
    <svg className="absolute w-0 h-0" aria-hidden="true">
      <defs>
        <filter id="glass-distortion">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01"
            numOctaves="3"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="7"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
