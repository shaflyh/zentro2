import { ArrowIcon } from "@/components/icons";
import GlassButton from "@/components/GlassButton";

type ApplicationSectionProps = {
  onShowInvite: () => void;
};

export default function ApplicationSection({
  onShowInvite,
}: ApplicationSectionProps) {
  return (
    <section
      id="application"
      className="relative w-full min-h-screen flex items-center justify-center px-20 z-10 bg-[#f5f5f5]"
    >
      <div className="flex items-center justify-between gap-16 w-full max-w-[1400px]">
        <div className="flex flex-col max-w-[500px]">
          <h2 className="text-[48px] font-bold font-['Satoshi'] text-black tracking-[11.52px] leading-[1.2] mb-6">
            Ready to join the{" "}
            <span className="text-[#FF6B9D]">exclusive circle?</span>
          </h2>
          <p className="text-black/70 text-[16px] font-normal font-['Satoshi'] leading-relaxed mb-8">
            Apply now for your Zentro card. Limited memberships available for
            those who value privacy, control, and exclusivity.
          </p>

          <div className="flex items-center gap-4">
            <GlassButton
              variant="cta"
              className="px-10 py-5"
              contentClassName="gap-3"
              onClick={onShowInvite}
            >
              <span className="text-black text-[18px] font-medium font-['Satoshi']">
                START YOUR APPLICATION NOW...
              </span>
            </GlassButton>
            <GlassButton
              variant="cta"
              className="w-16 h-16"
              contentClassName="justify-center"
              onClick={onShowInvite}
            >
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
  );
}
