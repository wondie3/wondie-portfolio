import type { ReactNode } from "react";
import SafeImage from "./SafeImage";
import { resolveLogo } from "../lib/logos";
import { formatDate } from "../lib/dates";
import type { Award, AwardIcon } from "../data/awards";

const svg = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};
const ICONS: Record<AwardIcon, ReactNode> = {
  trophy: (
    <svg {...svg}>
      <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z" />
      <path d="M7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4" />
    </svg>
  ),
  star: (
    <svg {...svg}>
      <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />
    </svg>
  ),
  spark: (
    <svg {...svg}>
      <path d="M11 3l1.8 5.2L18 10l-5.2 1.8L11 17l-1.8-5.2L4 10l5.2-1.8z" />
      <path d="M19 3v4M17 5h4" />
    </svg>
  ),
  code: (
    <svg {...svg}>
      <path d="m8 8-5 4 5 4M16 8l5 4-5 4M14 5l-4 14" />
    </svg>
  ),
};

const initials = (s: string) =>
  s
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export default function AwardCard({ a }: { a: Award }) {
  const date = formatDate(a.date);
  return (
    <article className="glass aw">
      <div className="aw-top">
        <span className="aw-ic">{ICONS[a.icon]}</span>
        <span className="logo">
          <span aria-hidden="true">{initials(a.org)}</span>
          <SafeImage src={resolveLogo(a.logoOrg ?? a.org, a.logo)} alt="" sizes="52px" className="logo-img" />
        </span>
      </div>
      <p className="aw-label">{a.label}</p>
      <h4>{a.title}</h4>
      <p className="aw-meta">
        <span>{a.org}</span>
        {date && <time dateTime={a.date}>{date}</time>}
      </p>
      {a.note && <p className="aw-note">{a.note}</p>}
      {a.link && (
        <a className="entry-link" href={a.link} target="_blank" rel="noopener noreferrer">
          Learn more &#8599;
        </a>
      )}
    </article>
  );
}
