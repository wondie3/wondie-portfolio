import type { ReactNode } from "react";
import Section from "./Section";
import Reveal from "./Reveal";
import SafeImage from "./SafeImage";
import { education, experience, activities, type Entry, type EntryStatus, type Activity } from "../data/experience";
import { formatPeriod } from "../lib/dates";
import { resolveLogo } from "../lib/logos";

const statusLabel: Record<EntryStatus, string> = {
  current: "Current",
  upcoming: "Upcoming",
  completed: "Completed",
};

const statusOf = (e: Entry): EntryStatus | undefined => e.status ?? (e.end === "present" ? "current" : undefined);
const initials = (org: string) =>
  org
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

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
const ICONS: Record<Activity["icon"], ReactNode> = {
  code: (
    <svg {...svg}>
      <path d="m8 8-5 4 5 4M16 8l5 4-5 4M14 5l-4 14" />
    </svg>
  ),
  spark: (
    <svg {...svg}>
      <path d="M11 3l1.8 5.2L18 10l-5.2 1.8L11 17l-1.8-5.2L4 10l5.2-1.8z" />
      <path d="M19 3v4M17 5h4" />
    </svg>
  ),
  leaf: (
    <svg {...svg}>
      <path d="M20 4C10 4 5 9 5 15a5 5 0 0 0 5 5c6 0 10-5 10-16z" />
      <path d="M5 20c2-5 5-8 9-10" />
    </svg>
  ),
  growth: (
    <svg {...svg}>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </svg>
  ),
};

function Logo({ org, logo }: { org: string; logo?: string }) {
  return (
    <span className="logo">
      <span aria-hidden="true">{initials(org)}</span>
      <SafeImage src={resolveLogo(org, logo)} alt="" sizes="52px" className="logo-img" />
    </span>
  );
}

function Status({ s }: { s?: EntryStatus }) {
  if (!s) return null;
  return (
    <span className={`pill st2-${s}`}>
      <i /> {statusLabel[s]}
    </span>
  );
}

function When({ e }: { e: Entry }) {
  const period = formatPeriod(e.start, e.end);
  return (
    <div className="tl-when">
      {period && <time>{period}</time>}
      <Status s={statusOf(e)} />
    </div>
  );
}

function TimelineItem({ e }: { e: Entry }) {
  const s = statusOf(e);
  return (
    <li className={`tl-item${s ? " tl-" + s : ""}`}>
      <Reveal>
        <article className="glass tl-card">
          <header className="tl-head">
            <Logo org={e.org} logo={e.logo} />
            <div className="tl-title">
              <h4>{e.title}</h4>
              <p className="tl-org">{e.org}</p>
            </div>
            <When e={e} />
          </header>
          {e.note && <p className="tl-note">{e.note}</p>}
          {e.project && (
            <p className="tl-project">
              <span>{e.project.label}</span>
              {e.project.text}
            </p>
          )}
          {e.focus && e.focus.length > 0 && (
            <ul className="chips" aria-label="Focus areas">
              {e.focus.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          )}
          {e.responsibilities && e.responsibilities.length > 0 && (
            <details className="tl-more">
              <summary>Responsibilities</summary>
              <ul>
                {e.responsibilities.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </details>
          )}
          {e.link && (
            <a className="entry-link" href={e.link} target="_blank" rel="noopener noreferrer">
              Learn more &#8599;
            </a>
          )}
        </article>
      </Reveal>
    </li>
  );
}

export default function Experience() {
  return (
    <Section id="experience" index="04" eyebrow="Journey" title="Experience & activities" intensity={0.5} focus={[0.2, 0.4]}>
      {education.length > 0 && (
        <Reveal className="group">
          <h3 className="group-label">Education</h3>
          <div className="edu-list">
            {education.map((e) => (
              <div key={e.title + e.org} className="glass edu">
                <Logo org={e.org} logo={e.logo} />
                <div className="edu-text">
                  <h4>{e.title}</h4>
                  <p>
                    {e.org}
                    {e.note ? ` \u00b7 ${e.note}` : ""}
                  </p>
                </div>
                <When e={e} />
              </div>
            ))}
          </div>
        </Reveal>
      )}

      {experience.length > 0 && (
        <div className="group">
          <Reveal>
            <h3 className="group-label">Experience &amp; Leadership</h3>
          </Reveal>
          <ol className="xp-timeline">
            {experience.map((e) => (
              <TimelineItem key={e.title + e.org} e={e} />
            ))}
          </ol>
        </div>
      )}

      {activities.length > 0 && (
        <div className="group">
          <Reveal>
            <h3 className="group-label">Activities &amp; Involvement</h3>
          </Reveal>
          <ul className="act-grid">
            {activities.map((a) => (
              <li key={a.title}>
                <Reveal>
                  <div className="glass act">
                    <span className="act-ic">{ICONS[a.icon]}</span>
                    <div>
                      <p className="act-tag">{a.tag}</p>
                      <h4>{a.title}</h4>
                      {a.note && <p className="act-note">{a.note}</p>}
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
