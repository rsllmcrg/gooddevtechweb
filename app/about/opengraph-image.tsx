import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return renderOgImage(
    "About",
    "A Philippine software studio built to work with local SMEs and overseas teams alike.",
  );
}
