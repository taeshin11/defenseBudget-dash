"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

interface AdSlotProps {
  position: "banner" | "sidebar" | "in-content" | "sticky-footer";
}

// Adsterra 320x50
function Adsterra320x50({ id }: { id: string }) {
  return (
    <div id={id}>
      <Script
        id={`adsterra-opt-${id}`}
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `atOptions = { 'key': 'b817cb8842c10842f297632148242251', 'format': 'iframe', 'height': 50, 'width': 320, 'params': {} };`,
        }}
      />
      <Script
        id={`adsterra-inv-${id}`}
        strategy="lazyOnload"
        src="https://www.highperformanceformat.com/b817cb8842c10842f297632148242251/invoke.js"
      />
    </div>
  );
}

// Adsterra 728x90
function Adsterra728x90({ id }: { id: string }) {
  return (
    <div id={id}>
      <Script
        id={`adsterra-opt-${id}`}
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `atOptions = { 'key': 'e91d87e5d6768aaf04cf1e6c8a791e58', 'format': 'iframe', 'height': 90, 'width': 728, 'params': {} };`,
        }}
      />
      <Script
        id={`adsterra-inv-${id}`}
        strategy="lazyOnload"
        src="https://www.highperformanceformat.com/e91d87e5d6768aaf04cf1e6c8a791e58/invoke.js"
      />
    </div>
  );
}

// Adsterra 300x250
function Adsterra300x250({ id }: { id: string }) {
  return (
    <div id={id}>
      <Script
        id={`adsterra-opt-${id}`}
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `atOptions = { 'key': '03944a7a942e7b1228bb1a5b72a9e321', 'format': 'iframe', 'height': 250, 'width': 300, 'params': {} };`,
        }}
      />
      <Script
        id={`adsterra-inv-${id}`}
        strategy="lazyOnload"
        src="https://www.highperformanceformat.com/03944a7a942e7b1228bb1a5b72a9e321/invoke.js"
      />
    </div>
  );
}

export default function AdSlot({ position }: AdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(position === "sticky-footer");
  const [dismissed, setDismissed] = useState(false);

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

  return (
    <div ref={containerRef} aria-hidden="true">
      {visible && (
        <>
          {/* === BANNER: 728x90 desktop + 320x50 mobile === */}
          {position === "banner" && (
            <p className="text-center text-[10px] text-text-muted mb-1">Advertisement</p>
          )}
          {position === "sidebar" && (
            <p className="text-center text-[10px] text-text-muted mb-1">Advertisement</p>
          )}
          {position === "in-content" && (
            <p className="text-center text-[10px] text-text-muted mb-1">Advertisement</p>
          )}
          {position === "banner" && (
            <>
              <div className="mx-auto hidden sm:block w-[728px]">
                <Adsterra728x90 id="ad-banner-desktop" />
              </div>
              <div className="mx-auto block sm:hidden w-[320px]">
                <Adsterra320x50 id="ad-banner-mobile" />
              </div>
            </>
          )}

          {/* === SIDEBAR: 300x250 === */}
          {position === "sidebar" && (
            <div className="mx-auto w-[300px]">
              <Adsterra300x250 id="ad-sidebar" />
            </div>
          )}

          {/* === IN-CONTENT: 300x250 centered === */}
          {position === "in-content" && (
            <div className="mx-auto w-[300px]">
              <Adsterra300x250 id="ad-in-content" />
            </div>
          )}

          {/* === STICKY FOOTER: 320x50 === */}
          {position === "sticky-footer" && (
            <div className="fixed inset-x-0 bottom-0 z-40 flex h-[60px] items-center justify-center bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.1)]">
              <Adsterra320x50 id="ad-sticky-footer" />
              <button
                type="button"
                onClick={() => setDismissed(true)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-1.5 text-text-muted shadow-sm hover:text-text-primary"
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
            </div>
          )}
        </>
      )}
    </div>
  );
}
