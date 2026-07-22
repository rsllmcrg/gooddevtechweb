import { Section } from "@/components/Section";

export const metadata = {
  title: "About",
};

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
