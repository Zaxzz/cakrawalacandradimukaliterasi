"use client";

export default function FloatingGradients() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Top Left Blue Glow — CSS-only animation, no blur filter */}
      <div
        className="absolute top-[-20%] left-[-20%] w-[70vw] h-[70vw] rounded-full bg-blue-500/[0.07] animate-float-1"
        style={{ willChange: "transform", transform: "translate3d(0,0,0)" }}
      />

      {/* Center-Right Purple Glow */}
      <div
        className="absolute top-[20%] right-[-15%] w-[60vw] h-[60vw] rounded-full bg-violet-500/[0.05] animate-float-2"
        style={{ willChange: "transform", transform: "translate3d(0,0,0)" }}
      />

      {/* Bottom Indigo Glow */}
      <div
        className="absolute bottom-[-15%] left-[15%] w-[75vw] h-[50vw] rounded-full bg-indigo-500/[0.05] animate-float-1"
        style={{ willChange: "transform", transform: "translate3d(0,0,0)", animationDelay: "-8s" }}
      />

      {/* Mesh Overlay — static, no animation */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
}
