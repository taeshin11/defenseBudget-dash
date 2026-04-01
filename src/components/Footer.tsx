"use client";

import Link from "next/link";
import VisitorCounter from "./VisitorCounter";
import { useDictionary } from "@/i18n/DictionaryProvider";

export default function Footer() {
  const { dict, lang } = useDictionary();
  const prefix = lang === "en" ? "" : `/${lang}`;

  const FOOTER_LINKS = [
    { href: `${prefix}/about`, label: dict.nav.about },
    { href: `${prefix}/how-to-use`, label: dict.nav.howToUse },
    { href: `${prefix}/rankings`, label: dict.nav.rankings },
    { href: `${prefix}/compare`, label: dict.nav.compare },
  ];

  const CONTENT_LINKS = [
    { href: `${prefix}/nato-defense-spending`, label: dict.footer.natoSpending },
    { href: `${prefix}/us-vs-china-military-spending`, label: dict.footer.usVsChina },
    { href: `${prefix}/top-military-spenders`, label: dict.footer.topSpenders },
    { href: `${prefix}/defense-spending-by-region`, label: dict.footer.byRegion },
  ];

  const LEGAL_LINKS = [
    { href: `${prefix}/privacy`, label: dict.common.privacy },
    { href: `${prefix}/terms`, label: dict.common.terms },
  ];

  return (
    <footer className="mt-auto bg-bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">{dict.common.tools}</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-accent-navy transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">{dict.footer.insights}</h3>
            <ul className="space-y-2">
              {CONTENT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-accent-navy transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">{dict.footer.dataSources}</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.sipri.org/databases/milex" target="_blank" rel="noopener noreferrer" className="text-sm text-text-secondary hover:text-accent-navy transition-colors duration-300">
                  {dict.footer.sipriDatabase}
                </a>
              </li>
              <li>
                <a href="https://data.worldbank.org/" target="_blank" rel="noopener noreferrer" className="text-sm text-text-secondary hover:text-accent-navy transition-colors duration-300">
                  {dict.footer.worldBankData}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">{dict.common.contact}</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:taeshinkim11@gmail.com?subject=DefenseBudget%20Dash%20Feedback" className="text-sm text-text-secondary hover:text-accent-navy transition-colors duration-300">
                  {dict.common.sendFeedback}
                </a>
              </li>
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-secondary hover:text-accent-navy transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <div className="flex items-center gap-3">
            <Link href={`${prefix}/`} className="font-heading text-sm font-bold text-accent-navy">
              DefenseBudget Dash
            </Link>
            <span className="text-xs text-text-muted">
              &copy; {dict.common.copyright}
            </span>
          </div>
          <VisitorCounter />
        </div>
      </div>
    </footer>
  );
}
