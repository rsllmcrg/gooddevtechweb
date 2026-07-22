import { Section } from "@/components/Section";

export const metadata = {
  title: "Services",
};

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
