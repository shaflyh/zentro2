export default function IntroScreen() {
  return (
    <div className="intro-screen fixed inset-0 z-100 bg-white flex items-center justify-center overflow-hidden">
      <div className="intro-rect absolute inset-0 bg-white" />

      <div className="flex items-center justify-center gap-1 relative z-10">
        {"Zentro".split("").map((letter, index) => (
          <span
            key={index}
            className="intro-letter text-black text-[80px] font-bold font-['Satoshi'] tracking-[19.2px]"
            style={{ display: "inline-block" }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}
