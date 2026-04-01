import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Use DefenseBudget Dash — Guide & FAQ",
  description:
    "Step-by-step guide to using DefenseBudget Dash: compare military budgets, explore rankings, and understand global defense spending data. Plus answers to frequently asked questions.",
  openGraph: {
    title: "How to Use DefenseBudget Dash — Guide & FAQ",
    description:
      "Learn how to compare defense budgets, explore rankings, and share your analysis with our step-by-step guide.",
    type: "website",
  },
};

const getSteps = (prefix: string) => [
  {
    number: "01",
    title: "Select Countries to Compare",
    content: (
      <div className="space-y-4 text-text-secondary leading-relaxed">
        <p>
          Begin your analysis by navigating to the{" "}
          <Link
            href={`${prefix}/compare`}
            className="font-medium text-accent-navy underline underline-offset-2 hover:text-accent-navy/80 transition-colors duration-300"
          >
            Compare page
          </Link>
          . You will find a country selector that allows you to pick up to eight
          nations simultaneously. Simply click on a country name or use the search
          bar to quickly locate a specific nation. The tool supports over 40
          countries, covering all major military powers as well as a broad
          selection of regional actors from every continent.
        </p>
        <p>
          Once you have selected your countries, the dashboard will immediately
          generate interactive charts and data tables tailored to your selection.
          If you want to adjust your comparison group at any time, you can add or
          remove countries without losing your current view. This flexibility
          allows you to iterate quickly and explore different groupings, such as
          NATO allies versus non-NATO nations, or regional comparisons within
          Asia, Europe, or the Middle East.
        </p>
        <p>
          For first-time visitors, we recommend starting with a small group of
          three to four countries to familiarize yourself with the interface.
          Popular starting comparisons include the United States, China, and
          Russia, or a cluster of European NATO members such as the United
          Kingdom, France, and Germany. As you become more comfortable with the
          tool, you can expand your selection to conduct broader analyses.
        </p>
      </div>
    ),
  },
  {
    number: "02",
    title: "Compare Metrics and Visualize Data",
    content: (
      <div className="space-y-4 text-text-secondary leading-relaxed">
        <p>
          DefenseBudget Dash offers several key metrics for comparison: absolute
          defense spending in current US dollars, defense spending as a percentage
          of GDP, and active military personnel counts. Each metric tells a
          different story about a country&apos;s military commitment. Absolute
          spending reveals the total financial resources allocated to defense,
          while the GDP ratio normalizes spending against economic size, providing
          a fairer comparison between large and small economies.
        </p>
        <p>
          The interactive charts update in real time as you toggle between
          metrics. Bar charts make it easy to see relative differences at a
          glance, while the data tables provide precise numerical values for
          detailed analysis. You can hover over chart elements to see exact
          figures, and the responsive design ensures that the visualizations work
          seamlessly on both desktop and mobile devices. This makes DefenseBudget
          Dash a practical tool whether you are conducting research at your desk
          or reviewing data on the go.
        </p>
        <p>
          Understanding the relationship between these metrics is key to
          meaningful analysis. For example, a country may rank modestly in
          absolute spending but very highly in defense-as-a-percentage-of-GDP,
          indicating a strong national commitment to military readiness relative
          to its economic capacity. Conversely, a large economy may spend
          enormous sums on defense while still allocating a relatively small share
          of its GDP. DefenseBudget Dash makes these nuances immediately visible
          and easy to communicate.
        </p>
      </div>
    ),
  },
  {
    number: "03",
    title: "Explore Rankings and Share Your Analysis",
    content: (
      <div className="space-y-4 text-text-secondary leading-relaxed">
        <p>
          The{" "}
          <Link
            href={`${prefix}/rankings`}
            className="font-medium text-accent-navy underline underline-offset-2 hover:text-accent-navy/80 transition-colors duration-300"
          >
            Rankings page
          </Link>{" "}
          presents a comprehensive, sortable table of all countries in our
          database. Click on any column header to sort the table by that metric in
          ascending or descending order. This allows you to quickly identify the
          top spenders, the nations with the highest GDP ratios, or the countries
          with the largest active-duty military forces. The rankings table is an
          excellent starting point for discovering patterns and outliers that you
          may want to investigate further on the Compare page.
        </p>
        <p>
          Once you have crafted a comparison that tells a compelling story, you
          can share it with others using the built-in share functionality. On the
          Compare page, use the share button to copy a URL that encodes your
          selected countries and metric. Anyone who opens that link will see
          exactly the same comparison you created, making it easy to collaborate
          with colleagues, include data visualizations in reports, or share
          findings on social media.
        </p>
        <p>
          We encourage educators, journalists, policy analysts, and curious
          citizens alike to explore the data freely. Whether you are preparing a
          classroom presentation, writing an article on global security trends, or
          simply satisfying your curiosity about how nations allocate resources to
          defense, DefenseBudget Dash provides the tools and data you need in a
          clean, accessible format.
        </p>
      </div>
    ),
  },
];

