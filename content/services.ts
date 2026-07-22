export type Service = {
  slug: string;
  title: string;
  /** Short one-liner — used in compact teasers like the Home page strip. */
  teaser: string;
  whatItIs: string;
  whoItSuits: string;
  howItStarts: string;
};

/**
 * The five services GoodDev Technology offers. Single source of truth —
 * referenced by the Services page, the Home page teaser strip, and the
 * Contact page (via the `service` query param each scope-call CTA links
 * with, e.g. /contact?service=web-apps).
 */
export const services: Service[] = [
  {
    slug: "web-apps",
    title: "Web Apps",
    teaser: "Sites, portals, and dashboards built to last.",
    whatItIs:
      "Custom web applications, customer portals, dashboards, and marketing sites — built on modern, maintainable foundations.",
    whoItSuits:
      "SMEs launching or refreshing an online presence; startups building a first version of their product.",
    howItStarts:
      "A short discovery call to understand the goal, users, and constraints — followed by a scoped proposal, not a guess.",
  },
  {
    slug: "mobile",
    title: "Mobile",
    teaser: "iOS and Android, native where it matters.",
    whatItIs:
      "Native-feeling iOS and Android apps, built from a single codebase where it makes sense and natively where it doesn't.",
    whoItSuits:
      "Consumer products, field-service tools, and companion apps to an existing platform.",
    howItStarts:
      "We review your existing product (if any) and target platforms, then scope the first release around what actually needs to ship.",
  },
  {
    slug: "integrations",
    title: "Integrations",
    teaser: "Connecting the systems you already run.",
    whatItIs:
      "Connecting the systems you already run — payment gateways, CRMs, logistics platforms, government and banking APIs — so data stops living in five different spreadsheets.",
    whoItSuits:
      "Businesses whose tools don't talk to each other yet, or who need a custom bridge between an off-the-shelf platform and an internal system.",
    howItStarts:
      "We map what needs to connect to what, flag anything fragile before we touch it, then build the integration in pieces you can verify.",
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    teaser: "Infrastructure and pipelines that don't depend on one person.",
    whatItIs:
      "Infrastructure, CI/CD, and deployment pipelines that don't depend on one person remembering how they work.",
    whoItSuits:
      "Teams shipping manually, paying for infrastructure they don't understand, or inheriting a system with no documentation.",
    howItStarts:
      "A short infrastructure review — what's running, what it costs, what breaks — before we touch anything in production.",
  },
  {
    slug: "support-team-extension",
    title: "Support & Team Extension",
    teaser: "A team that answers when something breaks.",
    whatItIs:
      "Ongoing maintenance retainers for software we — or someone else — already built, or embedded engineers who work inside your existing team.",
    whoItSuits:
      'Teams who\'ve outgrown "whoever built it originally is unreachable," or who need extra senior capacity without a long hiring cycle.',
    howItStarts:
      "A conversation about what's actually needed — a retainer sized to your product, or a specific skill set added to your team.",
  },
];
