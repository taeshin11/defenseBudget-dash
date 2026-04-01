"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDictionary } from "@/i18n/DictionaryProvider";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { dict, lang } = useDictionary();

  // Strip locale prefix for matching
  const pathWithoutLocale = pathname.replace(/^\/(en|ko|zh|ja|es|fr|de|ar|pt|ru|hi)/, "") || "/";

  const prefix = lang === "en" ? "" : `/${lang}`;

  const NAV_LINKS = [
    { href: `${prefix}/`, label: dict.nav.home },
    { href: `${prefix}/compare`, label: dict.nav.compare },
    { href: `${prefix}/rankings`, label: dict.nav.rankings },
    { href: `${prefix}/how-to-use`, label: dict.nav.howToUse },
    { href: `${prefix}/about`, label: dict.nav.about },
  ];

  const isActive = (href: string) => {
    const hrefPath = href.replace(/^\/(en|ko|zh|ja|es|fr|de|ar|pt|ru|hi)/, "") || "/";
    return hrefPath === "/" ? pathWithoutLocale === "/" : pathWithoutLocale.startsWith(hrefPath);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[var(--shadow-sm)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href={`${prefix}/`}
          className="font-heading text-xl font-bold tracking-tight text-accent-navy sm:text-2xl"
        >
          DefenseBudget Dash
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <nav className="flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(href)
                    ? "bg-accent-navy-light text-accent-navy"
                    : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher />
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-text-secondary hover:bg-bg-secondary hover:text-text-primary md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-border px-4 pb-4 pt-2 md:hidden">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive(href)
                  ? "bg-accent-navy-light text-accent-navy"
                  : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary"
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="mt-2 px-3">
            <LanguageSwitcher />
          </div>
        </nav>
      )}
    </header>
  );
}
