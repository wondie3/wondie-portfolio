"use client";

import { useState, type ReactNode } from "react";
import { projectTypes } from "../data/projectTypes";

export default function ProjectGrid({
  counts,
  children,
}: {
  counts: Record<string, number>;
  children: ReactNode;
}) {
  const [type, setType] = useState<string>("all");
  return (
    <>
      <p className="sr-only" role="status">
        Showing {counts[type] ?? 0} projects
      </p>
      <div className="tabs filter-tabs" role="group" aria-label="Filter projects by type">
        {projectTypes.map((t) => (
          <button
            key={t.id}
            type="button"
            className="tab"
            aria-pressed={type === t.id}
            onClick={() => setType(t.id)}
          >
            {t.label} <span className="n">{counts[t.id] ?? 0}</span>
          </button>
        ))}
      </div>
      <div className="project-grid" data-filter={type}>
        {children}
      </div>
    </>
  );
}
