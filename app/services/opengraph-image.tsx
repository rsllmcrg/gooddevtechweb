import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return renderOgImage(
    "Services",
    "Web apps, custom software, mobile, integrations, and ongoing support.",
  );
}
