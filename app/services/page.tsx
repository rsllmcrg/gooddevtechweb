import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services — GoodDev Technology",
  description:
    "Web apps, custom software, mobile apps, integrations, and ongoing support — built by a Philippine team that works with local SMEs and overseas companies alike.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <Section
      className="flex flex-1 flex-col justify-center font-sans"
      containerClassName="flex flex-col items-center gap-space-md text-center"
    >
      <h1>Services</h1>
      <p className="text-grey-700 max-w-md">
        What we build and how we help teams ship software.
      </p>
    </Section>
  );
}
