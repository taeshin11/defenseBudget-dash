import rawData from "../data/defense-spending.json";

// ── Types ──────────────────────────────────────────────────────────────────

export interface Country {
  code: string;
  name: string;
  flag: string;
  gdp_billion_usd: number;
  defense_spending_billion_usd: number;
  defense_pct_gdp: number;
  active_military_personnel: number;
  year: number;
  rank_spending: number;
  rank_pct_gdp: number;
}

export interface DefenseData {
  lastUpdated: string;
  source: string;
  countries: Country[];
}

// ── Internal ───────────────────────────────────────────────────────────────

const data = rawData as DefenseData;

// ── Helpers ────────────────────────────────────────────────────────────────

/** Return every country in the dataset. */
export function getAllCountries(): Country[] {
  return data.countries;
}

/** Look up a single country by its ISO-style code (case-insensitive). */
export function getCountryByCode(code: string): Country | undefined {
  const upper = code.toUpperCase();
  return data.countries.find((c) => c.code.toUpperCase() === upper);
}

/**
 * Return the top N countries ranked by the chosen metric.
 *
 * - `spending`  → defense_spending_billion_usd (descending)
 * - `pct_gdp`   → defense_pct_gdp (descending)
 * - `personnel` → active_military_personnel (descending)
 */
export function getTopN(
  n: number,
  metric: "spending" | "pct_gdp" | "personnel",
): Country[] {
  const key: keyof Country =
    metric === "spending"
      ? "defense_spending_billion_usd"
      : metric === "pct_gdp"
        ? "defense_pct_gdp"
        : "active_military_personnel";

  return [...data.countries]
    .sort((a, b) => (b[key] as number) - (a[key] as number))
    .slice(0, n);
}

/** Return the subset of countries whose codes appear in `codes` (case-insensitive). */
export function compareCountries(codes: string[]): Country[] {
  const upperCodes = new Set(codes.map((c) => c.toUpperCase()));
  return data.countries.filter((c) => upperCodes.has(c.code.toUpperCase()));
}

/** Search countries by name or code (case-insensitive substring match). */
export function searchCountries(query: string): Country[] {
  const q = query.toLowerCase();
  return data.countries.filter(
    (c) =>
      c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q),
  );
}

/** Sum of `defense_spending_billion_usd` across all countries. */
export function getTotalGlobalSpending(): number {
  return data.countries.reduce(
    (sum, c) => sum + c.defense_spending_billion_usd,
    0,
  );
}

/** The country with `rank_spending === 1`. */
export function getHighestSpender(): Country | undefined {
  return data.countries.find((c) => c.rank_spending === 1);
}

/** The country with `rank_pct_gdp === 1`. */
export function getHighestPctGDP(): Country | undefined {
  return data.countries.find((c) => c.rank_pct_gdp === 1);
}

/** Metadata about the dataset. */
export function getDataSource(): { lastUpdated: string; source: string } {
  return { lastUpdated: data.lastUpdated, source: data.source };
}
