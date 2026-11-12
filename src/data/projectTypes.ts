import type { ProjectType } from "./projects";

// Filter buttons, in display order. Edit labels here.
export const projectTypes: { id: "all" | ProjectType; label: string }[] = [
  { id: "all", label: "All projects" },
  { id: "desktop", label: "Desktop applications" },
  { id: "web", label: "Web applications" },
  { id: "mobile", label: "Mobile applications" },
];
