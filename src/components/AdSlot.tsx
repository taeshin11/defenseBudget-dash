"use client";

import { useEffect, useRef, useState } from "react";

interface AdSlotProps {
  position: "banner" | "sidebar" | "in-content" | "sticky-footer";
}

const POSITION_STYLES: Record<
  AdSlotProps["position"],
  { wrapper: string; label: string }
> = {
  banner: {
    wrapper:
      "mx-auto hidden h-[90px] w-[728px] items-center justify-center sm:flex",
    label: "728 x 90",
  },
  sidebar: {
    wrapper: "mx-auto flex h-[250px] w-[300px] items-center justify-center",
    label: "300 x 250",
  },
  "in-content": {
    wrapper: "flex h-[250px] w-full items-center justify-center",
    label: "Responsive",
  },
  "sticky-footer": {
    wrapper:
      "fixed inset-x-0 bottom-0 z-40 flex h-[50px] items-center justify-center bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.1)]",
    label: "320 x 50",
  },
};

/* Mobile-specific banner fallback (shown only on small screens) */
const MOBILE_BANNER_WRAPPER =
  "mx-auto flex h-[50px] w-[320px] items-center justify-center sm:hidden";

export default function AdSlot({ position }: AdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(position === "sticky-footer");
  const [dismissed, setDismissed] = useState(false);

  /* Lazy-load non-sticky ads via IntersectionObserver */
  useEffect(() => {
    if (position === "sticky-footer") return;

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [position]);

  if (position === "sticky-footer" && dismissed) return null;

  const { wrapper, label } = POSITION_STYLES[position];

  return (
    <div ref={containerRef} aria-hidden="true">
      {visible ? (
        <>
          {/* Desktop banner */}
          <div
            className={`${wrapper} rounded-[var(--radius-sm)] border border-dashed border-border bg-bg-secondary`}
          >
            {/* ADSTERRA_BANNER_ID: replace_with_your_key */}
            {/* GOOGLE_ADSENSE_SLOT: replace_with_your_ad_client_and_slot */}
            <span className="text-xs text-text-muted">
              Advertisement &middot; {label}
            </span>

            {position === "sticky-footer" && (
              <button
                type="button"
                onClick={() => setDismissed(true)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-text-muted hover:bg-bg-secondary hover:text-text-primary"
                aria-label="Dismiss ad"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
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
            )}
          </div>

          {/* Mobile banner fallback (only for "banner" position) */}
          {position === "banner" && (
            <div
              className={`${MOBILE_BANNER_WRAPPER} rounded-[var(--radius-sm)] border border-dashed border-border bg-bg-secondary`}
            >
              {/* ADSTERRA_BANNER_ID: replace_with_your_key */}
              {/* GOOGLE_ADSENSE_SLOT: replace_with_your_ad_client_and_slot */}
              <span className="text-xs text-text-muted">
                Advertisement &middot; 320 x 50
              </span>
            </div>
          )}

          <p className="mt-1 text-center text-[10px] text-text-muted">
            Advertisement
          </p>
        </>
      ) : (
        /* Placeholder while waiting for intersection */
        <div
          className={`${wrapper} rounded-[var(--radius-sm)] border border-dashed border-border bg-bg-secondary opacity-0`}
        />
      )}
    </div>
  );
}
