import GlassButton from "@/components/GlassButton";

type FaqSectionProps = {
  openFaq: number | null;
  onToggleFaq: (index: number) => void;
};

export default function FaqSection({
  openFaq,
  onToggleFaq,
}: FaqSectionProps) {
  return (
    <section
      id="faq"
      className="relative w-full min-h-screen flex items-center justify-center px-20 z-10 bg-white"
    >
      <div className="flex items-start justify-between gap-16 w-full max-w-[1400px]">
        <div className="flex flex-col gap-4 max-w-[700px] w-full">
          <div className="flex flex-col gap-2">
            <GlassButton
              className="px-8 py-6 hover:border-[#FF6B9D]/30 border-2 border-transparent transition-all duration-200 cursor-pointer"
              onClick={() => onToggleFaq(0)}
            >
              <div className="flex items-center justify-between w-full">
                <h3 className="text-lg font-semibold text-[#FF6B9D] font-['Satoshi']">
                  How does the invite system work?
                </h3>
                <span className="text-[#FF6B9D] text-2xl">
                  {openFaq === 0 ? "−" : "+"}
                </span>
              </div>
            </GlassButton>
            {openFaq === 0 && (
              <GlassButton className="px-8 py-6">
                <p className="text-black/60 text-sm font-['Satoshi'] leading-relaxed">
                  Current members invite new applicants through our verification
                  process. Each invitation is carefully reviewed to ensure
                  alignment with Zentro's values of privacy and discretion.
                </p>
              </GlassButton>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <GlassButton
              className="px-8 py-6 hover:border-[#FF6B9D]/30 border-2 border-transparent transition-all duration-200 cursor-pointer"
              onClick={() => onToggleFaq(1)}
            >
              <div className="flex items-center justify-between w-full">
                <h3 className="text-lg font-semibold text-[#FF6B9D] font-['Satoshi']">
                  What makes Zentro different?
                </h3>
                <span className="text-[#FF6B9D] text-2xl">
                  {openFaq === 1 ? "−" : "+"}
                </span>
              </div>
            </GlassButton>
            {openFaq === 1 && (
              <GlassButton className="px-8 py-6">
                <p className="text-black/60 text-sm font-['Satoshi'] leading-relaxed">
                  Zentro is privacy-first, member-owned, and exclusively
                  invite-only. We provide zero-knowledge financial
                  infrastructure without corporate oversight or compromises.
                </p>
              </GlassButton>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <GlassButton
              className="px-8 py-6 hover:border-[#FF6B9D]/30 border-2 border-transparent transition-all duration-200 cursor-pointer"
              onClick={() => onToggleFaq(2)}
            >
              <div className="flex items-center justify-between w-full">
                <h3 className="text-lg font-semibold text-[#FF6B9D] font-['Satoshi']">
                  How is my privacy protected?
                </h3>
                <span className="text-[#FF6B9D] text-2xl">
                  {openFaq === 2 ? "−" : "+"}
                </span>
              </div>
            </GlassButton>
            {openFaq === 2 && (
              <GlassButton className="px-8 py-6">
                <p className="text-black/60 text-sm font-['Satoshi'] leading-relaxed">
                  Your transactions remain private through zero-knowledge proofs
                  and encrypted protocols. We don't track, sell, or share your
                  financial data with anyone.
                </p>
              </GlassButton>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <GlassButton
              className="px-8 py-6 hover:border-[#FF6B9D]/30 border-2 border-transparent transition-all duration-200 cursor-pointer"
              onClick={() => onToggleFaq(3)}
            >
              <div className="flex items-center justify-between w-full">
                <h3 className="text-lg font-semibold text-[#FF6B9D] font-['Satoshi']">
                  What are the membership requirements?
                </h3>
                <span className="text-[#FF6B9D] text-2xl">
                  {openFaq === 3 ? "−" : "+"}
                </span>
              </div>
            </GlassButton>
            {openFaq === 3 && (
              <GlassButton className="px-8 py-6">
                <p className="text-black/60 text-sm font-['Satoshi'] leading-relaxed">
                  Membership requires an invitation from an existing member and
                  completion of our verification process. We carefully curate
                  our community to maintain exclusivity and shared values.
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
            Everything you need to know about Zentro membership and how it
            works.
          </p>
        </div>
      </div>
    </section>
  );
}
