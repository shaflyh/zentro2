export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-20 z-10 bg-[#f5f5f5]"
    >
      <div className="max-w-350 w-full">
        <div className="flex flex-col items-center text-center max-w-225 mx-auto mb-16">
          <h2 className="text-[48px] font-bold font-['Satoshi'] text-black tracking-[11.52px] leading-[0.93] mb-6">
            About <span className="text-[#FF6B9D]">Zentro</span>
          </h2>
          <h3 className="text-[32px] font-bold font-['Satoshi'] text-black mb-4">
            Banking for the unknown
          </h3>
          <p className="text-black text-[18px] font-medium font-['Satoshi'] leading-normal mb-4">
            You don't compromise when earning, so don't compromise when spending
          </p>
          <p className="text-black/70 text-[15px] font-normal font-['Satoshi'] leading-[1.6] max-w-175">
            Zentro Finance provides zero-knowledge financial infrastructure for
            those who value discretion.
          </p>
        </div>

        <div className="flex justify-center gap-12 max-w-250 mx-auto">
          <div className="flex flex-col gap-3 text-center">
            <h3 className="text-xl font-semibold text-[#FF6B9D] font-['Satoshi']">
              Privacy First
            </h3>
            <p className="text-black/60 text-sm font-['Satoshi'] leading-relaxed">
              Your transactions, your business. Built for discretion.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-center">
            <h3 className="text-xl font-semibold text-[#FF6B9D] font-['Satoshi']">
              Member Owned
            </h3>
            <p className="text-black/60 text-sm font-['Satoshi'] leading-relaxed">
              Independent and member-governed. No corporate overlords.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-center">
            <h3 className="text-xl font-semibold text-[#FF6B9D] font-['Satoshi']">
              Token Gated
            </h3>
            <p className="text-black/60 text-sm font-['Satoshi'] leading-relaxed">
              Hold $ZFY tokens to access membership.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
