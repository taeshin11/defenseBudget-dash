"use client";

import { Suspense, useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  getAllCountries,
  compareCountries,
  type Country,
} from "@/lib/data";
import CountrySelector from "@/components/CountrySelector";
import BarChartComponent from "@/components/BarChart";
import AdSlot from "@/components/AdSlot";

type Metric = "spending" | "pct_gdp" | "personnel";

const METRIC_OPTIONS: { key: Metric; label: string }[] = [
  { key: "spending", label: "Total Spending ($B)" },
  { key: "pct_gdp", label: "% of GDP" },
  { key: "personnel", label: "Military Personnel" },
];

function toChartData(countries: Country[], metric: Metric) {
  return countries.map((c) => ({
    name: c.name,
    flag: c.flag,
    code: c.code,
    value:
      metric === "spending"
        ? c.defense_spending_billion_usd
        : metric === "pct_gdp"
          ? c.defense_pct_gdp
          : c.active_military_personnel,
  }));
}

function metricLabel(metric: Metric) {
  return METRIC_OPTIONS.find((m) => m.key === metric)!.label;
}

function valueFormatter(metric: Metric) {
  return (v: number) => {
    if (metric === "spending") return `$${v.toFixed(1)}B`;
    if (metric === "pct_gdp") return `${v.toFixed(1)}%`;
    return v >= 1_000_000
      ? `${(v / 1_000_000).toFixed(1)}M`
      : v >= 1_000
        ? `${(v / 1_000).toFixed(0)}K`
        : v.toLocaleString();
  };
}

export default function ComparePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="animate-pulse text-text-muted">Loading...</div>
        </div>
      }
    >
      <ComparePageInner />
    </Suspense>
  );
}

function ComparePageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const allCountries = useMemo(() => getAllCountries(), []);
  const countryList = useMemo(
    () => allCountries.map((c) => ({ code: c.code, name: c.name, flag: c.flag })),
    [allCountries],
  );

  const [selected, setSelected] = useState<string[]>([]);
  const [metric, setMetric] = useState<Metric>("spending");
  const [chartData, setChartData] = useState<
    Array<{ name: string; flag: string; value: number; code: string }>
  >([]);
  const [copied, setCopied] = useState(false);

  // Read query params on mount
  useEffect(() => {
    const countriesParam = searchParams.get("countries");
    const metricParam = searchParams.get("metric") as Metric | null;

    if (countriesParam) {
      const codes = countriesParam
        .split(",")
        .map((c) => c.trim().toUpperCase())
        .filter(Boolean);
      setSelected(codes);

      // Auto-render chart if we have params
      const matched = compareCountries(codes);
      if (matched.length > 0) {
        const m = metricParam && METRIC_OPTIONS.some((o) => o.key === metricParam)
          ? metricParam
          : "spending";
        setMetric(m);
        setChartData(toChartData(matched, m));
      }
    }
    if (
      metricParam &&
      METRIC_OPTIONS.some((o) => o.key === metricParam)
    ) {
      setMetric(metricParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCompare = useCallback(() => {
    if (selected.length === 0) return;

    const matched = compareCountries(selected);
    setChartData(toChartData(matched, metric));

    // Update URL
    const params = new URLSearchParams();
    params.set("countries", selected.join(","));
    params.set("metric", metric);
    router.replace(`/compare?${params.toString()}`, { scroll: false });

    // Post to Google Sheets webhook (fire-and-forget)
    if (process.env.NEXT_PUBLIC_SHEETS_WEBHOOK_URL) {
      fetch(process.env.NEXT_PUBLIC_SHEETS_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          countries: selected,
          metric,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer,
        }),
      }).catch(() => {});
    }
  }, [selected, metric, router]);

  const handleShare = useCallback(async () => {
    const params = new URLSearchParams();
    params.set("countries", selected.join(","));
    params.set("metric", metric);
    const url = `${window.location.origin}/compare?${params.toString()}`;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      prompt("Copy this link:", url);
    }
  }, [selected, metric]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Main content */}
      <div className="flex-1 space-y-8">
        <header>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary">
            Compare Defense Budgets
          </h1>
          <p className="mt-2 text-text-secondary">
            Select up to 8 countries, choose a metric, and compare them side by
            side.
          </p>
        </header>

        {/* Country Selector */}
        <div className="rounded-xl bg-white p-6 shadow-md space-y-5">
          <h2 className="font-heading text-lg font-semibold text-text-primary">
            Select Countries
          </h2>
          <CountrySelector
            countries={countryList}
            selected={selected}
            onChange={setSelected}
            max={8}
          />

          {/* Metric Toggle */}
          <div>
            <p className="text-sm font-medium text-text-secondary mb-2">
              Metric
            </p>
            <div className="flex flex-wrap gap-2">
              {METRIC_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setMetric(opt.key)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    metric === opt.key
                      ? "bg-accent-navy text-white shadow-sm"
                      : "bg-bg-secondary text-text-secondary hover:bg-accent-navy-light hover:text-accent-navy"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleCompare}
              disabled={selected.length === 0}
              className="inline-flex items-center gap-2 rounded-xl bg-accent-navy px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-accent-navy/90 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
            >
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
                  d="M3 13h4v8H3zM10 9h4v12h-4zM17 5h4v16h-4z"
                />
              </svg>
              Compare
            </button>
            {chartData.length > 0 && (
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-5 py-2.5 text-sm font-medium text-text-secondary shadow-sm transition-all duration-300 hover:border-accent-navy hover:text-accent-navy"
              >
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
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                {copied ? "Copied!" : "Share"}
              </button>
            )}
          </div>
        </div>

        {/* Chart */}
        {chartData.length > 0 && (
          <div className="rounded-xl bg-white p-6 shadow-md">
            <h2 className="font-heading text-lg font-semibold text-text-primary mb-4">
              {metricLabel(metric)}
            </h2>
            <BarChartComponent
              data={chartData}
              metric={metricLabel(metric)}
              valueFormatter={valueFormatter(metric)}
            />
          </div>
        )}
      </div>

      {/* Sidebar Ad (desktop only) */}
      <aside className="hidden lg:block w-[300px] shrink-0 space-y-6">
        <div className="sticky top-24">
          <AdSlot position="sidebar" />
        </div>
      </aside>
    </div>
  );
}
