// Journey milestones, in the order they are shown (oldest first).
// date: "2024", "2026-10" ... or set `when` to show your own text (e.g. "Ongoing").
// status: "completed" | "current" | "upcoming". Add or remove entries freely.
export type MilestoneStatus = "completed" | "current" | "upcoming";

export type Milestone = {
  title: string;
  text?: string; // one short line
  date?: string;
  when?: string;
  status: MilestoneStatus;
};

export const milestones: Milestone[] = [
  {
    title: "Started my Computer Science journey",
    text: "Addis Ababa University. Now in my third year.",
    date: "2024",
    status: "completed",
  },
  {
    title: "Building practical software projects",
    text: "Desktop, web and mobile applications.",
    when: "Ongoing",
    status: "current",
  },
  {
    title: "Approved for the GitHub Student Developer Pack",
    date: "2026",
    status: "completed",
  },
  {
    title: "Became a Campus Ambassador",
    text: "Eco Friend Global Movement.",
    date: "2026-10",
    status: "current",
  },
  {
    title: "Expanded into React, Java and Node.js",
    text: "Backed by HackerRank skill certificates.",
    date: "2026-11",
    status: "completed",
  },
  {
    title: "Completed AI and programming credentials",
    text: "Cisco, IBM SkillsBuild, Kaggle and insiderOne.",
    date: "2026-11",
    status: "completed",
  },
  {
    title: "Selected for Dev3pack Global Hackathon 2026",
    text: "The event runs Nov 27\u201329, 2026.",
    date: "2026-11",
    status: "upcoming",
  },
];
