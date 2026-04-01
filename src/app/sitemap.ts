import type { MetadataRoute } from "next";
import { getAllCountries } from "@/lib/data";

const locales = ["en", "ko", "zh", "ja", "es", "fr", "de", "ar", "pt", "ru", "hi"] as const;

function buildAlternates(baseUrl: string, path: string) {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = locale === "en" ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`;
  }
  languages["x-default"] = `${baseUrl}${path}`;
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://defense-budget-dash.vercel.app";

  const staticPaths = [
    { path: "", freq: "weekly" as const, priority: 1 },
    { path: "/compare", freq: "weekly" as const, priority: 0.9 },
    { path: "/rankings", freq: "weekly" as const, priority: 0.8 },
    { path: "/nato-defense-spending", freq: "monthly" as const, priority: 0.8 },
    { path: "/us-vs-china-military-spending", freq: "monthly" as const, priority: 0.8 },
    { path: "/top-military-spenders", freq: "monthly" as const, priority: 0.8 },
    { path: "/defense-spending-by-region", freq: "monthly" as const, priority: 0.8 },
    { path: "/about", freq: "monthly" as const, priority: 0.5 },
    { path: "/how-to-use", freq: "monthly" as const, priority: 0.6 },
    { path: "/privacy", freq: "monthly" as const, priority: 0.3 },
    { path: "/terms", freq: "monthly" as const, priority: 0.3 },
  ];

  const entries: MetadataRoute.Sitemap = [];

  // Static pages — English (default, no prefix) + all other locales
  for (const { path, freq, priority } of staticPaths) {
    // English canonical
    entries.push({
      url: `${baseUrl}${path || "/"}`,
      lastModified: new Date(),
      changeFrequency: freq,
      priority,
      alternates: buildAlternates(baseUrl, path || "/"),
    });
    // Other locales
    for (const locale of locales) {
      if (locale === "en") continue;
      entries.push({
        url: `${baseUrl}/${locale}${path || "/"}`,
        lastModified: new Date(),
        changeFrequency: freq,
        priority: priority * 0.9,
        alternates: buildAlternates(baseUrl, path || "/"),
      });
    }
  }

  // Country pages — English + all locales
  const countries = getAllCountries();
  for (const country of countries) {
    const code = country.code.toLowerCase();
    const path = `/country/${code}`;
    entries.push({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: buildAlternates(baseUrl, path),
    });
    for (const locale of locales) {
      if (locale === "en") continue;
      entries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: buildAlternates(baseUrl, path),
      });
    }
  }

  return entries;
}
