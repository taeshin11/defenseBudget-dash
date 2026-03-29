# DefenseBudget Dash

**Compare global military spending by country** — an interactive, free tool for exploring defense budgets, GDP ratios, and military personnel across 40+ nations.

## Live Demo

[https://defense-budget-dash.vercel.app](https://defense-budget-dash.vercel.app)

## Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Hosting**: Vercel (free tier)
- **Data**: Static JSON (SIPRI / World Bank)

## Features

- **Compare Tool** — Select up to 8 countries and compare by total spending, % of GDP, or military personnel
- **Rankings Table** — Sortable table of all 45 countries with search/filter
- **Interactive Charts** — Animated horizontal bar charts with tooltips
- **Shareable URLs** — Share comparisons via URL query parameters
- **SEO Optimized** — Sitemap, robots.txt, JSON-LD, Open Graph tags
- **Responsive** — Works on mobile (320px) to ultrawide (2560px)
- **Ad-Ready** — Adsterra ad slots pre-configured, ready for activation

## Data Sources

- [SIPRI Military Expenditure Database](https://www.sipri.org/databases/milex)
- [World Bank Open Data](https://data.worldbank.org/)

## Setup

```bash
npm install
npm run dev
```

### Google Sheets Webhook (Optional)

See [docs/GOOGLE_SHEETS_SETUP.md](docs/GOOGLE_SHEETS_SETUP.md) for instructions on setting up the analytics webhook.

### Adsterra Ads

Ad slots are pre-configured in `src/components/AdSlot.tsx`. To activate:

1. Create an account at [adsterra.com](https://www.adsterra.com/)
2. Create ad units (Banner 728x90, 320x50, 300x250)
3. Replace the placeholder comments in `AdSlot.tsx` with your Adsterra script tags

### Environment Variables

```
NEXT_PUBLIC_SHEETS_WEBHOOK_URL=  # Google Apps Script webhook URL
NEXT_PUBLIC_SITE_URL=            # Your production URL (auto-detected on Vercel)
```

## License

Open data for public interest. Data sourced from publicly available databases.
