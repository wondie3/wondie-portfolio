"use client";

import { Children, useId, useRef, useState, type ReactNode } from "react";

/** Shows the first `limit` cards, with a Show all / Show less button for the rest. */
export default function CertificateGrid({ children, limit = 6 }: { children: ReactNode; limit?: number }) {
  const items = Children.toArray(children);
  const [all, setAll] = useState(false);
  const id = useId();
  const gridRef = useRef<HTMLDivElement>(null);
  const hasMore = items.length > limit;
  const shown = all || !hasMore ? items : items.slice(0, limit);

  function toggle() {
    if (all) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      gridRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }
    setAll((v) => !v);
  }

  return (
    <>
      <div className="cert-grid" id={id} ref={gridRef}>
        {shown}
      </div>
      {hasMore && (
        <div className="cert-more">
          <button type="button" className="btn ghost" aria-expanded={all} aria-controls={id} onClick={toggle}>
            {all ? "Show less" : `Show all certificates (${items.length})`}
          </button>
        </div>
      )}
    </>
  );
}
