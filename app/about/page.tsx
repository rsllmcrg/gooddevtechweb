import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { TeamCard } from "@/components/TeamCard";
import { contactInfo } from "@/content/site";
import { principles } from "@/content/home";
import { team, processSteps } from "@/content/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "GoodDev Technology is a Philippine software studio built to work as easily with local SMEs as with overseas teams. Here's what we believe and how we work.",
};

export default function AboutPage() {
  return (
    <>
      <Section containerClassName="flex flex-col items-center gap-space-md text-center">
        <h1>About GoodDev Technology</h1>
        <p className="text-grey-700 max-w-md">
          We build small, senior teams around each project, write code
          we&apos;re willing to put our name on, and treat
          &quot;maintainable&quot; as a feature — not an afterthought.
        </p>
        <p className="text-grey-500 text-small">
          Based in {contactInfo.city} — working with clients across the
          Philippines, the US, the UK, and the EU.
        </p>
        <div className="border-grey-100 mt-space-sm p-space-md w-full max-w-md rounded-md border border-dashed text-left">
          <p className="text-grey-500 text-small font-semibold">Placeholder</p>
          <p className="text-grey-700 text-small mt-space-xs">
            Anything more specific than the above — founding year, founder bio,
            a &quot;why we started this&quot; story — is a factual claim this
            page can&apos;t invent. Add the real version once the founder
            confirms it.
          </p>
        </div>
      </Section>

      {/* What we believe */}
      <Section className="border-grey-100 border-t">
        <h2>What we believe</h2>
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

      {/* Team */}
      <Section className="border-grey-100 border-t">
        <h2>Team</h2>
        <div className="border-grey-100 mt-space-md p-space-md w-full max-w-md rounded-md border border-dashed text-left">
          <p className="text-grey-500 text-small font-semibold">Placeholder</p>
          <p className="text-grey-700 text-small mt-space-xs">
            Names, roles, and photos below are stand-ins pending the
            founder&apos;s real team roster.
          </p>
        </div>
        <div className="mt-space-lg gap-space-xl flex flex-wrap justify-center">
          {team.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </Section>

      {/* Where we work */}
      <Section className="border-grey-100 border-t">
        <h2>Where we work</h2>
        <p className="text-grey-700 mt-space-md max-w-2xl">
          We&apos;re based in {contactInfo.city}. {contactInfo.overlapHours}{" "}
          Every project gets a single English-speaking point of contact, and
          calls are scheduled within that overlap — not at whatever hour happens
          to be convenient for us.
        </p>
      </Section>

      {/* How we work */}
      <Section className="border-grey-100 border-t">
        <h2>How we work</h2>
        <p className="text-grey-700 mt-space-md max-w-2xl">
          The same four steps for every project, whether the client is down the
          street or twelve time zones away.
        </p>
        <ol className="mt-space-lg gap-space-lg grid grid-cols-1 sm:grid-cols-2">
          {processSteps.map((step, index) => (
            <li key={step.title}>
              <h3 className="text-h4-sm md:text-h4-md lg:text-h4 font-semibold">
                {index + 1}. {step.title}
              </h3>
              <p className="text-grey-700 text-small mt-space-xs">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Closing CTA */}
      <Section
        className="border-grey-100 border-t"
        containerClassName="flex flex-col items-center gap-space-md text-center"
      >
        <h2>Want to work with us?</h2>
        <div className="gap-space-sm flex flex-wrap justify-center">
          <Button href="/contact">Get in touch</Button>
          <Button href="/work" variant="secondary">
            See our work
          </Button>
        </div>
      </Section>
    </>
  );
}
