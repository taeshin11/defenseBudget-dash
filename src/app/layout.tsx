import type { Metadata } from "next";
import Script from "next/script";
import { Plus_Jakarta_Sans, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";
import FeedbackWidget from "@/components/FeedbackWidget";
import BackToTop from "@/components/BackToTop";

// Replace G-XXXXXXXXXX with your actual Google Analytics 4 measurement ID
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";

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
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "DefenseBudget Dash" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DefenseBudget Dash — Compare Global Military Spending by Country",
    description:
      "Compare defense spending, GDP ratios, and military personnel across 40+ nations.",
    images: ["/og-image.svg"],
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: { index: true, follow: true },
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

      {/* Google Analytics 4 */}
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

      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "DefenseBudget Dash",
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
        <Header />
        <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
        <BackToTop />
        <FeedbackWidget />
        <AdSlot position="sticky-footer" />
      </body>
    </html>
  );
}
