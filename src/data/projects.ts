export type ProjectType = "desktop" | "web" | "mobile";
export type ProjectStatus = "in-progress" | "completed";

export type Project = {
  slug: string;
  type: ProjectType;
  title: string;
  visible: boolean;
  status?: ProjectStatus;
  statusLabel?: string; // overrides the status badge text, e.g. "Completed Prototype"
  description: string;
  tech: string[];
  image?: string;
  repo?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    slug: "amole",
    type: "mobile",
    title: "Amole",
    visible: true,
    status: "completed",
    statusLabel: "Completed Prototype",
    description:
      "An Ethiopian food delivery mobile app prototype built with Flutter and Supabase: browse restaurants and menus, save favorites, and use a cart and checkout interface, with accounts and the restaurant catalog on Supabase.",
    tech: ["Flutter", "Dart", "Supabase", "PostgreSQL", "Riverpod", "GoRouter", "SharedPreferences"],
    repo: "https://github.com/wondie3/Amole",
  },
  {
    slug: "ethiotour-connect",
    type: "desktop",
    title: "EthioTour Connect",
    visible: true,
    status: "completed",
    description:
      "A Java Swing prototype for managing Ethiopian destinations, tours, bookings, local pricing, payments, and calendar information.",
    tech: ["Java", "Swing", "Maven", "JDBC", "PostgreSQL", "SQLite", "HikariCP", "FlatLaf", "Chapa test payments"],
    repo: "https://github.com/wondie3/EthioTour-Connect",
  },
  {
    slug: "wondie-car-rental",
    type: "web",
    title: "Wondie Car Rental",
    visible: true,
    status: "in-progress",
    description:
      "A vehicle showcase site with a rental search preview and date validation. Live availability, bookings and email delivery are not implemented yet.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "Neon", "Three.js", "Motion", "Zod"],
    repo: "https://github.com/wondie3/wondie-car-rental",
    demo: "https://wondie-car-rental.vercel.app/",
  },
  {
    slug: "student-management-system",
    type: "desktop",
    title: "Student Management System",
    visible: true,
    status: "completed",
    description:
      "A desktop student-record manager with login, role-based accounts, search and filter, dashboard statistics, and CSV export.",
    tech: ["C++17", "Qt 6 Widgets", "SQLite", "CMake"],
    repo: "https://github.com/wondie3/StudentManagementQt",
  },
  {
    slug: "codealpha-sudoku-solver",
    type: "desktop",
    title: "CodeAlpha Sudoku Solver",
    visible: true,
    status: "completed",
    description:
      "A desktop Sudoku app that validates and solves 9×9 puzzles, saves puzzle files, and exports CSV.",
    tech: ["C++17", "Qt 6 Widgets", "Qt Concurrent", "CMake", "QtTest"],
    repo: "https://github.com/wondie3/CodeAlpha_SudokuSolver",
  },
  {
    slug: "codealpha-banking-system",
    type: "desktop",
    title: "CodeAlpha Banking System",
    visible: true,
    status: "completed",
    description:
      "A desktop banking demo with savings and checking accounts, deposits, withdrawals, transfers, PIN sign-in, and statement export.",
    tech: ["C++17", "Qt 6 Widgets", "CMake", "QtTest"],
    repo: "https://github.com/wondie3/CodeAlpha_BankingSystem",
  },
];
