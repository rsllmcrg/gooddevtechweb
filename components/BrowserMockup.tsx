import { cn } from "@/lib/utils";

/**
 * A decorative laptop mockup used on the Work page to stand in for real
 * project screenshots. Purely presentational (aria-hidden) — it draws a
 * populated, realistic-looking interface inside a laptop device frame so the
 * page reads like a portfolio showcase without claiming to show real client
 * screens.
 *
 * `variant` picks one of four believable layouts (marketing site, dashboard,
 * list/table, gallery) so a grid of these doesn't look repetitive. Colour is
 * kept on-brand: ink + greys for the UI, Signal Red reserved for the primary
 * action, exactly as the real product would use it.
 */
export function BrowserMockup({
  variant = 1,
  className,
}: {
  variant?: 1 | 2 | 3 | 4;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={cn("w-full", className)}>
      {/* Laptop lid + screen */}
      <div className="bg-grey-900 mx-auto w-[94%] rounded-t-xl p-[1.5%] shadow-sm">
        {/* Camera dot */}
        <div className="bg-grey-700 mx-auto mb-[1%] h-1 w-1 rounded-full" />
        <div className="overflow-hidden rounded-md bg-white">
          {/* Browser chrome */}
          <div className="border-grey-100 flex items-center gap-1.5 border-b px-2 py-1.5">
            <span className="flex gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
            </span>
            <span className="bg-grey-100 text-grey-500 ml-2 flex h-3.5 flex-1 items-center rounded-full px-2 text-[6px] sm:text-[7px]">
              gooddev.tech
            </span>
          </div>

          {/* Screen */}
          <div className="bg-paper">
            {variant === 1 && <MarketingScreen />}
            {variant === 2 && <DashboardScreen />}
            {variant === 3 && <ListScreen />}
            {variant === 4 && <GalleryScreen />}
          </div>
        </div>
      </div>

      {/* Laptop base + hinge */}
      <div className="bg-grey-900 mx-auto h-[2.5%] min-h-[8px] w-full rounded-b-lg">
        <div className="bg-grey-700 mx-auto h-full w-[14%] rounded-b-lg" />
      </div>
    </div>
  );
}

/* Shared atoms ------------------------------------------------------------ */

const line = "rounded-full bg-grey-100";
const card = "rounded-md border border-grey-100 bg-white";
/** A soft grey "photo" placeholder — reads as an image without being one. */
const photo = "bg-gradient-to-br from-grey-100 to-grey-300 rounded-md";

/* Screens ----------------------------------------------------------------- */

