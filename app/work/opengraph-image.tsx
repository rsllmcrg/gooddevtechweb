import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return renderOgImage(
    "Our Work",
    "Web and software products built for Philippine SMEs and overseas clients.",
  );
}
