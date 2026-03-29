"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { getAllCountries, type Country } from "@/lib/data";

type SortKey =
  | "rank_spending"
  | "name"
  | "defense_spending_billion_usd"
  | "defense_pct_gdp"
  | "active_military_personnel";

type SortDir = "asc" | "desc";

const COLUMNS: {
  key: SortKey;
  label: string;
  shortLabel: string;
  format: (c: Country) => string;
  align: string;
}[] = [
  {
    key: "rank_spending",
    label: "Rank",
    shortLabel: "#",
    format: (c) => String(c.rank_spending),
    align: "text-center",
  },
  {
    key: "name",
    label: "Country",
    shortLabel: "Country",
    format: (c) => `${c.flag} ${c.name}`,
    align: "text-left",
  },
  {
    key: "defense_spending_billion_usd",
    label: "Defense Spending ($B)",
    shortLabel: "Spending ($B)",
    format: (c) => `$${c.defense_spending_billion_usd.toFixed(1)}B`,
    align: "text-right",
  },
  {
    key: "defense_pct_gdp",
    label: "% of GDP",
    shortLabel: "% GDP",
    format: (c) => `${c.defense_pct_gdp.toFixed(1)}%`,
    align: "text-right",
  },
  {
    key: "active_military_personnel",
    label: "Active Personnel",
    shortLabel: "Personnel",
    format: (c) => c.active_military_personnel.toLocaleString("en-US"),
    align: "text-right",
  },
];

function SortArrow({ dir }: { dir: SortDir }) {
  return (
    <span className="ml-1 inline-block text-accent-navy">
      {dir === "asc" ? "\u25B2" : "\u25BC"}
    </span>
  );
}

export default function RankingsPage() {
  const allCountries = useMemo(() => getAllCountries(), []);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("rank_spending");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "name" ? "asc" : "desc");
    }
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return allCountries;
    return allCountries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q),
    );
  }, [allCountries, search]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return sortDir === "asc"
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });
  }, [filtered, sortKey, sortDir]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary">
          Global Defense Spending Rankings
        </h1>
        <p className="mt-2 text-text-secondary">
          Click any column header to sort. Use the search bar to filter by
          country.
        </p>
      </header>

      {/* Search bar */}
      <div className="relative max-w-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search countries..."
          className="w-full rounded-xl border border-border bg-white py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder:text-text-muted shadow-sm focus:border-accent-navy focus:outline-none focus:ring-2 focus:ring-accent-navy/20 transition-all duration-300"
        />
      </div>

      {/* Table */}
      <div className="rounded-xl bg-white shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border bg-bg-secondary">
                {COLUMNS.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    className={`cursor-pointer select-none whitespace-nowrap px-4 py-3 font-semibold text-text-secondary transition-colors duration-300 hover:text-accent-navy ${col.align} ${
                      col.key === "name"
                        ? "sticky left-0 z-10 bg-bg-secondary"
                        : ""
                    }`}
                  >
                    <span className="hidden sm:inline">{col.label}</span>
                    <span className="sm:hidden">{col.shortLabel}</span>
                    {sortKey === col.key && <SortArrow dir={sortDir} />}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((country, i) => (
                <tr
                  key={country.code}
                  className={`border-b border-border/50 transition-colors duration-200 hover:bg-accent-navy-light/50 ${
                    i % 2 === 0 ? "bg-white" : "bg-bg-primary/30"
                  }`}
                >
                  {COLUMNS.map((col) => (
                    <td
                      key={col.key}
                      className={`whitespace-nowrap px-4 py-3 ${col.align} ${
                        col.key === "name"
                          ? "sticky left-0 z-10 font-medium text-text-primary " +
                            (i % 2 === 0 ? "bg-white" : "bg-[#f8f9fc]")
                          : "text-text-secondary"
                      }`}
                    >
                      {col.key === "name" ? (
                        <Link
                          href={`/country/${country.code.toLowerCase()}`}
                          className="hover:text-accent-navy hover:underline transition-colors duration-200"
                        >
                          {col.format(country)}
                        </Link>
                      ) : (
                        col.format(country)
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              {sorted.length === 0 && (
                <tr>
                  <td
                    colSpan={COLUMNS.length}
                    className="px-4 py-12 text-center text-text-muted"
                  >
                    No countries match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-text-muted text-center">
        Showing {sorted.length} of {allCountries.length} countries
      </p>
    </div>
  );
}
