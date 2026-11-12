"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const INTERVAL = 4500;

export default function ProjectSlider({ images, title, sizes = "(max-width:700px) 100vw, 380px" }: { images: string[]; title: string; sizes?: string }) {
  const [bad, setBad] = useState<string[]>([]);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const startX = useRef<number | null>(null);

  const imgs = images.filter((s) => !bad.includes(s));
  const n = imgs.length;
  const cur = n ? i % n : 0;
  const go = useCallback((d: number) => setI((c) => (c + d + n) % n), [n]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (n < 2 || paused || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => go(1), INTERVAL);
    return () => clearInterval(t);
  }, [n, paused, inView, go, i]);

  if (n === 0) return null;

  return (
    <div
      ref={root}
      className="slider"
      role="group"
      aria-roledescription="carousel"
      aria-label={`${title} screenshots`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onPointerDown={(e) => {
        startX.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (startX.current === null || n < 2) return;
        const dx = e.clientX - startX.current;
        startX.current = null;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      }}
    >
      {imgs.map((src, k) => (
        <div key={src} className={`slide${k === cur ? " active" : ""}`} aria-hidden={k !== cur}>
          <Image
            src={src}
            alt={`${title} screenshot ${k + 1} of ${n}`}
            fill
            sizes={sizes}
            className="slide-img"
            onError={() => setBad((b) => [...b, src])}
          />
        </div>
      ))}
      {n > 1 && (
        <>
          <button type="button" className="slider-arrow prev" aria-label="Previous image" onClick={() => go(-1)}>
            &#8249;
          </button>
          <button type="button" className="slider-arrow next" aria-label="Next image" onClick={() => go(1)}>
            &#8250;
          </button>
          <div className="slider-dots">
            {imgs.map((src, k) => (
              <button
                key={src}
                type="button"
                className={`dot${k === cur ? " on" : ""}`}
                aria-label={`Show image ${k + 1} of ${n}`}
                aria-current={k === cur}
                onClick={() => setI(k)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

