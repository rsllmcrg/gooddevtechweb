import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

/**
 * Lists only real, indexable pages — deliberately not derived by walking
 * the app/ directory, so an internal tool like /style-guide (noindexed in
 * its own metadata) or a future /api route can't end up here by accident.
 */
const routes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/services", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/work", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
