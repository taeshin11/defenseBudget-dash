# PRD: DefenseBudget Dash — Global Defense Spending Visualizer

## 0. How to Use This Document

This PRD is designed as an **autonomous harness** for Claude Code. Follow the milestone order strictly. Each milestone ends with a `git commit` + `git push`. Read `claude-progress.txt` and `feature_list.json` at the start of every session to know where you left off. **Never skip a milestone or reorder them.**

---

## 1. Product Overview

| Field | Value |
|---|---|
| **Service Name** | DefenseBudget Dash |
| **Short Title** | Military Spending Stats |
| **Domain** | Defense / Geopolitics Data Visualization |
| **One-Liner** | A free, interactive tool that lets users compare defense spending as a percentage of GDP and military power indicators across countries, displayed in ranked bar charts. |
| **Data Source** | World Bank Open Data + SIPRI Military Expenditure Database (pre-processed into static JSON files — zero API cost at runtime) |
| **Stack** | Next.js 14 (App Router) + TypeScript + Tailwind CSS + Chart.js (or Recharts) + Vercel (free tier) |
| **Cost Target** | **$0/month** — no paid APIs, no paid databases, no paid hosting beyond free tiers |

---

## 2. Core Principles (MUST follow in every decision)

1. **Zero Cost** — Use only free tiers: Vercel hosting, static JSON data, Google Sheets (Apps Script) for data collection, Adsterra for ads. No paid DB, no paid API.
2. **SEO First** — Server-side rendering, semantic HTML, Open Graph meta, structured data (`JSON-LD`), sitemap.xml, robots.txt. Every page must be crawlable and indexable.
3. **Responsive** — Mobile-first design. Every component must work flawlessly on 320px–2560px viewports.
4. **Soft & Modern Palette** — Background colors must be soft/muted (e.g., `#F8F9FC`, `#F0F2F5`, soft slate tones). No harsh whites (`#FFF`) as full-page backgrounds. Use subtle gradients or gentle noise textures for depth.
5. **Comfortable UX** — Generous whitespace, smooth transitions (300ms ease), clear visual hierarchy, intuitive navigation. No clutter. Modern sans-serif typography (e.g., DM Sans, Plus Jakarta Sans — not Inter or Roboto).
6. **Visitor Counter** — Show "Today's Visitors" and "Total Visitors" in a **non-intrusive** location (e.g., a small badge in the footer or a collapsible panel). Must not distract from the main content. Use a free counting service or a simple Vercel KV/Edge Config counter (free tier) or countapi equivalent.
7. **Ad Monetization** — Integrate **Adsterra** ads from Day 1. Place ad units in non-disruptive but visible locations (sidebar, between sections, sticky footer banner on mobile). Reserve clearly marked `<div>` slots so ads can be swapped or added later. When you get Adsterra ad unit keys, plug them into the code. Also leave a slot for Google AdSense as a secondary option.
8. **Data Collection** — Every time a user clicks "Compare" (the main CTA), silently POST the selected countries + timestamp to a Google Sheets webhook (Apps Script endpoint). This gives the site owner free analytics on what users search for.
9. **Git Discipline** — Create the GitHub repo using `gh` CLI. Push at every major milestone. Commit messages must follow Conventional Commits format (`feat:`, `fix:`, `chore:`, `docs:`).
10. **Deployment** — Deploy to **Vercel** via CLI (`vercel --prod`). Do NOT just write a guide — actually run the deployment commands. Generate a live public URL. If the GitHub username is exposed, create a custom short link or use the Vercel-assigned domain.
11. **Automation** — Whenever a problem can be solved via CLI, solve it via CLI. Do not ask the user to do manual steps. Automate everything: repo creation, deployment, environment setup, dependency installation.

---

## 3. Harness Architecture

### 3.1 Files to Create at Initialization

| File | Purpose |
|---|---|
| `feature_list.json` | Ordered array of features with `id`, `title`, `status` (`pending`/`in-progress`/`done`), `milestone` number |
| `claude-progress.txt` | Human-readable log: which milestone is current, what was last completed, any blockers |
| `init.sh` | Script to install deps, start dev server, run build checks |

### 3.2 Session Start Routine (EVERY session)

