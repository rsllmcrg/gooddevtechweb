import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteConfig } from "@/content/site";
import { localBusinessJsonLd, siteUrl } from "@/lib/seo";
import "./globals.css";

/**
 * Inter is the brand typeface (SIL OFL 1.1 — no licence to buy or track).
 * Loading the `opsz` axis gives us the Inter Display cut automatically at
 * headline sizes and the text cut for body copy, which is what the brand
 * guidelines ask for, without shipping two families.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  axes: ["opsz"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// No title template here on purpose — each page (via lib/seo.ts's
// pageMetadata) passes its own already-complete title (e.g. "Services —
// GoodDev Tech") so the <title> tag and the Open Graph/Twitter titles
// always match exactly, rather than a template only affecting one of them.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteConfig.name,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  // Icons are picked up automatically from app/favicon.ico (compact cut, cut
  // for 16–24px), app/icon.png, and app/apple-icon.png; the share card comes
  // from app/opengraph-image.tsx.
};

/** Signal Red tints mobile browser chrome. */
export const viewport: Viewport = {
  themeColor: "#da291c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd()),
          }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
