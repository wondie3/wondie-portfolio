"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Wraps a section's content. Sets --sp (0..1) on the parent <section> as it scrolls into view. */
export default function SectionFx({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = ref.current?.parentElement;
    if (!sec) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const top = sec.getBoundingClientRect().top;
      // 0 when the section's top edge is at the bottom of the screen, 1 once it reaches mid-screen
      const p = Math.min(1, Math.max(0, (vh - top) / (vh * 0.5)));
      sec.style.setProperty("--sp", p.toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
