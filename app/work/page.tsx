import { CaseStudyCard } from "@/components/CaseStudyCard";
import { Section } from "@/components/Section";
import {
  CONFIDENTIALITY_NOTE,
  getCaseStudies,
  hasConfidentialWork,
} from "@/lib/case-studies";

export const metadata = {
  title: "Work",
  description:
    "Selected case studies from GoodDev Technology — the problem, the approach, and what shipped.",
};

export default function WorkPage() {
  const studies = getCaseStudies();

  return (
    <Section
      className="font-sans"
      containerClassName="gap-space-2xl flex flex-col"
    >
      <header className="gap-space-md flex max-w-2xl flex-col">
        <h1>Work</h1>
        <p className="text-grey-700">
          Selected projects from the GoodDev Technology studio — what the
          problem was, how we approached it, and what shipped.
        </p>
      </header>

      {studies.length > 0 ? (
        // Card heights vary (cover image, stack length), so a same-height
        // grid row stretches short cards next to tall ones and leaves a
        // block of empty space — a masonry-style column flow packs cards by
        // actual height instead, which is what keeps 2 or 3 entries reading
        // as a deliberate set rather than a half-empty grid.
        <div className="gap-space-xl [&>*]:mb-space-xl columns-1 lg:columns-2 [&>*]:break-inside-avoid">
          {studies.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      ) : (
        <p className="text-grey-500">Case studies are on their way.</p>
      )}

      {hasConfidentialWork() && (
        <p className="text-grey-500 text-small max-w-2xl">
          {CONFIDENTIALITY_NOTE}
        </p>
      )}
    </Section>
  );
}
