import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The GoodDev Tech logo, per BRAND-GUIDELINES.md v1.0.
 *
 * Every rule the guidelines set that code can enforce is enforced here rather
 * than left to each call site:
 *
 * - Intrinsic proportions come from the source viewBox, and only `width` is
 *   settable, so the mark can never be stretched or squashed.
 * - `minWidth` is the documented minimum size for each lockup. Below it the
 *   wordmark stops resolving, so the guidelines say to switch to the icon
 *   instead of shrinking the lockup — a dev-time warning says exactly that.
 * - The compact icon is cut for 16–24px only; the primary icon is for 32px and
 *   up. Using either outside its band also warns.
 * - Clear space of at least ½X (X = chevron height) is applied as padding, so
 *   nothing can crowd the mark. In the horizontal and stacked lockups the
 *   chevron is the full art height; in the icon lockups the art is already
 *   drawn with its own padding, so no extra is added.
 *
 * Colourway is the caller's call, but the rule is simple: `full` on white or
 * near-white, `white` on Ink / Signal Red / photography, `black` for
 * single-colour contexts.
 */

type Lockup = "horizontal" | "stacked" | "icon" | "icon-compact";
type Colorway = "full" | "white" | "black";

/**
 * Clear space is ½X, where X is the height of the *chevron mark* — not the
 * height of the whole lockup. The chevrons are drawn at the same scale in both
 * the horizontal and stacked art, spanning 100 viewBox units in each, so this
 * one number serves both.
 */
const CHEVRON_HEIGHT = 100;

/** ½X expressed as a fraction of rendered width, for a given viewBox width. */
function clearSpaceRatio(viewBoxWidth: number) {
  return CHEVRON_HEIGHT / 2 / viewBoxWidth;
}

type LockupSpec = {
  /** Source aspect ratio, taken from the SVG viewBox. */
  ratio: number;
  /** Smallest size the guidelines permit on screen, in px of width. */
  minWidth: number;
  /** Largest permitted width, where the guidelines cap one (compact icon). */
  maxWidth?: number;
  /** Sensible default when a call site doesn't pass a width. */
  defaultWidth: number;
  /**
   * Clear space as a fraction of the rendered width. The icon art already
   * carries its own margin inside the square, so it adds none.
   */
  clearSpace: number;
  /** Which colourways ship for this lockup. */
  colorways: readonly Colorway[];
};

const LOCKUPS: Record<Lockup, LockupSpec> = {
  horizontal: {
    ratio: 695.86 / 100,
    minWidth: 140,
    defaultWidth: 180,
    clearSpace: clearSpaceRatio(695.86),
    colorways: ["full", "white", "black"],
  },
  stacked: {
    ratio: 533.09 / 196,
    minWidth: 110,
    defaultWidth: 200,
    clearSpace: clearSpaceRatio(533.09),
    colorways: ["full", "white", "black"],
  },
  icon: {
    ratio: 1,
    minWidth: 32,
    defaultWidth: 48,
    clearSpace: 0,
    colorways: ["full", "white"],
  },
  "icon-compact": {
    ratio: 1,
    minWidth: 16,
    maxWidth: 24,
    defaultWidth: 20,
    clearSpace: 0,
    colorways: ["full"],
  },
};

const FILES: Record<Lockup, Partial<Record<Colorway, string>>> = {
  horizontal: {
    full: "/brand/gooddevtech-horizontal-full.svg",
    white: "/brand/gooddevtech-horizontal-white.svg",
    black: "/brand/gooddevtech-horizontal-black.svg",
  },
  stacked: {
    full: "/brand/gooddevtech-stacked-full.svg",
    white: "/brand/gooddevtech-stacked-white.svg",
    black: "/brand/gooddevtech-stacked-black.svg",
  },
  icon: {
    full: "/brand/gooddevtech-icon-full.svg",
    white: "/brand/gooddevtech-icon-white.svg",
  },
  "icon-compact": {
    full: "/brand/gooddevtech-icon-compact-full.svg",
  },
};

/**
 * Warns in development when a size or colourway breaks the guidelines. Silent
 * in production — a mis-sized logo is a review problem, not a runtime failure,
 * and it still renders.
 */
function assertUsage(lockup: Lockup, colorway: Colorway, width: number) {
  if (process.env.NODE_ENV === "production") return;

  const spec = LOCKUPS[lockup];

  if (width < spec.minWidth) {
    console.warn(
      `[Logo] "${lockup}" at ${width}px is under its ${spec.minWidth}px minimum. ` +
        (lockup.startsWith("icon")
          ? `Use the ${lockup === "icon" ? "compact icon" : "icon"} instead.`
          : `Switch to lockup="icon" rather than shrinking the lockup.`),
    );
  }

  if (spec.maxWidth !== undefined && width > spec.maxWidth) {
    console.warn(
      `[Logo] "${lockup}" at ${width}px is over its ${spec.maxWidth}px maximum. ` +
        `Use lockup="icon" at 32px or above.`,
    );
  }

  if (!spec.colorways.includes(colorway)) {
    console.warn(
      `[Logo] "${lockup}" has no "${colorway}" colourway. ` +
        `Available: ${spec.colorways.join(", ")}.`,
    );
  }
}

export function Logo({
  lockup = "horizontal",
  colorway = "full",
  width,
  clearSpace = true,
  priority = false,
  className,
  alt = "GoodDev Tech",
}: {
  lockup?: Lockup;
  colorway?: Colorway;
  /** Rendered width in px. Height follows the source proportions. */
  width?: number;
  /** Reserve the ½X clear space as padding. Only turn off inside a layout
   *  that already guarantees the margin. */
  clearSpace?: boolean;
  priority?: boolean;
  className?: string;
  /** Pass "" when the logo sits next to a text label that already names the brand. */
  alt?: string;
}) {
  const spec = LOCKUPS[lockup];
  const renderedWidth = width ?? spec.defaultWidth;
  const src = FILES[lockup][colorway] ?? FILES[lockup].full!;

  assertUsage(lockup, colorway, renderedWidth);

  const padding = clearSpace
    ? Math.round(renderedWidth * spec.clearSpace)
    : undefined;

  return (
    <Image
      src={src}
      alt={alt}
      width={renderedWidth}
      height={Math.round(renderedWidth / spec.ratio)}
      priority={priority}
      // The art is already optimised vector; running it through the image
      // optimiser would only add a round trip (and needs dangerouslyAllowSVG).
      unoptimized
      className={cn("h-auto", className)}
      style={padding ? { padding } : undefined}
    />
  );
}
