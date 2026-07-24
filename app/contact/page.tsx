import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Section } from "@/components/Section";
import { TextLink } from "@/components/TextLink";
import { services } from "@/content/services";
import { contactInfo } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact — GoodDev Tech",
  description:
    "Get in touch with GoodDev Tech. Based in Lipa City, Philippines, working with clients around the world.",
  path: "/contact",
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service: serviceSlug } = await searchParams;
  const preselected = services.find((service) => service.slug === serviceSlug);

  return (
    <Section containerClassName="grid grid-cols-1 gap-space-2xl lg:grid-cols-3">
      <div className="gap-space-lg flex flex-col lg:col-span-2">
        <div className="gap-space-sm flex flex-col">
          <h1>Start a project</h1>
          <p className="text-grey-700 max-w-md">
            Tell us what you&apos;re building. We reply within one business day
            — no matter which timezone you&apos;re in.
          </p>
          {preselected && (
            <p className="border-grey-100 text-grey-700 text-small px-space-md py-space-xs w-fit rounded-full border">
              Re: {preselected.title}
            </p>
          )}
        </div>
        <ContactForm services={services.map((service) => service.title)} />
      </div>

      <div className="border-grey-100 gap-space-lg pt-space-xl lg:pl-space-2xl flex flex-col lg:col-span-1 lg:border-t-0 lg:border-l lg:pt-0">
        <div>
          <h2 className="text-h4-sm md:text-h4-md lg:text-h4 font-semibold">
            Prefer email or Facebook?
          </h2>
          <p className="text-grey-700 text-small mt-space-xs">
            Same details as the footer — reach us directly.
          </p>
        </div>

        {contactInfo.team.map((person) => (
          <div key={person.email} className="gap-space-xs flex flex-col">
            <p className="text-ink text-small font-semibold">{person.name}</p>
            <TextLink href={`mailto:${person.email}`}>{person.email}</TextLink>
            <TextLink href={person.facebook}>Facebook</TextLink>
          </div>
        ))}

        <p className="text-grey-700 text-small">{contactInfo.city}</p>
        <p className="text-grey-700 text-small">{contactInfo.overlapHours}</p>
      </div>
    </Section>
  );
}
