export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-20 z-10 bg-[#f5f5f5]"
    >
      <div className="max-w-350 w-full">
        <div className="flex flex-col items-center text-center max-w-225 mx-auto mb-16">
          <h2 className="text-[48px] font-bold font-['Satoshi'] text-black tracking-[11.52px] leading-[0.93] mb-12">
            About <span className="text-[#FF6B9D]">Zentro</span>
          </h2>
          <h3 className="text-[32px] font-bold font-['Satoshi'] text-black mb-4">
            Zero Compromises
          </h3>
          <p className="text-black text-2xl font-medium font-['Satoshi'] leading-normal mb-4">
            Zentros 3 Pillars
          </p>
          <p className="text-black/70 text-lg font-normal font-['Satoshi'] leading-[1.6] max-w-175">
            Below are our core principles that sets zentro apart
          </p>
        </div>

        <div className="flex justify-center gap-12 max-w-300 mx-auto">
          <div className="flex flex-col gap-3 text-center">
            <h3 className="text-2xl font-semibold text-[#FF6B9D] font-['Satoshi']">
              Privacy
            </h3>
            <p className="text-black/60 text-lg font-['Satoshi'] leading-relaxed">
              They ask for your mother's maiden name -we don't store your phone
              number.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-center">
            <h3 className="text-2xl font-semibold text-[#FF6B9D] font-['Satoshi']">
              Ownership
            </h3>
            <p className="text-black/60 text-lg font-['Satoshi'] leading-relaxed">
              You always own 100% of your money, no middleman, no third parties.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-center">
            <h3 className="text-2xl font-semibold text-[#FF6B9D] font-['Satoshi']">
              Satisfaction
            </h3>
            <p className="text-black/60 text-lg font-['Satoshi'] leading-relaxed">
              {`Less than 2 min response time, white glove personal concierge service {rated #}.`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
