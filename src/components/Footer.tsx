import VisitorCounter from "./VisitorCounter";

export default function Footer() {
  return (
    <footer className="mt-auto bg-bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center text-sm text-text-secondary">
          {/* Data credits */}
          <p>
            Data sources:{" "}
            <a
              href="https://www.sipri.org/databases/milex"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-border underline-offset-2 hover:text-accent-navy"
            >
              SIPRI Military Expenditure Database
            </a>
            ,{" "}
            <a
              href="https://data.worldbank.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-border underline-offset-2 hover:text-accent-navy"
            >
              World Bank Open Data
            </a>
          </p>

          {/* Visitor counter */}
          <VisitorCounter />

          {/* Copyright */}
          <p className="text-xs text-text-muted">
            &copy; 2024 DefenseBudget Dash. Open data for public interest.
          </p>
        </div>
      </div>
    </footer>
  );
}
