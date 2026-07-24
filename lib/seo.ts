import type { Metadata } from "next";
import { contactInfo, siteConfig } from "@/content/site";

/**
 * Canonical origin for the deployment. Matches the one computed in
 * app/layout.tsx (metadataBase uses this same env var) — kept here too so
 * non-metadata code (sitemap, robots, JSON-LD) can build absolute URLs
 * without importing from a page/layout file.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/**
 * Builds the full per-page metadata block: title, description, canonical
 * URL, and matching Open Graph / Twitter card fields. `path` is the route's
 * own path (e.g. "/services") — resolved to an absolute URL via
 * metadataBase (set once in the root layout), so every call site stays
 * relative and there's one place (this function) that wires OG/Twitter
 * consistently for every page.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/**
 * schema.org LocalBusiness JSON-LD, rendered once in the root layout so it
 * describes the business site-wide rather than per page. Sourced from the
 * same contactInfo used by the Footer/Contact page — currently placeholder
 * data (see the notice in content/site.ts), so this is structurally correct
 * but not yet pointing at real contact details.
 */
export function localBusinessJsonLd() {
  // contactInfo.city is free text ("Manila, Philippines") for display
  // elsewhere on the site; addressCountry needs an ISO 3166-1 alpha-2 code
  // per Google's structured data guidelines, so it's set directly rather
  // than parsed out of that string.
  const [addressLocality] = contactInfo.city
    .split(",")
    .map((part) => part.trim());

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteUrl,
    email: contactInfo.email,
    telephone: contactInfo.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality,
      addressCountry: "PH",
    },
    sameAs: contactInfo.socials.map((social) => social.href),
  };
}
