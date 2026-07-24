import { cn } from "@/lib/utils";

/**
 * A decorative browser-window mockup used on the Work page to stand in for
 * real project screenshots. Purely presentational (aria-hidden) — it draws a
 * dense, grayscale interface so the page reads like a portfolio showcase
 * without claiming to show real client screens.
 *
 * `variant` picks one of four abstract layouts (marketing site, dashboard,
 * list/table, gallery) so a grid of these doesn't look repetitive. Red is
 * intentionally absent — it stays reserved for primary Button actions.
 */
export function BrowserMockup({
  variant = 1,
  className,
}: {
  variant?: 1 | 2 | 3 | 4;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "border-grey-100 overflow-hidden rounded-lg border bg-white shadow-sm",
        className,
      )}
    >
      {/* Browser chrome */}
      <div className="border-grey-100 gap-space-sm px-space-md py-space-sm flex items-center border-b">
        <span className="flex gap-1.5">
          <span className="bg-grey-300 h-2.5 w-2.5 rounded-full" />
          <span className="bg-grey-300 h-2.5 w-2.5 rounded-full" />
          <span className="bg-grey-300 h-2.5 w-2.5 rounded-full" />
        </span>
        <span className="bg-grey-100 ml-space-xs h-3 w-1/2 rounded-full" />
      </div>

      {/* Abstract screen */}
      <div className="bg-paper p-space-md">
        {variant === 1 && <MarketingScreen />}
        {variant === 2 && <DashboardScreen />}
        {variant === 3 && <ListScreen />}
        {variant === 4 && <GalleryScreen />}
      </div>
    </div>
  );
}

/* Shared atoms ------------------------------------------------------------ */

const line = "rounded-full bg-grey-100";
const lineDark = "rounded-full bg-grey-300";
const card = "rounded-md border border-grey-100 bg-white";

/** A dark accent chip — buttons, primary actions in the abstract UI. */
function Chip({ className }: { className?: string }) {
  return <div className={cn("bg-ink rounded", className)} />;
}

/* Screens ----------------------------------------------------------------- */

function MarketingScreen() {
  return (
    <div className={cn(card, "gap-space-md p-space-md flex flex-col")}>
      {/* Top nav */}
      <div className="gap-space-sm flex items-center">
        <div className={cn(lineDark, "h-3 w-14")} />
        <div className="gap-space-sm ml-auto flex">
          <div className={cn(line, "h-2 w-8")} />
          <div className={cn(line, "h-2 w-8")} />
          <div className={cn(line, "h-2 w-8")} />
        </div>
      </div>
      {/* Hero copy */}
      <div className="gap-space-xs py-space-xs flex flex-col items-center text-center">
        <div className={cn(lineDark, "h-4 w-3/5")} />
        <div className={cn(lineDark, "h-4 w-2/5")} />
        <div className={cn(line, "mt-space-xs h-2 w-1/2")} />
        <Chip className="mt-space-sm h-6 w-24" />
      </div>
      {/* Hero image */}
      <div className="bg-grey-100 h-20 rounded-md" />
      {/* Feature row */}
      <div className="gap-space-sm grid grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="gap-space-xs flex flex-col">
            <div className="bg-grey-300 h-6 w-6 rounded-md" />
            <div className={cn(line, "h-2 w-full")} />
            <div className={cn(line, "h-2 w-3/4")} />
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardScreen() {
  return (
    <div className="gap-space-sm flex">
      {/* Sidebar */}
      <div className={cn(card, "gap-space-sm p-space-sm flex w-1/4 flex-col")}>
        <div className={cn(lineDark, "h-3 w-2/3")} />
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="gap-space-xs flex items-center">
            <div className="bg-grey-100 h-3 w-3 rounded" />
            <div
              className={cn(
                line,
                i === 1 ? "bg-grey-300 h-2 w-full" : "h-2 w-4/5",
              )}
            />
          </div>
        ))}
      </div>

      {/* Main */}
      <div className="gap-space-sm flex flex-1 flex-col">
        {/* Top bar */}
        <div className="gap-space-sm flex items-center">
          <div className={cn(lineDark, "h-3 w-1/3")} />
          <div className={cn(line, "ml-auto h-5 w-20")} />
          <div className="bg-grey-100 h-6 w-6 rounded-full" />
        </div>
        {/* Stat cards */}
        <div className="gap-space-sm grid grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={cn(card, "gap-space-xs p-space-sm flex flex-col")}
            >
              <div className={cn(line, "h-1.5 w-2/3")} />
              <div className={cn(lineDark, "h-3 w-1/2")} />
            </div>
          ))}
        </div>
        {/* Chart card */}
        <div className={cn(card, "p-space-sm")}>
          <div className={cn(line, "mb-space-sm h-2 w-1/4")} />
          <div className="gap-space-sm flex h-16 items-end">
            {[
              "h-2/5",
              "h-3/5",
              "h-full",
              "h-1/2",
              "h-4/5",
              "h-1/3",
              "h-3/4",
            ].map((h, i) => (
              <div key={i} className={cn("bg-grey-300 flex-1 rounded-t", h)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ListScreen() {
  return (
    <div className={cn(card, "gap-space-sm p-space-md flex flex-col")}>
      {/* Toolbar */}
      <div className="gap-space-sm flex items-center">
        <div className={cn(lineDark, "h-3 w-1/4")} />
        <div className={cn(line, "ml-auto h-6 w-24")} />
        <Chip className="h-6 w-14" />
      </div>
      {/* Column headers */}
      <div className="gap-space-sm border-grey-100 pb-space-xs flex items-center border-b">
        <div className={cn(line, "h-2 w-1/3")} />
        <div className={cn(line, "ml-auto h-2 w-16")} />
        <div className={cn(line, "h-2 w-12")} />
      </div>
      {/* Rows */}
      {[0, 1, 2, 3, 4].map((row) => (
        <div
          key={row}
          className="gap-space-sm border-grey-100 pb-space-xs flex items-center border-b last:border-b-0 last:pb-0"
        >
          <div className="bg-grey-100 h-7 w-7 shrink-0 rounded-md" />
          <div className="gap-space-xs flex flex-1 flex-col">
            <div className={cn(lineDark, "h-2 w-1/3")} />
            <div className={cn(line, "h-2 w-2/3")} />
          </div>
          <div className={cn(line, "h-2 w-12")} />
          <div className="bg-grey-100 border-grey-300 h-4 w-14 rounded-full border" />
        </div>
      ))}
    </div>
  );
}

function GalleryScreen() {
  return (
    <div className="gap-space-sm flex flex-col">
      {/* Toolbar */}
      <div className="gap-space-sm flex items-center">
        <div className={cn(lineDark, "h-3 w-1/4")} />
        <div className="gap-space-xs ml-auto flex">
          <div className={cn(line, "h-5 w-12")} />
          <Chip className="h-5 w-12" />
        </div>
      </div>
      {/* Card grid */}
      <div className="gap-space-sm grid grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={cn(card, "overflow-hidden")}>
            <div className="bg-grey-100 aspect-[4/3]" />
            <div className="gap-space-xs p-space-xs flex flex-col">
              <div className={cn(lineDark, "h-2 w-3/4")} />
              <div className={cn(line, "h-1.5 w-1/2")} />
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="gap-space-xs flex items-center justify-center">
        <div className="bg-grey-300 h-2 w-2 rounded-full" />
        <div className="bg-grey-100 h-2 w-2 rounded-full" />
        <div className="bg-grey-100 h-2 w-2 rounded-full" />
      </div>
    </div>
  );
}
