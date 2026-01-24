import type { RefObject } from "react";
import { GlassFilter } from "@/components/GlassButton";
import AboutSection from "@/components/landing-sections/about-section";
import TokenomicsSection from "@/components/landing-sections/tokenomics-section";
import FaqSection from "@/components/landing-sections/faq-section";
import ApplicationSection from "@/components/landing-sections/application-section";

type ContentSectionsProps = {
  aboutRef: RefObject<HTMLDivElement | null>;
  openFaq: number | null;
  onToggleFaq: (index: number) => void;
  onShowInvite: () => void;
};

export default function ContentSections({
  aboutRef,
  openFaq,
  onToggleFaq,
  onShowInvite,
}: ContentSectionsProps) {
  return (
    <div ref={aboutRef} className="relative w-full z-10">
      <GlassFilter />
      <AboutSection />
      <TokenomicsSection />
      <FaqSection openFaq={openFaq} onToggleFaq={onToggleFaq} />
      <ApplicationSection onShowInvite={onShowInvite} />
    </div>
  );
}
