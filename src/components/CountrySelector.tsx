"use client";

import { useState, useRef, useEffect, useMemo } from "react";

interface CountrySelectorProps {
  countries: Array<{ code: string; name: string; flag: string }>;
  selected: string[];
  onChange: (codes: string[]) => void;
  max?: number;
}

export default function CountrySelector({
  countries,
  selected,
  onChange,
  max = 8,
}: CountrySelectorProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /* Close dropdown on outside click */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return countries.filter(
      (c) =>
        !selected.includes(c.code) &&
        (c.name.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q)),
    );
  }, [countries, selected, query]);

  const selectedCountries = useMemo(
    () => countries.filter((c) => selected.includes(c.code)),
    [countries, selected],
  );

  const atLimit = selected.length >= max;

  function add(code: string) {
    if (atLimit) return;
    onChange([...selected, code]);
    setQuery("");
  }

  function remove(code: string) {
    onChange(selected.filter((c) => c !== code));
  }

  return (
    <div ref={wrapperRef} className="w-full">
      {/* Search input */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={
            atLimit
              ? `Limit of ${max} countries reached`
              : "Search countries..."
          }
          disabled={atLimit}
          className="w-full rounded-[var(--radius-sm)] border border-border bg-white px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-navy focus:outline-none focus:ring-2 focus:ring-accent-navy/20 disabled:cursor-not-allowed disabled:opacity-50"
        />

        {/* Dropdown */}
        {open && !atLimit && filtered.length > 0 && (
          <ul className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-[var(--radius-sm)] border border-border bg-white py-1 shadow-[var(--shadow-md)]">
            {filtered.map((country) => (
              <li key={country.code}>
                <button
                  type="button"
                  onClick={() => add(country.code)}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-text-primary hover:bg-accent-navy-light"
                >
                  <span className="text-base">{country.flag}</span>
                  <span>{country.name}</span>
                  <span className="ml-auto text-xs text-text-muted">
                    {country.code}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {open && !atLimit && query.length > 0 && filtered.length === 0 && (
          <div className="absolute z-30 mt-1 w-full rounded-[var(--radius-sm)] border border-border bg-white px-3 py-3 text-center text-sm text-text-muted shadow-[var(--shadow-md)]">
            No countries found
          </div>
        )}
      </div>

      {/* Selected chips */}
      {selectedCountries.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedCountries.map((country) => (
            <span
              key={country.code}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-accent-navy-light px-3 py-1 text-xs font-medium text-accent-navy"
            >
              <span>{country.flag}</span>
              <span>{country.name}</span>
              <button
                type="button"
                onClick={() => remove(country.code)}
                className="ml-0.5 rounded-full p-0.5 hover:bg-accent-navy/10"
                aria-label={`Remove ${country.name}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Selection count hint */}
      <p className="mt-1 text-xs text-text-muted">
        {selected.length} / {max} countries selected
      </p>
    </div>
  );
}
