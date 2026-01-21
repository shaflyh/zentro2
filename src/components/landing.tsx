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
import SmoothScroll from "@/components/landing-sections/smooth-scroll";

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

  // Fade transitions: Landing -> Spline -> About
  useEffect(() => {
    let lastLandingOpacity = 1;
    let lastSplineSectionOpacity = 0;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // Landing fade out
      const landingStayDuration = vh * 0.4;
      const landingFadeDuration = vh * 0.1;
      const landingFade = Math.max(
        0,
        1 - Math.max(0, (scrollY - landingStayDuration) / landingFadeDuration),
      );

      // Spline section fade in (after landing fades out)
      const landingFadeEnd = landingStayDuration + landingFadeDuration;
      const splineFadeInStart = landingFadeEnd;
      const splineFadeIn = Math.min(
        1,
        Math.max(0, (scrollY - splineFadeInStart) / landingFadeDuration),
      );

      // Spline section fade out (when reaching About section)
      const splineFadeOutStart = vh * 1.5; // Start fading out at 1.5vh
      const splineFadeOutDuration = vh * 0.3; // Fade out over 0.3vh
      const splineFadeOut = Math.max(
        0,
        1 - Math.max(0, (scrollY - splineFadeOutStart) / splineFadeOutDuration),
      );

      // Final spline opacity: fade in first, then fade out
      const splineSectionFade = Math.min(splineFadeIn, splineFadeOut);

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
    <SmoothScroll>
      {/* <div> */}
      <div>
        {/* Intro Animation Screen */}
        {!introComplete && <IntroScreen />}

        {/* Buffer/spacer section before video scroll starts */}
        <div className="h-screen relative bg-[#f5f5f5]" />

        {/* Landing Section */}
        <LandingHero
          landingOpacity={landingOpacity}
          onSignIn={() => setShowSignInModal(true)}
        />

        {/* Buffer/spacer section before spline scroll starts */}
        <div className="h-[50vh] relative bg-[#f5f5f5]" />

        {/* Spline Animation Section */}
        <SplineSection
          splineContainerRef={splineContainerRef}
          splineOpacity={splineSectionOpacity}
        />

        {/* Content Sections */}
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
      </div>
    </SmoothScroll>
  );
}
