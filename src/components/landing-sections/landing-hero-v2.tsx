import { ArrowIcon } from "@/components/icons";
import GlassButton from "@/components/GlassButton";
import SplineCards from "./spline-cards-v2";
import { BorderBeam } from "@/components/BorderBeam";

type LandingHeroProps = {
  landingOpacity: number;
  onSignIn: () => void;
};

export default function LandingHero({
  landingOpacity,
  onSignIn,
}: LandingHeroProps) {
  return (
    <section
      id="landing"
      className="fixed inset-0 w-full h-full min-h-screen z-20 transition-opacity duration-300 overflow-hidden bg-white"
      style={{
        opacity: landingOpacity,
        pointerEvents: landingOpacity < 0.1 ? "none" : "auto",
      }}
    >
      <SplineCards isVisible={landingOpacity > 0} />

      <img
        src="/border.svg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-100 pointer-events-none z-10"
        style={{
          filter: "drop-shadow(0 0 20px rgba(0, 0, 0, 0.5))",
          opacity: 1,
        }}
      />

      <div className="page-element absolute left-[24px] top-[30px] h-[44px] flex items-center z-20">
        <span className="text-black text-3xl font-bold font-['Satoshi'] tracking-[7px]">
          Zentro
        </span>
      </div>

      <div className="page-element absolute right-[80px] top-[50px] z-20">
        <GlassButton
          className="px-6 py-3"
          contentClassName="gap-2"
          onClick={onSignIn}
        >
          <span className="text-black text-[15px] font-semibold font-['Satoshi']">
            Log in
          </span>
        </GlassButton>
      </div>

      <div className="page-element absolute left-[24px] bottom-[72px] max-w-[600px] flex flex-col justify-start items-start gap-6 z-20">
        <div className="flex flex-col gap-1">
          <h1 className="gradient-text-line1 text-[32px] font-bold font-['Satoshi'] tracking-[11.52px] leading-[1] animate-initial animate-slide-up delay-400 text-black">
            Spend privately.
          </h1>
          <h1 className="gradient-text-line1 text-[32px] font-bold font-['Satoshi'] tracking-[11.52px] leading-[1] animate-initial animate-slide-up delay-500 text-black">
            Member owned.
          </h1>
          <h1 className="gradient-text-line1 text-[32px] font-bold font-['Satoshi'] tracking-[11.52px] leading-[1] animate-initial animate-slide-up delay-600 text-black">
            Invite only.
          </h1>
        </div>
        <p className="text-black text-[15px] font-bold font-['Satoshi'] leading-[1.6] max-w-[480px] animate-initial animate-slide-up delay-700">
          An invite-only card built for private spending. Member-owned,
          independent, and designed for those who value control, discretion, and
          exclusivity.
        </p>
      </div>

      <div className="page-element absolute right-[120px] bottom-[40px] flex justify-end items-center gap-4 animate-initial animate-slide-up delay-800 z-20">
        <div className="relative rounded-[48px] overflow-hidden">
          <BorderBeam
            size={200}
            duration={15}
            colorFrom="#CBC4CC"
            colorTo="transparent"
            borderWidth={2}
          />
          <input
            type="text"
            placeholder="Enter code"
            className="relative z-10 px-8 py-4 bg-black/10 text-black placeholder-black/50 focus:outline-none font-['Satoshi'] text-[18px] font-medium transition-all duration-200"
          />
        </div>
        <GlassButton
          variant="cta"
          className="w-16 h-16 hover:translate-x-1 transition-transform duration-200"
          contentClassName="justify-center"
        >
          <ArrowIcon className="w-6 h-6 text-black rotate-180" />
        </GlassButton>
      </div>

      <div className="page-element absolute right-[120px] bottom-[-80px] animate-initial animate-slide-up delay-900 z-20">
        <button className="relative px-12 py-4 rounded-full font-['Satoshi'] font-semibold text-lg text-white overflow-hidden group transition-all duration-300 hover:shadow-xl hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B9D] via-[#E91E8C] to-[#FF6B9D] rounded-full" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#E91E8C] via-[#FF6B9D] to-[#E91E8C] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10">Explore the platform</span>
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-b from-transparent via-gray-100 to-gray-300 pointer-events-none z-10" />
    </section>
  );
}
