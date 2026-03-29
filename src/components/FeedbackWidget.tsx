"use client";

import { useState, useRef, useEffect } from "react";

const CATEGORIES = ["Bug Report", "Feature Request", "Data Correction", "Other"] as const;

export default function FeedbackWidget() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[DefenseBudget Dash Feedback] ${category}`);
    const body = encodeURIComponent(
      `Category: ${category}\nFrom: ${email || "Not provided"}\n\n${message}`
    );
    window.location.href = `mailto:taeshinkim11@gmail.com?subject=${subject}&body=${body}`;
    setOpen(false);
    setMessage("");
  };

  return (
    <div className="fixed bottom-20 right-4 z-50" ref={panelRef}>
      {/* Expanded card */}
      <div
        className={`absolute bottom-14 right-0 w-80 rounded-xl bg-white shadow-xl border border-border overflow-hidden transition-all duration-200 origin-bottom-right ${
          open
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-90 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-accent-navy px-4 py-3">
          <h3 className="text-sm font-semibold text-white">Send us feedback</h3>
          <button
            onClick={() => setOpen(false)}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Close feedback"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-border bg-bg-primary px-3 py-2 text-sm text-text-primary focus:border-accent-navy focus:outline-none focus:ring-2 focus:ring-accent-navy/20"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">
              Email <span className="text-text-muted">(optional)</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-border bg-bg-primary px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-navy focus:outline-none focus:ring-2 focus:ring-accent-navy/20"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={3}
              placeholder="Tell us what's on your mind..."
              className="w-full rounded-lg border border-border bg-bg-primary px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:border-accent-navy focus:outline-none focus:ring-2 focus:ring-accent-navy/20 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-accent-navy px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-accent-navy/90 hover:shadow-md"
          >
            Send Feedback
          </button>
        </form>
      </div>

      {/* Floating trigger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-navy text-white shadow-lg transition-all duration-200 hover:bg-accent-navy/90 hover:shadow-xl hover:scale-105"
        aria-label="Send feedback"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>
    </div>
  );
}
