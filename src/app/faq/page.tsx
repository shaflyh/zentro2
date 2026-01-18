"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import GlassButton from "@/components/GlassButton";

export default function FAQPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is Zentro?",
      answer: "Zentro is a modern financial platform designed to simplify your money management with innovative features and seamless user experience."
    },
    {
      question: "How do I get started?",
      answer: "Simply download our app, create an account, and complete the verification process. You'll be ready to use Zentro in minutes."
    },
    {
      question: "Is Zentro secure?",
      answer: "Yes, we use bank-level encryption and security measures to protect your data and transactions."
    },
    {
      question: "What are the fees?",
      answer: "We offer transparent pricing with no hidden fees. Check our Pricing page for detailed information."
    }
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative">
      <Link href="/" className="absolute top-6 left-6 z-50">
        <GlassButton className="w-12 h-12" contentClassName="justify-center">
          <ArrowIcon className="w-5 h-5 text-white" />
        </GlassButton>
      </Link>

      <div className="max-w-2xl mx-auto w-full space-y-6">
        <h1 className="text-5xl font-bold text-white font-['Satoshi'] text-center mb-12">FAQ</h1>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full p-6 text-left flex justify-between items-center"
              >
                <span className="text-xl font-semibold text-white">{faq.question}</span>
                <span className="text-white text-2xl transition-transform duration-300" style={{ transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  ▼
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: openFaq === index ? '200px' : '0px'
                }}
              >
                <div className="px-6 pb-6 text-white/70">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
