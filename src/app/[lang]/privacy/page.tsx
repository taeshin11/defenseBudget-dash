import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — DefenseBudget Dash",
  description:
    "Read the DefenseBudget Dash privacy policy to understand how we collect, use, and protect your information when you visit our website.",
  openGraph: {
    title: "Privacy Policy — DefenseBudget Dash",
    description:
      "How DefenseBudget Dash collects, uses, and protects your information.",
    type: "website",
  },
};

const LAST_UPDATED = "March 29, 2026";

const SECTIONS = [
  {
    id: "information-we-collect",
    title: "1. Information We Collect",
    content: (
      <div className="space-y-4 text-text-secondary leading-relaxed">
        <p>
          When you visit DefenseBudget Dash, we may collect certain information
          automatically through your interaction with our website. This includes
          technical data such as your Internet Protocol (IP) address, browser
          type and version, operating system, referring URL, pages visited, time
          and date of your visit, and the duration of your session. This
          information is collected through standard web server logs and
          third-party analytics services.
        </p>
        <p>
          We do not require you to create an account or provide any personally
          identifiable information to use DefenseBudget Dash. The tool is freely
          accessible without registration. If you choose to contact us via email,
          we will collect the information you voluntarily provide, such as your
          name and email address, solely for the purpose of responding to your
          inquiry.
        </p>
        <p>
          Additionally, third-party advertising and analytics services integrated
          into our website may collect information about your browsing behavior
          across multiple websites. This data collection is governed by the
          respective privacy policies of those third-party services, which are
          described in further detail below.
        </p>
      </div>
    ),
  },
  {
    id: "how-we-use",
    title: "2. How We Use Your Information",
    content: (
      <div className="space-y-4 text-text-secondary leading-relaxed">
        <p>
          The information we collect is used to operate, maintain, and improve
          DefenseBudget Dash. Specifically, we use technical data to monitor
          website performance, identify and resolve technical issues, analyze
          usage patterns to improve the user experience, and ensure the security
          and integrity of our systems. Aggregate, anonymized usage statistics
          help us understand which features are most popular and where we should
          focus our development efforts.
        </p>
        <p>
          We may use your IP address and browser information to deliver
          region-appropriate content and to detect and prevent fraudulent or
          abusive activity. If you contact us directly, we use your contact
          information solely to respond to your message and will not add you to
          any marketing lists or share your information with third parties for
          promotional purposes.
        </p>
        <p>
          We do not sell, rent, or trade your personal information to third
          parties. We do not use your data for profiling, automated
          decision-making, or any purpose unrelated to the operation and
          improvement of DefenseBudget Dash.
        </p>
      </div>
    ),
  },
  {
    id: "cookies",
    title: "3. Cookies and Tracking Technologies",
    content: (
      <div className="space-y-4 text-text-secondary leading-relaxed">
        <p>
          DefenseBudget Dash uses cookies and similar tracking technologies to
          enhance your browsing experience and to support the third-party
          services that operate on our website. Cookies are small text files
          stored on your device by your web browser. They enable the website to
          remember your preferences and to collect analytical data about how you
          interact with our content.
        </p>
        <p>
          We use Google Analytics to collect anonymized usage statistics. Google
          Analytics uses cookies to track visitor interactions, including page
          views, session duration, and traffic sources. This data helps us
          understand how visitors use DefenseBudget Dash so that we can improve
          the tool over time. You can learn more about how Google uses your data
          by visiting Google&apos;s Privacy &amp; Terms page.
        </p>
        <p>
          Our website also uses Google AdSense and Adsterra to display
          advertisements. These advertising services may use cookies and web
          beacons to serve ads based on your prior visits to DefenseBudget Dash
          and other websites. Google AdSense uses the DoubleClick cookie to
          enable interest-based advertising. You may opt out of personalized
          advertising by visiting Google&apos;s Ads Settings page or by visiting
          the Network Advertising Initiative opt-out page. Adsterra may similarly
          use tracking technologies to deliver relevant advertisements; please
          refer to Adsterra&apos;s privacy policy for detailed information about
          their data practices.
        </p>
      </div>
    ),
  },
  {
    id: "third-party",
    title: "4. Third-Party Services",
    content: (
      <div className="space-y-4 text-text-secondary leading-relaxed">
        <p>
          DefenseBudget Dash integrates several third-party services to support
          its operation. These services have their own privacy policies that
          govern how they collect and use data. We encourage you to review the
          privacy policies of each third-party service:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-text-primary">Google Analytics</strong> —
            Web analytics service provided by Google LLC. Collects anonymized
            usage data to help us analyze traffic and improve our website.
          </li>
          <li>
            <strong className="text-text-primary">Google AdSense</strong> —
            Advertising service provided by Google LLC. Displays advertisements
            and may use cookies for ad personalization.
          </li>
          <li>
            <strong className="text-text-primary">Adsterra</strong> —
            Advertising network that displays advertisements on our website and
            may use tracking technologies for ad delivery and performance
            measurement.
          </li>
          <li>
            <strong className="text-text-primary">Vercel</strong> — Our website
            hosting provider. Vercel may collect server logs and performance
            data as part of its hosting infrastructure.
          </li>
        </ul>
        <p>
          We do not control the data collection practices of these third-party
          services and are not responsible for their privacy policies or
          practices. We recommend reviewing each provider&apos;s privacy policy
          to understand how your data may be used.
        </p>
      </div>
    ),
  },
  {
    id: "data-security",
    title: "5. Data Security",
    content: (
      <div className="space-y-4 text-text-secondary leading-relaxed">
        <p>
          We take reasonable technical and organizational measures to protect the
          information collected through DefenseBudget Dash. Our website is served
          over HTTPS, which encrypts data transmitted between your browser and
          our servers. We regularly update our software dependencies and hosting
          infrastructure to address known security vulnerabilities.
        </p>
        <p>
          However, no method of transmission over the Internet or method of
          electronic storage is completely secure. While we strive to use
          commercially acceptable means to protect the data associated with our
          website, we cannot guarantee its absolute security. You use
          DefenseBudget Dash at your own risk, and we encourage you to take
          appropriate precautions when browsing the Internet, such as keeping
          your browser and operating system up to date.
        </p>
      </div>
    ),
  },
  {
    id: "children",
    title: "6. Children's Privacy",
    content: (
      <div className="space-y-4 text-text-secondary leading-relaxed">
        <p>
          DefenseBudget Dash is not directed at children under the age of 13,
          and we do not knowingly collect personal information from children
          under 13. Our website is designed as an educational and informational
          resource for general audiences. If we become aware that we have
          inadvertently collected personal information from a child under 13, we
          will take prompt steps to delete that information from our systems.
        </p>
        <p>
          If you are a parent or guardian and believe that your child has
          provided personal information to us, please contact us at the email
          address provided below so that we can take appropriate action. We are
          committed to complying with the Children&apos;s Online Privacy
          Protection Act (COPPA) and similar regulations in other jurisdictions.
        </p>
      </div>
    ),
  },
  {
    id: "changes",
    title: "7. Changes to This Policy",
    content: (
      <div className="space-y-4 text-text-secondary leading-relaxed">
        <p>
          We reserve the right to update or modify this Privacy Policy at any
          time. When we make changes, we will update the &quot;Last Updated&quot;
          date at the top of this page. We encourage you to review this Privacy
          Policy periodically to stay informed about how we are protecting your
          information. Your continued use of DefenseBudget Dash after any changes
          to this Privacy Policy constitutes your acceptance of those changes.
        </p>
        <p>
          For significant changes that materially affect how we handle your
          personal information, we will make reasonable efforts to provide
          prominent notice on our website. However, it remains your
          responsibility to check this page regularly for updates.
        </p>
      </div>
    ),
  },
  {
    id: "contact",
    title: "8. Contact Us",
    content: (
      <div className="space-y-4 text-text-secondary leading-relaxed">
        <p>
          If you have any questions, concerns, or requests regarding this
          Privacy Policy or our data practices, please contact us at:
        </p>
        <p>
          <a
            href="mailto:taeshinkim11@gmail.com"
            className="font-medium text-accent-navy underline underline-offset-2 hover:text-accent-navy/80 transition-colors duration-300"
          >
            taeshinkim11@gmail.com
          </a>
        </p>
        <p>
          We will make reasonable efforts to respond to your inquiry within a
          timely manner. If you believe that your privacy rights have been
          violated, you may also have the right to lodge a complaint with your
          local data protection authority.
        </p>
      </div>
    ),
  },
];

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const prefix = lang === "en" ? "" : `/${lang}`;
  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary">
          Privacy Policy
        </h1>
        <p className="mt-3 text-lg text-text-secondary max-w-3xl">
          Your privacy is important to us. This Privacy Policy explains how
          DefenseBudget Dash (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
          collects, uses, and protects information when you visit our website at{" "}
          <a
            href="https://defense-budget-dash.vercel.app"
            className="font-medium text-accent-navy underline underline-offset-2 hover:text-accent-navy/80 transition-colors duration-300"
          >
            defense-budget-dash.vercel.app
          </a>
          . By using our website, you consent to the data practices described in
          this policy.
        </p>
        <p className="mt-2 text-sm text-text-muted">
          Last Updated: {LAST_UPDATED}
        </p>
      </header>

      {SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="rounded-xl bg-white p-6 sm:p-8 shadow-md"
        >
          <h2 className="font-heading text-xl font-bold text-text-primary mb-4">
            {section.title}
          </h2>
          {section.content}
        </section>
      ))}
    </div>
  );
}
