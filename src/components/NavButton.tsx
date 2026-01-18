"use client";

import { BorderBeam } from "@/components/BorderBeam";

import { useRef, useEffect } from "react";

interface NavButtonProps {
  href: string;
  label: string;
  isActive?: boolean;
  light?: boolean;
  opacity?: number;
}

export default function NavButton({ href, label, isActive = false, light = false, opacity = 1 }: NavButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const specularRef = useRef<HTMLDivElement>(null);

  const textOpacity = isActive ? opacity : opacity * 0.6;
  const hoverOpacity = opacity * 0.9;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    
    // Calculate scroll position based on section
    let scrollPosition = 0;
    const viewportHeight = window.innerHeight;
    
    // Video container is 600vh (6 screens), sections container is 400vh (4 screens)
    const videoHeight = viewportHeight * 6;
    const sectionsHeight = viewportHeight * 4;
    
    switch(targetId) {
      case 'landing':
        scrollPosition = 0; // Top of page
        break;
      case 'about':
        // About is fully visible from 15-35% of sections
        // Try 5% to catch it earlier
        scrollPosition = videoHeight + (sectionsHeight * 0.035);
        break;
      case 'pricing':
        // Pricing is fully visible from 40-60% of sections
        // Target: 40% into sections
        scrollPosition = videoHeight + (sectionsHeight * 0.12);
        break;
      case 'faq':
        // FAQ is fully visible from 70-90% of sections
        // Target: 70% into sections
        scrollPosition = videoHeight + (sectionsHeight * 0.35);
        break;
      default:
        scrollPosition = 0;
    }
    
    window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
  };

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
        rgba(255,255,255,0.4) 0%,
        rgba(255,255,255,0.15) 40%,
        rgba(255,255,255,0) 70%
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

  return (
    <a
      ref={buttonRef}
      href={href}
      onClick={handleClick}
      className="nav-button group"
    >
      <div className="nav-glass-filter" />
      <div className="nav-glass-overlay" />
      <div ref={specularRef} className="nav-glass-specular" />
      <div className="nav-content">
        <span 
          className="text-xs font-medium font-['Satoshi'] transition-colors duration-500 text-black"
        >
          {label}
        </span>
        {/* Active indicator dot */}
        <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#FF6B9D] transition-all duration-300 ${
          isActive ? "opacity-100 scale-100" : "opacity-0 scale-0 group-hover:opacity-50 group-hover:scale-100"
        }`} />
      </div>
      <BorderBeam size={80} duration={10} borderWidth={1.5} colorFrom="#FF6B9D" colorTo="#E91E8C" delay={Math.random() * 5} />
    </a>
  );
}
