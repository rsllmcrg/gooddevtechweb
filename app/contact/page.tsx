import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Section } from "@/components/Section";
import { TextLink } from "@/components/TextLink";
import { services } from "@/content/home";
import { contactInfo } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with GoodDev Technology. Based in Manila, working with clients across the Philippines, the US, the UK, and the EU.",
};

export default function ContactPage() {
  const mailHref = `mailto:${contactInfo.email}`;
  const telHref = `tel:${contactInfo.phone.replace(/\s+/g, "")}`;

  return (
    <Section containerClassName="grid grid-cols-1 gap-space-2xl lg:grid-cols-3">
      <div className="gap-space-lg flex flex-col lg:col-span-2">
        <div className="gap-space-sm flex flex-col">
          <h1>Start a project</h1>
          <p className="text-grey-700 max-w-md">
            Tell us what you&apos;re building. We reply within one business day
            — no matter which timezone you&apos;re in.
          </p>
        </div>
        <ContactForm services={services.map((service) => service.title)} />
      </div>

      <div className="border-grey-100 gap-space-lg pt-space-xl lg:pl-space-2xl flex flex-col lg:col-span-1 lg:border-t-0 lg:border-l lg:pt-0">
        <div>
          <h2 className="text-h4-sm md:text-h4-md lg:text-h4 font-semibold">
            Prefer email or a call?
          </h2>
          <p className="text-grey-700 text-small mt-space-xs">
            Same details as the footer — reach us directly.
          </p>
        </div>

        <div className="gap-space-xs flex flex-col">
          <TextLink href={mailHref}>{contactInfo.email}</TextLink>
          <TextLink href={telHref}>{contactInfo.phone}</TextLink>
        </div>

        <p className="text-grey-700 text-small">{contactInfo.city}</p>
        <p className="text-grey-700 text-small">{contactInfo.overlapHours}</p>

        <div className="gap-space-xs flex flex-col">
          {contactInfo.socials.map((social) => (
            <TextLink key={social.href} href={social.href}>
              {social.label}
            </TextLink>
          ))}
        </div>
      </div>
    </Section>
  );
}
