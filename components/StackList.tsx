import { cn } from "@/lib/utils";

/**
 * The technologies a case study was built with, as a flat chip row.
 * Rendered as a list so screen readers announce the count and boundaries.
 */
export function StackList({
  stack,
  className,
}: {
  stack: string[];
  className?: string;
}) {
  return (
    <ul className={cn("gap-space-xs flex flex-wrap", className)}>
      {stack.map((item) => (
        <li
          key={item}
          className="border-grey-100 text-grey-700 text-small px-space-sm rounded-full border py-1"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
