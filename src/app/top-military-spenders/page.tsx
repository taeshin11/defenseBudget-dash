import type { Metadata } from "next";
import Link from "next/link";
import { getTopN, getTotalGlobalSpending } from "@/lib/data";

export const metadata: Metadata = {
  title: "Top 15 Military Spenders 2024 — Countries With the Biggest Defense Budgets",
  description:
    "Ranked list of the world's 15 biggest military spenders in 2024. Explore defense budgets, GDP ratios, and active military personnel for each country.",
  keywords: [
    "top military spenders",
    "highest military spending countries",
    "biggest defense budgets",
    "military spending rankings",
    "defense budget by country",
    "largest military budgets",
    "world military spending 2024",
  ],
  openGraph: {
    title: "Top 15 Military Spenders 2024 — Countries With the Biggest Defense Budgets",
    description: "The world's 15 largest defense budgets ranked with detailed breakdowns.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top 15 Military Spenders 2024",
    description: "Which countries spend the most on defense?",
  },
};

const INSIGHTS: Record<string, string> = {
  US: "The United States maintains the world's largest defense budget by a wide margin, funding global force projection, advanced technology programs, and a nuclear triad.",
  CN: "China's defense budget has grown steadily alongside its economy, funding a rapid military modernization program focused on naval power and missile capabilities.",
  RU: "Despite a smaller economy, Russia dedicates a significant share of GDP to defense, maintaining a large nuclear arsenal and investing in advanced weapon systems.",
  IN: "India's defense spending reflects its status as a major regional power facing security challenges on multiple borders, including with Pakistan and China.",
  SA: "Saudi Arabia is the Middle East's largest defense spender, investing heavily in imported military hardware and regional security operations.",
  GB: "The United Kingdom maintains one of Europe's most capable militaries, with a nuclear deterrent and expeditionary capabilities supporting NATO commitments.",
  DE: "Germany has pledged to significantly increase defense spending following the Ukraine conflict, reversing decades of declining military investment.",
  FR: "France maintains an independent nuclear deterrent and active global military presence, particularly in Africa and the Indo-Pacific.",
  JP: "Japan has begun to increase defense spending substantially, responding to growing security concerns from China and North Korea.",
  KR: "South Korea maintains a large standing military to counter the North Korean threat, with advanced defense technology and mandatory conscription.",
  UA: "Ukraine's defense spending has surged dramatically due to the ongoing conflict, representing one of the highest percentages of GDP among all nations.",
  AU: "Australia has increased defense investment to address Indo-Pacific security challenges, including submarine and long-range strike capabilities.",
  IT: "Italy contributes to NATO and EU defense initiatives while modernizing its armed forces across all domains.",
  IL: "Israel maintains one of the most technologically advanced militaries in the world relative to its size, with significant investment in missile defense.",
  TR: "Turkey's defense industry has grown rapidly, with an increasing focus on domestic production of drones, armored vehicles, and naval vessels.",
};

