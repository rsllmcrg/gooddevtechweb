export type TeamMember = {
  name: string;
  role: string;
  /** Path under /public. Falls back to a placeholder avatar when absent. */
  photo?: string;
};

/**
 * PLACEHOLDER — every entry is a stand-in pending the founder's real team
 * roster and headshots. The count here (4) is arbitrary; the team grid
 * itself is built and verified to hold up cleanly anywhere from 1 to 6
 * members, so entries can be added or removed freely.
 */
export const team: TeamMember[] = [
  { name: "[Team member 1]", role: "[Role]" },
  { name: "[Team member 2]", role: "[Role]" },
  { name: "[Team member 3]", role: "[Role]" },
  { name: "[Team member 4]", role: "[Role]" },
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
