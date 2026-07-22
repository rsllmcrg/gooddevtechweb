import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web apps, mobile, integrations, cloud & DevOps, and ongoing support — built by a Philippine team that works with local SMEs and overseas companies alike.",
};

export default function ServicesPage() {
  return (
    <>
      <Section containerClassName="flex flex-col items-center gap-space-md text-center">
        <h1>Services</h1>
        <p className="text-grey-700 max-w-md">
          From a first prototype to years of ongoing support, we work across the
          stack. Pick a starting point below, or tell us what you&apos;re
          building and we&apos;ll figure out the right scope together.
        </p>
      </Section>

      {services.map((service) => (
        <Section key={service.slug} className="border-grey-100 border-t">
          <h2>{service.title}</h2>
          <div className="mt-space-lg gap-space-lg grid grid-cols-1 md:grid-cols-3">
            <div>
              <h3 className="text-h4-sm md:text-h4-md lg:text-h4 font-semibold">
                What it is
              </h3>
              <p className="text-grey-700 mt-space-xs">{service.whatItIs}</p>
            </div>
            <div>
              <h3 className="text-h4-sm md:text-h4-md lg:text-h4 font-semibold">
                Who it suits
              </h3>
              <p className="text-grey-700 mt-space-xs">{service.whoItSuits}</p>
            </div>
            <div>
              <h3 className="text-h4-sm md:text-h4-md lg:text-h4 font-semibold">
                How it starts
              </h3>
              <p className="text-grey-700 mt-space-xs">{service.howItStarts}</p>
            </div>
          </div>
          <Button
            href={`/contact?service=${service.slug}`}
            className="mt-space-lg"
          >
            Request a scope call
          </Button>
        </Section>
      ))}

      <Section
        className="border-grey-100 border-t"
        containerClassName="flex flex-col items-center gap-space-md text-center"
      >
        <h2>Not sure which service fits?</h2>
        <p className="text-grey-700 max-w-md">
          Tell us the problem, not the solution — we&apos;ll help you figure out
          the right scope.
        </p>
        <Button href="/contact">Get in touch</Button>
      </Section>
    </>
  );
}
