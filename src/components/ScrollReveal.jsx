"use client";

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
}) {
  // CSS-only scroll reveal using CSS animations — zero JS overhead.
  // Each wrapper is a simple div with a CSS animation that fades+slides in.
  const directionStyles = {
    up: "scroll-reveal-up",
    down: "scroll-reveal-down",
    left: "scroll-reveal-left",
    right: "scroll-reveal-right",
    none: "scroll-reveal-none",
  };

  return (
    <div
      className={`${directionStyles[direction]} ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
