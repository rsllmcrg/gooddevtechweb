import { Section } from "@/components/Section";
import { siteConfig } from "@/content/site";

export default function Home() {
  return (
    <Section
      className="flex flex-1 flex-col justify-center font-sans"
      containerClassName="flex flex-col items-center gap-space-md text-center"
    >
      <h1>{siteConfig.name}</h1>
      <p className="text-grey-700 max-w-md">{siteConfig.description}</p>
    </Section>
  );
}
