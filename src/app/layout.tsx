import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://defense-budget-dash.vercel.app"),
  title: "DefenseBudget Dash — Compare Global Military Spending by Country",
  description:
    "Compare defense spending, GDP ratios, and military personnel across 40+ nations with interactive charts and rankings.",
  keywords: [
    "defense spending",
    "military budget",
    "GDP ratio",
    "military personnel",
    "defense comparison",
    "SIPRI data",
    "world bank military",
    "defense budget by country",
    "military spending rankings",
  ],
  openGraph: {
    title: "DefenseBudget Dash — Compare Global Military Spending by Country",
    description:
      "Compare defense spending, GDP ratios, and military personnel across 40+ nations with interactive charts and rankings.",
    type: "website",
    locale: "en_US",
    siteName: "DefenseBudget Dash",
  },
  twitter: {
    card: "summary_large_image",
    title: "DefenseBudget Dash — Compare Global Military Spending by Country",
    description:
      "Compare defense spending, GDP ratios, and military personnel across 40+ nations.",
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://defense-budget-dash.vercel.app",
    languages: {
      "en": "https://defense-budget-dash.vercel.app",
      "ko": "https://defense-budget-dash.vercel.app/ko",
      "zh": "https://defense-budget-dash.vercel.app/zh",
      "ja": "https://defense-budget-dash.vercel.app/ja",
      "es": "https://defense-budget-dash.vercel.app/es",
      "fr": "https://defense-budget-dash.vercel.app/fr",
      "de": "https://defense-budget-dash.vercel.app/de",
      "ar": "https://defense-budget-dash.vercel.app/ar",
      "pt": "https://defense-budget-dash.vercel.app/pt",
      "ru": "https://defense-budget-dash.vercel.app/ru",
      "hi": "https://defense-budget-dash.vercel.app/hi",
      "x-default": "https://defense-budget-dash.vercel.app",
    },
  },
  verification: {
    google: "WddgcbVJsL2BGHNAje5m6DK56IcR0Mw5UOqozI2Xtrc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.highperformanceformat.com" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3B5998" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7098271335538021"
          crossOrigin="anonymous"
        />
      </head>

      {GA_MEASUREMENT_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      )}

      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary">
        {/* WebApplication + Dataset structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "DefenseBudget Dash",
              url: "https://defense-budget-dash.vercel.app",
              description:
                "Compare defense spending, GDP ratios, and military personnel across 40+ nations.",
              applicationCategory: "ReferenceApplication",
              operatingSystem: "Any",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              dataset: {
                "@type": "Dataset",
                name: "Global Defense Spending Data",
                description:
                  "Defense spending figures for 40+ countries, sourced from SIPRI and World Bank.",
                license: "https://creativecommons.org/licenses/by/4.0/",
                creator: {
                  "@type": "Organization",
                  name: "SIPRI / World Bank",
                },
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "DefenseBudget Dash",
              url: "https://defense-budget-dash.vercel.app",
              logo: "https://defense-budget-dash.vercel.app/favicon.svg",
              description:
                "Free interactive tool for comparing global defense spending, military budgets, and armed forces across countries.",
              contactPoint: {
                "@type": "ContactPoint",
                email: "taeshinkim11@gmail.com",
                contactType: "customer support",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "DefenseBudget Dash",
              url: "https://defense-budget-dash.vercel.app",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://defense-budget-dash.vercel.app/rankings?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
