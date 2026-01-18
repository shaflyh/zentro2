"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from 'next/dynamic';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MenuIcon, ArrowIcon } from "@/components/icons";
import GlassButton from "@/components/GlassButton";
import { BorderBeam } from "@/components/BorderBeam";

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div className="w-full h-[400px] bg-gray-100 animate-pulse" />
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MobileLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [landingComplete, setLandingComplete] = useState(false);
  const [showWhiteFlash, setShowWhiteFlash] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [cardOpacity, setCardOpacity] = useState(1);
  const [splineOpacity, setSplineOpacity] = useState(0);
  const cardSectionRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<any>(null);
  const [splineInView, setSplineInView] = useState(false);
  const [splineStarted, setSplineStarted] = useState(false);
  const whyZentroRef = useRef<HTMLDivElement>(null);

  function onSplineLoad(spline: any) {
    splineRef.current = spline;
    
    // Set up animation to restart every 10 seconds
    try {
      if (spline._scene) {
        const findAnimations = (obj: any) => {
          if (obj.animations && obj.animations.length > 0) {
            obj.animations.forEach((anim: any) => {
              if (anim) {
                // Don't loop automatically
                anim.loop = false;
                anim.clampWhenFinished = false;
                // Stop initially
                anim.stop();
              }
            });
          }
          if (obj.children) {
            obj.children.forEach((child: any) => findAnimations(child));
          }
        };
        findAnimations(spline._scene);
      }
    } catch (e) {
      console.log('Spline animation setup:', e);
    }
  }

  // Start animation once when first scrolled into view and restart every 10 seconds
  useEffect(() => {
    if (!splineRef.current || splineStarted || !splineInView) return;

    // Function to play the animation
    const playAnimation = () => {
      try {
        if (splineRef.current?._scene) {
          const startAnimations = (obj: any) => {
            if (obj.animations && obj.animations.length > 0) {
              obj.animations.forEach((anim: any) => {
                if (anim) {
                  anim.stop();
                  anim.play();
                }
              });
            }
            if (obj.children) {
              obj.children.forEach((child: any) => startAnimations(child));
            }
          };
          startAnimations(splineRef.current._scene);
        }
      } catch (e) {
        console.log('Animation restart:', e);
      }
    };

    // Start animation for the first time
    playAnimation();
    setSplineStarted(true);

    // Set up interval to restart every 10 seconds
    const interval = setInterval(() => {
      playAnimation();
    }, 10000);

    return () => clearInterval(interval);
  }, [splineInView, splineStarted]);

  const menuItems = [
    { label: "Features", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "/faq" }
  ];

  // Update theme color based on stage
  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      // Turn white during flash or when on main content
      metaThemeColor.setAttribute('content', (showWhiteFlash || landingComplete) ? '#ffffff' : '#000000');
    }
  }, [landingComplete, showWhiteFlash]);

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
      { x: 0, duration: 0.8, ease: 'power2.inOut' }
    );

    // Animate letters sliding up with stagger
    tl.fromTo('.intro-letter',
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power3.out' },
      '-=0.3'
    );

    // Hold for a moment
    tl.to({}, { duration: 0.4 });

    // Fade out text
    tl.to('.intro-letter',
      { opacity: 0, duration: 0.3 }
    );

    // Fade in landing image behind as intro fades out
    tl.to('.landing-screen', {
      opacity: 1,
      duration: 1.2,
      ease: 'power2.inOut'
    }, '-=0.2');

    // Smooth fade entire intro screen to reveal landing image
    tl.to('.intro-screen',
      { opacity: 0, duration: 1.2, ease: 'power2.inOut' },
      '-=1.2'
    );

    return () => {
      tl.kill();
    };
  }, []);

  // Handle swipe up
  const handleSwipeUp = () => {
    setShowWhiteFlash(true);
    
    const tl = gsap.timeline();

    // White flash fade in to full white
    tl.to('.white-flash', {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.inOut'
    });

    // Hold at full white
    tl.to({}, { duration: 0.4 });

    // While at full white, hide landing and show main content
    tl.call(() => {
      setLandingComplete(true);
    });

    // Small pause before fade out
    tl.to({}, { duration: 0.2 });

    // Fade out white flash revealing main content
    tl.to('.white-flash', {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        setShowWhiteFlash(false);
      }
    });
  };

  // Spline fade in on scroll and track visibility (mobile)
  useEffect(() => {
    if (!landingComplete || !cardSectionRef.current || !whyZentroRef.current) return;

    let rafId: number;
    
    const handleScroll = () => {
      const cardSection = cardSectionRef.current;
      const whyZentroSection = whyZentroRef.current;
      if (!cardSection || !whyZentroSection) return;

      const cardRect = cardSection.getBoundingClientRect();
      const whyZentroRect = whyZentroSection.getBoundingClientRect();
      const scrollProgress = -cardRect.top / (cardRect.height - window.innerHeight);
      
      // Calculate reverse scroll progress from Why Zentro section
      // When scrolling up from Why Zentro, we want the spline to fade back in
      const reverseProgress = Math.max(0, Math.min(1, (whyZentroRect.top - window.innerHeight * 0.3) / (window.innerHeight * 0.5)));
      
      // Spline fades in as user scrolls through the section (forward scroll)
      const forwardFade = Math.min(1, Math.max(0, scrollProgress * 1.5));
      
      // Combine forward and reverse fades - use whichever is higher
      const splineFade = Math.max(forwardFade, 1 - reverseProgress);
      setSplineOpacity(splineFade);
      
      // Check if spline section is in view (at least 30% visible) OR if scrolling up from Why Zentro
      const inViewForward = scrollProgress > 0.3 && scrollProgress < 1;
      const inViewReverse = reverseProgress < 0.7 && whyZentroRect.top > 0;
      const inView = inViewForward || inViewReverse;
      setSplineInView(inView);
      
      rafId = requestAnimationFrame(handleScroll);
    };

    rafId = requestAnimationFrame(handleScroll);
    
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [landingComplete]);

  return (
    <div className="min-h-screen bg-black">
      {/* Intro Animation Screen */}
      {!introComplete && (
        <div className="intro-screen fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden">
          {/* Black rectangle that fills then unfills */}
          <div className="intro-rect absolute inset-0 bg-black" />
          
          {/* Centered logo text */}
          <div className="flex items-center justify-center gap-1 relative z-10">
            {'Zentro'.split('').map((letter, index) => (
              <span
                key={index}
                className="intro-letter text-white text-[60px] md:text-[80px] font-bold font-['Satoshi'] tracking-[14.4px] md:tracking-[19.2px]"
                style={{ display: 'inline-block' }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Landing Image Screen - Always rendered behind intro */}
      <div 
        className="landing-screen fixed inset-0 z-[90] bg-black flex flex-col items-center justify-center"
        style={{ 
          opacity: 0,
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
          display: landingComplete ? 'none' : 'flex'
        }}
      >
          {/* Spline Background Animation - only after intro */}
          {introComplete && (
            <div className="absolute inset-0 w-full h-full">
              <Spline scene="https://prod.spline.design/uS2baGaekXGbRGyR/scene.splinecode" />
            </div>
          )}

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-[5]" />

          {/* Centered Info Section - positioned at top */}
          <div className="absolute top-32 left-0 right-0 flex justify-center px-6 z-10">
            <div className="flex flex-col items-center text-center space-y-4">
              <span className="text-white text-4xl font-bold font-['Satoshi'] tracking-[7.2px]">Zentro</span>
              <div className="max-w-sm space-y-2">
                <p className="text-white/90 text-base font-medium">
                  Where privacy meets premium
                </p>
                <p className="text-white/60 text-sm leading-relaxed">
                  Zero-knowledge banking infrastructure for those who value discretion. 
                  Your transactions, truly private.
                </p>
              </div>
            </div>
          </div>
          
          {/* Enter Site Button */}
          <div className="absolute bottom-12 left-0 right-0 flex justify-center px-6 z-20">
            <GlassButton 
              onClick={handleSwipeUp}
              className="px-8 py-4"
            >
              <span className="text-white font-bold text-lg">Enter Site</span>
            </GlassButton>
          </div>
      </div>

      {/* White Flash Overlay */}
      <div 
        className={`white-flash fixed inset-0 z-[200] bg-white pointer-events-none ${showWhiteFlash ? '' : 'hidden'}`}
        style={{ opacity: 0 }}
      />

      {landingComplete && (
      <div className="mobile-content">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="flex items-center justify-between px-6 py-4">
          <span className="text-black text-2xl font-bold font-['Satoshi'] tracking-[7.2px]">Zentro</span>
          
          <GlassButton className="px-6 py-3" contentClassName="gap-2" onClick={() => setShowSignInModal(true)}>
            <span className="text-black text-[15px] font-semibold font-['Satoshi']">Sign in</span>
          </GlassButton>
        </div>
      </header>

      {/* Hero Section with Card and Text */}
      <section className="bg-white pt-24">
        {/* Card at top */}
        <div className="flex items-center justify-center px-6 pt-8">
          <div className="relative w-full max-w-[320px] mx-auto">
            <img 
              src="/cardimage.png" 
              alt="Zentro Card" 
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Hero Text - directly below card */}
        <div className="max-w-md mx-auto text-center space-y-4 px-6 pt-8 pb-8">
          <h1 className="text-5xl font-bold text-gray-900 font-['Satoshi'] leading-tight">
            Banking for the<br />unknown
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            You don't compromise when earning, so don't compromise when spending
          </p>
          
          {/* Scroll indicator */}
          <div className="flex flex-col items-center pt-8 animate-bounce">
            <svg className="w-6 h-6 text-gray-400 mb-1" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
            <span className="text-sm text-gray-400 font-medium">Scroll for more</span>
          </div>
        </div>
      </section>

      {/* Spline Animation Section - Scroll Triggered */}
      <section className="bg-white">
        <div ref={cardSectionRef} className="relative h-[150vh] bg-white">
          {/* Fixed Spline Animation */}
          <div className="sticky top-0 h-screen flex items-center justify-center">
            <div 
              className="w-full aspect-[9/16] max-h-screen transition-opacity duration-700"
              style={{ opacity: splineOpacity }}
            >
              <Spline 
                scene="https://prod.spline.design/ocFNpAmFv5FZ9vcB/scene.splinecode"
                onLoad={onSplineLoad}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={whyZentroRef} className="py-20 px-6 bg-gray-50">
        <div className="max-w-md mx-auto space-y-6">
          <h2 className="text-4xl font-bold text-gray-900 font-['Satoshi'] text-center mb-12">
            Why Zentro?
          </h2>
          
          <div className="space-y-4">
            <GlassButton className="w-full p-6 text-left">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900">Private Transactions</h3>
                <p className="text-gray-600">Zero-knowledge proofs ensure your spending remains completely private and untraceable.</p>
              </div>
            </GlassButton>

            <GlassButton className="w-full p-6 text-left">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900">Maximum Security</h3>
                <p className="text-gray-600">Member-owned infrastructure with no corporate oversight or data tracking.</p>
              </div>
            </GlassButton>

            <GlassButton className="w-full p-6 text-left">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900">Crypto to Fiat</h3>
                <p className="text-gray-600">Deposit crypto instantly and spend as fiat anywhere, with complete discretion.</p>
              </div>
            </GlassButton>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-md mx-auto space-y-6">
          <h2 className="text-4xl font-bold text-gray-900 font-['Satoshi'] text-center mb-12">
            FAQ
          </h2>
          
          <div className="space-y-4">
            <GlassButton className="w-full p-6 text-left">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900">How does the invite system work?</h3>
                <p className="text-gray-600">Current members invite new applicants through our verification process. Each invitation is carefully reviewed to ensure alignment with Zentro's values of privacy and discretion.</p>
              </div>
            </GlassButton>

            <GlassButton className="w-full p-6 text-left">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900">What makes Zentro different?</h3>
                <p className="text-gray-600">Zentro is privacy-first, member-owned, and exclusively invite-only. We provide zero-knowledge financial infrastructure without corporate oversight or compromises.</p>
              </div>
            </GlassButton>

            <GlassButton className="w-full p-6 text-left">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900">How is my privacy protected?</h3>
                <p className="text-gray-600">Your transactions remain private through zero-knowledge proofs and encrypted protocols. We don't track, sell, or share your financial data with anyone.</p>
              </div>
            </GlassButton>

            <GlassButton className="w-full p-6 text-left">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900">What are the membership requirements?</h3>
                <p className="text-gray-600">Membership requires an invitation from an existing member. We carefully curate our community to maintain exclusivity and shared values.</p>
              </div>
            </GlassButton>
          </div>
        </div>
      </section>

      {/* Spacer to allow CTA to center */}
      <div className="h-[20vh] bg-gray-50"></div>

      {/* CTA Section */}
      <section className="min-h-screen flex items-center justify-center px-6 bg-gray-50">
        <div className="max-w-md mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold text-gray-900 font-['Satoshi']">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-600">
            Join thousands of users who trust Zentro with their finances.
          </p>
          <GlassButton variant="cta" className="w-full py-4" contentClassName="justify-center" onClick={() => setShowInviteModal(true)}>
            <span className="text-black font-bold text-lg">Apply now</span>
          </GlassButton>
          <p className="text-sm text-gray-600 leading-relaxed pt-4">
            Zentro Finance provides zero-knowledge financial infrastructure for those who value discretion.
          </p>
        </div>
      </section>

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
      </div>
      )}
    </div>
  );
}
