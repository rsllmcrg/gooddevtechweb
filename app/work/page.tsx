import type { Metadata } from "next";
import { BrowserMockup } from "@/components/BrowserMockup";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { TextLink } from "@/components/TextLink";
import { confidentialityNote, projects } from "@/content/work";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Our Work — GoodDev Technology",
  description:
    "Selected web and software projects — API integrations, custom platforms, and full-stack product work delivered end to end.",
  path: "/work",
});

/** Small uppercase label used above headings for editorial rhythm. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-grey-500 text-small font-semibold tracking-widest uppercase">
      {children}
    </p>
  );
}

/** Row of stack/discipline pills. */
function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="gap-space-xs flex flex-wrap">
      {tags.map((tag) => (
        <li
          key={tag}
          className="border-grey-100 text-grey-700 text-small px-space-sm py-space-xs rounded-full border"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

/** Strip the scheme/www so a public URL reads cleanly as a link label. */
function hostLabel(href: string): string {
  return href
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");
}

export default function WorkPage() {
  const featured = projects.filter((project) => project.featured);
  const more = projects.filter((project) => !project.featured);

  return (
    <>
      {/* Intro — editorial, left-aligned */}
      <Section containerClassName="gap-space-md flex max-w-3xl flex-col">
        <Eyebrow>Selected work</Eyebrow>
        <h1>Software we&apos;ve designed, built, and shipped.</h1>
        <p className="text-grey-700 max-w-2xl">
          A closer look at recent projects — the integrations, platforms, and
          interfaces we&apos;ve delivered end to end.
        </p>
        <p className="text-grey-500 text-small max-w-2xl">
          {confidentialityNote}
        </p>
      </Section>

      {/* One full-width showcase row per featured project, image side alternating */}
      {featured.map((project, index) => (
        <Section key={project.name} className="border-grey-100 border-t">
          <div className="gap-space-xl lg:gap-space-2xl grid items-center lg:grid-cols-2">
            <BrowserMockup
              variant={project.variant}
              className={index % 2 === 1 ? "lg:order-last" : undefined}
            />
            <div className="gap-space-md flex flex-col">
              <Eyebrow>
                {project.confidential ? "Confidential · " : ""}
                {project.category}
              </Eyebrow>
              <h2>{project.name}</h2>
              <p className="text-grey-700">{project.summary}</p>

              <ul className="gap-space-xs sm:gap-x-space-lg grid sm:grid-cols-2">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="text-grey-700 text-small gap-space-sm flex"
                  >
                    <span aria-hidden="true" className="text-grey-300">
                      ›
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-space-xs">
                <Tags tags={project.tags} />
              </div>

              {project.href && (
                <TextLink href={project.href} className="mt-space-xs">
                  Visit {hostLabel(project.href)} ↗
                </TextLink>
              )}
            </div>
          </div>
        </Section>
      ))}

      {/* More projects — compact grid */}
      {more.length > 0 && (
        <Section className="border-grey-100 border-t">
          <h2>More projects</h2>
          <div className="mt-space-xl gap-space-xl sm:gap-space-2xl grid sm:grid-cols-2">
            {more.map((project) => (
              <article
                key={project.name}
                className="gap-space-md flex flex-col"
              >
                <BrowserMockup variant={project.variant} />
                <div className="gap-space-sm flex flex-col">
                  <Eyebrow>
                    {project.confidential ? "Confidential · " : ""}
                    {project.category}
                  </Eyebrow>
                  <h3>{project.name}</h3>
                  <p className="text-grey-700 text-small">{project.summary}</p>
                  <div className="mt-space-xs">
                    <Tags tags={project.tags} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>
      )}

      {/* Closing CTA */}
      <Section
        className="border-grey-100 border-t"
        containerClassName="gap-space-md flex flex-col items-center text-center"
      >
        <h2>Have something like this in mind?</h2>
        <p className="text-grey-700 max-w-md">
          Tell us what you&apos;re building — we&apos;ll reply within one
          business day, wherever you&apos;re calling from.
        </p>
        <Button href="/contact">Start a project</Button>
      </Section>
    </>
  );
}
