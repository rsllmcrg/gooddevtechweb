import { cn } from "@/lib/utils";

/**
 * A decorative browser-window mockup used on the Work page to stand in for
 * real project screenshots. Purely presentational (aria-hidden) — it draws an
 * abstract, grayscale interface so the page reads like a portfolio showcase
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
      <div className="p-space-lg">
        {variant === 1 && <MarketingScreen />}
        {variant === 2 && <DashboardScreen />}
        {variant === 3 && <ListScreen />}
        {variant === 4 && <GalleryScreen />}
      </div>
    </div>
  );
}

const bar = "rounded-full bg-grey-100";
const barDark = "rounded-full bg-grey-300";
const block = "rounded-md bg-grey-100";

function MarketingScreen() {
  return (
    <div className="gap-space-md flex flex-col">
      <div className={cn(barDark, "h-4 w-2/3")} />
      <div className={cn(bar, "h-2 w-full")} />
      <div className={cn(bar, "h-2 w-4/5")} />
      <div className="bg-ink mt-space-xs h-6 w-24 rounded-full" />
      <div className="gap-space-sm mt-space-xs grid grid-cols-3">
        <div className={cn(block, "h-14")} />
        <div className={cn(block, "h-14")} />
        <div className={cn(block, "h-14")} />
      </div>
    </div>
  );
}

function DashboardScreen() {
  return (
    <div className="gap-space-md flex">
      {/* Sidebar */}
      <div className="gap-space-sm flex w-1/4 flex-col">
        <div className={cn(barDark, "h-2.5 w-full")} />
        <div className={cn(bar, "h-2 w-4/5")} />
        <div className={cn(bar, "h-2 w-full")} />
        <div className={cn(bar, "h-2 w-3/5")} />
      </div>
      {/* Main */}
      <div className="gap-space-md flex flex-1 flex-col">
        <div className="gap-space-sm grid grid-cols-3">
          <div className={cn(block, "h-10")} />
          <div className={cn(block, "h-10")} />
          <div className={cn(block, "h-10")} />
        </div>
        {/* Bar chart */}
        <div className="gap-space-sm flex h-16 items-end">
          <div className="bg-grey-300 h-2/5 flex-1 rounded-t" />
          <div className="bg-grey-300 h-3/5 flex-1 rounded-t" />
          <div className="bg-grey-300 h-full flex-1 rounded-t" />
          <div className="bg-grey-300 h-1/2 flex-1 rounded-t" />
          <div className="bg-grey-300 h-4/5 flex-1 rounded-t" />
          <div className="bg-grey-300 h-1/3 flex-1 rounded-t" />
        </div>
      </div>
    </div>
  );
}

function ListScreen() {
  return (
    <div className="gap-space-sm flex flex-col">
      <div className="gap-space-md mb-space-xs flex items-center">
        <div className={cn(barDark, "h-3 w-1/4")} />
        <div className={cn(bar, "ml-auto h-6 w-16")} />
      </div>
      {[0, 1, 2, 3].map((row) => (
        <div key={row} className="gap-space-sm flex items-center">
          <div className="bg-grey-100 h-8 w-8 shrink-0 rounded-md" />
          <div className="gap-space-xs flex flex-1 flex-col">
            <div className={cn(bar, "h-2 w-1/2")} />
            <div className={cn(bar, "h-2 w-3/4")} />
          </div>
          <div className={cn(barDark, "h-4 w-12")} />
        </div>
      ))}
    </div>
  );
}

function GalleryScreen() {
  return (
    <div className="gap-space-sm flex flex-col">
      <div className="gap-space-sm grid grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={cn(block, "aspect-square")} />
        ))}
      </div>
      <div className="mt-space-xs flex items-center gap-1.5">
        <div className="bg-grey-300 h-2.5 w-2.5 rounded-full" />
        <div className="bg-grey-100 h-2.5 w-2.5 rounded-full" />
        <div className="bg-grey-100 h-2.5 w-2.5 rounded-full" />
      </div>
    </div>
  );
}
