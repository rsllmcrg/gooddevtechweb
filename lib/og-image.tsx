import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

/**
 * Shared renderer behind every route's opengraph-image.tsx, so the OG/Twitter
 * card looks consistent site-wide while still showing each page's own title.
 * Built with next/og's ImageResponse (Satori under the hood) — only a
 * flexbox-based CSS subset is supported, so every multi-child node below is
 * explicitly `display: flex`.
 */
export function renderOgImage(title: string, subtitle?: string) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        backgroundColor: "#f4f4f4",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: 999,
            backgroundColor: "#d62828",
            display: "flex",
          }}
        />
        <span style={{ fontSize: 32, fontWeight: 700, color: "#111111" }}>
          {siteConfig.name}
        </span>
      </div>
      <div style={{ display: "flex", marginTop: 56 }}>
        <span
          style={{
            fontSize: 68,
            fontWeight: 700,
            color: "#111111",
            lineHeight: 1.1,
          }}
        >
          {title}
        </span>
      </div>
      {subtitle && (
        <div style={{ display: "flex", marginTop: 28, maxWidth: 900 }}>
          <span style={{ fontSize: 30, color: "#3d3d3d" }}>{subtitle}</span>
        </div>
      )}
    </div>,
    { ...ogImageSize },
  );
}
