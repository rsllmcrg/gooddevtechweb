import { Section } from "@/components/Section";

export const metadata = {
  title: "Work",
};

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