function MarketingScreen() {
  return (
    <div className="flex flex-col">
      {/* Nav */}
      <div className="flex items-center px-3 py-2">
        <span className="text-ink text-[7px] font-bold sm:text-[9px]">
          GoodDev<span className="text-red">Tech</span>
        </span>
        <div className="text-grey-500 ml-auto flex items-center gap-2 text-[6px] sm:text-[7px]">
          <span>Services</span>
          <span>Work</span>
          <span>About</span>
          <span className="bg-red rounded px-1.5 py-0.5 text-white">
            Start a project
          </span>
        </div>
      </div>

      {/* Hero */}
      <div className="grid grid-cols-2 items-center gap-3 px-3 pt-2 pb-3">
        <div className="flex flex-col gap-1.5">
          <span className="text-grey-500 text-[5px] font-semibold tracking-widest uppercase sm:text-[6px]">
            Digital Studio
          </span>
          <div className="text-ink text-[11px] leading-tight font-bold sm:text-[15px]">
            We build software that <span className="text-red">ships</span>.
          </div>
          <div className="text-grey-500 text-[6px] leading-relaxed sm:text-[7px]">
            Web apps, APIs, and full-stack products delivered end to end for
            teams that need it done right.
          </div>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="bg-red rounded px-2 py-1 text-[6px] font-semibold text-white sm:text-[7px]">
              Get started
            </span>
            <span className="border-grey-100 text-grey-700 rounded border px-2 py-1 text-[6px] sm:text-[7px]">
              See our work
            </span>
          </div>
        </div>

        {/* Hero image with decorative accent */}
        <div className="relative">
          <div className={cn(photo, "h-20 w-full sm:h-28")} />
          <div className="border-red/40 absolute -bottom-1.5 -left-1.5 h-8 w-8 rounded-full border-2" />
        </div>
      </div>

      {/* Feature row */}
      <div className="border-grey-100 grid grid-cols-3 gap-2 border-t px-3 py-2.5">
        {["Web", "APIs", "Product"].map((label) => (
          <div key={label} className="flex flex-col gap-1">
            <div className="bg-red/10 flex h-4 w-4 items-center justify-center rounded">
              <div className="bg-red h-1.5 w-1.5 rounded-sm" />
            </div>
            <div className="text-ink text-[6px] font-semibold sm:text-[7px]">
              {label}
            </div>
            <div className={cn(line, "h-1 w-full")} />
            <div className={cn(line, "h-1 w-3/4")} />
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardScreen() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-ink flex w-1/4 flex-col gap-2 p-2">
        <div className="text-[6px] font-bold text-white sm:text-[8px]">
          Dash<span className="text-red">board</span>
        </div>
        {["Overview", "Shipments", "Reports", "Settings"].map((item, i) => (
          <div
            key={item}
            className={cn(
              "flex items-center gap-1 rounded px-1 py-0.5 text-[5px] sm:text-[6px]",
              i === 1 ? "bg-white/10 text-white" : "text-grey-300",
            )}
          >
            <span className="bg-grey-500 h-1.5 w-1.5 rounded-sm" />
            {item}
          </div>
        ))}
      </div>

      {/* Main */}
      <div className="flex flex-1 flex-col gap-2 p-2.5">
        {/* Top bar */}
        <div className="flex items-center gap-2">
          <div className="text-ink text-[7px] font-semibold sm:text-[9px]">
            Overview
          </div>
          <div className={cn(line, "ml-auto h-4 w-16")} />
          <div className="bg-grey-300 h-4 w-4 rounded-full" />
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-1.5">
          {[
            ["Shipments", "1,284"],
            ["In transit", "312"],
            ["Delivered", "972"],
          ].map(([label, value]) => (
            <div
              key={label}
              className={cn(card, "flex flex-col gap-0.5 p-1.5")}
            >
              <div className="text-grey-500 text-[5px] sm:text-[6px]">
                {label}
              </div>
              <div className="text-ink text-[8px] font-bold sm:text-[11px]">
                {value}
              </div>
              <div className="text-red text-[5px] font-semibold sm:text-[6px]">
                ↑ 12%
              </div>
            </div>
          ))}
        </div>

        {/* Chart card */}
        <div className={cn(card, "p-2")}>
          <div className="text-grey-500 mb-1.5 text-[5px] sm:text-[6px]">
            Weekly volume
          </div>
          <div className="flex h-14 items-end gap-1">
            {["40%", "60%", "100%", "50%", "80%", "35%", "75%"].map((h, i) => (
              <div
                key={i}
                className={cn(
                  "flex-1 rounded-t",
                  i === 2 ? "bg-red" : "bg-grey-300",
                )}
                style={{ height: h }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ListScreen() {
  const rows = [
    ["Label #4821", "Warehouse A", "Active"],
    ["Label #4820", "Warehouse C", "Draft"],
    ["Label #4819", "Warehouse A", "Active"],
    ["Label #4818", "Warehouse B", "Archived"],
    ["Label #4817", "Warehouse C", "Active"],
  ];
  return (
    <div className="flex flex-col gap-2 p-3">
      {/* Toolbar */}
      <div className="flex items-center gap-2">
        <div className="text-ink text-[8px] font-semibold sm:text-[10px]">
          Labels
        </div>
        <div className="bg-grey-100 text-grey-500 ml-auto flex h-5 items-center rounded px-2 text-[5px] sm:text-[6px]">
          Search…
        </div>
        <div className="bg-red rounded px-2 py-1 text-[5px] font-semibold text-white sm:text-[6px]">
          + New
        </div>
      </div>

      {/* Header */}
      <div className="border-grey-100 text-grey-500 flex items-center border-b pb-1 text-[5px] font-semibold uppercase sm:text-[6px]">
        <span className="flex-1">Name</span>
        <span className="w-1/4">Location</span>
        <span className="w-12 text-right">Status</span>
      </div>

      {/* Rows */}
      {rows.map(([name, loc, status]) => (
        <div
          key={name}
          className="border-grey-100 flex items-center gap-2 border-b pb-1.5 text-[6px] last:border-b-0 last:pb-0 sm:text-[7px]"
        >
          <div className={cn(photo, "h-5 w-5 shrink-0")} />
          <div className="text-ink flex-1 font-medium">{name}</div>
          <div className="text-grey-500 w-1/4">{loc}</div>
          <span
            className={cn(
              "w-12 text-right",
              status === "Active"
                ? "text-red font-semibold"
                : "text-grey-300",
            )}
          >
            {status}
          </span>
        </div>
      ))}
    </div>
  );
}

function GalleryScreen() {
  const items = [
    "Aspirin 500mg",
    "Vitamin C",
    "Ibuprofen",
    "Antacid",
    "Cough Syrup",
    "Bandages",
  ];
  return (
    <div className="flex flex-col gap-2 p-3">
      {/* Toolbar */}
      <div className="flex items-center gap-2">
        <div className="text-ink text-[8px] font-semibold sm:text-[10px]">
          Catalog
        </div>
        <div className="text-grey-500 ml-auto flex items-center gap-1.5 text-[5px] sm:text-[6px]">
          <span>Filter</span>
          <span className="bg-red rounded px-1.5 py-0.5 text-white">Order</span>
        </div>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-3 gap-1.5">
        {items.map((label) => (
          <div key={label} className={cn(card, "overflow-hidden")}>
            <div className={cn(photo, "aspect-[4/3] rounded-none")} />
            <div className="flex flex-col gap-0.5 p-1">
              <div className="text-ink text-[5px] font-semibold sm:text-[6px]">
                {label}
              </div>
              <div className="text-red text-[5px] font-bold sm:text-[6px]">
                ₱—
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-1">
        <div className="bg-red h-1.5 w-1.5 rounded-full" />
        <div className="bg-grey-100 h-1.5 w-1.5 rounded-full" />
        <div className="bg-grey-100 h-1.5 w-1.5 rounded-full" />
      </div>
    </div>
  );
}