```
1. Read claude-progress.txt → know current state
2. Read feature_list.json → know what's next
3. Run `npm run build` or `npm run lint` → verify nothing is broken
4. Pick the next `pending` feature → set to `in-progress`
5. Implement → test → commit → update progress → push if milestone
6. Repeat until session ends
```

### 3.3 Agent Separation (Mental Model)

- **Builder Agent**: Implements features, writes code, runs dev server.
- **Reviewer Agent**: After each feature, re-read the code and check: Does it meet the PRD? Is it responsive? Is SEO intact? Are ads still rendering? Is the visitor counter working? Fix issues before moving on.

---

## 4. Feature List & Milestones

### Milestone 1 — Project Scaffolding & Repo Setup
> **Git push after this milestone**

- [ ] Create GitHub repo using `gh repo create defenseBudget-dash --public --clone`
- [ ] Initialize Next.js 14 project with TypeScript + Tailwind CSS + App Router
- [ ] Set up folder structure:
  ```
  /app          → pages & layouts
  /components   → reusable UI components
  /data         → static JSON files (defense data)
  /lib          → utility functions
  /public       → static assets, favicon, OG image
  ```
- [ ] Create `feature_list.json`, `claude-progress.txt`, `init.sh`
- [ ] Configure Tailwind with custom soft color palette:
  ```
  background: #F8F9FC (main), #F0F2F5 (secondary)
  surface: #FFFFFF (cards with subtle shadow)
  primary: #3B5998 (navy blue — military theme)
  accent: #E8453C (alert red for highlights)
  text: #1A1D23 (near-black), #6B7280 (muted)
  ```
- [ ] Install fonts: Plus Jakarta Sans (headings) + DM Sans (body) via `next/font/google`
- [ ] Add ESLint + Prettier config
- [ ] `git add . && git commit -m "feat: initial project scaffolding" && git push`

### Milestone 2 — Data Layer
> **Git push after this milestone**

- [ ] Curate defense spending data from World Bank / SIPRI (publicly available CSVs)
- [ ] Process into `/data/defense-spending.json` with schema:
  ```json
  {
    "lastUpdated": "2024-01-15",
    "source": "SIPRI / World Bank",
    "countries": [
      {
        "code": "US",
        "name": "United States",
        "flag": "🇺🇸",
        "gdp_billion_usd": 25460,
        "defense_spending_billion_usd": 886,
        "defense_pct_gdp": 3.48,
        "active_military_personnel": 1388000,
        "year": 2023,
        "rank_spending": 1,
        "rank_pct_gdp": 20
      }
    ]
  }
  ```
- [ ] Include at least **top 40 countries** by defense spending
- [ ] Create `/lib/data.ts` with typed helper functions: `getCountryByCode()`, `getTopN()`, `compareCountries()`, `searchCountries()`
- [ ] `git commit -m "feat: add defense spending data layer" && git push`

### Milestone 3 — Core UI Layout & Navigation
> **Git push after this milestone**

- [ ] Build responsive layout:
  - Header with logo/title + nav links (Home, Compare, Rankings, About)
  - Main content area with max-width container
  - Footer with credits, data source attribution, and **visitor counter** (small, non-intrusive)
- [ ] Implement mobile hamburger menu (CSS-only or minimal JS)
- [ ] Add smooth page transitions (fade-in on route change)
- [ ] Ensure all text is readable on all screen sizes (min 16px body)
- [ ] Add subtle background: soft gradient or very light geometric pattern
- [ ] `git commit -m "feat: core layout with responsive nav and footer" && git push`

### Milestone 4 — Home / Landing Page
> **Git push after this milestone**

- [ ] Hero section:
  - Headline: "How Much Does Your Country Spend on Defense?"
  - Subheadline: "Compare military budgets, GDP ratios, and force sizes across 40+ nations."
  - CTA button: "Start Comparing →"
  - Subtle animated world map or globe illustration (SVG or CSS-based — no heavy images)
- [ ] Quick Stats strip: "Total Global Defense Spending: $X.XT", "Highest Spender: USA", "Highest % GDP: [Country]"
- [ ] Top 10 preview bar chart (horizontal bars, animated on scroll)
- [ ] "How It Works" section (3-step: Select → Compare → Explore)
- [ ] SEO: `<title>`, `<meta description>`, Open Graph tags, JSON-LD structured data
- [ ] `git commit -m "feat: landing page with hero and top 10 preview" && git push`

