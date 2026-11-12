import type { ReactNode } from "react";
import Section from "./Section";
import Reveal from "./Reveal";
import SafeImage from "./SafeImage";
import CertificateGrid from "./CertificateGrid";
import AwardCard from "./AwardCard";
import Journey from "./Journey";
import { certificates, type Achievement, type AchievementStatus } from "../data/achievements";
import { awards } from "../data/awards";
import { milestones } from "../data/milestones";
import { projects } from "../data/projects";
import { skillGroups } from "../data/skills";
import { formatDate } from "../lib/dates";
import { resolvePreview } from "../lib/certificateImage";

const statusLabel: Record<AchievementStatus, string> = {
  completed: "Completed",
  deployed: "Deployed",
  "in-progress": "In progress",
  accepted: "Accepted",
};

const icon = {
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
const CertIcon = () => (
  <svg {...icon}>
    <path d="M6 3h9l4 4v14H6z" />
    <path d="M14 3v5h5" />
    <path d="M9 13h7M9 17h5" />
  </svg>
);

/** Pinned certificates first (by pin number), then the rest in listed order. Dates are ignored. */
function pinnedFirst(list: Achievement[]) {
  const pinned = list.filter((a) => a.pin !== undefined).sort((a, b) => (a.pin ?? 0) - (b.pin ?? 0));
  const rest = list.filter((a) => a.pin === undefined);
  return [...pinned, ...rest];
}

function Meta({ a }: { a: Achievement }) {
  const d = formatDate(a.date);
  return (
    <p className="ach-meta">
      <span>{a.source}</span>
      {d && <time dateTime={a.date}>{d}</time>}
      {a.status && <span className={`pill st-${a.status}`}>{statusLabel[a.status]}</span>}
    </p>
  );
}

function Group({ label, count, children }: { label: string; count: number; children: ReactNode }) {
  return (
    <Reveal className="ach-group">
      <h3 className="group-label">
        {label} <span className="cnt">{count}</span>
      </h3>
      {children}
    </Reveal>
  );
}

function Cert({ a }: { a: Achievement }) {
  const open = a.file ?? a.verify ?? a.link;
  const preview = resolvePreview(a.image, a.file);
  const thumb = (
    <>
      <span className="cert-ic">
        <CertIcon />
      </span>
      <SafeImage src={preview} alt={`${a.title} certificate preview`} sizes="(max-width:700px) 100vw, 380px" className="thumb-img" />
      {!preview && <span className="cert-ph-label">{a.source}</span>}
      {open && <span className="thumb-hint">{a.file ? "Open PDF" : "Open credential"} &#8599;</span>}
    </>
  );
  return (
    <article className="glass cert">
      {open ? (
        <a className="cert-thumb" href={open} target="_blank" rel="noopener noreferrer" aria-label={`Open ${a.title} ${a.file ? "certificate" : "credential"}`}>
          {thumb}
        </a>
      ) : (
        <div className="cert-thumb">{thumb}</div>
      )}
      <div className="cert-body">
        <h4>{a.title}</h4>
        <Meta a={a} />
        {a.programme && <p className="cert-prog">{a.programme}</p>}
        {a.description && <p>{a.description}</p>}
        {a.skills && a.skills.length > 0 && (
          <ul className="chips" aria-label="Skills">
            {a.skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        )}
        <div className="cert-actions">
          {a.file && (
            <a className="btn ghost sm" href={a.file} target="_blank" rel="noopener noreferrer">
              View PDF
            </a>
          )}
          {a.file && (
            <a className="btn ghost sm" href={a.file} download>
              Download
            </a>
          )}
          {a.verify && (
            <a className="btn primary sm" href={a.verify} target="_blank" rel="noopener noreferrer">
              Verify certificate &#8599;
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Proof() {
  const stats = [
    { value: projects.filter((p) => p.visible).length, label: "Projects" },
    { value: skillGroups.reduce((n, g) => n + g.items.length, 0), label: "Technologies" },
  ];
  const journey = milestones.map((m) => ({
    title: m.title,
    text: m.text,
    status: m.status,
    when: m.when ?? formatDate(m.date),
  }));
  const empty = certificates.length + awards.length + journey.length === 0;

  return (
    <Section id="proof" index="05" eyebrow="Highlights" title="Achievements" intensity={0.55} focus={[0.75, 0.45]}>
      <Reveal>
        <ul className="stat-strip">
          {stats.map((s) => (
            <li key={s.label}>
              <b>{s.value}</b> {s.label}
            </li>
          ))}
        </ul>
      </Reveal>

      {certificates.length > 0 && (
        <Group label="Certificates" count={certificates.length}>
          <CertificateGrid limit={6}>
            {pinnedFirst(certificates).map((a) => (
              <Cert key={a.title + a.source} a={a} />
            ))}
          </CertificateGrid>
        </Group>
      )}

      {awards.length > 0 && (
        <Group label="Awards & Recognition" count={awards.length}>
          <div className="aw-grid">
            {awards.map((a) => (
              <AwardCard key={a.title} a={a} />
            ))}
          </div>
        </Group>
      )}

      {journey.length > 0 && (
        <Group label="Milestones" count={journey.length}>
          <Journey items={journey} />
        </Group>
      )}

      {empty && <p className="prose muted">Certificates, awards and milestones will appear here.</p>}
    </Section>
  );
}
