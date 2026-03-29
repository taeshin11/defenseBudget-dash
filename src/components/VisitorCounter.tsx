"use client";

import { useEffect, useState } from "react";

export default function VisitorCounter() {
  const [todayCount, setTodayCount] = useState<number | null>(null);
  const [totalCount, setTotalCount] = useState<number | null>(null);

  useEffect(() => {
    // Simple localStorage-based counter (free, no external service needed)
    // In production, replace with Vercel KV or Google Sheets read-back
    const storageKey = "db_visitor_data";
    const today = new Date().toISOString().slice(0, 10);

    try {
      const raw = localStorage.getItem(storageKey);
      const data = raw
        ? JSON.parse(raw)
        : { total: 0, today: 0, lastDate: "" };

      // Check if already counted this session
      const sessionKey = "db_session_counted";
      const alreadyCounted = sessionStorage.getItem(sessionKey);

      if (!alreadyCounted) {
        if (data.lastDate !== today) {
          data.today = 1;
          data.lastDate = today;
        } else {
          data.today += 1;
        }
        data.total += 1;
        sessionStorage.setItem(sessionKey, "1");
        localStorage.setItem(storageKey, JSON.stringify(data));
      }

      setTodayCount(data.today);
      setTotalCount(data.total);
    } catch {
      // Fail silently
    }
  }, []);

  if (todayCount === null) return null;

  return (
    <div className="text-xs text-text-muted">
      <span className="opacity-70">&#128065;</span> Today:{" "}
      {todayCount?.toLocaleString() ?? "--"} &middot; Total:{" "}
      {totalCount?.toLocaleString() ?? "--"}
    </div>
  );
}
