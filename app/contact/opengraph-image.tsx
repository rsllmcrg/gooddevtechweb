import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return renderOgImage(
    "Let's Talk",
    "Based in Manila, working with clients across the Philippines, the US, the UK, and the EU.",
  );
}
