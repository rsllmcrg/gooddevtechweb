import { Button } from "@/components/Button";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { Section } from "@/components/Section";
import { TextLink } from "@/components/TextLink";
import { siteConfig } from "@/content/site";
import { principles, techStack } from "@/content/home";
import { services } from "@/content/services";
import { getCaseStudies } from "@/lib/case-studies";

export default function Home() {
  const featuredStudies = getCaseStudies().slice(0, 3);

  return (
    <>
      {/* Hero — what we build, for whom, one action, all above the fold */}
      <Section containerClassName="flex flex-col items-center gap-space-md text-center">
        <h1 className="max-w-2xl">
          A Philippine software studio built for global teams.
        </h1>
        <p className="text-grey-700 max-w-md">
          {siteConfig.name} designs and ships web and software products for
          local SMEs and overseas companies alike — with the timezone overlap,
          communication, and craft to make distance a non-issue.
        </p>
        <Button href="/contact">Start a project</Button>
      </Section>

      {/* Services strip */}
      <Section className="border-grey-100 border-t">
        <h2>What we do</h2>
        <div className="mt-space-lg gap-space-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div key={service.slug}>
              <h3 className="text-h4-sm md:text-h4-md lg:text-h4 font-semibold">
                {service.title}
              </h3>
              <p className="text-grey-700 text-small mt-space-xs">
                {service.teaser}
              </p>
            </div>
          ))}
        </div>
        <TextLink href="/services" className="mt-space-lg inline-block">
          See all services
        </TextLink>
      </Section>

      {/* Featured case studies */}
      <Section className="border-grey-100 border-t">
        <h2>A few things we&apos;ve built</h2>
        <div className="mt-space-lg gap-space-lg [&>*]:mb-space-lg columns-1 sm:columns-2 lg:columns-3 [&>*]:break-inside-avoid">
          {featuredStudies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
        <TextLink href="/work" className="mt-space-lg inline-block">
          See all work
        </TextLink>
      </Section>

      {/* Tech stack */}
      <Section className="border-grey-100 border-t">
        <h2>Tools we build with</h2>
        <ul className="mt-space-md gap-space-sm flex flex-wrap">
          {techStack.map((tech) => (
            <li
              key={tech}
              className="border-grey-100 text-grey-700 text-small px-space-md py-space-xs rounded-full border"
            >
              {tech}
            </li>
          ))}
        </ul>
      </Section>

      {/* Proof / credibility band */}
      <Section className="border-grey-100 border-t">
        <h2>How we work</h2>
        <div className="mt-space-lg gap-space-lg grid grid-cols-1 sm:grid-cols-2">
          {principles.map((principle) => (
            <div key={principle.title}>
              <h3 className="text-h4-sm md:text-h4-md lg:text-h4 font-semibold">
                {principle.title}
              </h3>
              <p className="text-grey-700 text-small mt-space-xs">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Closing CTA */}
      <Section
        className="border-grey-100 border-t"
        containerClassName="flex flex-col items-center gap-space-md text-center"
      >
        <h2>Have a project in mind?</h2>
        <p className="text-grey-700 max-w-md">
          Tell us what you&apos;re building — we&apos;ll reply within one
          business day, wherever you&apos;re calling from.
        </p>
        <Button href="/contact">Get in touch</Button>
      </Section>
    </>
  );
}
