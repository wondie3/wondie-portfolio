// Skills grouped for display. Optional logo: "/images/logos/react.svg".
export type Skill = { name: string; note?: string; logo?: string };
export type SkillGroup = { title: string; items: Skill[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "Languages",
    items: [
      { name: "C++" },
      { name: "Java" },
      { name: "SQL" },
      { name: "Python", note: "learning" },
    ],
  },
  {
    title: "Web",
    items: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "JavaScript" },
      { name: "React" },
      { name: "Node.js" },
    ],
  },
  { title: "Mobile & Desktop", items: [{ name: "Flutter" }, { name: "Qt" }] },
  {
    title: "Databases",
    items: [{ name: "MySQL" }, { name: "SQLite" }, { name: "PostgreSQL" }],
  },
  {
    title: "Tools",
    items: [{ name: "Git" }, { name: "GitHub" }, { name: "VS Code" }],
  },
];
