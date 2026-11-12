import type { ReactNode } from "react";
import Section from "./Section";
import Reveal from "./Reveal";
import ContactForm from "./ContactForm";
import { personal } from "../data/personal";

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

const MailIcon = () => (
  <svg {...svg}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);
const PinIcon = () => (
  <svg {...svg}>
    <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

function InfoCard({ icon, label, value, href, external }: { icon: ReactNode; label: string; value: string; href?: string; external?: boolean }) {
  const inner = (
    <>
      <span className="ic">{icon}</span>
      <span className="info-text">
        <span className="info-label">{label}</span>
        <span className="info-value">{value}</span>
      </span>
    </>
  );
  return href ? (
    <a className="glass info-card" href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {inner}
    </a>
  ) : (
    <div className="glass info-card">{inner}</div>
  );
}

export default function Contact() {
  return (
    <Section id="contact" index="06" eyebrow="Contact" title={"Let\u2019s talk"} intensity={0.9} focus={[0.5, 0.55]}>
      <Reveal>
        <p className="prose">Have a project, an opportunity or a question? Send me a message and I will get back to you.</p>
      </Reveal>
      <div className="contact-grid">
        <Reveal>
          <div className="info-list">
            <InfoCard icon={<MailIcon />} label="Email" value={personal.email} href={"mailto:" + personal.email} />
            <InfoCard icon={<span className="glyph">in</span>} label="LinkedIn" value="Wondatir Hunegnaw" href={personal.social.linkedin} external />
            <InfoCard icon={<span className="glyph">{"</>"}</span>} label="GitHub" value="github.com/wondie3" href={personal.social.github} external />
            <InfoCard icon={<PinIcon />} label="Location" value={personal.location} />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
