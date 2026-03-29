import type { Metadata } from "next";
import Link from "next/link";
import {
  getTotalGlobalSpending,
  getHighestSpender,
  getHighestPctGDP,
  getTopN,
} from "@/lib/data";
import AdSlot from "@/components/AdSlot";
import Top10Chart from "./page.client";

export const metadata: Metadata = {
  title: "DefenseBudget Dash — Compare Global Military Spending by Country",
  description:
    "Explore and compare defense budgets, GDP ratios, and military personnel across 40+ nations with interactive charts, rankings, and data tools.",
  openGraph: {
    title: "DefenseBudget Dash — Compare Global Military Spending by Country",
    description:
      "Explore and compare defense budgets, GDP ratios, and military personnel across 40+ nations.",
    type: "website",
  },
};

const STEPS = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
        />
      </svg>
    ),
    title: "Select",
    description: "Choose up to 8 countries you want to compare side by side.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13h4v8H3zM10 9h4v12h-4zM17 5h4v16h-4z"
        />
      </svg>
    ),
    title: "Compare",
    description:
      "View interactive bar charts across spending, GDP %, and personnel metrics.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
        />
      </svg>
    ),
    title: "Explore",
    description:
      "Dive into full rankings, sort by any column, and share your findings.",
  },
];

export default function HomePage() {
  const totalSpending = getTotalGlobalSpending();
  const highestSpender = getHighestSpender();
  const highestPctGDP = getHighestPctGDP();
  const top10 = getTopN(10, "spending");

  const chartData = top10.map((c) => ({
    name: c.name,
    flag: c.flag,
    value: c.defense_spending_billion_usd,
    code: c.code,
  }));

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative text-center py-12 sm:py-16 overflow-hidden rounded-2xl">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Gradient mesh overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_top_left,rgba(30,58,138,0.15)_0%,transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(30,58,138,0.10)_0%,transparent_50%)]" />
        {/* Subtle globe illustration */}
        <svg
          className="absolute right-[-60px] top-1/2 -translate-y-1/2 h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] opacity-[0.06] pointer-events-none"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="100" cy="100" rx="45" ry="90" stroke="currentColor" strokeWidth="1" />
          <ellipse cx="100" cy="100" rx="70" ry="90" stroke="currentColor" strokeWidth="0.8" />
          <path d="M10 100h180" stroke="currentColor" strokeWidth="1" />
          <path d="M20 60h160" stroke="currentColor" strokeWidth="0.8" />
          <path d="M20 140h160" stroke="currentColor" strokeWidth="0.8" />
          <path d="M40 35h120" stroke="currentColor" strokeWidth="0.5" />
          <path d="M40 165h120" stroke="currentColor" strokeWidth="0.5" />
        </svg>
        <div className="relative z-10">
          <p className="font-mono text-5xl sm:text-6xl lg:text-7xl font-bold text-accent-navy tracking-tight">
            $2.2&nbsp;Trillion
          </p>
          <p className="mt-2 text-sm font-medium uppercase tracking-wider text-text-muted">
            Global Defense Spending
          </p>
          <h1 className="mt-6 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight">
            How Much Does Your Country
            <br className="hidden sm:block" /> Spend on Defense?
          </h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-text-secondary">
            Explore and compare military budgets across 40+ nations. See where
            taxpayer money goes, who spends the most, and how your country stacks
            up.
          </p>
          <Link
            href="/compare"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-accent-navy px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-accent-navy/90 hover:shadow-lg"
          >
            Start Comparing
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
          <p className="mt-4 text-xs text-text-muted">
            Trusted by researchers, journalists, and policy analysts
          </p>
        </div>
      </section>

      {/* Quick Stats Strip */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg border-l-4 border-accent-navy flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-navy-light text-accent-navy">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-text-secondary">
              Total Global Spending
            </p>
            <p className="mt-1 font-heading text-2xl font-bold text-accent-navy">
              ${totalSpending.toFixed(1)}B
            </p>
          </div>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg border-l-4 border-accent-red flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-accent-red">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-text-secondary">
              Highest Spender
            </p>
            <p className="mt-1 font-heading text-2xl font-bold text-accent-navy">
              {highestSpender ? `${highestSpender.flag} ${highestSpender.name}` : "\u2014"}
            </p>
            {highestSpender && (
              <p className="mt-1 text-sm text-text-secondary">
                ${highestSpender.defense_spending_billion_usd.toFixed(1)}B
              </p>
            )}
          </div>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg border-l-4 border-accent-green flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50 text-accent-green">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-text-secondary">
              Highest % of GDP
            </p>
            <p className="mt-1 font-heading text-2xl font-bold text-accent-navy">
              {highestPctGDP ? `${highestPctGDP.flag} ${highestPctGDP.name}` : "\u2014"}
            </p>
            {highestPctGDP && (
              <p className="mt-1 text-sm text-text-secondary">
                {highestPctGDP.defense_pct_gdp.toFixed(1)}% of GDP
              </p>
            )}
          </div>
        </div>
      </section>

      <AdSlot position="banner" />

      {/* Top 10 Preview */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-2xl font-bold text-text-primary">
            Top 10 Defense Spenders
          </h2>
          <Link
            href="/rankings"
            className="text-sm font-medium text-accent-navy hover:underline transition-colors duration-300"
          >
            View Full Rankings &rarr;
          </Link>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-md">
          <Top10Chart data={chartData} />
        </div>

        {/* Top 10 country chips */}
        <div className="mt-4">
          <p className="text-sm font-medium text-text-secondary mb-3">
            View all countries
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {top10.map((c) => (
              <Link
                key={c.code}
                href={`/country/${c.code.toLowerCase()}`}
                className="flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-text-primary shadow-sm transition-all duration-200 hover:border-accent-navy hover:bg-accent-navy-light/50 hover:shadow-md"
              >
                <span>{c.flag}</span>
                <span className="truncate">{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AdSlot position="in-content" />

      {/* Understanding Global Defense Spending */}
      <section>
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">
          Understanding Global Defense Spending
        </h2>
        <div className="rounded-xl bg-white p-6 shadow-md space-y-4">
          <p className="text-text-secondary leading-relaxed">
            Global defense spending surpassed $2 trillion annually, reflecting
            the growing complexity of modern security challenges. From
            conventional military forces to cyber defense and space operations,
            nations allocate significant portions of their national budgets to
            safeguard sovereignty and project power. Understanding these
            expenditures is essential for policymakers, researchers, journalists,
            and engaged citizens who want to follow how public funds are used.
          </p>
          <p className="text-text-secondary leading-relaxed">
            Defense budgets vary dramatically by region and economic capacity.
            The United States alone accounts for roughly 40% of worldwide
            military spending, while NATO allies collectively aim to meet the
            alliance&apos;s 2% of GDP guideline. Meanwhile, countries in the
            Indo-Pacific, the Middle East, and Eastern Europe are increasing
            outlays in response to shifting geopolitical dynamics, territorial
            disputes, and emerging threats.
          </p>
          <p className="text-text-secondary leading-relaxed">
            DefenseBudget Dash aggregates data from trusted sources including
            SIPRI and the World Bank so you can compare absolute spending
            figures, GDP ratios, and active military personnel across more than
            40 countries in one place. Whether you are writing a research paper,
            preparing a policy brief, or simply curious about how your country
            stacks up, our interactive tools make it easy to explore the numbers.
          </p>
        </div>
      </section>

      {/* Why Defense Budget Transparency Matters */}
      <section>
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">
          Why Defense Budget Transparency Matters
        </h2>
        <div className="rounded-xl bg-white p-6 shadow-md space-y-4">
          <p className="text-text-secondary leading-relaxed">
            Transparent defense budgets strengthen democratic accountability.
            When citizens can see how much their government spends on the
            military and compare that figure to health, education, and
            infrastructure investments, they can make more informed decisions at
            the ballot box. Open data also reduces the risk of corruption and
            waste within defense procurement pipelines.
          </p>
          <p className="text-text-secondary leading-relaxed">
            For international relations, transparency serves as a
            confidence-building measure. Countries that publish detailed defense
            expenditures signal predictability to allies and adversaries alike,
            lowering the likelihood of miscalculation. Organizations like SIPRI,
            NATO, and the United Nations encourage member states to report
            military spending openly as part of broader arms-control and
            peacebuilding efforts.
          </p>
          <p className="text-text-secondary leading-relaxed">
            Tools like DefenseBudget Dash democratize access to this critical
            information. Instead of sifting through dense government reports and
            spreadsheets, users can visualize trends, rank countries by multiple
            metrics, and share their findings with colleagues or on social media
            in seconds. Our goal is to make defense spending data accessible,
            understandable, and actionable for everyone.
          </p>
        </div>
      </section>

      {/* Popular Comparisons */}
      <section>
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">
          Popular Comparisons
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/compare?countries=US,CN&metric=spending"
            className="group rounded-xl bg-white p-5 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            <p className="text-2xl mb-2">🇺🇸 🇨🇳</p>
            <h3 className="font-heading font-bold text-text-primary group-hover:text-accent-navy transition-colors">
              US vs China
            </h3>
            <p className="text-sm text-text-secondary mt-1">The two largest defense budgets head to head</p>
          </Link>
          <Link
            href="/compare?countries=US,GB,FR,DE,IT&metric=spending"
            className="group rounded-xl bg-white p-5 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            <p className="text-2xl mb-2">🇺🇸 🇬🇧 🇫🇷 🇩🇪 🇮🇹</p>
            <h3 className="font-heading font-bold text-text-primary group-hover:text-accent-navy transition-colors">
              NATO Big 5
            </h3>
            <p className="text-sm text-text-secondary mt-1">Top five spenders in the Atlantic alliance</p>
          </Link>
          <Link
            href="/compare?countries=CN,JP,KR,IN,AU&metric=spending"
            className="group rounded-xl bg-white p-5 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            <p className="text-2xl mb-2">🇨🇳 🇯🇵 🇰🇷 🇮🇳 🇦🇺</p>
            <h3 className="font-heading font-bold text-text-primary group-hover:text-accent-navy transition-colors">
              Asia-Pacific
            </h3>
            <p className="text-sm text-text-secondary mt-1">Major military powers across the Indo-Pacific</p>
          </Link>
          <Link
            href="/compare?countries=SA,IL,TR,EG,IR&metric=spending"
            className="group rounded-xl bg-white p-5 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            <p className="text-2xl mb-2">🇸🇦 🇮🇱 🇹🇷 🇪🇬 🇮🇷</p>
            <h3 className="font-heading font-bold text-text-primary group-hover:text-accent-navy transition-colors">
              Middle East
            </h3>
            <p className="text-sm text-text-secondary mt-1">Key defense spenders in a volatile region</p>
          </Link>
        </div>
      </section>

      {/* Explore More Insights */}
      <section>
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">
          Explore Defense Spending Insights
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/nato-defense-spending"
            className="group rounded-xl bg-white p-5 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            <h3 className="font-heading font-bold text-text-primary group-hover:text-accent-navy transition-colors">
              NATO Defense Spending
            </h3>
            <p className="text-sm text-text-secondary mt-1">Which NATO allies meet the 2% GDP target?</p>
          </Link>
          <Link
            href="/us-vs-china-military-spending"
            className="group rounded-xl bg-white p-5 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            <h3 className="font-heading font-bold text-text-primary group-hover:text-accent-navy transition-colors">
              US vs China
            </h3>
            <p className="text-sm text-text-secondary mt-1">The world&apos;s two largest defense budgets compared</p>
          </Link>
          <Link
            href="/top-military-spenders"
            className="group rounded-xl bg-white p-5 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            <h3 className="font-heading font-bold text-text-primary group-hover:text-accent-navy transition-colors">
              Top 15 Spenders
            </h3>
            <p className="text-sm text-text-secondary mt-1">Countries with the biggest defense budgets</p>
          </Link>
          <Link
            href="/defense-spending-by-region"
            className="group rounded-xl bg-white p-5 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
          >
            <h3 className="font-heading font-bold text-text-primary group-hover:text-accent-navy transition-colors">
              By Region
            </h3>
            <p className="text-sm text-text-secondary mt-1">Military spending breakdown across continents</p>
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="text-center">
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-8">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="rounded-xl bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-navy-light text-accent-navy">
                {step.icon}
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">
                Step {i + 1}
              </p>
              <h3 className="font-heading text-lg font-bold text-text-primary mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-text-secondary">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
