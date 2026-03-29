# DefenseBudget Dash

**Compare global military spending by country** — a free, interactive tool for exploring defense budgets, GDP ratios, and military personnel across 45 nations.

## Live Demo

[https://defense-budget-dash.vercel.app](https://defense-budget-dash.vercel.app)

## Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Hosting**: Vercel (free tier)
- **Data**: Static JSON (SIPRI / World Bank)
- **Ads**: Adsterra (live) + Google AdSense
- **Analytics**: Google Analytics 4 (optional)

## Features

- **Compare Tool** — Select up to 8 countries and compare by total spending, % of GDP, or military personnel
- **Rankings Table** — Sortable table of all 45 countries with search/filter
- **45 Country Pages** — Individual profiles with stats, peer comparisons, and social sharing
- **SEO Content Pages** — NATO spending analysis, US vs China, Top 15 spenders, regional breakdown
- **Interactive Charts** — Animated horizontal bar charts with tooltips
- **Shareable URLs** — Share comparisons via URL query params + WhatsApp, Telegram, X, Facebook, LinkedIn, Reddit
- **SEO Optimized** — Sitemap (56 URLs), robots.txt, JSON-LD (WebApplication, Organization, WebSite, FAQPage, Article), Open Graph with dynamic PNG images
- **Responsive** — Works on mobile (320px) to ultrawide (2560px)
- **Ad Monetization** — Adsterra ads live (banner, sidebar, in-content, sticky footer) + Google AdSense
- **Visitor Counter** — Session-aware counter in footer
- **Feedback Widget** — Non-intrusive floating button for user feedback

## Pages

| Route | Description |
|---|---|
| `/` | Landing page with hero, top 10 chart, insights |
| `/compare` | Interactive comparison tool |
| `/rankings` | Sortable rankings table |
| `/nato-defense-spending` | NATO 2% GDP target analysis |
| `/us-vs-china-military-spending` | US vs China head-to-head |
| `/top-military-spenders` | Top 15 detailed breakdown |
| `/defense-spending-by-region` | Regional military spending |
| `/country/[code]` | 45 individual country profiles |
| `/how-to-use` | Guide + FAQ with JSON-LD |
| `/about` | Mission, data sources, methodology |

## Data Sources

- [SIPRI Military Expenditure Database](https://www.sipri.org/databases/milex)
- [World Bank Open Data](https://data.worldbank.org/)

## Setup

```bash
npm install
npm run dev
```

### Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_SHEETS_WEBHOOK_URL=  # Google Apps Script webhook URL (optional)
NEXT_PUBLIC_SITE_URL=            # Production URL (auto-detected on Vercel)
NEXT_PUBLIC_GA_MEASUREMENT_ID=   # Google Analytics 4 ID (optional)
```

### Google Sheets Webhook (Optional)

See [docs/GOOGLE_SHEETS_SETUP.md](docs/GOOGLE_SHEETS_SETUP.md) for instructions on setting up the analytics webhook that logs user comparisons.

### Adsterra Ads

Ad units are live in `src/components/AdSlot.tsx` with three formats:
- Banner 728x90 (desktop) / 320x50 (mobile)
- Sidebar 300x250
- Sticky footer 320x50 (dismissible)

### Google AdSense

AdSense script is loaded in `src/app/layout.tsx` with publisher ID `ca-pub-7098271335538021`.

## Deployment

```bash
npm i -g vercel
vercel --prod
```

## License

Open data for public interest. Data sourced from publicly available databases.
