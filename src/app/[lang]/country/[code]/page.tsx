import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCountries, getCountryByCode } from "@/lib/data";
import ShareButtons from "@/components/ShareButtons";

// ---------------------------------------------------------------------------
// Static params — pre-generate a page for every country in the dataset
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return getAllCountries().map((c) => ({ code: c.code.toLowerCase() }));
}

// ---------------------------------------------------------------------------
// Dynamic metadata per country
// ---------------------------------------------------------------------------

interface PageProps {
  params: Promise<{ code: string; lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params;
  const country = getCountryByCode(code);
  if (!country) return {};

  const spendLabel = country.defense_spending_billion_usd >= 1
    ? `$${country.defense_spending_billion_usd.toFixed(0)}B`
    : `$${(country.defense_spending_billion_usd * 1000).toFixed(0)}M`;

  const title = `${country.name} Defense Budget ${country.year} — ${spendLabel} Military Spending`;
  const description = `Explore ${country.name}'s ${country.year} defense budget: ${spendLabel} in military spending (${country.defense_pct_gdp.toFixed(1)}% of GDP), ${country.active_military_personnel.toLocaleString()} active personnel. Compare with other countries.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function CountryPage({ params }: PageProps) {
  const { code, lang } = await params;
  const country = getCountryByCode(code);
  if (!country) notFound();

  const prefix = lang === "en" ? "" : `/${lang}`;
  const allCountries = getAllCountries();

  const spendLabel = country.defense_spending_billion_usd >= 1
    ? `$${country.defense_spending_billion_usd.toFixed(1)}B`
    : `$${(country.defense_spending_billion_usd * 1000).toFixed(1)}M`;

  const pageUrl = `https://defense-budget-dash.vercel.app/country/${code.toLowerCase()}`;
  const shareTitle = `${country.flag} ${country.name} spends ${spendLabel} on defense (${country.defense_pct_gdp.toFixed(1)}% of GDP). See the full breakdown on DefenseBudget Dash.`;

  // Pick a few peer countries for the "compare" CTA
  const peers = allCountries
    .filter((c) => c.code !== country.code)
    .sort(
      (a, b) =>
        Math.abs(a.defense_spending_billion_usd - country.defense_spending_billion_usd) -
        Math.abs(b.defense_spending_billion_usd - country.defense_spending_billion_usd),
    )
    .slice(0, 3);

  const compareQuery = [country.code, ...peers.map((p) => p.code)]
    .join(",")
    .toLowerCase();

  return (
    <div className="space-y-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm text-text-secondary">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href={`${prefix}/`} className="hover:text-accent-navy transition-colors duration-200">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href={`${prefix}/rankings`} className="hover:text-accent-navy transition-colors duration-200">
              Rankings
            </Link>
          </li>
          <li>/</li>
          <li className="text-text-primary font-medium">{country.name}</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary">
            {country.flag} {country.name}
          </h1>
          <p className="mt-1 text-text-secondary">
            Defense spending overview &middot; {country.year} data
          </p>
        </div>
        <ShareButtons url={pageUrl} title={shareTitle} />
      </header>

      {/* Key Metrics */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl bg-white p-6 shadow-md text-center transition-shadow duration-300 hover:shadow-lg">
          <p className="text-xs font-medium uppercase tracking-wider text-text-secondary">
            Defense Spending
          </p>
          <p className="mt-2 font-heading text-2xl font-bold text-accent-navy">
            {spendLabel}
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            Rank #{country.rank_spending} globally
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-md text-center transition-shadow duration-300 hover:shadow-lg">
          <p className="text-xs font-medium uppercase tracking-wider text-text-secondary">
            % of GDP
          </p>
          <p className="mt-2 font-heading text-2xl font-bold text-accent-navy">
            {country.defense_pct_gdp.toFixed(1)}%
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            Rank #{country.rank_pct_gdp} globally
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-md text-center transition-shadow duration-300 hover:shadow-lg">
          <p className="text-xs font-medium uppercase tracking-wider text-text-secondary">
            Active Personnel
          </p>
          <p className="mt-2 font-heading text-2xl font-bold text-accent-navy">
            {country.active_military_personnel.toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-md text-center transition-shadow duration-300 hover:shadow-lg">
          <p className="text-xs font-medium uppercase tracking-wider text-text-secondary">
            GDP
          </p>
          <p className="mt-2 font-heading text-2xl font-bold text-accent-navy">
            ${country.gdp_billion_usd.toLocaleString()}B
          </p>
        </div>
      </section>

      {/* Contextual description for SEO */}
      <section className="rounded-xl bg-white p-6 shadow-md space-y-4">
        <h2 className="font-heading text-xl font-bold text-text-primary">
          {country.name} Military Budget at a Glance
        </h2>
        <p className="text-text-secondary leading-relaxed">
          In {country.year}, {country.name} allocated {spendLabel} to defense,
          representing {country.defense_pct_gdp.toFixed(1)}% of its ${country.gdp_billion_usd.toLocaleString()} billion GDP.
          This places {country.name} at rank #{country.rank_spending} worldwide
          in absolute military spending and rank #{country.rank_pct_gdp} by
          share of GDP dedicated to defense.
        </p>
        <p className="text-text-secondary leading-relaxed">
          {country.name} maintains an active military force of{" "}
          {country.active_military_personnel.toLocaleString()} personnel. Defense
          expenditure covers a range of capabilities including personnel costs,
          equipment procurement, research and development, and operational
          readiness across land, sea, air, and cyber domains.
        </p>
      </section>

      {/* Compare CTA */}
      <section className="rounded-xl bg-accent-navy-light p-6 text-center">
        <h2 className="font-heading text-xl font-bold text-text-primary mb-2">
          Compare {country.name} with Other Countries
        </h2>
        <p className="text-text-secondary mb-4 max-w-xl mx-auto">
          See how {country.name}&apos;s defense budget stacks up against similar
          spenders like {peers.map((p) => p.name).join(", ")}.
        </p>
        <Link
          href={`${prefix}/compare?countries=${compareQuery}`}
          className="inline-flex items-center gap-2 rounded-xl bg-accent-navy px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-accent-navy/90 hover:shadow-lg"
        >
          Compare Now
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </section>

      {/* Browse other countries */}
      <section>
        <h2 className="font-heading text-xl font-bold text-text-primary mb-4">
          Browse All Countries
        </h2>
        <div className="flex flex-wrap gap-2">
          {allCountries.map((c) => (
            <Link
              key={c.code}
              href={`${prefix}/country/${c.code.toLowerCase()}`}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
                c.code === country.code
                  ? "bg-accent-navy text-white"
                  : "bg-white text-text-secondary shadow-sm hover:bg-accent-navy-light hover:text-accent-navy"
              }`}
            >
              {c.flag} {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `${country.name} Defense Budget ${country.year}`,
            description: `${country.name} military spending overview: ${spendLabel}, ${country.defense_pct_gdp.toFixed(1)}% of GDP, ${country.active_military_personnel.toLocaleString()} active personnel.`,
            author: {
              "@type": "Organization",
              name: "DefenseBudget Dash",
            },
          }),
        }}
      />
    </div>
  );
}
