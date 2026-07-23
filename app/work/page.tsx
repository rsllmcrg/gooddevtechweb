import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Our Work — GoodDev Technology",
  description:
    "A look at the web and software products GoodDev Technology has built for Philippine SMEs and overseas clients.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <Section
      className="flex flex-1 flex-col justify-center font-sans"
      containerClassName="flex flex-col items-center gap-space-md text-center"
    >
      <h1>Work</h1>
      <p className="text-grey-700 max-w-md">
        Selected projects from the GoodDev Technology studio.
      </p>
    </Section>
  );
}
