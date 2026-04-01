import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "World Defense Spending Rankings 2024 — DefenseBudget Dash",
  description:
    "Full sortable rankings of global defense spending, GDP ratios, and active military personnel across 40+ nations.",
  openGraph: {
    title: "World Defense Spending Rankings 2024 — DefenseBudget Dash",
    description:
      "Full sortable rankings of global defense spending, GDP ratios, and active military personnel.",
  },
};

export default function RankingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
