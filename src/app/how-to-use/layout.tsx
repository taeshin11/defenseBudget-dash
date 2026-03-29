import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Use DefenseBudget Dash — Guide & FAQ",
  description:
    "Step-by-step guide on how to compare defense spending, GDP ratios, and military personnel across countries using DefenseBudget Dash. Includes frequently asked questions about our data and methodology.",
  openGraph: {
    title: "How to Use DefenseBudget Dash — Guide & FAQ",
    description:
      "Step-by-step guide on how to compare defense spending, GDP ratios, and military personnel across countries using DefenseBudget Dash.",
  },
};

export default function HowToUseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
