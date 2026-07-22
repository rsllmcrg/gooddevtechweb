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
        <div className="gap-space-xl grid grid-cols-1 lg:grid-cols-2">
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
