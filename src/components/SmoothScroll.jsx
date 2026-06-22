"use client";

// Native CSS smooth scrolling is handled by `scroll-behavior: smooth` in globals.css.
// Lenis was removed because it was causing scroll-blocking issues (stuck at bottom, can't scroll up).
// This wrapper is kept for backward compatibility with layout.tsx imports.
export default function SmoothScroll({ children }) {
  return <>{children}</>;
}
