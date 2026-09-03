import Image from "next/image";
import { LaptopFrame } from "@/components/LaptopFrame";
import type { MeasuredImage } from "@/lib/images";

/**
 * A real screenshot of a shipped product, sitting in the same laptop frame as
 * the drawn `BrowserMockup` placeholders it appears alongside on /work.
 *
 * Dimensions come from the file on disk (see `measureImage`), so next/image
 * reserves exact space and the frame never reflows as the shot loads.
 */
export function ProjectScreenshot({
  image,
  label,
  sizes = "(min-width: 1024px) 45vw, 100vw",
  className,
}: {
  image: MeasuredImage;
  /** Address-bar text — normally the project's public host. */
  label: string;
  sizes?: string;
  className?: string;
}) {
  return (
    <LaptopFrame label={label} className={className}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        className="h-auto w-full"
      />
    </LaptopFrame>
  );
}
