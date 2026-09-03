import { cn } from "@/lib/utils";

/**
 * The laptop device frame used on the Work page: lid, camera dot, browser
 * chrome with an address bar, and a hinged base.
 *
 * It wraps two kinds of content — the abstract screens drawn by
 * `BrowserMockup`, and real product screenshots via `ProjectScreenshot` — so
 * a page mixing both keeps one consistent device treatment.
 *
 * `decorative` marks the whole frame `aria-hidden`, which is correct for a
 * drawn placeholder and wrong for a real screenshot that carries alt text.
 */
export function LaptopFrame({
  label,
  decorative = false,
  className,
  children,
}: {
  /** Address-bar text — a project's host name, or the studio's own domain. */
  label: string;
  decorative?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      aria-hidden={decorative || undefined}
      className={cn("w-full", className)}
    >
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
            <span className="bg-grey-100 text-grey-500 ml-2 flex h-3.5 min-w-0 flex-1 items-center rounded-full px-2 text-[6px] sm:text-[7px]">
              <span className="truncate">{label}</span>
            </span>
          </div>

          {children}
        </div>
      </div>

      {/* Laptop base + hinge */}
      <div className="bg-grey-900 mx-auto h-[2.5%] min-h-[8px] w-full rounded-b-lg">
        <div className="bg-grey-700 mx-auto h-full w-[14%] rounded-b-lg" />
      </div>
    </div>
  );
}
