"use client";

import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import GlassButton from "@/components/GlassButton";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative">
      <Link href="/" className="absolute top-6 left-6 z-50">
        <GlassButton className="w-12 h-12" contentClassName="justify-center">
          <ArrowIcon className="w-5 h-5 text-white" />
        </GlassButton>
      </Link>

      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h1 className="text-5xl font-bold text-white font-['Satoshi']">About Zentro</h1>
        <p className="text-xl text-white/80 leading-relaxed">
          Zentro is revolutionizing the way you manage your finances with cutting-edge technology and seamless user experience.
        </p>
        <p className="text-lg text-white/70 leading-relaxed">
          Our mission is to provide innovative financial solutions that empower individuals and businesses to achieve their goals with confidence and ease.
        </p>
      </div>
    </div>
  );
}
