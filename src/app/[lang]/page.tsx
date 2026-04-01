import Link from "next/link";
import {
  getTotalGlobalSpending,
  getHighestSpender,
  getHighestPctGDP,
  getTopN,
} from "@/lib/data";
import AdSlot from "@/components/AdSlot";
import Top10Chart from "./page.client";
import { getDictionary, hasLocale } from "./dictionaries";
import { notFound } from "next/navigation";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

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

  const prefix = lang === "en" ? "" : `/${lang}`;

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative text-center py-12 sm:py-16 overflow-hidden rounded-2xl">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_top_left,rgba(30,58,138,0.15)_0%,transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(30,58,138,0.10)_0%,transparent_50%)]" />
        <svg className="absolute right-[-60px] top-1/2 -translate-y-1/2 h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] opacity-[0.06] pointer-events-none" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <p className="font-mono text-5xl sm:text-6xl lg:text-7xl font-bold text-accent-navy tracking-tight">$2.2&nbsp;Trillion</p>
          <p className="mt-2 text-sm font-medium uppercase tracking-wider text-text-muted">{dict.home.globalSpending}</p>
          <h1 className="mt-6 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary leading-tight">{dict.home.heroTitle}</h1>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-text-secondary">{dict.home.heroSubtitle}</p>
          <Link href={`${prefix}/compare`} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-accent-navy px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-accent-navy/90 hover:shadow-lg">
            {dict.home.startComparing}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </Link>
          <p className="mt-4 text-xs text-text-muted">{dict.home.trustedBy}</p>
        </div>
      </section>

      {/* Quick Stats Strip */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg border-l-4 border-accent-navy flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-navy-light text-accent-navy">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-text-secondary">{dict.home.totalGlobalSpending}</p>
            <p className="mt-1 font-heading text-2xl font-bold text-accent-navy">${totalSpending.toFixed(1)}B</p>
          </div>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg border-l-4 border-accent-red flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-accent-red">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-text-secondary">{dict.home.highestSpender}</p>
            <p className="mt-1 font-heading text-2xl font-bold text-accent-navy">{highestSpender ? `${highestSpender.flag} ${highestSpender.name}` : "\u2014"}</p>
            {highestSpender && <p className="mt-1 text-sm text-text-secondary">${highestSpender.defense_spending_billion_usd.toFixed(1)}B</p>}
          </div>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg border-l-4 border-accent-green flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50 text-accent-green">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-text-secondary">{dict.home.highestPctGDP}</p>
            <p className="mt-1 font-heading text-2xl font-bold text-accent-navy">{highestPctGDP ? `${highestPctGDP.flag} ${highestPctGDP.name}` : "\u2014"}</p>
            {highestPctGDP && <p className="mt-1 text-sm text-text-secondary">{highestPctGDP.defense_pct_gdp.toFixed(1)}% of GDP</p>}
          </div>
        </div>
      </section>

      <AdSlot position="banner" />

      {/* Top 10 Preview */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-2xl font-bold text-text-primary">{dict.home.top10Title}</h2>
          <Link href={`${prefix}/rankings`} className="text-sm font-medium text-accent-navy hover:underline transition-colors duration-300">{dict.home.viewFullRankings} &rarr;</Link>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-md"><Top10Chart data={chartData} /></div>
        <div className="mt-4">
          <p className="text-sm font-medium text-text-secondary mb-3">{dict.home.viewAllCountries}</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {top10.map((c) => (
              <Link key={c.code} href={`${prefix}/country/${c.code.toLowerCase()}`} className="flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-text-primary shadow-sm transition-all duration-200 hover:border-accent-navy hover:bg-accent-navy-light/50 hover:shadow-md">
                <span>{c.flag}</span><span className="truncate">{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AdSlot position="in-content" />

      {/* Understanding Global Defense Spending */}
      <section>
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">{dict.home.understandingTitle}</h2>
        <div className="rounded-xl bg-white p-6 shadow-md space-y-4">
          <p className="text-text-secondary leading-relaxed">{dict.home.understandingP1}</p>
          <p className="text-text-secondary leading-relaxed">{dict.home.understandingP2}</p>
          <p className="text-text-secondary leading-relaxed">{dict.home.understandingP3}</p>
        </div>
      </section>

      {/* Why Defense Budget Transparency Matters */}
      <section>
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">{dict.home.transparencyTitle}</h2>
        <div className="rounded-xl bg-white p-6 shadow-md space-y-4">
          <p className="text-text-secondary leading-relaxed">{dict.home.transparencyP1}</p>
          <p className="text-text-secondary leading-relaxed">{dict.home.transparencyP2}</p>
          <p className="text-text-secondary leading-relaxed">{dict.home.transparencyP3}</p>
        </div>
      </section>

      {/* Popular Comparisons */}
      <section>
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">{dict.home.popularComparisons}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { href: `${prefix}/compare?countries=US,CN&metric=spending`, flags: "\uD83C\uDDFA\uD83C\uDDF8 \uD83C\uDDE8\uD83C\uDDF3", title: dict.home.usVsChina, desc: dict.home.usVsChinaDesc },
            { href: `${prefix}/compare?countries=US,GB,FR,DE,IT&metric=spending`, flags: "\uD83C\uDDFA\uD83C\uDDF8 \uD83C\uDDEC\uD83C\uDDE7 \uD83C\uDDEB\uD83C\uDDF7 \uD83C\uDDE9\uD83C\uDDEA \uD83C\uDDEE\uD83C\uDDF9", title: dict.home.natoBig5, desc: dict.home.natoBig5Desc },
            { href: `${prefix}/compare?countries=CN,JP,KR,IN,AU&metric=spending`, flags: "\uD83C\uDDE8\uD83C\uDDF3 \uD83C\uDDEF\uD83C\uDDF5 \uD83C\uDDF0\uD83C\uDDF7 \uD83C\uDDEE\uD83C\uDDF3 \uD83C\uDDE6\uD83C\uDDFA", title: dict.home.asiaPacific, desc: dict.home.asiaPacificDesc },
            { href: `${prefix}/compare?countries=SA,IL,TR,EG,IR&metric=spending`, flags: "\uD83C\uDDF8\uD83C\uDDE6 \uD83C\uDDEE\uD83C\uDDF1 \uD83C\uDDF9\uD83C\uDDF7 \uD83C\uDDEA\uD83C\uDDEC \uD83C\uDDEE\uD83C\uDDF7", title: dict.home.middleEast, desc: dict.home.middleEastDesc },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="group rounded-xl bg-white p-5 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <p className="text-2xl mb-2">{item.flags}</p>
              <h3 className="font-heading font-bold text-text-primary group-hover:text-accent-navy transition-colors">{item.title}</h3>
              <p className="text-sm text-text-secondary mt-1">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Explore More Insights */}
      <section>
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">{dict.home.exploreInsights}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { href: `${prefix}/nato-defense-spending`, title: dict.home.natoSpending, desc: dict.home.natoSpendingDesc },
            { href: `${prefix}/us-vs-china-military-spending`, title: dict.home.usVsChinaInsight, desc: dict.home.usVsChinaInsightDesc },
            { href: `${prefix}/top-military-spenders`, title: dict.home.top15Spenders, desc: dict.home.top15SpendersDesc },
            { href: `${prefix}/defense-spending-by-region`, title: dict.home.byRegion, desc: dict.home.byRegionDesc },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="group rounded-xl bg-white p-5 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              <h3 className="font-heading font-bold text-text-primary group-hover:text-accent-navy transition-colors">{item.title}</h3>
              <p className="text-sm text-text-secondary mt-1">{item.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="text-center">
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-8">{dict.home.howItWorks}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" /></svg>, title: dict.home.step1Title, desc: dict.home.step1Desc },
            { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13h4v8H3zM10 9h4v12h-4zM17 5h4v16h-4z" /></svg>, title: dict.home.step2Title, desc: dict.home.step2Desc },
            { icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" /></svg>, title: dict.home.step3Title, desc: dict.home.step3Desc },
          ].map((step, i) => (
            <div key={i} className="rounded-xl bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-navy-light text-accent-navy">{step.icon}</div>
              <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-1">Step {i + 1}</p>
              <h3 className="font-heading text-lg font-bold text-text-primary mb-2">{step.title}</h3>
              <p className="text-sm text-text-secondary">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
