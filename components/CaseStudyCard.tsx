import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/lib/case-studies";
import { StackList } from "@/components/StackList";

/**
 * A case study teaser for the /work index.
 *
 * Every field below the title is optional in the content schema, so each one
 * is guarded — a case study with nothing but the required frontmatter still
 * renders a complete, correctly-spaced card.
 */
export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="border-grey-100 group overflow-hidden rounded-md border">
      <Link
        href={`/work/${study.slug}`}
        className="focus-visible:ring-ink block focus-visible:ring-2 focus-visible:outline-none"
      >
        {study.cover && (
          <div className="bg-grey-100/40 relative aspect-[16/10] overflow-hidden">
            <Image
              src={study.cover.src}
              alt={study.cover.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        )}

        <div className="p-space-lg gap-space-sm flex flex-col">
          <p className="text-grey-500 text-small">
            {study.attribution} · {study.year}
          </p>
          <h3 className="group-hover:text-red transition-colors duration-150">
            {study.title}
          </h3>
          <p className="text-grey-700">{study.summary}</p>
          <StackList stack={study.stack} className="mt-space-xs" />
        </div>
      </Link>
    </article>
  );
}
