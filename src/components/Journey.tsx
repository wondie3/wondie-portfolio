"use client";

import { useEffect, useRef, useState } from "react";
import type { MilestoneStatus } from "../data/milestones";

export type JourneyItem = { title: string; text?: string; when: string; status: MilestoneStatus };

const TAG: Partial<Record<MilestoneStatus, string>> = { current: "Current", upcoming: "Upcoming" };

/** Vertical journey timeline: the line fills and steps light up as you scroll. */
export default function Journey({ items }: { items: JourneyItem[] }) {
  const ol = useRef<HTMLOListElement>(null);
  const [reached, setReached] = useState(0);

  useEffect(() => {
    const el = ol.current;
    if (!el) return;
    const nodes = Array.from(el.querySelectorAll<HTMLElement>(".jr-node"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      if (reduce) {
        setReached(nodes.length);
        el.style.setProperty("--fill", Math.max(0, el.offsetHeight - 16) + "px");
        return;
      }
      const limit = window.innerHeight * 0.72;
      const top = el.getBoundingClientRect().top;
      let n = 0;
      let y = 0;
      nodes.forEach((nd, i) => {
        const r = nd.getBoundingClientRect();
        const c = r.top + r.height / 2;
        if (c < limit) {
          n = i + 1;
          y = c - top;
        }
      });
      setReached(n);
      el.style.setProperty("--fill", Math.max(0, y - 8) + "px");
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
    <div>
      <p className="jr-legend" aria-hidden="true">
        <span className="lg-done">Completed</span>
        <span className="lg-now">Current</span>
        <span className="lg-next">Upcoming</span>
      </p>
      <ol className="jr" ref={ol}>
        {items.map((m, i) => (
          <li key={m.title} className={`jr-item jr-${m.status}${i < reached ? " reached" : ""}`}>
            <span className="jr-when">{m.when}</span>
            <span className="jr-node" aria-hidden="true" />
            <div className="glass jr-card">
              <h4>{m.title}</h4>
              {m.text && <p>{m.text}</p>}
              {TAG[m.status] && <span className={`jr-tag jr-tag-${m.status}`}>{TAG[m.status]}</span>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
