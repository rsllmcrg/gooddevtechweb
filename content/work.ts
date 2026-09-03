import { measureImage, type MeasuredImage } from "@/lib/images";

/**
 * Real, non-confidential project descriptions. Two rules govern this file:
 *
 *  1. Do not invent client names or metrics. Confidential engagements are
 *     described by industry and project type only — never the client's name.
 *  2. Public projects (with a `href`) may be named because they are already
 *     public.
 *
 * Keep this accurate: it represents actual technical work. Summaries and
 * tech stacks for the smaller projects were drafted from short titles —
 * confirm/adjust the specifics before launch.
 */

export type Project = {
  /** Project or product name (anonymized for confidential work). */
  name: string;
  /** Short role/kind label, e.g. "Full-stack · Logistics". */
  category: string;
  /** Plain-language description of the work delivered. */
  summary: string;
  /** Concrete contributions — accurate, no invented outcomes. */
  highlights: string[];
  /** Stack tags rendered as pills. */
  tags: string[];
  /** Public URL, when the project is public and may be named/linked. */
  href?: string;
  /** True when the client is under NDA and must stay anonymous. */
  confidential?: boolean;
  /** True to render as a large showcase row; otherwise it goes in the grid. */
  featured?: boolean;
  /**
   * A real screenshot of the shipped product. When present it is rendered in
   * place of the drawn mockup — same laptop frame, actual pixels. Measured off
   * disk so next/image reserves exact space; a missing file fails the build.
   */
  screenshot?: MeasuredImage;
  /**
   * Which abstract mockup layout to draw (see components/BrowserMockup.tsx).
   * Only used when there is no `screenshot` to show instead.
   */
  variant?: 1 | 2 | 3 | 4;
};

/** Shown on the page because at least one project below is anonymized. */
export const confidentialityNote =
  "Some projects are presented anonymously to respect client confidentiality, while accurately representing the technical work delivered.";

export const projects: Project[] = [
  {
    name: "DMD Dental — Practice Management System",
    category: "Full-stack product · Dental healthcare",
    href: "https://dmddental-staging.up.railway.app/",
    featured: true,
    summary:
      "A dental practice management system that runs a clinic end to end — patients check themselves in at a kiosk and watch a live queue display, while the clinical side handles per-tooth charting, treatment planning, insurance, and billing from the same records.",
    highlights: [
      "Patient self-service check-in kiosk",
      "Live waiting-room queue display",
      "Per-tooth, per-surface clinical charting",
      "Treatment plans priced off a configurable fee schedule",
      "Insurance & HMO eligibility, invoice ageing",
      "Role-based apps for dentist, hygienist, assistant & patient",
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "REST APIs"],
    // The patient-facing kiosk. The staff side sits behind clinical
    // authentication and is deliberately not screenshotted — those screens
    // carry real patient records.
    screenshot: measureImage(
      {
        src: "/case-studies/dmd-dental-practice-management/cover.png",
        alt: 'The DMD Dental welcome kiosk, asking an arriving patient to choose "New Patient" or "Old Patient".',
      },
      "DMD Dental — Practice Management System",
    ),
  },
  {
    name: "Farmia — Logistics API Integration",
    category: "Full-stack · Logistics",
    href: "https://farmia.ph/",
    featured: true,
    summary:
      "Integrated J&T Express shipping APIs into Farmia's platform so the team could track shipments and generate waybills without leaving their dashboard.",
    highlights: [
      "J&T Express tracking API integration",
      "Automated waybill generation",
      "Shipment status synchronization",
      "Backend API development",
      "Dashboard integration",
    ],
    tags: ["Python", "Django", "REST APIs", "JavaScript", "PostgreSQL"],
    variant: 2,
  },
  {
    name: "Enterprise Supply Chain SaaS",
    category: "Full-stack product",
    confidential: true,
    featured: true,
    summary:
      "A confidential enterprise supply-chain platform. Owned complete vertical slices across frontend, backend, database migrations, and APIs — from a product-model change through migration, serializer, and API view to a typed client and the React UI.",
    highlights: [
      "Django model changes, migrations & serializers",
      "REST API endpoints",
      "Label management UI in React + TypeScript",
      "Reusable modal components",
      "Typed API client",
      "End-to-end feature ownership",
    ],
    tags: ["Python", "Django", "React", "TypeScript", "Docker", "PostgreSQL"],
    variant: 3,
  },
  {
    name: "Sari-Sari Store POS",
    category: "Point of sale · Retail",
    summary:
      "A point-of-sale and inventory app for a neighborhood sari-sari store — ring up sales, track stock, and see daily takings from a simple, touch-friendly interface.",
    highlights: [
      "Fast product search & checkout",
      "Inventory tracking",
      "Daily sales summary",
      "Receipt generation",
    ],
    tags: ["React", "Node.js", "PostgreSQL"],
    variant: 4,
  },
  {
    name: "Hardware Store POS",
    category: "Point of sale · Retail",
    summary:
      "A point-of-sale system for a hardware store, handling a large SKU catalog, variable pricing, and stock levels across a busy front counter.",
    highlights: [
      "Large SKU catalog management",
      "Barcode-based checkout",
      "Stock level tracking",
      "Sales reporting",
    ],
    tags: ["React", "Node.js", "PostgreSQL"],
    variant: 3,
  },
  {
    name: "Expense Tracker",
    category: "Web app · Finance",
    confidential: true,
    summary:
      "A private expense-tracking tool built for a client to record spending, categorize transactions, and review where the money goes over time.",
    highlights: [
      "Transaction logging & categorization",
      "Spending summaries by category",
      "Date-range reporting",
      "Private, single-tenant deployment",
    ],
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    variant: 2,
  },
  {
    name: "Medicine Ordering Site",
    category: "Web app · Healthcare",
    summary:
      "An internal medicine catalog and ordering site used by a virtual assistant to look up products and place orders quickly on a client's behalf.",
    highlights: [
      "Searchable medicine catalog",
      "Order creation & tracking",
      "VA-friendly workflow",
      "Admin management",
    ],
    tags: ["Next.js", "React", "PostgreSQL"],
    variant: 1,
  },
];
