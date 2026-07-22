"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/Container";
import { Logo } from "@/components/Logo";
import { navLinks, primaryCta, siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * A nav link is active when its href exactly matches the current path, or when
 * the path is nested beneath it. "/" only matches the home page exactly so it
 * doesn't light up on every route.
 */
function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // While the mobile menu is open, lock body scroll and close on Escape,
  // returning focus to the toggle. Everything is undone on close/unmount.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="border-grey-100 bg-paper sticky top-0 z-50 border-b">
      <Container className="gap-space-md flex h-16 items-center justify-between">
        {/*
          Horizontal lockup — the guidelines' default for website headers. At
          168px it clears the 140px minimum with room to spare, and with its
          ½X clear space it stands 48px tall inside the 64px bar.

          The Logo reserves that clear space as padding; -ml-3 pulls the left
          half back out to the container edge so the wordmark optically lines
          up with the content below. The clear space is preserved — it just
          isn't counted twice against the gutter.
        */}
        <Link
          href="/"
          className="-ml-3 shrink-0"
          aria-label={`${siteConfig.name} — home`}
        >
          <Logo width={168} priority alt="" />
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Primary"
          className="gap-space-lg hidden items-center md:flex"
        >
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-small hover:text-ink transition-colors",
                  active ? "text-ink font-semibold" : "text-grey-500",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href={primaryCta.href}
            className="bg-red text-paper text-small px-space-md py-space-xs rounded-md font-semibold transition-opacity hover:opacity-90"
          >
            {primaryCta.label}
          </Link>
        </nav>

        {/* Mobile menu toggle */}
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="text-ink -mr-2 inline-flex h-10 w-10 items-center justify-center md:hidden"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </Container>

      {/* Mobile menu panel — fills the viewport below the bar so the locked
          background scroll is the only thing hidden. The header must not create
          a containing block for this fixed element (hence no backdrop-filter),
          or it would be sized against the 64px bar instead of the viewport. */}
      {open && (
        <div
          id="mobile-menu"
          className="bg-paper fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto md:hidden"
        >
          <nav aria-label="Mobile">
            <Container className="gap-space-xs py-space-lg flex flex-col">
              {navLinks.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "text-body px-space-sm py-space-sm rounded-md",
                      active
                        ? "bg-grey-100 text-ink font-semibold"
                        : "text-grey-700",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href={primaryCta.href}
                onClick={() => setOpen(false)}
                className="bg-red text-paper text-body mt-space-xs px-space-sm py-space-sm rounded-md text-center font-semibold"
              >
                {primaryCta.label}
              </Link>
            </Container>
          </nav>
        </div>
      )}
    </header>
  );
}

function MenuIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}
