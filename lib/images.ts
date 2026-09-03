import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";

/**
 * Measuring images off disk at build time.
 *
 * Content authors write a path and alt text; width and height are read from
 * the file itself so `next/image` can reserve exact space and nobody has to
 * keep hand-written dimensions in sync with a re-exported screenshot.
 *
 * Shared by the case-study content layer (`lib/case-studies.ts`) and the Work
 * page's real project screenshots (`content/work.ts`).
 */

const PUBLIC_DIR = path.join(process.cwd(), "public");

/** An image as authored: a path under /public, plus required alt text. */
export type SourceImage = {
  /** Path under /public, e.g. "/case-studies/farmia/dashboard.png". */
  src: string;
  /** Describes the screenshot for screen readers and search. */
  alt: string;
  caption?: string;
};

/** An image with the intrinsic dimensions next/image needs to reserve space. */
export type MeasuredImage = SourceImage & { width: number; height: number };

/**
 * Reads an image's real dimensions off disk. A missing or unreadable file is a
 * content error, so it throws — which fails `next build` with `context` (the
 * content file or project that referenced it) named, rather than shipping a
 * page with a broken image.
 */
export function measureImage<T extends SourceImage>(
  image: T,
  context: string,
): T & { width: number; height: number } {
  const absolute = path.join(PUBLIC_DIR, image.src);

  if (!fs.existsSync(absolute)) {
    throw new Error(
      `${context}: image "${image.src}" was not found at public${image.src}`,
    );
  }

  try {
    const { width, height } = imageSize(fs.readFileSync(absolute));
    return { ...image, width, height };
  } catch (cause) {
    throw new Error(`${context}: could not read dimensions of "${image.src}"`, {
      cause,
    });
  }
}