### Milestone 5 — Compare Tool (Core Feature)
> **Git push after this milestone**

- [ ] Country selector: searchable multi-select dropdown (max 8 countries)
- [ ] Comparison metrics toggle: "Total Spending ($B)" | "% of GDP" | "Military Personnel"
- [ ] Bar chart visualization using Chart.js or Recharts:
  - Horizontal bars, sorted descending
  - Country flag emoji + name labels
  - Hover tooltip with exact values
  - Smooth enter/update animation
- [ ] "Compare" button click → render chart + **POST data to Google Sheets webhook**
- [ ] Share button: copy comparison URL with query params (e.g., `?countries=US,CN,RU&metric=pct_gdp`)
- [ ] Responsive: chart stacks vertically on mobile, scrollable if needed
- [ ] `git commit -m "feat: interactive comparison tool with chart" && git push`

### Milestone 6 — Rankings Page
> **Git push after this milestone**

- [ ] Full sortable table of all countries:
  - Columns: Rank, Flag, Country, Defense Spending ($B), % of GDP, Active Personnel
  - Click column header to sort asc/desc
  - Search/filter bar at top
- [ ] Highlight row on hover, alternating row colors (very soft)
- [ ] Pagination or virtual scroll if 40+ rows
- [ ] Mobile: horizontal scroll with sticky first column (country name)
- [ ] `git commit -m "feat: sortable rankings table" && git push`

### Milestone 7 — Google Sheets Data Collection (Apps Script Webhook)
> **Git push after this milestone**

- [ ] Create a Google Apps Script that:
  1. Receives POST requests with JSON body: `{ countries: ["US","CN"], metric: "pct_gdp", timestamp: "..." }`
  2. Appends the row to a Google Sheet
  3. Returns 200 OK
- [ ] **Actually deploy the Apps Script** as a web app (anyone, anonymous access)
- [ ] In the Next.js app, on "Compare" button click, fire a `fetch()` POST to the Apps Script URL
- [ ] Handle errors silently (never block user experience)
- [ ] Include the Apps Script code in `/docs/google-apps-script.js` for reference
- [ ] Provide step-by-step setup instructions in `/docs/GOOGLE_SHEETS_SETUP.md`
- [ ] `git commit -m "feat: google sheets webhook for data collection" && git push`

### Milestone 8 — Adsterra Ad Integration
> **Git push after this milestone**

- [ ] Create ad slot components: `<AdBanner />`, `<AdSidebar />`, `<AdInContent />`
- [ ] Place ad slots:
  - **Desktop**: sidebar ad on Compare page, banner between sections on Home
  - **Mobile**: sticky bottom banner (small, dismissible), in-feed ad between content blocks
- [ ] Integrate **Adsterra** ad scripts:
  - Use Adsterra's Direct Link or Banner ad format
  - Create placeholder with Adsterra's script tag structure
  - Comment placeholders: `<!-- ADSTERRA_BANNER_ID: replace_with_your_key -->`
  - When the owner creates ad units in Adsterra dashboard and gets the key/script, it should be a simple string replacement
