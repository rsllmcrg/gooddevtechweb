"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, MouseEventHandler } from "react";
import { cn } from "@/lib/utils";

/**
 * Usage:
 *
 *   <p>Read more in our <TextLink href="/about">about page</TextLink>.</p>
 *   <TextLink href="https://github.com">GitHub</TextLink> // external, opens in new tab
 *   <TextLink href="/contact" aria-disabled="true">Unavailable</TextLink>
 *
 * Inline text link — never red. Red is reserved for primary Button actions.
 */
type TextLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  className?: string;
};

export function TextLink({
  href,
  className,
  "aria-disabled": ariaDisabled,
  onClick,
  ...props
}: TextLinkProps) {
  const isDisabled = ariaDisabled === true || ariaDisabled === "true";
  const isExternal = /^https?:\/\//.test(href);

  return (
    <Link
      href={href}
      aria-disabled={ariaDisabled}
      tabIndex={isDisabled ? -1 : undefined}
      onClick={
        isDisabled
          ? (event) => event.preventDefault()
          : (onClick as MouseEventHandler<HTMLAnchorElement>)
      }
      className={cn(
        "text-grey-700 underline underline-offset-4 transition-colors duration-150",
        "hover:text-ink",
        "focus-visible:ring-ink focus-visible:ring-offset-paper focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        "aria-disabled:text-grey-300 aria-disabled:pointer-events-none aria-disabled:no-underline",
        className,
      )}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    />
  );
}
