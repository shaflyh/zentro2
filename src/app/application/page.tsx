"use client";

import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import GlassButton from "@/components/GlassButton";

export default function ApplicationPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative">
      <Link href="/" className="absolute top-6 left-6 z-50">
        <GlassButton className="w-12 h-12" contentClassName="justify-center">
          <ArrowIcon className="w-5 h-5 text-white" />
        </GlassButton>
      </Link>

      <div className="max-w-2xl mx-auto w-full space-y-8">
        <h1 className="text-5xl font-bold text-white font-['Satoshi'] text-center">Apply Now</h1>
        
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 space-y-6">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full bg-white/5 border border-white/20 rounded-xl px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full bg-white/5 border border-white/20 rounded-xl px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full bg-white/5 border border-white/20 rounded-xl px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors"
          />
          <textarea
            placeholder="Tell us about yourself..."
            rows={4}
            className="w-full bg-white/5 border border-white/20 rounded-xl px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors resize-none"
          />
          <GlassButton variant="cta" className="w-full py-4">
            <span className="text-black font-bold">Submit Application</span>
          </GlassButton>
        </div>

        <div className="mt-8">
          <img 
            src="/photo_2026-01-12_04-59-40.jpg" 
            alt="Zentro Card" 
            className="w-full h-auto rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}
