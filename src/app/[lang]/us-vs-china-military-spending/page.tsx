import type { Metadata } from "next";
import Link from "next/link";
import { getCountryByCode } from "@/lib/data";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "US vs China Military Spending 2024 — Defense Budget Comparison",
  description:
    "Compare US and China military spending side by side. See how the world's two largest defense budgets stack up in total spending, GDP ratio, and active personnel.",
  keywords: [
    "US vs China military spending",
    "US China defense budget",
    "America China military comparison",
    "US military budget",
    "China military budget",
    "US vs China defense",
    "Pentagon budget vs China",
  ],
  openGraph: {
    title: "US vs China Military Spending 2024 — Defense Budget Comparison",
    description: "The world's two largest defense budgets compared: spending, GDP ratio, and military personnel.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "US vs China Military Spending 2024",
    description: "Head-to-head comparison of US and China defense budgets.",
  },
};

export default async function USvsChinaPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const prefix = lang === "en" ? "" : `/${lang}`;
  const us = getCountryByCode("US")!;
  const cn = getCountryByCode("CN")!;

  const pageUrl = "https://defense-budget-dash.vercel.app/us-vs-china-military-spending";

  const metrics = [
    { label: "Defense Spending", usVal: `$${us.defense_spending_billion_usd.toFixed(1)}B`, cnVal: `$${cn.defense_spending_billion_usd.toFixed(1)}B`, usNum: us.defense_spending_billion_usd, cnNum: cn.defense_spending_billion_usd },
    { label: "% of GDP", usVal: `${us.defense_pct_gdp.toFixed(1)}%`, cnVal: `${cn.defense_pct_gdp.toFixed(1)}%`, usNum: us.defense_pct_gdp, cnNum: cn.defense_pct_gdp },
    { label: "Active Personnel", usVal: us.active_military_personnel.toLocaleString(), cnVal: cn.active_military_personnel.toLocaleString(), usNum: us.active_military_personnel, cnNum: cn.active_military_personnel },
    { label: "GDP", usVal: `$${us.gdp_billion_usd.toLocaleString()}B`, cnVal: `$${cn.gdp_billion_usd.toLocaleString()}B`, usNum: us.gdp_billion_usd, cnNum: cn.gdp_billion_usd },
  ];

  return (
    <div className="space-y-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm text-text-secondary">
        <ol className="flex items-center gap-1.5">
          <li><Link href={`${prefix}/`} className="hover:text-accent-navy transition-colors">Home</Link></li>
          <li>/</li>
          <li className="text-text-primary font-medium">US vs China Military Spending</li>
        </ol>
      </nav>

      {/* Hero */}
      <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary">
            {us.flag} US vs {cn.flag} China
          </h1>
          <p className="mt-2 text-lg text-text-secondary max-w-2xl">
            The United States and China maintain the world&apos;s two largest defense budgets. Together they account for over half of global military spending. Here&apos;s how they compare.
          </p>
        </div>
        <ShareButtons url={pageUrl} title="US vs China Military Spending — DefenseBudget Dash" />
      </header>

      {/* Side-by-Side Comparison */}
      <section className="grid grid-cols-1 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-xl bg-white p-6 shadow-md">
            <p className="text-xs font-medium uppercase tracking-wider text-text-secondary text-center mb-4">{m.label}</p>
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 text-center">
                <p className="text-3xl mb-1">{us.flag}</p>
                <p className={`font-heading text-2xl font-bold ${m.usNum >= m.cnNum ? "text-accent-navy" : "text-text-secondary"}`}>{m.usVal}</p>
                <p className="text-xs text-text-muted mt-1">United States</p>
              </div>
              <div className="text-text-muted font-heading text-lg font-bold">vs</div>
              <div className="flex-1 text-center">
                <p className="text-3xl mb-1">{cn.flag}</p>
                <p className={`font-heading text-2xl font-bold ${m.cnNum >= m.usNum ? "text-accent-red" : "text-text-secondary"}`}>{m.cnVal}</p>
                <p className="text-xs text-text-muted mt-1">China</p>
              </div>
            </div>
            {/* Bar comparison */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-muted w-6">US</span>
                <div className="flex-1 h-3 bg-bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-accent-navy rounded-full transition-all duration-500" style={{ width: `${(m.usNum / Math.max(m.usNum, m.cnNum)) * 100}%` }} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-muted w-6">CN</span>
                <div className="flex-1 h-3 bg-bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-accent-red rounded-full transition-all duration-500" style={{ width: `${(m.cnNum / Math.max(m.usNum, m.cnNum)) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Key Takeaways */}
      <section className="rounded-xl bg-white p-6 shadow-md">
        <h2 className="font-heading text-xl font-bold text-text-primary mb-4">Key Takeaways</h2>
        <ul className="space-y-3 text-text-secondary leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-accent-navy font-bold mt-0.5">1.</span>
            <span>The US spends approximately <strong className="text-text-primary">{(us.defense_spending_billion_usd / cn.defense_spending_billion_usd).toFixed(1)}x more</strong> than China in absolute dollar terms, maintaining the world&apos;s most expensive military apparatus.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-navy font-bold mt-0.5">2.</span>
            <span>As a percentage of GDP, the US dedicates <strong className="text-text-primary">{us.defense_pct_gdp.toFixed(1)}%</strong> versus China&apos;s <strong className="text-text-primary">{cn.defense_pct_gdp.toFixed(1)}%</strong>, indicating the US allocates a larger share of its economy to defense.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-navy font-bold mt-0.5">3.</span>
            <span>China maintains the world&apos;s <strong className="text-text-primary">largest active military</strong> by personnel count at {cn.active_military_personnel.toLocaleString()}, compared to the US&apos;s {us.active_military_personnel.toLocaleString()}.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent-navy font-bold mt-0.5">4.</span>
            <span>Many analysts note that China&apos;s purchasing power parity (PPP) adjustments would narrow the real spending gap significantly, as defense goods and personnel cost less in China.</span>
          </li>
        </ul>
      </section>

      {/* SEO Content */}
      <section className="rounded-xl bg-white p-6 shadow-md space-y-4">
        <h2 className="font-heading text-xl font-bold text-text-primary">
          The US-China Defense Spending Rivalry
        </h2>
        <p className="text-text-secondary leading-relaxed">
          The military competition between the United States and China defines 21st-century geopolitics. The Pentagon&apos;s budget dwarfs all other nations in raw dollar terms, funding a global network of military bases, carrier strike groups, advanced stealth aircraft, nuclear deterrence, and space-based capabilities. This expenditure supports commitments to NATO, bilateral defense treaties in the Indo-Pacific, and ongoing force projection worldwide.
        </p>
        <p className="text-text-secondary leading-relaxed">
          China&apos;s defense budget has grown rapidly over the past two decades, reflecting the country&apos;s economic rise and its ambitions as a regional — and increasingly global — military power. The People&apos;s Liberation Army (PLA) has invested heavily in naval modernization, ballistic missiles, cyber capabilities, and anti-access/area-denial (A2/AD) systems designed to challenge US dominance in the Western Pacific. While official Chinese defense figures are lower than US numbers, independent estimates suggest that actual spending may be considerably higher when off-budget items are included.
        </p>
        <p className="text-text-secondary leading-relaxed">
          The strategic implications of this rivalry extend far beyond the balance sheets. Both nations are competing for technological superiority in artificial intelligence, hypersonic weapons, quantum computing, and space capabilities. The defense spending trajectories of the US and China will shape global security architecture for decades to come, influencing everything from alliance structures in the Indo-Pacific to arms control negotiations and international norms.
        </p>
      </section>

      {/* CTA */}
      <section className="rounded-xl bg-accent-navy-light p-6 text-center">
        <h2 className="font-heading text-xl font-bold text-text-primary mb-2">
          Explore the Full Comparison
        </h2>
        <p className="text-text-secondary mb-4">
          Use our interactive chart tool to visualize US vs China across all metrics.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href={`${prefix}/compare?countries=US,CN&metric=spending`} className="inline-flex items-center gap-2 rounded-xl bg-accent-navy px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-accent-navy/90 hover:shadow-lg">
            Interactive Comparison
          </Link>
          <Link href={`${prefix}/country/us`} className="inline-flex items-center rounded-xl border border-border bg-white px-5 py-3 text-sm font-medium text-text-secondary shadow-sm hover:border-accent-navy hover:text-accent-navy transition-all">
            {us.flag} US Profile
          </Link>
          <Link href={`${prefix}/country/cn`} className="inline-flex items-center rounded-xl border border-border bg-white px-5 py-3 text-sm font-medium text-text-secondary shadow-sm hover:border-accent-navy hover:text-accent-navy transition-all">
            {cn.flag} China Profile
          </Link>
        </div>
      </section>

      {/* Related */}
      <section>
        <h2 className="font-heading text-xl font-bold text-text-primary mb-4">Related Comparisons</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href={`${prefix}/compare?countries=US,RU&metric=spending`} className="group rounded-xl bg-white p-5 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
            <h3 className="font-heading font-bold text-text-primary group-hover:text-accent-navy transition-colors">US vs Russia</h3>
            <p className="text-sm text-text-secondary mt-1">Cold War rivals compared</p>
          </Link>
          <Link href={`${prefix}/nato-defense-spending`} className="group rounded-xl bg-white p-5 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
            <h3 className="font-heading font-bold text-text-primary group-hover:text-accent-navy transition-colors">NATO Spending</h3>
            <p className="text-sm text-text-secondary mt-1">Alliance spending and the 2% target</p>
          </Link>
          <Link href={`${prefix}/compare?countries=CN,JP,KR,IN,AU&metric=spending`} className="group rounded-xl bg-white p-5 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
            <h3 className="font-heading font-bold text-text-primary group-hover:text-accent-navy transition-colors">Asia-Pacific</h3>
            <p className="text-sm text-text-secondary mt-1">Military powers of the Indo-Pacific</p>
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
            headline: "US vs China Military Spending 2024 — Defense Budget Comparison",
            description: "Comparison of US and China defense budgets across spending, GDP ratio, and military personnel.",
            author: { "@type": "Organization", name: "DefenseBudget Dash" },
            publisher: { "@type": "Organization", name: "DefenseBudget Dash" },
          }),
        }}
      />
    </div>
  );
}
