"use client";

import { useEffect, useRef } from "react";
import SafeImage from "./SafeImage";

type Props = {
  name: string;
  initial: string;
  university: string;
  location: string;
  photo?: string;
  photoAlt: string;
};

export default function HeroProfile({ name, initial, university, location, photo, photoAlt }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    // 0 while on screen, rising to 1 as the profile scrolls out through the top.
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--hp-p", Math.min(1, Math.max(0, -r.top / r.height)).toFixed(3));
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
    <aside
      ref={ref}
      className="hp-in"
      aria-label="Profile"
      style={{ position: "relative", width: "min(100%, 360px)", justifySelf: "center", minWidth: 0 }}
    >
      <div
        style={{
          opacity: "calc(1 - var(--hp-p, 0) * 1.3)",
          transform: "translateY(calc(var(--hp-p, 0) * 90px)) scale(calc(1 - var(--hp-p, 0) * 0.08))",
          transition: "opacity 0.35s ease-out, transform 0.35s ease-out",
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: "-14% -22%",
              pointerEvents: "none",
              background:
                "radial-gradient(closest-side, rgba(var(--em-rgb, 18, 184, 102), 0.38), rgba(var(--em-rgb, 18, 184, 102), 0.08) 60%, transparent 75%)",
            }}
          />
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "relative",
                aspectRatio: "4 / 5",
                display: "grid",
                placeItems: "center",
                overflow: "hidden",
                borderRadius: 28,
                background: photo ? "transparent" : "radial-gradient(circle at 50% 32%, var(--g1, #19d97a) 0%, var(--g2, #0b7a43) 50%, var(--g3, #052a19) 100%)",
                boxShadow: photo ? "none" : "0 30px 80px rgba(0,0,0,0.45), 0 0 80px rgba(var(--em-rgb, 18, 184, 102), 0.25)",
              }}
            >
              <b
                aria-hidden="true"
                style={{
                  position: "relative",
                  fontFamily: "var(--f-display)",
                  fontWeight: 700,
                  fontSize: "clamp(5rem, 11vw, 8rem)", display: photo ? "none" : "block",
                  lineHeight: 1,
                  color: "var(--white2, #eafff2)",
                  textShadow: "0 0 44px rgba(var(--neon-rgb, 70, 255, 148), 0.6)",
                }}
              >
                {initial}
              </b>
              <SafeImage src={photo} alt={photoAlt} sizes="360px" priority className={photo ? "photo-img hp-cut" : "photo-img"} />
            </div>
            <div style={{ textAlign: "center", marginTop: 14, display: "grid", gap: 3 }}>
              <strong style={{ fontFamily: "var(--f-display)", fontSize: "1.35rem", color: "var(--white, #f2fff7)" }}>{name}</strong>
              <span style={{ fontSize: "0.92rem", opacity: 0.8 }}>{university}</span>
              <span style={{ fontSize: "0.9rem", opacity: 0.85 }}>{location}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
