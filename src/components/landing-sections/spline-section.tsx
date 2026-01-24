import type { RefObject } from "react";
import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#f5f5f5] animate-pulse" />,
});

type SplineSectionProps = {
  splineContainerRef: RefObject<HTMLDivElement | null>;
  splineOpacity: number;
};

export default function SplineSection({
  splineContainerRef,
  splineOpacity,
}: SplineSectionProps) {
  return (
    <>
      {/* Fixed fullscreen Spline that fades in/out */}
      <div
        className="fixed inset-0 w-full h-full z-10"
        style={{
          opacity: splineOpacity,
          pointerEvents: splineOpacity < 0.1 ? "none" : "auto",
        }}
      >
        <Spline scene="https://prod.spline.design/J1WQOQGYmdelRk56/scene.splinecode" />
      </div>

      {/* Spacer to provide scroll distance for the Spline animation */}
      <div
        ref={splineContainerRef}
        className="h-[20vh] relative bg-transparent"
      />
    </>
  );
}
