export const siteConfig = {
  name: "GoodDev Technology",
  description: "GoodDev Technology — a Philippine software development studio.",
};

export const contactInfo = {
  city: "Lipa City, Philippines",
  overlapHours: "We work in flexible hours.",
  team: [
    {
      name: "Roselle Macaraig-Reyes",
      email: "roselle.macaraig22@gmail.com",
      facebook: "https://www.facebook.com/roxymacaraig",
    },
    {
      name: "Stephen Rouver L. Coronel",
      email: "stehencoronel0913@gmail.com",
      facebook: "https://www.facebook.com/camilla.cara.16",
    },
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
