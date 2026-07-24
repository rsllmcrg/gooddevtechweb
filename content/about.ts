export type Founder = {
  name: string;
  role: string;
  /** Path under /public. Falls back to a placeholder avatar when absent. */
  photo?: string;
  bio: string;
};

/**
 * The one-paragraph origin story shown at the top of the About page.
 * Real, founder-confirmed copy — not a placeholder.
 */
export const foundingStory =
  "GoodDev Technology was founded in 2026 by two computer engineers who " +
  "wanted to build software for a living — not as a side effect of someone " +
  "else's roadmap, but as the work itself. We're based in Batangas, and we " +
  "build for clients here in the Philippines and abroad.";

/**
 * The two founders. Real names and bios.
 *
 * NOTE: Stephen's focus (everything after the first sentence) is a
 * placeholder draft — invented to be revised, not founder-confirmed. Swap
 * it for his real specialty when he confirms it.
 */
export const founders: Founder[] = [
  {
    name: "Roselle Anne Macaraig Reyes",
    role: "Founder",
    bio:
      "Computer Engineering, Batangas State University (2023). Three years " +
      "building production software — from real-time embedded systems for " +
      "consumer hardware to full-stack web platforms handling inventory and " +
      "logistics at scale. Comfortable across the whole stack, from firmware " +
      "to React.",
  },
  {
    name: "Stephen Rouver Coronel",
    role: "Founder",
    bio:
      "Computer Engineering at the University of Batangas, and the other half " +
      "of GoodDev's two-person team. He works at the front of the stack — the " +
      "web and mobile interfaces clients and their users actually touch — and " +
      "on turning rough requirements into something you can click through. " +
      "Currently finishing his degree while shipping alongside it.",
  },
];

export const processSteps = [
  {
    title: "Discover",
    description:
      "A call to learn your business, users, and constraints — scheduled within hours that work for your timezone, not just ours.",
  },
  {
    title: "Design & scope",
    description:
      "A written plan and a number, in English, before any code — so you know exactly what you're agreeing to.",
  },
  {
    title: "Build",
    description:
      "Regular async updates and a single point of contact, so you're never waiting on a black box.",
  },
  {
    title: "Launch & support",
    description:
      "We stay reachable after go-live, with response times that don't depend on catching us awake.",
  },
];
