import Link from "next/link";

const SECTIONS = [
  {
    id: "mission",
    title: "Our Mission",
    content: (
      <p className="text-text-secondary leading-relaxed">
        DefenseBudget Dash exists to make global military spending data
        accessible, transparent, and easy to understand. We believe citizens
        deserve clear visibility into how their nations allocate resources to
        defense. By presenting authoritative data in an interactive format, we
        aim to foster informed public discourse on defense policy and government
        spending priorities.
      </p>
    ),
  },
  {
    id: "data-sources",
    title: "Data Sources",
    content: (
      <div className="space-y-4 text-text-secondary leading-relaxed">
        <p>
          Our data is compiled from two of the most respected open-data
          institutions in the world:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <a
              href="https://www.sipri.org/databases/milex"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent-navy underline underline-offset-2 hover:text-accent-navy/80 transition-colors duration-300"
            >
              SIPRI Military Expenditure Database
            </a>{" "}
            — The Stockholm International Peace Research Institute maintains the
            most comprehensive and widely cited dataset on military expenditure
            worldwide, covering 170+ countries from 1949 to the present.
          </li>
          <li>
            <a
              href="https://data.worldbank.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent-navy underline underline-offset-2 hover:text-accent-navy/80 transition-colors duration-300"
            >
              World Bank Open Data
            </a>{" "}
            — GDP figures, population statistics, and military expenditure as a
            percentage of GDP are cross-referenced with World Bank datasets to
            ensure consistency and accuracy.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "methodology",
    title: "Methodology",
    content: (
      <div className="space-y-3 text-text-secondary leading-relaxed">
        <p>
          All spending figures are presented in current US dollars (billions) to
          allow straightforward comparison. GDP percentages reflect each
          country&apos;s defense expenditure as a share of its gross domestic product,
          providing a size-normalized view of military commitment.
        </p>
        <p>
          Active military personnel figures represent the total number of
          active-duty service members, excluding reserves and paramilitary
          forces, unless otherwise noted.
        </p>
        <p>
          Rankings are computed dynamically based on the selected metric. Data is
          updated periodically as new figures become available from our source
          institutions.
        </p>
      </div>
    ),
  },
  {
    id: "how-to-use",
    title: "How to Use",
    content: (
      <div className="space-y-3 text-text-secondary leading-relaxed">
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong className="text-text-primary">Compare</strong> — Head to the{" "}
            <Link
              href="/compare"
              className="font-medium text-accent-navy underline underline-offset-2 hover:text-accent-navy/80 transition-colors duration-300"
            >
              Compare page
            </Link>{" "}
            to select up to 8 countries and view them side by side across
            different metrics.
          </li>
          <li>
            <strong className="text-text-primary">Rankings</strong> — Visit the{" "}
            <Link
              href="/rankings"
              className="font-medium text-accent-navy underline underline-offset-2 hover:text-accent-navy/80 transition-colors duration-300"
            >
              Rankings page
            </Link>{" "}
            for a full sortable table of all countries. Click any column header
            to sort.
          </li>
          <li>
            <strong className="text-text-primary">Share</strong> — Use the share
            button on the Compare page to copy a URL with your selections
            pre-loaded, making it easy to share your analysis with others.
          </li>
        </ol>
      </div>
    ),
  },
  {
    id: "contact",
    title: "Contact & Contribute",
    content: (
      <div className="space-y-3 text-text-secondary leading-relaxed">
        <p>
          DefenseBudget Dash is an open-data project built for the public
          interest. If you have feedback, spot a data discrepancy, or would like
          to contribute, we would love to hear from you.
        </p>
        <p>
          Reach out via{" "}
          <a
            href="mailto:contact@defensebudgetdash.com"
            className="font-medium text-accent-navy underline underline-offset-2 hover:text-accent-navy/80 transition-colors duration-300"
          >
            contact@defensebudgetdash.com
          </a>{" "}
          or open an issue on our GitHub repository.
        </p>
      </div>
    ),
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary">
          About DefenseBudget Dash
        </h1>
        <p className="mt-3 text-lg text-text-secondary max-w-3xl">
          Transparent, accessible data on global military spending — powered by
          open sources and built for the public interest.
        </p>
      </header>

      {SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="rounded-xl bg-white p-6 sm:p-8 shadow-md"
        >
          <h2 className="font-heading text-xl font-bold text-text-primary mb-4">
            {section.title}
          </h2>
          {section.content}
        </section>
      ))}
    </div>
  );
}
