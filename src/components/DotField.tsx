"use client";

import { useEffect, useRef } from "react";
import { dots } from "../config/design";

type Props = {
  /** 0-1.5. Higher = denser, brighter dots. */
  intensity?: number;
  /** Where the dense area sits, as [x, y] fractions of the section. */
  focus?: [number, number];
  className?: string;
};

export default function DotField({ intensity = 1, focus = [0.28, 0.42], className = "" }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, gap: number = dots.gap, cols = 0, rows = 0;
    let seeds: number[] = [];
    let mx = -999, my = -999, raf = 0, inView = true;
    const col = { base: dots.color as string, high: dots.highlight as string };

    function readColors() {
      const cs = getComputedStyle(document.documentElement);
      const b = cs.getPropertyValue("--neon-rgb").trim();
      const h = cs.getPropertyValue("--hi-rgb").trim();
      if (b) col.base = b;
      if (h) col.high = h;
    }

    function size() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = parent!.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas!.width = W * dpr; canvas!.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      gap = W < 700 ? dots.gapMobile : dots.gap;
      cols = Math.ceil(W / gap) + 1; rows = Math.ceil(H / gap) + 1;
      seeds = Array.from({ length: cols * rows }, () => Math.random());
      if (reduce) draw(0);
    }

    function density(px: number, py: number) {
      const a = Math.hypot((px - W * focus[0]) / (W * 0.55), (py - H * focus[1]) / (H * 0.7));
      const b = Math.hypot((px - W * 0.85) / (W * 0.3), (py - H * 0.35) / (H * 0.5));
      return (Math.max(0, 1 - a) * 0.9 + Math.max(0, 1 - b) * 0.55) * intensity;
    }

    function draw(t: number) {
      ctx!.clearRect(0, 0, W, H);
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const px = i * gap + (j % 2 ? gap / 2 : 0), py = j * gap, s = seeds[j * cols + i];
          const d = density(px, py);
          if (d < 0.06 && s > 0.12) continue;
          if (s > 0.35 + d * 0.65) continue;
          const wave = reduce ? 0 : Math.sin(px * 0.012 + py * 0.009 - t * dots.waveSpeed + s * 2) * 0.5 + 0.5;
          const tw = reduce ? 0 : Math.sin(t * 0.0014 + s * 40) * 0.5 + 0.5;
          const near = Math.max(0, 1 - Math.hypot(px - mx, py - my) / dots.pointerRadius);
          const r = dots.baseRadius + (dots.maxRadius - dots.baseRadius) * (d * 0.55 + wave * d * 0.6 + near * 0.9);
          const a = Math.min(1, 0.16 + d * 0.5 + wave * 0.28 * d + tw * 0.1 + near * 0.5);
          ctx!.fillStyle = `rgba(${near > 0.05 ? col.high : col.base},${a})`;
          ctx!.beginPath();
          ctx!.arc(px + (reduce ? 0 : Math.sin(t * 0.0006 + s * 20) * 1.2), py, r, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
    }

    function loop(t: number) { draw(t); raf = requestAnimationFrame(loop); }
    function start() { if (!raf && !reduce && inView && !document.hidden) raf = requestAnimationFrame(loop); }
    function stop() { cancelAnimationFrame(raf); raf = 0; }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = e.clientX - r.left; my = e.clientY - r.top;
    };
    const onVis = () => (document.hidden ? stop() : start());

    const io = new IntersectionObserver(([en]) => {
      inView = en.isIntersecting;
      if (inView) {
        start();
      } else {
        stop();
      }
    });
    const ro = new ResizeObserver(size);
    const mo = new MutationObserver(() => { readColors(); if (reduce) draw(0); });

    readColors(); size(); start();
    io.observe(parent); ro.observe(parent);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    return () => {
      stop(); io.disconnect(); ro.disconnect(); mo.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [intensity, focus]);

  return <canvas ref={ref} className={`dots ${className}`} aria-hidden="true" />;
}
