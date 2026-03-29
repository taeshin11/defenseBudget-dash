import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Defense Budgets — DefenseBudget Dash",
  description:
    "Select up to 8 countries and compare their defense spending, GDP ratios, and military personnel side by side with interactive charts.",
  openGraph: {
    title: "Compare Defense Budgets — DefenseBudget Dash",
    description:
      "Select up to 8 countries and compare their defense spending, GDP ratios, and military personnel.",
  },
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
