// Awards & recognition: genuine, verifiable items only. Empty list = group hidden.
// Dates: "2026" or "2026-11". Logos: public/images/logos/<organization-name>.png (or set `logo`).
// logoOrg: look the logo up under a different name (so one file can be shared with Experience).
export type AwardIcon = "trophy" | "star" | "spark" | "code";

export type Award = {
  title: string;
  org: string;
  label: string; // recognition label, e.g. "Selected participant"
  date?: string;
  icon: AwardIcon;
  logo?: string;
  logoOrg?: string;
  note?: string;
  link?: string;
};

export const awards: Award[] = [
  {
    title: "Dev3pack Global Hackathon 2026",
    org: "Dev3pack",
    label: "Selected participant",
    date: "2026-11",
    icon: "spark",
    logoOrg: "Dev3pack Global Hackathon 2026",
  },
  {
    title: "GitHub Student Developer Pack",
    org: "GitHub Education",
    label: "Application approved",
    date: "2026",
    icon: "code",
  },
];
