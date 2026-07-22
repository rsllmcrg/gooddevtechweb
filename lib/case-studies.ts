import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { imageSize } from "image-size";
import { z } from "zod";

/**
 * The case-study content layer.
 *
 * Adding a case study means adding ONE file — content/case-studies/<slug>.mdx.
 * The filename becomes the URL (/work/<slug>), the YAML frontmatter becomes the
 * structured data below, and the MDX body becomes the long-form narrative. No
 * component or route code needs to change.
 *
 * Every frontmatter block is validated against `frontmatterSchema` at build
 * time. A malformed entry throws with the offending file and field named, which
 * fails `next build` rather than shipping a half-rendered page.
 */

const CONTENT_DIR = path.join(process.cwd(), "content", "case-studies");
const PUBLIC_DIR = path.join(process.cwd(), "public");

const imageSchema = z.strictObject({
  /** Path under /public, e.g. "/case-studies/farmia/dashboard.png". */
  src: z
    .string()
    .startsWith("/", "must be a path under /public, e.g. /case-studies/…"),
  /** Required — describes the screenshot for screen readers and search. */
  alt: z.string().min(1, "alt text is required on every image"),
  caption: z.string().min(1).optional(),
});

const outcomeSchema = z.strictObject({
  label: z.string().min(1),
  value: z.string().min(1),
});

/**
 * `.strictObject` rejects unknown keys on purpose: a typo like `stacks:` should
 * fail loudly at build time, not silently drop the field from the page.
 */
const frontmatterSchema = z
  .strictObject({
    // --- Required ---------------------------------------------------------
    title: z.string().min(1),
    /** One-sentence teaser, used on the /work index and as the meta description. */
    summary: z.string().min(1),
    /** Industry/sector — stands in for the client name on confidential work. */
    industry: z.string().min(1),
    role: z.string().min(1),
    year: z.number().int().gte(2000).lte(2100),
    stack: z.array(z.string().min(1)).min(1, "list at least one technology"),

    // --- Optional — the page degrades gracefully when these are absent ----
    /** Sort key on the /work index, ascending. Unset entries sort last. */
    order: z.number().int().optional(),
    /** Omit on NDA work; see the `confidential` cross-check below. */
    client: z.string().min(1).optional(),
    confidential: z.boolean().default(false),
    liveUrl: z.url().optional(),
    cover: imageSchema.optional(),
    /** Headline results, rendered as a stat row. */
    outcomes: z.array(outcomeSchema).default([]),
    screenshots: z.array(imageSchema).default([]),
    /** Keeps a work-in-progress file out of the site without deleting it. */
    draft: z.boolean().default(false),
  })
  .refine((data) => !(data.confidential && data.client), {
    path: ["client"],
    error:
      "confidential case studies must not name a client — use `industry` instead",
  });

type Frontmatter = z.infer<typeof frontmatterSchema>;

/** An image with the intrinsic dimensions next/image needs to reserve space. */
export type CaseStudyImage = z.infer<typeof imageSchema> & {
  width: number;
  height: number;
};

export type CaseStudy = Omit<Frontmatter, "cover" | "screenshots"> & {
  slug: string;
  cover?: CaseStudyImage;
  screenshots: CaseStudyImage[];
  /** What to show where a client name would go, honouring the NDA rule. */
  attribution: string;
};

/**
 * Reads an image's real dimensions off disk so next/image can reserve exact
 * space and avoid layout shift — authors never hand-write width/height.
 * A missing or unreadable file is a content error, so it throws.
 */
function resolveImage(
  image: z.infer<typeof imageSchema>,
  file: string,
): CaseStudyImage {
  const absolute = path.join(PUBLIC_DIR, image.src);

  if (!fs.existsSync(absolute)) {
    throw new Error(
      `${file}: image "${image.src}" was not found at public${image.src}`,
    );
  }

  try {
    const { width, height } = imageSize(fs.readFileSync(absolute));
    return { ...image, width, height };
  } catch (cause) {
    throw new Error(`${file}: could not read dimensions of "${image.src}"`, {
      cause,
    });
  }
}

function parseFile(filename: string): CaseStudy {
  const slug = filename.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf8");
  const result = frontmatterSchema.safeParse(matter(raw).data);

  if (!result.success) {
    throw new Error(
      `Invalid case study frontmatter in content/case-studies/${filename}:\n` +
        z.prettifyError(result.error),
    );
  }

  const { cover, screenshots, ...data } = result.data;

  return {
    ...data,
    slug,
    cover: cover ? resolveImage(cover, filename) : undefined,
    screenshots: screenshots.map((shot) => resolveImage(shot, filename)),
    attribution: data.client ?? data.industry,
  };
}

let cached: CaseStudy[] | undefined;

/** All publishable case studies, ordered for the /work index. */
export function getCaseStudies(): CaseStudy[] {
  if (cached) return cached;

  if (!fs.existsSync(CONTENT_DIR)) return (cached = []);

  cached = fs
    .readdirSync(CONTENT_DIR)
    .filter((filename) => filename.endsWith(".mdx"))
    .map(parseFile)
    .filter((study) => !study.draft)
    .sort(
      (a, b) =>
        (a.order ?? Number.MAX_SAFE_INTEGER) -
          (b.order ?? Number.MAX_SAFE_INTEGER) || b.year - a.year,
    );

  return cached;
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return getCaseStudies().find((study) => study.slug === slug);
}

/** True when any published case study is presented anonymously. */
export function hasConfidentialWork(): boolean {
  return getCaseStudies().some((study) => study.confidential);
}

export const CONFIDENTIALITY_NOTE =
  "Some projects are presented anonymously to respect client confidentiality while accurately representing the technical work delivered.";