const FAQS = [
  {
    question: "Where does the defense spending data come from?",
    answer:
      "All defense spending figures are sourced from the Stockholm International Peace Research Institute (SIPRI) Military Expenditure Database, one of the most authoritative and widely cited datasets on military expenditure worldwide. GDP figures and population data are cross-referenced with the World Bank Open Data platform to ensure accuracy and consistency. These two institutions are regarded as gold-standard sources by governments, academic researchers, and international organizations around the world.",
  },
  {
    question: "How often is the data updated?",
    answer:
      "Our data is updated periodically as new figures become available from SIPRI and the World Bank. SIPRI typically publishes updated military expenditure data annually, usually in the spring, covering the previous calendar year. We aim to incorporate new data within a few weeks of its public release. The exact date of the most recent data update is reflected in the data source credits at the bottom of each page.",
  },
  {
    question: "What does defense spending as a percentage of GDP mean?",
    answer:
      "Defense spending as a percentage of GDP (Gross Domestic Product) measures the share of a country's total economic output that is allocated to military expenditure. This metric is widely used by international organizations, including NATO, which famously set a guideline of 2% of GDP for its member states. The GDP ratio is considered a more equitable basis for comparing military commitment across countries of vastly different economic sizes, because it normalizes spending against the overall capacity of each economy.",
  },
  {
    question: "Can I compare more than two countries at once?",
    answer:
      "Yes, DefenseBudget Dash supports the simultaneous comparison of up to eight countries. This limit is designed to keep the visualizations clear and readable while still allowing for meaningful multi-country analysis. If you need to compare a larger set of countries, the Rankings page provides a comprehensive sortable table of all nations in our database, which you can use alongside the Compare tool.",
  },
  {
    question: "Are reserve and paramilitary forces included in personnel figures?",
    answer:
      "The active military personnel figures displayed on DefenseBudget Dash represent active-duty service members only. Reserve forces, paramilitary organizations, and civilian defense employees are generally not included in these counts unless explicitly noted. This approach follows the standard methodology used by SIPRI and the World Bank to ensure consistency and comparability across countries with very different military structures.",
  },
  {
    question: "Is DefenseBudget Dash free to use?",
    answer:
      "Yes, DefenseBudget Dash is completely free to use. The tool is built as an open-data project for the public interest, and there are no subscriptions, paywalls, or premium tiers. The site is supported by non-intrusive advertising, which helps cover hosting and development costs. We are committed to keeping the core data and comparison tools freely accessible to everyone, including students, researchers, journalists, and policymakers.",
  },
  {
    question: "How should I cite DefenseBudget Dash in academic or professional work?",
    answer:
      "When citing data from DefenseBudget Dash, we recommend referencing both our platform and the underlying primary sources (SIPRI and the World Bank). A suggested citation format is: \"DefenseBudget Dash (defense-budget-dash.vercel.app), using data from the SIPRI Military Expenditure Database and the World Bank Open Data platform.\" For academic papers, you may also want to cite the original SIPRI and World Bank datasets directly, as these are the authoritative primary sources for the figures we present.",
  },
  {
    question: "What currencies are the spending figures displayed in?",
    answer:
      "All defense spending figures on DefenseBudget Dash are presented in current United States dollars (USD) in billions. Using a single consistent currency allows for straightforward cross-country comparison without the complications of fluctuating exchange rates. It is worth noting that purchasing power parity (PPP) adjustments are not applied by default, which means that the figures reflect market exchange rates rather than the relative domestic purchasing power of each country's defense budget.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default async function HowToUsePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const prefix = lang === "en" ? "" : `/${lang}`;
  const STEPS = getSteps(prefix);
  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <header>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary">
          How to Use DefenseBudget Dash
        </h1>
        <p className="mt-3 text-lg text-text-secondary max-w-3xl">
          DefenseBudget Dash is a free interactive tool designed to help you
          explore, compare, and understand global defense spending data. Whether
          you are a student researching international security, a journalist
          covering military budgets, or a citizen interested in how your
          government allocates resources, this guide will walk you through
          everything you need to get started.
        </p>
      </header>

      {/* Step-by-Step Guide */}
      <section>
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">
          Getting Started: A 3-Step Guide
        </h2>
        <div className="space-y-6">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="rounded-xl bg-white p-6 sm:p-8 shadow-md"
            >
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent-navy text-white font-heading font-bold text-sm">
                  {step.number}
                </span>
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-bold text-text-primary mb-3">
                    {step.title}
                  </h3>
                  {step.content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className="rounded-xl bg-white p-6 sm:p-8 shadow-md"
            >
              <h3 className="font-heading text-lg font-bold text-text-primary mb-3">
                {faq.question}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="rounded-xl bg-white p-6 sm:p-8 shadow-md text-center">
        <h2 className="font-heading text-xl font-bold text-text-primary mb-3">
          Ready to Explore?
        </h2>
        <p className="text-text-secondary leading-relaxed mb-6 max-w-2xl mx-auto">
          Start comparing defense budgets across the world&apos;s nations. Select
          your countries, choose a metric, and discover the data behind global
          military spending.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={`${prefix}/compare`}
            className="inline-flex items-center rounded-lg bg-accent-navy px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-accent-navy/90 transition-colors duration-300"
          >
            Compare Countries
          </Link>
          <Link
            href={`${prefix}/rankings`}
            className="inline-flex items-center rounded-lg border border-border px-6 py-3 text-sm font-semibold text-text-primary shadow-sm hover:bg-bg-secondary transition-colors duration-300"
          >
            View Rankings
          </Link>
        </div>
      </section>
    </div>
  );
}