export default function TopMilitarySpendersPage() {
  const top15 = getTopN(15, "spending");
  const totalGlobal = getTotalGlobalSpending();
  const top15Total = top15.reduce((s, c) => s + c.defense_spending_billion_usd, 0);
  const top15Share = ((top15Total / totalGlobal) * 100).toFixed(0);

  return (
    <div className="space-y-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm text-text-secondary">
        <ol className="flex items-center gap-1.5">
          <li><Link href="/" className="hover:text-accent-navy transition-colors">Home</Link></li>
          <li>/</li>
          <li className="text-text-primary font-medium">Top Military Spenders</li>
        </ol>
      </nav>

      {/* Hero */}
      <header>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary">
          Top 15 Military Spenders in 2024
        </h1>
        <p className="mt-3 text-lg text-text-secondary max-w-3xl">
          These 15 countries account for {top15Share}% of all global defense spending. Here is a detailed look at the world&apos;s biggest military budgets, what drives them, and how they compare.
        </p>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl bg-white p-6 shadow-md text-center border-l-4 border-accent-navy">
          <p className="text-xs font-medium uppercase tracking-wider text-text-secondary">Top 15 Combined</p>
          <p className="mt-2 font-heading text-2xl font-bold text-accent-navy">${top15Total.toFixed(0)}B</p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-md text-center border-l-4 border-accent-red">
          <p className="text-xs font-medium uppercase tracking-wider text-text-secondary">Share of Global Total</p>
          <p className="mt-2 font-heading text-2xl font-bold text-accent-navy">{top15Share}%</p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-md text-center border-l-4 border-accent-green">
          <p className="text-xs font-medium uppercase tracking-wider text-text-secondary">#1 Spender</p>
          <p className="mt-2 font-heading text-2xl font-bold text-accent-navy">{top15[0].flag} {top15[0].name}</p>
        </div>
      </section>

      {/* Country Cards */}
      <section className="space-y-4">
        {top15.map((c, i) => (
          <div key={c.code} className="rounded-xl bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3 sm:w-48">
                <span className="font-heading text-2xl font-bold text-text-muted w-8">#{i + 1}</span>
                <span className="text-3xl">{c.flag}</span>
                <Link href={`/country/${c.code.toLowerCase()}`} className="font-heading text-lg font-bold text-text-primary hover:text-accent-navy transition-colors">
                  {c.name}
                </Link>
              </div>
              <div className="flex-1 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-text-muted uppercase">Spending</p>
                  <p className="font-heading font-bold text-accent-navy">${c.defense_spending_billion_usd.toFixed(1)}B</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted uppercase">% GDP</p>
                  <p className="font-heading font-bold text-text-primary">{c.defense_pct_gdp.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted uppercase">Personnel</p>
                  <p className="font-heading font-bold text-text-primary">{c.active_military_personnel >= 1000000 ? `${(c.active_military_personnel / 1000000).toFixed(1)}M` : `${(c.active_military_personnel / 1000).toFixed(0)}K`}</p>
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm text-text-secondary leading-relaxed">
              {INSIGHTS[c.code] || `${c.name} is ranked #${i + 1} globally in defense spending, allocating $${c.defense_spending_billion_usd.toFixed(1)} billion to its military in ${c.year}.`}
            </p>
            {/* Spending bar relative to #1 */}
            <div className="mt-3 h-2 bg-bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-accent-navy rounded-full" style={{ width: `${(c.defense_spending_billion_usd / top15[0].defense_spending_billion_usd) * 100}%` }} />
            </div>
          </div>
        ))}
      </section>

      {/* SEO Content */}
      <section className="rounded-xl bg-white p-6 shadow-md space-y-4">
        <h2 className="font-heading text-xl font-bold text-text-primary">
          Global Military Spending Trends
        </h2>
        <p className="text-text-secondary leading-relaxed">
          Global defense spending has reached record levels, driven by geopolitical tensions, regional conflicts, and the modernization of aging military equipment. The concentration of spending among the top 15 nations reflects the uneven distribution of military power worldwide — a handful of countries account for the vast majority of global defense expenditures, while dozens of smaller nations spend a fraction of these amounts.
        </p>
        <p className="text-text-secondary leading-relaxed">
          The United States alone accounts for roughly 40% of worldwide military spending, a dominance rooted in its global network of military bases, carrier strike groups, nuclear deterrent, and technological edge. China&apos;s rising budget reflects decades of sustained economic growth and a strategic push to modernize the People&apos;s Liberation Army into a world-class fighting force. European nations, galvanized by the conflict in Ukraine, are reversing years of defense budget declines with renewed commitments to the NATO 2% GDP guideline.
        </p>
        <p className="text-text-secondary leading-relaxed">
          Understanding these spending patterns is essential for anyone following international security, foreign policy, or government budgets. DefenseBudget Dash provides free tools to explore these figures interactively, compare countries side by side, and track how defense priorities shift over time.
        </p>
      </section>

      {/* CTA */}
      <section className="rounded-xl bg-accent-navy-light p-6 text-center">
        <h2 className="font-heading text-xl font-bold text-text-primary mb-2">Explore More</h2>
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          <Link href="/rankings" className="inline-flex items-center gap-2 rounded-xl bg-accent-navy px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-accent-navy/90 transition-all">
            Full Rankings Table
          </Link>
          <Link href="/compare?countries=US,CN,RU,IN,SA,GB,DE,FR" className="inline-flex items-center rounded-xl border border-border bg-white px-5 py-3 text-sm font-medium text-text-secondary shadow-sm hover:border-accent-navy hover:text-accent-navy transition-all">
            Compare Top 8
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
            headline: "Top 15 Military Spenders 2024 — Countries With the Biggest Defense Budgets",
            description: "Ranked list of the world's 15 biggest military spenders with detailed breakdowns.",
            author: { "@type": "Organization", name: "DefenseBudget Dash" },
          }),
        }}
      />
    </div>
  );
}
