import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { StackList } from "@/components/StackList";
import { TextLink } from "@/components/TextLink";
import {
  CONFIDENTIALITY_NOTE,
  getCaseStudies,
  getCaseStudy,
} from "@/lib/case-studies";

/**
 * One case study, rendered from content/case-studies/<slug>.mdx.
 *
 * Structured data (attribution, stack, outcomes, screenshots) comes from the
 * validated frontmatter; the problem/approach/outcome narrative is the MDX
 * body. Adding a case study means adding a file — nothing here changes.
 */

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getCaseStudies().map(({ slug }) => ({ slug }));
}

// Every published case study is known at build time, so an unknown slug is a
// 404 rather than an attempt to render content that doesn't exist.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) return {};

  return {
    title: study.title,
    description: study.summary,
    openGraph: {
      type: "article",
      title: study.title,
      description: study.summary,
      images: study.cover
        ? [{ url: study.cover.src, alt: study.cover.alt }]
        : undefined,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) notFound();

  const { default: Body } = await import(`@/content/case-studies/${slug}.mdx`);

  return (
    <article className="font-sans">
      <Section containerClassName="max-w-3xl">
        <TextLink href="/work" className="text-small no-underline">
          ← All work
        </TextLink>

        <header className="mt-space-lg gap-space-md flex flex-col">
          <p className="text-grey-500 text-small">
            {study.attribution} · {study.year}
          </p>
          <h1>{study.title}</h1>
          <p className="text-grey-700 text-h4-sm">{study.summary}</p>

          <dl className="gap-space-md border-grey-100 pt-space-md mt-space-xs flex flex-wrap border-t">
            <div>
              <dt className="text-grey-500 text-small">Role</dt>
              <dd>{study.role}</dd>
            </div>
            <div>
              <dt className="text-grey-500 text-small">Sector</dt>
              <dd>{study.industry}</dd>
            </div>
            {study.service && (
              <div>
                <dt className="text-grey-500 text-small">Service</dt>
                <dd>{study.service}</dd>
              </div>
            )}
            {study.liveUrl && (
              <div>
                <dt className="text-grey-500 text-small">Live</dt>
                <dd>
                  <TextLink href={study.liveUrl}>
                    {new URL(study.liveUrl).hostname}
                  </TextLink>
                </dd>
              </div>
            )}
          </dl>

          <StackList stack={study.stack} className="mt-space-xs" />

          {study.confidential && (
            <p className="border-grey-100 bg-grey-100/30 p-space-md text-grey-700 text-small rounded-md border">
              {CONFIDENTIALITY_NOTE}
            </p>
          )}
        </header>

        {study.cover && (
          <Image
            src={study.cover.src}
            alt={study.cover.alt}
            width={study.cover.width}
            height={study.cover.height}
            sizes="(min-width: 1024px) 48rem, 100vw"
            preload
            className="border-grey-100 mt-space-2xl h-auto w-full rounded-md border"
          />
        )}

        {study.outcomes.length > 0 && (
          <dl className="border-grey-100 mt-space-2xl gap-space-lg p-space-lg grid grid-cols-1 rounded-md border sm:grid-cols-3">
            {study.outcomes.map((outcome) => (
              <div key={outcome.label}>
                <dt className="text-grey-500 text-small">{outcome.label}</dt>
                <dd className="text-h4-sm font-semibold">{outcome.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-space-2xl">
          <Body />
        </div>
      </Section>

      {study.screenshots.length > 0 && (
        <Section
          className="border-grey-100 border-t"
          containerClassName="max-w-4xl"
        >
          <h2>Screens</h2>
          <div className="mt-space-xl gap-space-2xl flex flex-col">
            {study.screenshots.map((shot) => (
              <figure key={shot.src}>
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  sizes="(min-width: 1024px) 56rem, 100vw"
                  className="border-grey-100 h-auto w-full rounded-md border"
                />
                {shot.caption && (
                  <figcaption className="text-grey-500 text-small mt-space-sm">
                    {shot.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </Section>
      )}

      <Section
        className="border-grey-100 border-t"
        containerClassName="gap-space-md flex flex-col items-center text-center"
      >
        <h2>Have a project like this?</h2>
        <p className="text-grey-700 max-w-md">
          Tell us what you&apos;re trying to build and we&apos;ll come back with
          a scope, not a guess.
        </p>
        <Button href="/contact" className="mt-space-xs">
          Start a project
        </Button>
      </Section>
    </article>
  );
}
