/**
 * PLACEHOLDER — the projects below are illustrative stand-ins, not real
 * client engagements. Names, results, and metrics are invented to show the
 * page layout. Replace every entry (and drop this notice) with real,
 * permitted case studies before launch.
 */

export type Project = {
  /** Project or product name. */
  name: string;
  /** Short kind-of-work label, e.g. "Web app". */
  category: string;
  /** Year shipped, shown as small meta. */
  year: string;
  /** One- to two-sentence description of the work. */
  summary: string;
  /** Stack / discipline tags rendered as pills. */
  tags: string[];
  /** Optional headline outcome, shown on the featured project. */
  result?: string;
  /**
   * Which abstract mockup layout to draw (see components/BrowserMockup.tsx).
   * Purely decorative — no real screenshots exist yet.
   */
  variant: 1 | 2 | 3 | 4;
};

export const featuredProject: Project = {
  name: "Coastline Logistics Portal",
  category: "Web platform",
  year: "2025",
  summary:
    "A shipment-tracking and dispatch dashboard for a regional freight operator — one place for the ops team to book, route, and monitor deliveries in real time, replacing a tangle of spreadsheets and phone calls.",
  result: "Cut average dispatch time by 40% across three depots.",
  tags: ["Next.js", "TypeScript", "PostgreSQL", "Mapbox", "AWS"],
  variant: 2,
};

export const projects: Project[] = [
  {
    name: "Sari Retail POS",
    category: "Web & mobile",
    year: "2025",
    summary:
      "Point-of-sale and inventory for neighborhood retailers — offline-first on the counter, synced to a web back office for owners.",
    tags: ["React Native", "Node.js", "SQLite"],
    variant: 4,
  },
  {
    name: "MediQueue",
    category: "Web app",
    year: "2024",
    summary:
      "Appointment booking and live queue management for a multi-branch clinic group, with SMS reminders and a front-desk console.",
    tags: ["Next.js", "PostgreSQL", "Twilio"],
    variant: 3,
  },
  {
    name: "Harvest Direct",
    category: "Marketplace",
    year: "2024",
    summary:
      "A B2B marketplace connecting agricultural suppliers with wholesale buyers — catalogs, quotes, and order tracking in one place.",
    tags: ["Next.js", "GraphQL", "Stripe"],
    variant: 1,
  },
  {
    name: "Remit Ledger",
    category: "Internal tool",
    year: "2023",
    summary:
      "A reconciliation and reporting tool for a remittance firm's operations team, turning nightly batch files into clear, auditable dashboards.",
    tags: ["Python", "Django", "PostgreSQL"],
    variant: 2,
  },
];
