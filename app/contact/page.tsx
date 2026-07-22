import { Section } from "@/components/Section";

export const metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <Section
      className="flex flex-1 flex-col justify-center font-sans"
      containerClassName="flex flex-col items-center gap-space-md text-center"
    >
      <h1>Start a project</h1>
      <p className="text-grey-700 max-w-md">
        Tell us about what you want to build and we&apos;ll get back to you.
      </p>
    </Section>
  );
}
