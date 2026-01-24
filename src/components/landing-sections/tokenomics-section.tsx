"use client";

import { useState } from "react";
import { TokenCoinIcon, CopyIcon, CheckIcon } from "@/components/icons";
import GlassButton from "@/components/GlassButton";

export default function TokenomicsSection() {
  const [copied, setCopied] = useState(false);
  const contractAddress = "Coming soon...";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = contractAddress;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (fallbackErr) {
        console.error("Failed to copy:", fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  const features = [
    "100% token gated USP",
    "Revenue driven buybacks & burns",
    "80% supply control",
  ];

  return (
    <section
      id="tokenomics"
      className="relative w-full min-h-screen flex items-center justify-center px-32 z-10 bg-white"
    >
      <div className="flex items-center justify-around gap-16 w-full max-w-350">
        {/* Left side - Token Icon */}
        <div className="shrink-0 flex items-center justify-center">
          <div className="relative">
            {/* Glow effect behind coin */}
            <div className="absolute inset-0 blur-3xl opacity-30 bg-linear-to-br from-[#FF6B9D] to-[#E91E8C] rounded-full scale-110" />
            <TokenCoinIcon className="w-87.5 h-87.5 relative z-10" />
          </div>
        </div>

        {/* Right side - Token Info */}
        <div className="flex flex-col max-w-150">
          <h2 className="text-[48px] font-bold font-['Satoshi'] text-black tracking-[11.52px] leading-[1.2] mb-6">
            <span className="text-[#FF6B9D]">$ZFY</span> Token
          </h2>

          <div className="flex flex-col gap-4 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#FF6B9D] shrink-0" />
                <p className="text-black/70 text-[18px] font-medium font-['Satoshi']">
                  {feature}
                </p>
              </div>
            ))}
          </div>

          {/* Contract Address */}
          <div className="flex flex-col gap-3">
            <p className="text-black/50 text-[14px] font-medium font-['Satoshi'] uppercase tracking-wider">
              Contract Address
            </p>
            <GlassButton
              className="px-6 py-4 cursor-pointer hover:border-[#FF6B9D]/30 border-2 border-transparent transition-all duration-200"
              onClick={handleCopy}
            >
              <div className="flex items-center justify-between w-full gap-4">
                <span className="text-black/70 text-[15px] font-mono truncate">
                  {contractAddress}
                </span>
                <div className="shrink-0">
                  {copied ? (
                    <CheckIcon className="w-5 h-5 text-[#FF6B9D]" />
                  ) : (
                    <CopyIcon className="w-5 h-5 text-black/50 hover:text-[#FF6B9D] transition-colors" />
                  )}
                </div>
              </div>
            </GlassButton>
          </div>
        </div>
      </div>
    </section>
  );
}
