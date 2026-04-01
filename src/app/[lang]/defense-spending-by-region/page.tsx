import type { Metadata } from "next";
import Link from "next/link";
import { getAllCountries, type Country } from "@/lib/data";

export const metadata: Metadata = {
  title: "Defense Spending by Region 2024 — Global Military Budget Breakdown",
  description:
    "Explore defense spending broken down by world region: North America, Europe, Asia-Pacific, Middle East, and more. See which regions spend the most on their militaries.",
  keywords: [
    "defense spending by region",
    "military spending by continent",
    "global defense budget breakdown",
    "regional military spending",
    "Asia defense spending",
    "Europe defense spending",
    "Middle East military budget",
  ],
  openGraph: {
    title: "Defense Spending by Region 2024 — Global Military Budget Breakdown",
    description: "Regional breakdown of global military spending with interactive data.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Defense Spending by Region 2024",
    description: "How military spending breaks down across the world's regions.",
  },
};

interface Region {
  name: string;
  codes: string[];
  description: string;
  compareMetric: string;
}

const REGIONS: Region[] = [
  {
    name: "North America",
    codes: ["US", "CA"],
    description: "Dominated by the United States, the world's largest defense spender, North America accounts for the single largest share of global military expenditure.",
    compareMetric: "spending",
  },
  {
    name: "Europe",
    codes: ["GB", "FR", "DE", "IT", "ES", "PL", "NL", "NO", "GR", "BE", "DK", "PT", "CZ", "RO", "SE", "UA"],
    description: "European defense spending has surged in recent years, driven by the conflict in Ukraine and renewed focus on NATO's collective defense posture.",
    compareMetric: "pct_gdp",
  },
  {
    name: "Asia-Pacific",
    codes: ["CN", "IN", "JP", "KR", "AU", "TW", "SG", "ID", "TH", "PK", "BD", "MY", "PH", "VN"],
    description: "The fastest-growing region for military spending, driven by China's modernization, India's border security needs, and maritime disputes in the South China Sea.",
    compareMetric: "spending",
  },
  {
    name: "Middle East",
    codes: ["SA", "IL", "TR", "EG", "IR", "AE", "IQ", "KW", "OM", "QA"],
    description: "The Middle East has some of the highest defense spending as a percentage of GDP in the world, reflecting persistent regional instability and strategic competition.",
    compareMetric: "pct_gdp",
  },
  {
    name: "South America",
    codes: ["BR", "CO", "CL", "AR", "PE"],
    description: "South American defense budgets are modest by global standards, focused primarily on internal security, border patrol, and peacekeeping contributions.",
    compareMetric: "spending",
  },
];

function getRegionData(all: Country[], codes: string[]) {
  const countries = codes
    .map((code) => all.find((c) => c.code === code))
    .filter((c): c is Country => c !== undefined)
    .sort((a, b) => b.defense_spending_billion_usd - a.defense_spending_billion_usd);
  const totalSpending = countries.reduce((s, c) => s + c.defense_spending_billion_usd, 0);
  const topSpender = countries[0];
  return { countries, totalSpending, topSpender };
}

export default async function DefenseSpendingByRegionPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const prefix = lang === "en" ? "" : `/${lang}`;
  const all = getAllCountries();
  const globalTotal = all.reduce((s, c) => s + c.defense_spending_billion_usd, 0);

  const regionData = REGIONS.map((r) => ({
    ...r,
    ...getRegionData(all, r.codes),
  }));

  return (
    <div className="space-y-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm text-text-secondary">
        <ol className="flex items-center gap-1.5">
          <li><Link href={`${prefix}/`} className="hover:text-accent-navy transition-colors">Home</Link></li>
          <li>/</li>
          <li className="text-text-primary font-medium">Defense Spending by Region</li>
        </ol>
      </nav>

      {/* Hero */}
      <header>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary">
          Defense Spending by Region
        </h1>
        <p className="mt-3 text-lg text-text-secondary max-w-3xl">
          Global military spending is distributed unevenly across regions, reflecting different security environments, threat perceptions, and economic capacities. Explore how defense budgets break down across the world&apos;s major regions.
        </p>
      </header>

      {/* Region Overview Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {regionData.map((r) => (
          <div key={r.name} className="rounded-xl bg-white p-6 shadow-md border-l-4 border-accent-navy">
            <h3 className="font-heading text-lg font-bold text-text-primary">{r.name}</h3>
            <div className="mt-3 space-y-1.5 text-sm">
              <p className="text-text-secondary">
                <span className="font-semibold text-accent-navy">${r.totalSpending.toFixed(0)}B</span> total
                <span className="text-text-muted"> ({((r.totalSpending / globalTotal) * 100).toFixed(0)}% of global)</span>
              </p>
              <p className="text-text-secondary">{r.countries.length} countries</p>
              {r.topSpender && (
                <p className="text-text-secondary">
                  Top: {r.topSpender.flag} {r.topSpender.name} (${r.topSpender.defense_spending_billion_usd.toFixed(1)}B)
                </p>
              )}
            </div>
            {/* Share bar */}
            <div className="mt-3 h-2 bg-bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-accent-navy rounded-full" style={{ width: `${(r.totalSpending / globalTotal) * 100}%` }} />
            </div>
          </div>
        ))}
      </section>

      {/* Detailed Regions */}
      {regionData.map((r) => (
        <section key={r.name} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-2xl font-bold text-text-primary">{r.name}</h2>
            <Link
              href={`${prefix}/compare?countries=${r.countries.slice(0, 8).map((c) => c.code).join(",")}&metric=${r.compareMetric}`}
              className="text-sm font-medium text-accent-navy hover:underline"
            >
              Compare &rarr;
            </Link>
          </div>
          <p className="text-text-secondary leading-relaxed">{r.description}</p>
          <div className="rounded-xl bg-white shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-bg-secondary">
                    <th className="px-4 py-3 text-left font-semibold text-text-secondary">Country</th>
                    <th className="px-4 py-3 text-right font-semibold text-text-secondary">Spending ($B)</th>
                    <th className="px-4 py-3 text-right font-semibold text-text-secondary">% GDP</th>
                    <th className="px-4 py-3 text-right font-semibold text-text-secondary">Personnel</th>
                  </tr>
                </thead>
                <tbody>
                  {r.countries.map((c, i) => (
                    <tr key={c.code} className={`border-b border-border/50 hover:bg-accent-navy-light/50 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-bg-primary/30"}`}>
                      <td className="px-4 py-3 font-medium text-text-primary">
                        <Link href={`${prefix}/country/${c.code.toLowerCase()}`} className="hover:text-accent-navy hover:underline transition-colors">
                          {c.flag} {c.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-right text-text-secondary">${c.defense_spending_billion_usd.toFixed(1)}B</td>
                      <td className="px-4 py-3 text-right text-text-secondary">{c.defense_pct_gdp.toFixed(1)}%</td>
                      <td className="px-4 py-3 text-right text-text-secondary">{c.active_military_personnel.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ))}

      {/* SEO Content */}
      <section className="rounded-xl bg-white p-6 shadow-md space-y-4">
        <h2 className="font-heading text-xl font-bold text-text-primary">
          Understanding Regional Defense Dynamics
        </h2>
        <p className="text-text-secondary leading-relaxed">
          Defense spending patterns are shaped by a complex interplay of factors including perceived threats, alliance commitments, economic capacity, and domestic political priorities. North America and Asia-Pacific together account for the majority of global military expenditure, reflecting the dominant roles of the United States and China in the international security order.
        </p>
        <p className="text-text-secondary leading-relaxed">
          Europe has experienced the most dramatic shift in recent years, with the conflict in Ukraine serving as a catalyst for increased military investment across the continent. Many European nations that had allowed defense budgets to decline for decades are now rapidly increasing spending to meet NATO&apos;s 2% of GDP guideline and rebuild depleted military capabilities.
        </p>
        <p className="text-text-secondary leading-relaxed">
          The Middle East continues to be a region of high defense spending relative to economic size, driven by ongoing conflicts, rivalries between regional powers, and the strategic importance of energy resources. In contrast, South American and African nations generally spend less on defense in both absolute and relative terms, though security challenges including organized crime, border disputes, and internal instability remain significant.
        </p>
      </section>

      {/* CTA */}
      <section className="rounded-xl bg-accent-navy-light p-6 text-center">
        <h2 className="font-heading text-xl font-bold text-text-primary mb-2">Dive Deeper</h2>
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          <Link href={`${prefix}/rankings`} className="inline-flex items-center gap-2 rounded-xl bg-accent-navy px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-accent-navy/90 transition-all">
            Full Rankings
          </Link>
          <Link href={`${prefix}/compare`} className="inline-flex items-center rounded-xl border border-border bg-white px-5 py-3 text-sm font-medium text-text-secondary shadow-sm hover:border-accent-navy hover:text-accent-navy transition-all">
            Custom Comparison
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
            headline: "Defense Spending by Region 2024 — Global Military Budget Breakdown",
            description: "Regional breakdown of global military spending across North America, Europe, Asia-Pacific, Middle East, and South America.",
            author: { "@type": "Organization", name: "DefenseBudget Dash" },
          }),
        }}
      />
    </div>
  );
}
