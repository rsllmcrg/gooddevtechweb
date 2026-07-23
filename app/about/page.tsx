import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About — GoodDev Technology",
  description:
    "GoodDev Technology is a Philippine software studio built to work as easily with local SMEs as with overseas teams. Here's what we believe and how we work.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Section
      className="flex flex-1 flex-col justify-center font-sans"
      containerClassName="flex flex-col items-center gap-space-md text-center"
    >
      <h1>About</h1>
      <p className="text-grey-700 max-w-md">
        Who we are — a Philippine software development studio.
      </p>
    </Section>
  );
}
