import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — DefenseBudget Dash",
  description:
    "Privacy Policy for DefenseBudget Dash. Learn how we collect, use, and protect your personal information when you use our defense spending comparison tool.",
  openGraph: {
    title: "Privacy Policy — DefenseBudget Dash",
    description:
      "Privacy Policy for DefenseBudget Dash. Learn how we collect, use, and protect your personal information.",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
