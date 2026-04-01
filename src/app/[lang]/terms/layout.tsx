import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — DefenseBudget Dash",
  description:
    "Terms of Service for DefenseBudget Dash. Read our terms and conditions governing the use of our defense spending comparison tool and website.",
  openGraph: {
    title: "Terms of Service — DefenseBudget Dash",
    description:
      "Terms of Service for DefenseBudget Dash. Read our terms and conditions governing the use of our website.",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