- [ ] Ensure ads:
  - Do NOT break layout on any screen size
  - Have a subtle "Advertisement" label
  - Are lazy-loaded (don't block page render)
  - Have fallback styling when ad doesn't load
- [ ] Also add a secondary slot for future Google AdSense:
  - Comment: `<!-- GOOGLE_ADSENSE_SLOT: replace_with_your_ad_client_and_slot -->`
- [ ] `git commit -m "feat: adsterra ad integration with responsive slots" && git push`

### Milestone 9 — Visitor Counter
> **Git push after this milestone**

- [ ] Implement visitor counting with a **free** solution. Options (pick the best zero-cost one):
  - Option A: Use a free API like `countapi.xyz` or similar free hit counter
  - Option B: Use Vercel Analytics (free tier) + a tiny edge function to track counts
  - Option C: Use the Google Sheets webhook to also log page visits and read count back
- [ ] Display in the **footer** as a small, elegant badge:
  ```
  👁 Today: 142  |  Total: 12,847
  ```
- [ ] Style: muted text, small font size, blends with footer. Must NOT be a focal point.
- [ ] Update count on each page load (debounced, once per session ideally)
- [ ] `git commit -m "feat: visitor counter in footer" && git push`

### Milestone 10 — SEO & Performance Optimization
> **Git push after this milestone**

- [ ] Add `sitemap.xml` generation (dynamic via Next.js)
- [ ] Add `robots.txt` allowing all crawlers
- [ ] Add JSON-LD structured data on every page (`WebSite`, `WebApplication`, `Dataset`)
- [ ] Open Graph + Twitter Card meta tags on every page
- [ ] Canonical URLs on every page
- [ ] Lighthouse audit — target:
  - Performance: 90+
  - Accessibility: 95+
  - Best Practices: 95+
  - SEO: 100
- [ ] Image optimization: use `next/image`, serve WebP, lazy-load
- [ ] Compress JSON data file if large (or split by region)
- [ ] Add `<head>` preconnect for font CDN and ad scripts
- [ ] `git commit -m "feat: SEO optimization and performance tuning" && git push`

### Milestone 11 — Deployment to Vercel
> **Git push after this milestone**

- [ ] Install Vercel CLI: `npm i -g vercel`
- [ ] Run `vercel login` (authenticate via CLI)
- [ ] Run `vercel --prod` to deploy
- [ ] Verify live URL works on mobile and desktop
- [ ] If GitHub username is exposed in the URL, configure a custom domain or use the auto-generated `*.vercel.app` subdomain (which doesn't expose GitHub username)
- [ ] Update `claude-progress.txt` with the live URL
- [ ] Update README.md with:
  - Live demo link
  - Tech stack
  - Data sources
  - How to contribute
  - How to set up Google Sheets webhook
  - How to add Adsterra ad keys
- [ ] `git commit -m "chore: deploy to vercel and update docs" && git push`

### Milestone 12 — Final QA & Polish
> **Git push after this milestone**

- [ ] Test all pages on: Chrome, Safari, Firefox (desktop + mobile)
- [ ] Test responsive breakpoints: 320px, 375px, 768px, 1024px, 1440px, 2560px
- [ ] Verify:
  - [ ] Compare tool works and POSTs to Google Sheets
  - [ ] Charts render correctly with 1, 2, 4, 8 countries
  - [ ] Rankings table sorts correctly
  - [ ] Ad slots render without layout shift
  - [ ] Visitor counter displays and increments
  - [ ] SEO meta tags are correct (use `curl` to verify SSR output)
  - [ ] No console errors
  - [ ] Favicon and OG image display correctly
- [ ] Run `npx next lint` and fix all warnings
- [ ] Run `npm run build` — must succeed with zero errors
- [ ] Final `vercel --prod` deploy
- [ ] `git commit -m "chore: final QA pass and polish" && git push`

---

## 5. Page Structure & SEO

| Route | Title Tag | Purpose |
|---|---|---|
| `/` | DefenseBudget Dash — Compare Global Military Spending by Country | Landing + Top 10 preview |
| `/compare` | Compare Military Budgets — DefenseBudget Dash | Interactive comparison tool |
| `/rankings` | World Defense Spending Rankings 2024 — DefenseBudget Dash | Full sortable table |
| `/about` | About DefenseBudget Dash — Data Sources & Methodology | Credibility + data source info |

Every page must have:
- Unique `<title>` and `<meta name="description">`
- Open Graph `og:title`, `og:description`, `og:image`, `og:url`
- Twitter Card tags
- Canonical URL
- JSON-LD structured data

---

## 6. Design System

### Colors (CSS Variables)
```css
:root {
  --bg-primary: #F8F9FC;
  --bg-secondary: #F0F2F5;
  --bg-card: #FFFFFF;
  --text-primary: #1A1D23;
  --text-secondary: #6B7280;
  --text-muted: #9CA3AF;
  --accent-navy: #3B5998;
  --accent-navy-light: #EBF0FA;
  --accent-red: #E8453C;
  --accent-green: #10B981;
  --border: #E5E7EB;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
}
```

### Typography
- **Headings**: Plus Jakarta Sans (700, 600)
- **Body**: DM Sans (400, 500)
- **Monospace/Data**: JetBrains Mono (for numerical values in charts)
- Base size: 16px, scale: 1.25 ratio

### Spacing
- Page max-width: 1200px
- Section padding: 64px vertical (desktop), 40px (mobile)
- Card padding: 24px
- Grid gap: 24px

### Animations
- Page transitions: fade-in 300ms ease
- Chart bars: slide-in-from-left 500ms with stagger
- Hover states: 200ms ease on all interactive elements
- Scroll-triggered: gentle fade-up for sections entering viewport

---

## 7. Ad Placement Strategy

### Adsterra (Primary — integrate FIRST)
- **Format**: Banner 728x90 (desktop header area or between sections), 320x50 (mobile sticky footer)
- **Direct Link ads**: Can also be used on CTA-looking elements (secondary buttons like "Learn More About Defense Data")
- **Native Banner**: Between the "Top 10 Preview" and "How It Works" on the home page
- **Integration**: Paste the Adsterra script tag into the ad slot component. The owner will generate ad unit IDs from `https://www.adsterra.com/` dashboard and replace placeholder IDs in the code.
- **Revenue Note**: Adsterra pays faster and has lower traffic thresholds than Google AdSense, making it ideal for new sites.

### Google AdSense (Secondary — optional future addition)
- Reserve a `<div id="adsense-slot-1">` with a comment explaining how to add the AdSense script.

### Ad Slot Component Pattern
```tsx
// components/AdSlot.tsx
// Props: position ('banner' | 'sidebar' | 'in-content' | 'sticky-footer')
// Renders the appropriate Adsterra script or a fallback placeholder
// Lazy-loaded, doesn't block page render
// Labeled "Advertisement" in small muted text above
```

---

## 8. Data Collection (Google Sheets Webhook)

### Flow
1. User selects countries and clicks "Compare"
2. Frontend fires `fetch(WEBHOOK_URL, { method: 'POST', body: JSON.stringify(payload) })`
3. Payload: `{ countries: ["US","CN","RU"], metric: "total_spending", timestamp: "2024-..." , userAgent: "...", referrer: "..." }`
4. Google Apps Script receives POST → appends to Sheet → returns 200
5. Errors are caught silently — never block the user

### Apps Script Code (to be placed in `/docs/google-apps-script.js`)
```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      new Date(),
      data.countries.join(', '),
      data.metric,
      data.userAgent || '',
      data.referrer || ''
    ]);
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'ok' })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Setup Instructions (to be placed in `/docs/GOOGLE_SHEETS_SETUP.md`)
1. Create a new Google Sheet
2. Go to Extensions → Apps Script
3. Paste the code above
4. Deploy → New Deployment → Web App → Anyone (anonymous)
5. Copy the deployment URL
6. Set `NEXT_PUBLIC_SHEETS_WEBHOOK_URL` in `.env.local`

---

## 9. Visitor Counter Implementation

### Recommended Approach: Hybrid (free)
- Use a lightweight free counter API or implement via Google Sheets (same sheet, different tab)
- On page load, POST to a `/api/visit` edge function or directly to Google Sheets
- Read back today's count and total count
- Cache in localStorage to avoid double-counting same session
- Display in footer:
  ```
  👁 Today: {todayCount}  ·  Total: {totalCount}
  ```
- Style: `text-xs text-gray-400` — blends into footer, never a focal point

### Alternative: Simple file-based via Vercel KV (free tier)
- Vercel KV free tier: 256MB, 30K requests/day — more than enough
- Key: `visitors:total` (number), `visitors:YYYY-MM-DD` (number)
- Increment on each unique visit (check session cookie)

---

## 10. Technical Constraints

- **No paid services** — everything must work on free tiers
- **No server-side database** — use static JSON + client-side logic
- **No authentication required** — public tool
- **Bundle size** — keep JS bundle under 200KB gzipped
- **Lighthouse scores** — Performance 90+, SEO 100, Accessibility 95+
- **No external API calls at runtime** — all data is static JSON bundled with the app
- **Vercel free tier limits** — 100GB bandwidth/month, 6000 minutes build time/month

---

## 11. Automation & CLI Commands Reference

All of these should be executed by Claude Code, not the user:

```bash
# Repo creation
gh repo create defenseBudget-dash --public --clone
cd defenseBudget-dash

# Project init
npx create-next-app@latest . --typescript --tailwind --app --src-dir --use-npm
npm install chart.js react-chartjs-2  # or recharts

# Dev server
npm run dev

# Build check
npm run build

# Lint
npx next lint

# Deploy
npm i -g vercel
vercel login
vercel --prod

# Git push (at every milestone)
git add .
git commit -m "feat: <milestone description>"
git push origin main
```

---

## 12. Definition of Done

The project is **complete** when:

- [ ] Live URL is accessible on Vercel (no GitHub username exposed)
- [ ] All 4 pages render correctly on mobile and desktop
- [ ] Compare tool generates charts for any combination of countries
- [ ] Compare button POSTs data to Google Sheets successfully
- [ ] Rankings table sorts by all columns
- [ ] Adsterra ad slots are integrated with placeholder keys ready for activation
- [ ] Visitor counter shows today + total in footer
- [ ] Lighthouse SEO = 100, Performance ≥ 90
- [ ] `sitemap.xml` and `robots.txt` are accessible
- [ ] README.md has live link, setup instructions, and ad key replacement guide
- [ ] All milestones have been committed and pushed to GitHub

---

## 13. File: feature_list.json (Initial State)

```json
[
  { "id": "M1", "title": "Project Scaffolding & Repo Setup", "status": "pending", "milestone": 1 },
  { "id": "M2", "title": "Data Layer (JSON + helpers)", "status": "pending", "milestone": 2 },
  { "id": "M3", "title": "Core UI Layout & Navigation", "status": "pending", "milestone": 3 },
  { "id": "M4", "title": "Home / Landing Page", "status": "pending", "milestone": 4 },
  { "id": "M5", "title": "Compare Tool (Core Feature)", "status": "pending", "milestone": 5 },
  { "id": "M6", "title": "Rankings Page", "status": "pending", "milestone": 6 },
  { "id": "M7", "title": "Google Sheets Webhook Integration", "status": "pending", "milestone": 7 },
  { "id": "M8", "title": "Adsterra Ad Integration", "status": "pending", "milestone": 8 },
  { "id": "M9", "title": "Visitor Counter", "status": "pending", "milestone": 9 },
  { "id": "M10", "title": "SEO & Performance Optimization", "status": "pending", "milestone": 10 },
  { "id": "M11", "title": "Vercel Deployment", "status": "pending", "milestone": 11 },
  { "id": "M12", "title": "Final QA & Polish", "status": "pending", "milestone": 12 }
]
```

---

## 14. File: claude-progress.txt (Initial State)

```
# DefenseBudget Dash — Progress Log
# Last Updated: [DATE]
# Current Milestone: 1 (Project Scaffolding & Repo Setup)
# Status: NOT STARTED

## Completed
(none)

## Current
Milestone 1: Project Scaffolding & Repo Setup

## Blockers
(none)

## Live URL
(not deployed yet)
```

---

## 15. IMPORTANT REMINDERS FOR CLAUDE CODE

1. **DO NOT just write guides or instructions** — actually execute the commands. Create the repo, deploy to Vercel, set up the webhook. The user should receive a working live URL.
2. **Automate via CLI** whenever possible. If `gh`, `vercel`, `npm`, or `git` can do it, do it in the terminal.
3. **Push to git at every milestone** — this is non-negotiable.
4. **Create the GitHub repo using `gh` CLI** — `gh repo create defenseBudget-dash --public --source=. --remote=origin --push`
5. **Deploy to Vercel for real** — `vercel --prod`. Give the user an actual live link.
6. **Adsterra integration** — Add the script tag structure now. The own11111er will replace the placeholder key from their Adsterra dashboard. Make it easy: one string replacement.
7. **Google Sheets webhook** — Include the Apps Script code AND the setup guide. Also wire the frontend POST call.
8. **Never expose the GitHub username** — Use the Vercel-assigned `.vercel.app` domain as the public link.
9. **Soft backgrounds** — Never use pure white `#FFFFFF` as a page background. Use `#F8F9FC` or similar muted tones.
10. **Keep it free** — If any step would cost money, find the free alternative. Always.