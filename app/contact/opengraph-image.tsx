import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return renderOgImage(
    "Let's Talk",
    "Based in Lipa City, Philippines, working with clients around the world.",
  );
}
