// Achievements. Empty lists are hidden automatically.
// Only add real items. Dates: "2025", "2025-03" or "2025-03-21".
// status: "completed" | "deployed" | "in-progress" | "accepted"  (shown as a tag)
// project: a slug from projects.ts to add a "See project" link instead of repeating details.
export type AchievementStatus = "completed" | "deployed" | "in-progress" | "accepted";

export type Achievement = {
  title: string;
  source: string; // issuing organization or where it happened
  date?: string;
  status?: AchievementStatus;
  pin?: number; // certificates: pinned ones show first, in this order, regardless of date
  project?: string;
  description?: string;
  programme?: string;
  skills?: string[];
  image?: string; // certificate preview, e.g. "/certificates/name.png"
  file?: string; // original PDF, e.g. "/certificates/name.pdf"
  verify?: string; // verification URL
  link?: string; // any other proof URL
};

// To add a certificate, copy one block below and edit it.
export const certificates: Achievement[] = [
  {
    title: "Frontend Developer (React)",
    source: "HackerRank",
    pin: 4,
    date: "2026-11-08",
    skills: ["React", "Frontend Development"],
    file: "/certificates/hackerrank-frontend-developer-react.pdf",
    verify: "https://www.hackerrank.com/certificates/c578ae41824c",
  },
  {
    title: "Frontend Development Associate",
    source: "insiderOne University",
    pin: 1,
    date: "2026-11-06",
    programme: "8 units and an assessed project",
    skills: ["Frontend Development", "JavaScript", "React", "HTML", "CSS"],
    image: "/certificates/frontend-development-associate.png",
    file: "/certificates/frontend-development-associate.pdf",
    verify: "https://insiderone.in/c/IO-FED-DPFDK973",
  },
  {
    title: "Node.js (Intermediate)",
    source: "HackerRank",
    pin: 6,
    date: "2026-11-09",
    skills: ["Node.js", "JavaScript", "Backend Development"],
    file: "/certificates/hackerrank-nodejs-intermediate.pdf",
    verify: "https://www.hackerrank.com/certificates/73b9c37bb2e4",
  },
  {
    title: "Java (Basic)",
    source: "HackerRank",
    date: "2026-11-09",
    skills: ["Java", "Object-Oriented Programming"],
    file: "/certificates/hackerrank-java-basic.pdf",
    verify: "https://www.hackerrank.com/certificates/3541b5491248",
  },
  {
    title: "Python Programming Associate",
    source: "insiderOne University",
    date: "2026-11-06",
    programme: "8 units and an assessed project",
    skills: ["Python", "Debugging", "Unit Testing"],
    image: "/certificates/python-programming-associate.png",
    file: "/certificates/python-programming-associate.pdf",
    verify: "https://insiderone.in/c/IO-PYA-5YWYK3VD",
  },
  {
    title: "AI Fundamentals: Foundations for Understanding AI",
    source: "IBM SkillsBuild",
    pin: 3,
    date: "2026-11-09",
    skills: ["Artificial Intelligence", "AI Fundamentals"],
    image: "/certificates/ibm-ai-fundamentals.png",
    file: "/certificates/ibm-ai-fundamentals.pdf",
    verify: "https://www.credly.com/badges/15d1dfaa-18ae-460e-afcf-57fcb50c0598",
  },
  {
    title: "AI Fundamentals: Foundations for Understanding AI",
    source: "Cisco Networking Academy",
    pin: 2,
    date: "2026-11-09",
    skills: ["Artificial Intelligence", "AI Fundamentals"],
    image: "/certificates/cisco-ai-fundamentals.png",
    file: "/certificates/cisco-ai-fundamentals.pdf",
    verify: "https://www.credly.com/badges/800ef056-34d2-469a-b23f-b493e4b25577",
  },
  {
    title: "Introduction to Cybersecurity",
    source: "Cisco Networking Academy",
    pin: 5,
    date: "2026-11-07",
    status: "completed",
    programme: "Student-level Certificate of Course Completion",
    image: "/certificates/introduction-to-cybersecurity.png",
    file: "/certificates/introduction-to-cybersecurity.pdf",
    verify: "https://www.credly.com/badges/89aed9d3-6d31-4a6c-8aba-b3f8b78c8eda",
  },
  {
    title: "Introduction to Programming",
    source: "Kaggle",
    date: "2026-11-07",
    skills: ["Programming Fundamentals"],
    image: "/certificates/kaggle-intro-to-programming.png",
    verify: "https://www.kaggle.com/learn/certification/wondatirhunegnaw/intro-to-programming",
  },
  {
    title: "Python Coder",
    source: "Kaggle",
    programme: "Kaggle badge",
    image: "/certificates/kaggle-python-coder.png",
    verify: "https://www.kaggle.com/certification/badges/wondatirhunegnaw/30",
  },
];

// Awards and milestones now live in src/data/awards.ts and src/data/milestones.ts
