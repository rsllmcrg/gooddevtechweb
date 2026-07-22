import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteConfig } from "@/content/site";
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

// Canonical origin for the deployment. Set per environment in Vercel
// (Production / Preview / Development); falls back to localhost for local dev.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
