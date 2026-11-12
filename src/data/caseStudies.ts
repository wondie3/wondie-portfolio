// Case-study content, keyed by the project slug in projects.ts.
// A project only shows a "View case study" button if it has an entry here.
// Keep every sentence factual: add sections, edit text, or remove entries freely.
// gallery: "phone" shows the screenshots in a phone frame (for portrait app screenshots).
export type CaseSection = { title: string; body?: string; list?: string[] };
export type CaseStudy = {
  category: string;
  tagline?: string;
  gallery?: "phone";
  captions?: string[]; // one per screenshot, in file order
  sections: CaseSection[];
};

export const caseStudies: Record<string, CaseStudy> = {
  "amole": {
    category: "Mobile application",
    tagline: "Good food, delivered.",
    gallery: "phone",
    captions: ["Home", "Discovery", "Restaurant menu", "Dish details", "Cart & checkout", "Profile & orders"],
    sections: [
      {
        title: "Overview",
        body: "A Flutter prototype that explores a modern food ordering experience: discovering restaurants, browsing menus, viewing dish details, managing favorites, and working with a cart and checkout interface.",
      },
      {
        title: "Implemented features",
        list: [
          "Restaurant discovery and browsing",
          "Restaurant search, filtering and sorting",
          "Restaurant menus and dish details",
          "Favorites management",
          "Shopping cart",
          "Checkout interface",
          "Email and password authentication",
          "Email verification",
          "Saved customer addresses",
          "Server-loaded restaurant and dish catalog",
          "Demo order history and cancellation interface",
          "Offline sample-data fallback",
        ],
      },
      {
        title: "Backend and data",
        body: "Supabase authentication and a hosted PostgreSQL database handle account management, the restaurant catalog and saved customer addresses.",
      },
      {
        title: "Prototype scope",
        body: "Checkout and order history are demonstration interfaces. Payment processing and real order fulfillment are not implemented.",
      },
    ],
  },
  "ethiotour-connect": {
    category: "Desktop application",
    sections: [
      {
        title: "Overview",
        body: "A Java Swing prototype for managing Ethiopian destinations, tours, bookings, local pricing, payments and calendar information.",
      },
      {
        title: "Technology",
        body: "Built with Java and Swing, using Maven for the build, JDBC with PostgreSQL and SQLite for data, HikariCP for connections and FlatLaf for the interface look. Payments use Chapa test payments.",
      },
      { title: "Status", body: "Finished prototype." },
    ],
  },
  "wondie-car-rental": {
    category: "Web application",
    sections: [
      {
        title: "Overview",
        body: "A vehicle showcase site with a rental search preview and date validation.",
      },
      {
        title: "Technology",
        body: "Built with Next.js, React, TypeScript and Tailwind CSS, with Prisma and Neon for data, Three.js, Motion for animation and Zod for validation.",
      },
      {
        title: "Status",
        body: "In progress. Live availability, bookings and email delivery are not implemented yet.",
      },
    ],
  },
  "student-management-system": {
    category: "Desktop application",
    sections: [
      {
        title: "Overview",
        body: "A desktop application for managing student records, designed around a dashboard interface.",
      },
      {
        title: "Implementation",
        body: "The repository documents login and local role management, student CRUD, duplicate-ID protection, search, department filtering, sortable columns, dashboard statistics and CSV export.",
      },
      {
        title: "Storage and interface",
        body: "Uses SQLite persistence, light and dark appearance modes, a fade-in animation and a custom SVG application icon.",
      },
    ],
  },
  "codealpha-sudoku-solver": {
    category: "Desktop application",
    sections: [
      {
        title: "Overview",
        body: "A desktop Sudoku app that validates and solves 9\u00d79 puzzles.",
      },
      {
        title: "Features",
        body: "Saves puzzle files and exports CSV.",
      },
      {
        title: "Technology",
        body: "Written in C++17 with Qt 6 Widgets and Qt Concurrent, built with CMake and tested with QtTest.",
      },
    ],
  },
  "codealpha-banking-system": {
    category: "Desktop application",
    sections: [
      {
        title: "Overview",
        body: "A desktop banking demo with savings and checking accounts.",
      },
      {
        title: "Features",
        body: "Deposits, withdrawals, transfers, PIN sign-in and statement export.",
      },
      {
        title: "Technology",
        body: "Written in C++17 with Qt 6 Widgets, built with CMake and tested with QtTest.",
      },
    ],
  },
};
