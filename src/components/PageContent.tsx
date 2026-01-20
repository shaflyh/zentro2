"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import dynamic from 'next/dynamic';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { XIcon, TelegramIcon, ThreadsIcon, ArrowIcon } from "@/components/icons";
import GlassButton, { GlassFilter } from "@/components/GlassButton";
import NavButton from "@/components/NavButton";
import { BorderOverlay } from "@/components/BorderOverlay";
import SplineBackground from "@/components/SplineBackground";
import { BorderBeam } from "@/components/BorderBeam";
import SmoothScroll from "@/components/SmoothScroll";

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#f5f5f5] animate-pulse" />
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PageContent() {
  const [introComplete, setIntroComplete] = useState(false);
  const [landingOpacity, setLandingOpacity] = useState(1);
  const [splineOpacity, setSplineOpacity] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  
  const splineContainerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  // Always scroll to top on mount/refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Intro animation
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIntroComplete(true);
      }
    });

    // Animate black rectangle sliding in to fill screen
    tl.fromTo('.intro-rect', 
      { x: '-100%' },
      { x: 0, duration: 1, ease: 'power2.inOut' }
    );

    // Animate letters sliding up with stagger
    tl.fromTo('.intro-letter',
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' },
      '-=0.4'
    );

    // Hold for a moment
    tl.to({}, { duration: 0.6 });

    // Fade out text
    tl.to('.intro-letter',
      { opacity: 0, duration: 0.4 }
    );

    // Fade entire intro screen to reveal landing section
    tl.to('.intro-screen',
      { opacity: 0, duration: 1.2, ease: 'power2.inOut' },
      '-=0.2'
    );

    // Animate page elements in during the fade
    tl.fromTo('.page-element',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
      '-=1.0'
    );

    return () => {
      tl.kill();
    };
  }, []);

  // Fade transitions: Landing -> Black -> Spline
  useEffect(() => {
    // Use requestAnimationFrame for smooth updates synced with Lenis
    let rafId: number;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const landingHeight = window.innerHeight;
      
      // Keep landing at full opacity for first 3 viewport heights (animation plays fully)
      // Then fade out during next viewport height
      const landingStayDuration = landingHeight * 0.4; // Stay visible for 3vh
      const landingFadeDuration = landingHeight * 0.1; // Fade over 1vh
      const landingFade = Math.max(0, 1 - Math.max(0, (scrollY - landingStayDuration) / landingFadeDuration));
      setLandingOpacity(landingFade);
      
      // Spline starts fading in after landing begins fading
      const splineFadeStart = landingStayDuration;
      const splineFade = Math.min(1, Math.max(0, (scrollY - splineFadeStart) / landingFadeDuration));
      setSplineOpacity(splineFade);
      
      rafId = requestAnimationFrame(handleScroll);
    };

    rafId = requestAnimationFrame(handleScroll);
    
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // GSAP transitions for about section
  useEffect(() => {
    if (!aboutRef.current) return;

    // About section slide up transition
    gsap.fromTo(aboutRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top bottom-=100",
          end: "top center",
          scrub: 1
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <SmoothScroll>
      <>
        {/* Intro Animation Screen */}
        {!introComplete && (
        <div className="intro-screen fixed inset-0 z-[100] bg-white flex items-center justify-center overflow-hidden">
          {/* White rectangle that fills then unfills */}
          <div className="intro-rect absolute inset-0 bg-white" />
          
          {/* Centered logo text */}
          <div className="flex items-center justify-center gap-1 relative z-10">
            {'Zentro'.split('').map((letter, index) => (
              <span
                key={index}
                className="intro-letter text-black text-[80px] font-bold font-['Satoshi'] tracking-[19.2px]"
                style={{ display: 'inline-block' }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Buffer/spacer section before video scroll starts */}
      <div className="h-[100vh] relative bg-[#f5f5f5]" />

      {/* Landing Section - fixed overlay that fades out on scroll */}
      <section 
        id="landing"
        className="fixed inset-0 w-full h-full min-h-screen z-20 transition-opacity duration-300 overflow-hidden"
        style={{ 
          opacity: landingOpacity, 
          pointerEvents: landingOpacity < 0.1 ? 'none' : 'auto'
        }}
      >
        {/* Spline Background */}
        <SplineBackground />
        
        {/* Border Overlay - only visible on landing section */}
        <img 
          src="/border.svg" 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover opacity-100 pointer-events-none z-10"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(0, 0, 0, 0.5))',
            opacity: 1
          }}
        />
        
        <div className="page-element absolute left-[60px] top-[50px] h-[44px] flex items-center z-20">
          <span className="text-black text-3xl font-bold font-['Satoshi'] tracking-[7.2px]">Zentro</span>
        </div>

        {/* Nav buttons disabled - hidden */}
        {/* <div className="page-element absolute left-1/2 -translate-x-1/2 top-[50px] flex items-center gap-2 z-[100] pointer-events-auto">
          <NavButton href="#landing" label="home" isActive={true} light={true} opacity={1} />
          <NavButton href="#about" label="about" light={true} opacity={1} />
          <NavButton href="#pricing" label="pricing" light={true} opacity={1} />
          <NavButton href="#faq" label="FAQ" light={true} opacity={1} />
        </div> */}

        <div className="page-element absolute right-[80px] top-[50px] z-20">
          <GlassButton className="px-6 py-3" contentClassName="gap-2" onClick={() => setShowSignInModal(true)}>
            <span className="text-black text-[15px] font-semibold font-['Satoshi']">Log in</span>
          </GlassButton>
        </div>

        <div className="page-element absolute left-[80px] bottom-[60px] max-w-[600px] flex flex-col justify-start items-start gap-6 z-20">
          <div className="flex flex-col gap-1">
            <h1 className="gradient-text-line1 text-[48px] font-bold font-['Satoshi'] tracking-[11.52px] leading-[0.93] animate-initial animate-slide-up delay-400 text-black">
              Spend privately.
            </h1>
            <h1 className="gradient-text-line1 text-[48px] font-bold font-['Satoshi'] tracking-[11.52px] leading-[0.93] animate-initial animate-slide-up delay-500 text-black">
              Member owned.
            </h1>
            <h1 className="gradient-text-line1 text-[48px] font-bold font-['Satoshi'] tracking-[11.52px] leading-[0.93] animate-initial animate-slide-up delay-600 text-black">
              Invite only.
            </h1>
          </div>
          <p className="text-black text-[15px] font-bold font-['Satoshi'] leading-[1.6] max-w-[600px] animate-initial animate-slide-up delay-700">
            An invite-only card built for private spending. Member-owned, independent, and designed for those who value control, discretion, and exclusivity.
          </p>
        </div>

        <div className="page-element absolute right-[120px] bottom-[40px] flex justify-end items-center gap-4 animate-initial animate-slide-up delay-800 z-20">
          <div className="relative rounded-[48px] overflow-hidden">
            <BorderBeam size={200} duration={15} colorFrom="#CBC4CC" colorTo="transparent" borderWidth={2} />
            <input
              type="text"
              placeholder="Enter code"
              className="relative z-10 px-8 py-4 bg-black/10 text-black placeholder-black/50 focus:outline-none font-['Satoshi'] text-[18px] font-medium transition-all duration-200"
            />
          </div>
          <GlassButton variant="cta" className="w-16 h-16 hover:translate-x-1 transition-transform duration-200" contentClassName="justify-center">
            <ArrowIcon className="w-6 h-6 text-black rotate-180" />
          </GlassButton>
        </div>

        <div className="page-element absolute right-[120px] bottom-[-80px] animate-initial animate-slide-up delay-900 z-20">
          <button className="relative px-12 py-4 rounded-full font-['Satoshi'] font-semibold text-lg text-white overflow-hidden group transition-all duration-300 hover:shadow-xl hover:scale-105">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B9D] via-[#E91E8C] to-[#FF6B9D] rounded-full" />
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#E91E8C] via-[#FF6B9D] to-[#E91E8C] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Text */}
            <span className="relative z-10">Explore the platform</span>
          </button>
        </div>

        {/* Bottom gradient transition to spline */}
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-b from-transparent via-gray-100 to-gray-300 pointer-events-none z-10" />
      </section>

      {/* Buffer/spacer section before spline scroll starts */}
      <div className="h-[100vh] relative bg-[#f5f5f5]" />

      {/* Spline Animation Section - fixed position that starts after landing fades */}
      <div ref={splineContainerRef} className="h-[400vh] relative bg-[#f5f5f5]">
        <div className="sticky top-0 w-full h-screen transition-opacity duration-700" style={{ opacity: splineOpacity }}>
          <Spline scene="https://prod.spline.design/bfNQTgi7LV97OIwz/scene.splinecode" />
        </div>
      </div>

      {/* Content Sections - normal flow layout with background overlay on spline */}
      <div ref={aboutRef} className="relative w-full z-10">
        <GlassFilter />

        {/* About Section */}
        <section 
          id="about" 
          className="relative w-full min-h-screen flex flex-col items-center justify-center px-20 z-10 bg-[#f5f5f5]"
        >
          <div className="max-w-[1400px] w-full">
            <div className="flex flex-col items-center text-center max-w-[900px] mx-auto mb-16">
              <h2 className="text-[48px] font-bold font-['Satoshi'] text-black tracking-[11.52px] leading-[0.93] mb-6">
                About <span className="text-[#FF6B9D]">Zentro</span>
              </h2>
              <h3 className="text-[32px] font-bold font-['Satoshi'] text-black mb-4">
                Banking for the unknown
              </h3>
              <p className="text-black text-[18px] font-medium font-['Satoshi'] leading-[1.5] mb-4">
                You don't compromise when earning, so don't compromise when spending
              </p>
              <p className="text-black/70 text-[15px] font-normal font-['Satoshi'] leading-[1.6] max-w-[700px]">
                Zentro Finance provides zero-knowledge financial infrastructure for those who value discretion.
              </p>
            </div>

            <div className="flex justify-center gap-12 max-w-[1000px] mx-auto">
              <div className="flex flex-col gap-3 text-center">
                <h3 className="text-xl font-semibold text-[#FF6B9D] font-['Satoshi']">Privacy First</h3>
                <p className="text-black/60 text-sm font-['Satoshi'] leading-relaxed">
                  Your transactions, your business. Built for discretion.
                </p>
              </div>
              <div className="flex flex-col gap-3 text-center">
                <h3 className="text-xl font-semibold text-[#FF6B9D] font-['Satoshi']">Member Owned</h3>
                <p className="text-black/60 text-sm font-['Satoshi'] leading-relaxed">
                  Independent and member-governed. No corporate overlords.
                </p>
              </div>
              <div className="flex flex-col gap-3 text-center">
                <h3 className="text-xl font-semibold text-[#FF6B9D] font-['Satoshi']">Invite Only</h3>
                <p className="text-black/60 text-sm font-['Satoshi'] leading-relaxed">
                  Membership is limited. Join a select group.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section 
          id="faq" 
          className="relative w-full min-h-screen flex items-center justify-center px-20 z-10 bg-white"
        >
          <div className="flex items-start justify-between gap-16 w-full max-w-[1400px]">
            <div className="flex flex-col gap-4 max-w-[700px] w-full">
              <div className="flex flex-col gap-2">
                <GlassButton 
                  className="px-8 py-6 hover:border-[#FF6B9D]/30 border-2 border-transparent transition-all duration-200 cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}
                >
                  <div className="flex items-center justify-between w-full">
                    <h3 className="text-lg font-semibold text-[#FF6B9D] font-['Satoshi']">
                      How does the invite system work?
                    </h3>
                    <span className="text-[#FF6B9D] text-2xl">{openFaq === 0 ? '−' : '+'}</span>
                  </div>
                </GlassButton>
                {openFaq === 0 && (
                  <GlassButton className="px-8 py-6">
                    <p className="text-black/60 text-sm font-['Satoshi'] leading-relaxed">
                      Current members invite new applicants through our verification process. Each invitation is carefully reviewed to ensure alignment with Zentro's values of privacy and discretion.
                    </p>
                  </GlassButton>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <GlassButton 
                  className="px-8 py-6 hover:border-[#FF6B9D]/30 border-2 border-transparent transition-all duration-200 cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                >
                  <div className="flex items-center justify-between w-full">
                    <h3 className="text-lg font-semibold text-[#FF6B9D] font-['Satoshi']">
                      What makes Zentro different?
                    </h3>
                    <span className="text-[#FF6B9D] text-2xl">{openFaq === 1 ? '−' : '+'}</span>
                  </div>
                </GlassButton>
                {openFaq === 1 && (
                  <GlassButton className="px-8 py-6">
                    <p className="text-black/60 text-sm font-['Satoshi'] leading-relaxed">
                      Zentro is privacy-first, member-owned, and exclusively invite-only. We provide zero-knowledge financial infrastructure without corporate oversight or compromises.
                    </p>
                  </GlassButton>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <GlassButton 
                  className="px-8 py-6 hover:border-[#FF6B9D]/30 border-2 border-transparent transition-all duration-200 cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
                >
                  <div className="flex items-center justify-between w-full">
                    <h3 className="text-lg font-semibold text-[#FF6B9D] font-['Satoshi']">
                      How is my privacy protected?
                    </h3>
                    <span className="text-[#FF6B9D] text-2xl">{openFaq === 2 ? '−' : '+'}</span>
                  </div>
                </GlassButton>
                {openFaq === 2 && (
                  <GlassButton className="px-8 py-6">
                    <p className="text-black/60 text-sm font-['Satoshi'] leading-relaxed">
                      Your transactions remain private through zero-knowledge proofs and encrypted protocols. We don't track, sell, or share your financial data with anyone.
                    </p>
                  </GlassButton>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <GlassButton 
                  className="px-8 py-6 hover:border-[#FF6B9D]/30 border-2 border-transparent transition-all duration-200 cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
                >
                  <div className="flex items-center justify-between w-full">
                    <h3 className="text-lg font-semibold text-[#FF6B9D] font-['Satoshi']">
                      What are the membership requirements?
                    </h3>
                    <span className="text-[#FF6B9D] text-2xl">{openFaq === 3 ? '−' : '+'}</span>
                  </div>
                </GlassButton>
                {openFaq === 3 && (
                  <GlassButton className="px-8 py-6">
                    <p className="text-black/60 text-sm font-['Satoshi'] leading-relaxed">
                      Membership requires an invitation from an existing member and completion of our verification process. We carefully curate our community to maintain exclusivity and shared values.
                    </p>
                  </GlassButton>
                )}
              </div>
            </div>

            <div className="flex flex-col max-w-[500px] flex-shrink-0">
              <h2 className="text-[48px] font-bold font-['Satoshi'] text-black tracking-[11.52px] leading-[1.3] mb-6">
                Frequently Asked <span className="text-[#FF6B9D]">Questions</span>
              </h2>
              <p className="text-black/70 text-[16px] font-normal font-['Satoshi'] leading-relaxed">
                Everything you need to know about Zentro membership and how it works.
              </p>
            </div>
          </div>
        </section>

        {/* Application Section */}
        <section 
          id="application" 
          className="relative w-full min-h-screen flex items-center justify-center px-20 z-10 bg-[#f5f5f5]"
        >
          <div className="flex items-center justify-between gap-16 w-full max-w-[1400px]">
            <div className="flex flex-col max-w-[500px]">
              <h2 className="text-[48px] font-bold font-['Satoshi'] text-black tracking-[11.52px] leading-[1.2] mb-6">
                Ready to join the <span className="text-[#FF6B9D]">exclusive circle?</span>
              </h2>
              <p className="text-black/70 text-[16px] font-normal font-['Satoshi'] leading-relaxed mb-8">
                Apply now for your Zentro card. Limited memberships available for those who value privacy, control, and exclusivity.
              </p>

              <div className="flex items-center gap-4">
                <GlassButton variant="cta" className="px-10 py-5" contentClassName="gap-3" onClick={() => setShowInviteModal(true)}>
                  <span className="text-black text-[18px] font-medium font-['Satoshi']">
                    START YOUR APPLICATION NOW...
                  </span>
                </GlassButton>
                <GlassButton variant="cta" className="w-16 h-16" contentClassName="justify-center" onClick={() => setShowInviteModal(true)}>
                  <ArrowIcon className="w-6 h-6 text-black rotate-180" />
                </GlassButton>
              </div>
            </div>

            <div className="w-[700px] h-[500px] relative rounded-2xl overflow-hidden flex-shrink-0">
              <img 
                src="/cardimage.png" 
                alt="Zentro Card" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Invite Code Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowInviteModal(false)}
          />
          
          <div className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <button 
              onClick={() => setShowInviteModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="space-y-6">
              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-bold text-gray-900 font-['Satoshi']">Request Access</h2>
                <p className="text-gray-600 text-sm">Enter your invite or referral code to continue</p>
              </div>

              <div className="space-y-4">
                <div className="relative rounded-[24px] overflow-hidden">
                  <BorderBeam size={200} duration={15} colorFrom="#FF6B9D" colorTo="#E91E8C" borderWidth={2} />
                  <input
                    type="text"
                    placeholder="Invite code"
                    className="relative z-10 w-full px-6 py-4 bg-black/5 text-black placeholder-black/50 focus:outline-none font-['Satoshi'] text-[16px] font-medium transition-all duration-200"
                  />
                </div>

                <GlassButton variant="cta" className="w-full py-4" contentClassName="justify-center">
                  <span className="text-black font-bold text-lg">Continue</span>
                </GlassButton>

                <div className="text-center space-y-3 pt-4">
                  <p className="text-gray-600 text-sm">Already have an account?</p>
                  <GlassButton className="w-full py-3" contentClassName="justify-center" onClick={() => { setShowInviteModal(false); setShowSignInModal(true); }}>
                    <span className="text-black font-semibold text-[15px] font-['Satoshi']">Sign in</span>
                  </GlassButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sign In Modal */}
      {showSignInModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSignInModal(false)}
          />
          
          <div className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <button 
              onClick={() => setShowSignInModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="space-y-6">
              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-bold text-gray-900 font-['Satoshi']">Sign in</h2>
                <p className="text-gray-600 text-sm">Enter your credentials to access your account</p>
              </div>

              <div className="space-y-4">
                <div className="relative rounded-[24px] overflow-hidden">
                  <BorderBeam size={200} duration={15} colorFrom="#FF6B9D" colorTo="#E91E8C" borderWidth={2} />
                  <input
                    type="text"
                    placeholder="Username"
                    className="relative z-10 w-full px-6 py-4 bg-black/5 text-black placeholder-black/50 focus:outline-none font-['Satoshi'] text-[16px] font-medium transition-all duration-200"
                  />
                </div>

                <div className="relative rounded-[24px] overflow-hidden">
                  <BorderBeam size={200} duration={15} colorFrom="#FF6B9D" colorTo="#E91E8C" borderWidth={2} />
                  <input
                    type="password"
                    placeholder="Password"
                    className="relative z-10 w-full px-6 py-4 bg-black/5 text-black placeholder-black/50 focus:outline-none font-['Satoshi'] text-[16px] font-medium transition-all duration-200"
                  />
                </div>

                <GlassButton variant="cta" className="w-full py-4" contentClassName="justify-center">
                  <span className="text-black font-bold text-lg">Sign in</span>
                </GlassButton>
              </div>
            </div>
          </div>
        </div>
      )}
      </>
    </SmoothScroll>
  );
}
