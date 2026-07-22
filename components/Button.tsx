"use client";

import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  MouseEventHandler,
} from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";

/**
 * Usage:
 *
 *   <Button>Get in touch</Button>
 *   <Button variant="secondary">Learn more</Button>
 *   <Button href="/contact">Start a project</Button>          // renders as a CTA link
 *   <Button href="https://x.com" variant="secondary">X</Button> // external, opens in new tab
 *   <Button disabled>Submitting…</Button>
 *   <Button href="/contact" aria-disabled="true">Unavailable</Button> // disabled link
 *
 * variant="primary" (red) is reserved for the one primary action in a
 * given view — use variant="secondary" for every other action.
 */
const baseClasses = cn(
  "inline-flex items-center justify-center gap-space-xs rounded-md px-space-lg py-space-sm",
  "text-body font-semibold transition-colors duration-150",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper",
  "disabled:pointer-events-none disabled:opacity-50",
  "aria-disabled:pointer-events-none aria-disabled:opacity-50",
);

const variantClasses: Record<Variant, string> = {
  primary: "bg-red text-paper hover:bg-red-hover",
  secondary: "border-2 border-ink text-ink hover:bg-ink hover:text-paper",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], className);

  if (props.href !== undefined) {
    const { href, "aria-disabled": ariaDisabled, onClick, ...rest } = props;
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
        className={classes}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...rest}
      />
    );
  }

  return <button className={classes} {...props} />;
}
