import type { Metadata } from "next";
import { BrowserMockup } from "@/components/BrowserMockup";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { featuredProject, projects } from "@/content/work";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Our Work — GoodDev Technology",
  description:
    "Selected web and software products GoodDev Technology has designed, built, and shipped for SMEs and overseas teams.",
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

export default function WorkPage() {
  return (
    <>
      {/* Intro — editorial, left-aligned */}
      <Section containerClassName="gap-space-md flex max-w-3xl flex-col">
        <Eyebrow>Selected work</Eyebrow>
        <h1>Software we&apos;ve designed, built, and shipped.</h1>
        <p className="text-grey-700 max-w-2xl">
          A look at the products we&apos;ve delivered — web platforms, custom
          tools, and mobile apps for teams that needed something that actually
          fit how they work.
        </p>
      </Section>

      {/* Featured project — large showcase */}
      <Section className="border-grey-100 border-t">
        <div className="gap-space-xl lg:gap-space-2xl grid items-center lg:grid-cols-2">
          <BrowserMockup variant={featuredProject.variant} />
          <div className="gap-space-md flex flex-col">
            <Eyebrow>
              Featured · {featuredProject.category} · {featuredProject.year}
            </Eyebrow>
            <h2>{featuredProject.name}</h2>
            <p className="text-grey-700">{featuredProject.summary}</p>
            {featuredProject.result && (
              <p className="text-ink font-semibold">{featuredProject.result}</p>
            )}
            <div className="mt-space-xs">
              <Tags tags={featuredProject.tags} />
            </div>
          </div>
        </div>
      </Section>

      {/* Project grid */}
      <Section className="border-grey-100 border-t">
        <h2>More projects</h2>
        <div className="mt-space-xl gap-space-xl sm:gap-space-2xl grid sm:grid-cols-2">
          {projects.map((project) => (
            <article key={project.name} className="gap-space-md flex flex-col">
              <BrowserMockup variant={project.variant} />
              <div className="gap-space-sm flex flex-col">
                <Eyebrow>
                  {project.category} · {project.year}
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
