import Link from "next/link";
import VisitorCounter from "./VisitorCounter";

const FOOTER_LINKS = [
  { href: "/about", label: "About" },
  { href: "/how-to-use", label: "How to Use" },
  { href: "/rankings", label: "Rankings" },
  { href: "/compare", label: "Compare" },
];

const CONTENT_LINKS = [
  { href: "/nato-defense-spending", label: "NATO Spending" },
  { href: "/us-vs-china-military-spending", label: "US vs China" },
  { href: "/top-military-spenders", label: "Top Spenders" },
  { href: "/defense-spending-by-region", label: "By Region" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
          {/* Tools */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Tools</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-accent-navy transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Insights */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Insights</h3>
            <ul className="space-y-2">
              {CONTENT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-accent-navy transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Data Sources */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Data Sources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.sipri.org/databases/milex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-accent-navy transition-colors duration-300"
                >
                  SIPRI Database
                </a>
              </li>
              <li>
                <a
                  href="https://data.worldbank.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-accent-navy transition-colors duration-300"
                >
                  World Bank Data
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h3 className="font-heading text-sm font-semibold text-text-primary mb-3">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:taeshinkim11@gmail.com?subject=DefenseBudget%20Dash%20Feedback"
                  className="text-sm text-text-secondary hover:text-accent-navy transition-colors duration-300"
                >
                  Send Feedback
                </a>
              </li>
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-accent-navy transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-heading text-sm font-bold text-accent-navy">
              DefenseBudget Dash
            </Link>
            <span className="text-xs text-text-muted">
              &copy; 2026 Open data for public interest.
            </span>
          </div>
          <VisitorCounter />
        </div>
      </div>
    </footer>
  );
}
