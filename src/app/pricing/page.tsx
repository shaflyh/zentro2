"use client";

import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import GlassButton from "@/components/GlassButton";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative">
      <Link href="/" className="absolute top-6 left-6 z-50">
        <GlassButton className="w-12 h-12" contentClassName="justify-center">
          <ArrowIcon className="w-5 h-5 text-white" />
        </GlassButton>
      </Link>

      <div className="max-w-2xl mx-auto text-center space-y-8">
        <h1 className="text-5xl font-bold text-white font-['Satoshi']">Pricing</h1>
        
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-4">Premium Plan</h2>
          <div className="text-6xl font-bold text-white mb-6">$9.99</div>
          <ul className="space-y-4 text-white/80 text-left mb-8">
            <li className="flex items-center gap-3">
              <span className="text-green-400">✓</span>
              <span>Unlimited transactions</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-green-400">✓</span>
              <span>Premium support</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-green-400">✓</span>
              <span>Advanced analytics</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-green-400">✓</span>
              <span>No hidden fees</span>
            </li>
          </ul>
          <GlassButton variant="cta" className="w-full py-4">
            <span className="text-black font-bold">Get Started</span>
          </GlassButton>
        </div>
      </div>
    </div>
  );
}
