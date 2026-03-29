import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — DefenseBudget Dash",
  description:
    "Learn about DefenseBudget Dash, our data sources (SIPRI, World Bank), methodology, and how to use the comparison tools.",
  openGraph: {
    title: "About — DefenseBudget Dash",
    description:
      "Learn about DefenseBudget Dash, our data sources, methodology, and how to use the comparison tools.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
