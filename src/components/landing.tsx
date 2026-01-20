"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IntroScreen from "@/components/landing-sections/intro-screen";
import LandingHero from "@/components/landing-sections/landing-hero";
import SplineSection from "@/components/landing-sections/spline-section";
import ContentSections from "@/components/landing-sections/content-sections";
import InviteModal from "@/components/landing-sections/invite-modal";
import SignInModal from "@/components/landing-sections/sign-in-modal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Landing() {
  const [introComplete, setIntroComplete] = useState(false);
  const [landingOpacity, setLandingOpacity] = useState(1);
  const [splineSectionOpacity, setSplineSectionOpacity] = useState(0);
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
      },
    });

    // Animate black rectangle sliding in to fill screen
    tl.fromTo(
      ".intro-rect",
      { x: "-100%" },
      { x: 0, duration: 1, ease: "power2.inOut" },
    );

    // Animate letters sliding up with stagger
    tl.fromTo(
      ".intro-letter",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out" },
      "-=0.4",
    );

    // Hold for a moment
    tl.to({}, { duration: 0.6 });

    // Fade out text
    tl.to(".intro-letter", { opacity: 0, duration: 0.4 });

    // Fade entire intro screen to reveal landing section
    tl.to(
      ".intro-screen",
      { opacity: 0, duration: 1.2, ease: "power2.inOut" },
      "-=0.2",
    );

    // Animate page elements in during the fade
    tl.fromTo(
      ".page-element",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
      "-=1.0",
    );

    return () => {
      tl.kill();
    };
  }, []);

  // Fade transitions: Landing -> Black -> Spline
  useEffect(() => {
    let lastLandingOpacity = 1;
    let lastSplineSectionOpacity = 0;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const landingHeight = window.innerHeight;

      const landingStayDuration = landingHeight * 0.4;
      const landingFadeDuration = landingHeight * 0.1;

      const landingFade = Math.max(
        0,
        1 - Math.max(0, (scrollY - landingStayDuration) / landingFadeDuration),
      );

      // Spline section only starts fading in AFTER landing has completely faded out
      const landingFadeEnd = landingStayDuration + landingFadeDuration; // 0.5vh
      const splineSectionFadeStart = landingFadeEnd; // Start after landing is gone
      const splineSectionFade = Math.min(
        1,
        Math.max(0, (scrollY - splineSectionFadeStart) / landingFadeDuration),
      );

      // Only update state if values actually changed (avoids unnecessary re-renders)
      if (landingFade !== lastLandingOpacity) {
        lastLandingOpacity = landingFade;
        setLandingOpacity(landingFade);
      }
      if (splineSectionFade !== lastSplineSectionOpacity) {
        lastSplineSectionOpacity = splineSectionFade;
        setSplineSectionOpacity(splineSectionFade);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP transitions for about section
  useEffect(() => {
    if (!aboutRef.current) return;

    // About section slide up transition
    gsap.fromTo(
      aboutRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top bottom-=100",
          end: "top center",
          scrub: 1,
        },
      },
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div>
      <>
        {/* Intro Animation Screen */}
        {!introComplete && <IntroScreen />}

        {/* Buffer/spacer section before video scroll starts */}
        <div className="h-screen relative bg-[#f5f5f5]" />

        {/* Landing Section - fixed overlay that fades out on scroll */}
        <LandingHero
          landingOpacity={landingOpacity}
          onSignIn={() => setShowSignInModal(true)}
        />

        {/* Buffer/spacer section before spline scroll starts */}
        <div className="h-[50vh] relative bg-[#f5f5f5]" />

        {/* Spline Animation Section - fixed position that starts after landing fades */}
        <SplineSection
          splineContainerRef={splineContainerRef}
          splineOpacity={splineSectionOpacity}
        />

        {/* Content Sections - normal flow layout with background overlay on spline */}
        <ContentSections
          aboutRef={aboutRef}
          openFaq={openFaq}
          onToggleFaq={(index) =>
            setOpenFaq((current) => (current === index ? null : index))
          }
          onShowInvite={() => setShowInviteModal(true)}
        />

        {/* Invite Code Modal */}
        {showInviteModal && (
          <InviteModal
            onClose={() => setShowInviteModal(false)}
            onSwitchToSignIn={() => {
              setShowInviteModal(false);
              setShowSignInModal(true);
            }}
          />
        )}

        {/* Sign In Modal */}
        {showSignInModal && (
          <SignInModal onClose={() => setShowSignInModal(false)} />
        )}
      </>
    </div>
  );
}
