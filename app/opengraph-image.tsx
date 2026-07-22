import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "GoodDev Tech";

/**
 * Share card: the stacked lockup, full colour, centred on Paper.
 *
 * The mark is embedded as a data URI rather than fetched, so this needs no
 * network and no font — the wordmark is outlined vector, so nothing can
 * reflow or substitute. The 320px logo width sits well above the stacked
 * lockup's 110px minimum, and the surrounding whitespace is many times the
 * ½X clear space the guidelines require.
 */
export default function OpenGraphImage() {
  const svg = readFileSync(
    join(process.cwd(), "public/brand/gooddevtech-stacked-full.svg"),
  ).toString("base64");

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#ffffff",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`data:image/svg+xml;base64,${svg}`}
        alt=""
        width={320}
        height={Math.round(320 / (533.09 / 196))}
      />
    </div>,
    size,
  );
}
