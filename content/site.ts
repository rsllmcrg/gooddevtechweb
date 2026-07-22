export const siteConfig = {
  name: "GoodDev Technology",
  description: "GoodDev Technology — a Philippine software development studio.",
};

/**
 * PLACEHOLDER — every value below is a stand-in, not real business
 * information. Replace all of it (and drop this notice) before launch.
 * `email`/`phone` use formats that don't resolve to a real inbox/line on
 * purpose; social hrefs use example.com so they don't point at anyone
 * else's real profile.
 */
export const contactInfo = {
  city: "Manila, Philippines",
  email: "hello@example.com",
  phone: "+63 000 000 0000",
  overlapHours:
    "We work 9am–6pm PHT (UTC+8) — that overlaps with US Pacific mornings and UK/EU evenings.",
  socials: [
    { label: "LinkedIn", href: "https://example.com/linkedin-placeholder" },
    { label: "GitHub", href: "https://example.com/github-placeholder" },
    { label: "X (Twitter)", href: "https://example.com/x-placeholder" },
  ],
};

/**
 * Primary navigation. Single source of truth for the header links — the order
 * here is the order rendered in both the desktop nav and the mobile menu.
 */
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/** The header's primary call to action. */
export const primaryCta = {
  label: "Start a project",
  href: "/contact",
} as const;
