import type { Metadata } from "next";
import Link from "next/link";
import { getAllCountries } from "@/lib/data";

export const metadata: Metadata = {
  title: "NATO Defense Spending 2024 — Which Countries Meet the 2% GDP Target?",
  description:
    "Analyze NATO defense spending and see which member nations meet the 2% of GDP target. Compare military budgets across all NATO allies with data from SIPRI and the World Bank.",
  keywords: [
    "NATO defense spending",
    "NATO 2 percent GDP",
    "NATO military budget",
    "NATO spending by country",
    "NATO defense expenditure",
    "NATO 2% target",
  ],
  openGraph: {
    title: "NATO Defense Spending 2024 — Which Countries Meet the 2% GDP Target?",
    description:
      "See which NATO members meet the 2% GDP defense spending guideline. Full breakdown of NATO military budgets.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "NATO Defense Spending 2024 — 2% GDP Target Analysis",
    description: "Which NATO allies meet the defense spending target? Full data breakdown.",
  },
};

const NATO_CODES = [
  "US", "GB", "FR", "DE", "IT", "CA", "TR", "PL", "NL", "NO",
  "ES", "GR", "BE", "DK", "PT", "CZ", "RO",
];

export default function NATODefenseSpendingPage() {
  const all = getAllCountries();
  const natoCountries = NATO_CODES
    .map((code) => all.find((c) => c.code === code))
    .filter(Boolean)
    .sort((a, b) => b!.defense_spending_billion_usd - a!.defense_spending_billion_usd);

  const totalSpending = natoCountries.reduce((s, c) => s + c!.defense_spending_billion_usd, 0);
  const meetTarget = natoCountries.filter((c) => c!.defense_pct_gdp >= 2.0);
  const avgPctGDP = natoCountries.reduce((s, c) => s + c!.defense_pct_gdp, 0) / natoCountries.length;
  const compareQuery = NATO_CODES.slice(0, 8).join(",");

  return (
    <div className="space-y-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm text-text-secondary">
        <ol className="flex items-center gap-1.5">
          <li><Link href="/" className="hover:text-accent-navy transition-colors">Home</Link></li>
          <li>/</li>
          <li className="text-text-primary font-medium">NATO Defense Spending</li>
        </ol>
      </nav>

      {/* Hero */}
      <header>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary">
          NATO Defense Spending 2024
        </h1>
        <p className="mt-3 text-lg text-text-secondary max-w-3xl">
          NATO&apos;s 2% of GDP defense spending guideline has become one of the most discussed benchmarks in international security. Here&apos;s how member nations stack up against this target — and what it means for transatlantic defense.
        </p>
      </header>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl bg-white p-6 shadow-md text-center border-l-4 border-accent-navy">
          <p className="text-xs font-medium uppercase tracking-wider text-text-secondary">Total NATO Spending</p>
          <p className="mt-2 font-heading text-2xl font-bold text-accent-navy">${totalSpending.toFixed(0)}B</p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-md text-center border-l-4 border-accent-green">
          <p className="text-xs font-medium uppercase tracking-wider text-text-secondary">Meet 2% Target</p>
          <p className="mt-2 font-heading text-2xl font-bold text-accent-green">{meetTarget.length} of {natoCountries.length}</p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-md text-center border-l-4 border-accent-red">
          <p className="text-xs font-medium uppercase tracking-wider text-text-secondary">NATO Average % GDP</p>
          <p className="mt-2 font-heading text-2xl font-bold text-accent-navy">{avgPctGDP.toFixed(1)}%</p>
        </div>
      </section>

      {/* Table */}
      <section className="rounded-xl bg-white shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg-secondary">
                <th className="px-4 py-3 text-left font-semibold text-text-secondary">#</th>
                <th className="px-4 py-3 text-left font-semibold text-text-secondary">Country</th>
                <th className="px-4 py-3 text-right font-semibold text-text-secondary">Spending ($B)</th>
                <th className="px-4 py-3 text-right font-semibold text-text-secondary">% of GDP</th>
                <th className="px-4 py-3 text-center font-semibold text-text-secondary">2% Target</th>
              </tr>
            </thead>
            <tbody>
              {natoCountries.map((c, i) => (
                <tr key={c!.code} className={`border-b border-border/50 transition-colors hover:bg-accent-navy-light/50 ${i % 2 === 0 ? "bg-white" : "bg-bg-primary/30"}`}>
                  <td className="px-4 py-3 text-text-muted">{i + 1}</td>
                  <td className="px-4 py-3 font-medium text-text-primary">
                    <Link href={`/country/${c!.code.toLowerCase()}`} className="hover:text-accent-navy hover:underline transition-colors">
                      {c!.flag} {c!.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-right text-text-secondary">${c!.defense_spending_billion_usd.toFixed(1)}B</td>
                  <td className={`px-4 py-3 text-right font-semibold ${c!.defense_pct_gdp >= 2.0 ? "text-accent-green" : "text-accent-red"}`}>
                    {c!.defense_pct_gdp.toFixed(1)}%
                  </td>
                  <td className="px-4 py-3 text-center text-lg">
                    {c!.defense_pct_gdp >= 2.0 ? (
                      <span className="text-accent-green" title="Meets 2% target">&#10003;</span>
                    ) : (
                      <span className="text-accent-red" title="Below 2% target">&#10007;</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SEO Content */}
      <section className="rounded-xl bg-white p-6 shadow-md space-y-4">
        <h2 className="font-heading text-xl font-bold text-text-primary">
          Understanding NATO&apos;s 2% Defense Spending Guideline
        </h2>
        <p className="text-text-secondary leading-relaxed">
          At the 2014 Wales Summit, NATO leaders agreed that each member nation should aim to spend at least 2% of its gross domestic product on defense by 2024. This guideline was established in response to growing security concerns, including Russia&apos;s annexation of Crimea and the rise of hybrid warfare threats. The 2% benchmark has since become a critical measure of burden-sharing within the alliance, with significant political implications for transatlantic relations.
        </p>
        <p className="text-text-secondary leading-relaxed">
          The United States has consistently been the largest contributor to NATO&apos;s collective defense, spending far more than any other member in both absolute terms and as a share of GDP. This disparity has been a recurring point of tension, with American policymakers arguing that European allies need to shoulder a greater share of the defense burden. In recent years, geopolitical developments — particularly the conflict in Ukraine — have accelerated defense spending increases across Europe, pushing more nations toward or beyond the 2% target.
        </p>
        <p className="text-text-secondary leading-relaxed">
          It is important to note that the 2% figure is a guideline, not a legally binding commitment. Defense spending effectiveness depends not only on the amount spent but also on how efficiently those resources are allocated across capabilities, readiness, and modernization. Some smaller NATO members with lower absolute budgets may contribute disproportionately through niche capabilities, geographic positioning, or operational deployments.
        </p>
      </section>

      {/* CTA */}
      <section className="rounded-xl bg-accent-navy-light p-6 text-center">
        <h2 className="font-heading text-xl font-bold text-text-primary mb-2">
          Compare NATO Members Side by Side
        </h2>
        <p className="text-text-secondary mb-4 max-w-xl mx-auto">
          Use our interactive comparison tool to explore how NATO allies stack up across spending, GDP ratios, and military personnel.
        </p>
        <Link
          href={`/compare?countries=${compareQuery}&metric=pct_gdp`}
          className="inline-flex items-center gap-2 rounded-xl bg-accent-navy px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-accent-navy/90 hover:shadow-lg"
        >
          Compare NATO Countries
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </section>

      {/* Related Links */}
      <section>
        <h2 className="font-heading text-xl font-bold text-text-primary mb-4">Related Analysis</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/us-vs-china-military-spending" className="group rounded-xl bg-white p-5 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
            <h3 className="font-heading font-bold text-text-primary group-hover:text-accent-navy transition-colors">US vs China</h3>
            <p className="text-sm text-text-secondary mt-1">The two largest defense budgets compared</p>
          </Link>
          <Link href="/top-military-spenders" className="group rounded-xl bg-white p-5 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
            <h3 className="font-heading font-bold text-text-primary group-hover:text-accent-navy transition-colors">Top 15 Spenders</h3>
            <p className="text-sm text-text-secondary mt-1">Countries with the biggest budgets</p>
          </Link>
          <Link href="/defense-spending-by-region" className="group rounded-xl bg-white p-5 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
            <h3 className="font-heading font-bold text-text-primary group-hover:text-accent-navy transition-colors">By Region</h3>
            <p className="text-sm text-text-secondary mt-1">Spending breakdown across continents</p>
          </Link>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "NATO Defense Spending 2024 — Which Countries Meet the 2% GDP Target?",
            description: "Analysis of NATO defense spending across member nations and the 2% GDP guideline.",
            author: { "@type": "Organization", name: "DefenseBudget Dash" },
            publisher: { "@type": "Organization", name: "DefenseBudget Dash" },
          }),
        }}
      />
    </div>
  );
}
