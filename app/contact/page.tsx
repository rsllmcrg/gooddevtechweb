import { Section } from "@/components/Section";
import { services } from "@/content/services";

export const metadata = {
  title: "Contact",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service: serviceSlug } = await searchParams;
  const preselected = services.find((service) => service.slug === serviceSlug);

  return (
    <Section
      className="flex flex-1 flex-col justify-center font-sans"
      containerClassName="flex flex-col items-center gap-space-md text-center"
    >
      <h1>Start a project</h1>
      <p className="text-grey-700 max-w-md">
        Tell us about what you want to build and we&apos;ll get back to you.
      </p>
      {preselected && (
        <p className="border-grey-100 text-grey-700 text-small px-space-md py-space-xs rounded-full border">
          Re: {preselected.title}
        </p>
      )}
    </Section>
  );
}
