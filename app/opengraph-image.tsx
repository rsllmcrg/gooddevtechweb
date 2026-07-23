import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return renderOgImage(
    "Software Development Studio",
    "Web apps and custom software for Philippine SMEs and overseas teams.",
  );
}
