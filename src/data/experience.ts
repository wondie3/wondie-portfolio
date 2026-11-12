// Experience, education and activities. Add an entry by copying one block.
// Dates: "2025", "2025-03" or "2026-11-27". end: "present" marks a current role.
// status: "current" | "upcoming" | "completed" (shown as a tag; current is automatic when end is "present").
// Logos: put the file in public/images/logos/ named after the organization (see README note) or set `logo`.
// Leave a field out and it is simply not shown. Nothing here is invented.
export type EntryStatus = "current" | "upcoming" | "completed";

export type Entry = {
  title: string;
  org: string;
  start?: string;
  end?: string; // "2026-06" or "present"
  status?: EntryStatus;
  featured?: boolean; // also shown in the About card
  logo?: string; // e.g. "/images/logos/my-logo.png"
  note?: string; // one short line
  project?: { label: string; text: string };
  focus?: string[]; // short tags
  responsibilities?: string[]; // collapsible list, edit as your activities develop
  link?: string;
};

export type Activity = {
  title: string;
  tag: string; // e.g. Learning, Community, Growth
  icon: "code" | "spark" | "leaf" | "growth";
  note?: string;
};

export const education: Entry[] = [
  {
    title: "Computer Science",
    org: "Addis Ababa University",
    start: "2024",
    end: "present",
    note: "Third-year student",
  },
];

// Experience & Leadership (timeline)
export const experience: Entry[] = [
  {
    title: "Campus Ambassador",
    org: "Eco Friend Global Movement",
    start: "2026-10",
    end: "present",
    status: "current",
    featured: true,
    focus: ["Leadership", "Environmental awareness", "Campus engagement"],
    responsibilities: [
      "Support the organization\u2019s environmental awareness and engagement initiatives.",
      "Help promote environmental activities and encourage student participation.",
      "Share relevant campaigns and opportunities within the campus community.",
      "Support communication between the organization and the student community.",
    ],
  },
  {
    title: "Selected Participant",
    org: "Dev3pack Global Hackathon 2026",
    start: "2026-11-27",
    end: "2026-11-29",
    status: "upcoming", // change to "completed" after the event
    note: "Accepted participant.",
    project: {
      label: "Planned project",
      text: "AI-powered On-Chain Governance Assistant, exploring Solana Realms integration.",
    },
    focus: ["AI", "On-chain governance", "Solana Realms"],
  },
];

// Activities & Involvement (cards). Empty = group hidden.
export const activities: Activity[] = [
  { title: "Web3 & Solana development", tag: "Learning", icon: "code" },
  { title: "AI & technology", tag: "Learning", icon: "spark" },
  { title: "Environmental club & tree planting", tag: "Community", icon: "leaf" },
  { title: "Continuous technical learning", tag: "Growth", icon: "growth" },
];
