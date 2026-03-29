const LAST_UPDATED = "March 29, 2026";

const SECTIONS = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: (
      <div className="space-y-4 text-text-secondary leading-relaxed">
        <p>
          By accessing or using DefenseBudget Dash (the &quot;Service&quot;),
          available at{" "}
          <a
            href="https://defense-budget-dash.vercel.app"
            className="font-medium text-accent-navy underline underline-offset-2 hover:text-accent-navy/80 transition-colors duration-300"
          >
            defense-budget-dash.vercel.app
          </a>
          , you agree to be bound by these Terms of Service (&quot;Terms&quot;).
          If you do not agree to all of these Terms, you must not access or use
          the Service. These Terms constitute a legally binding agreement between
          you and DefenseBudget Dash.
        </p>
        <p>
          We reserve the right to modify these Terms at any time. Any changes
          will be effective immediately upon posting the revised Terms on this
          page. Your continued use of the Service after any such changes
          constitutes your acceptance of the new Terms. It is your
          responsibility to review these Terms periodically for updates.
        </p>
        <p>
          If you are using the Service on behalf of an organization, you
          represent and warrant that you have the authority to bind that
          organization to these Terms. In such cases, &quot;you&quot; and
          &quot;your&quot; will refer to that organization.
        </p>
      </div>
    ),
  },
  {
    id: "description",
    title: "2. Description of Service",
    content: (
      <div className="space-y-4 text-text-secondary leading-relaxed">
        <p>
          DefenseBudget Dash is a free, web-based data visualization tool that
          enables users to compare defense spending, military budget-to-GDP
          ratios, and active military personnel counts across countries. The
          Service draws on publicly available data from the Stockholm
          International Peace Research Institute (SIPRI) Military Expenditure
          Database and the World Bank Open Data platform.
        </p>
        <p>
          The Service is provided as an informational and educational resource.
          It includes interactive charts, data tables, country comparison tools,
          and ranking views. The Service is designed for general audiences,
          including researchers, journalists, educators, students, policymakers,
          and members of the public who are interested in understanding global
          defense spending patterns.
        </p>
        <p>
          We strive to keep the data accurate and up to date, but we do not
          guarantee that the information presented on DefenseBudget Dash is
          complete, current, or error-free at all times. The Service may be
          updated, modified, or discontinued at any time without prior notice.
        </p>
      </div>
    ),
  },
  {
    id: "license",
    title: "3. Use License",
    content: (
      <div className="space-y-4 text-text-secondary leading-relaxed">
        <p>
          Subject to your compliance with these Terms, we grant you a limited,
          non-exclusive, non-transferable, revocable license to access and use
          DefenseBudget Dash for personal, educational, and non-commercial
          purposes. You may view, share, and reference the data and
          visualizations produced by the Service, provided that you properly
          attribute DefenseBudget Dash and the underlying data sources (SIPRI
          and the World Bank) in any publications, reports, or presentations.
        </p>
        <p>
          This license does not include the right to modify, distribute,
          reproduce, or create derivative works based on the Service itself
          (including its source code, design, or underlying software), except as
          expressly permitted by applicable open-source licenses. The underlying
          defense spending data is sourced from publicly available datasets and
          is subject to the respective terms and licenses of SIPRI and the World
          Bank.
        </p>
        <p>
          You may not use the Service for any unlawful purpose or in any manner
          that could damage, disable, overburden, or impair the Service. You
          may not attempt to gain unauthorized access to any part of the
          Service, its servers, or any systems or networks connected to the
          Service.
        </p>
      </div>
    ),
  },
  {
    id: "disclaimer",
    title: "4. Disclaimer of Warranties",
    content: (
      <div className="space-y-4 text-text-secondary leading-relaxed">
        <p>
          THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS
          AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
          IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
          NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE
          UNINTERRUPTED, SECURE, OR ERROR-FREE, OR THAT ANY DEFECTS WILL BE
          CORRECTED.
        </p>
        <p>
          We make no representations or warranties regarding the accuracy,
          completeness, reliability, or timeliness of the data, content, or
          information provided through the Service. The defense spending data
          presented on DefenseBudget Dash is derived from third-party sources,
          and we do not independently verify every data point. Users should
          exercise their own judgment and conduct independent verification when
          relying on the data for critical decisions.
        </p>
        <p>
          No advice or information, whether oral or written, obtained from
          DefenseBudget Dash or through the Service shall create any warranty
          not expressly stated in these Terms.
        </p>
      </div>
    ),
  },
  {
    id: "liability",
    title: "5. Limitation of Liability",
    content: (
      <div className="space-y-4 text-text-secondary leading-relaxed">
        <p>
          TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, DEFENSEBUDGET DASH
          AND ITS OPERATORS, CONTRIBUTORS, AND AFFILIATES SHALL NOT BE LIABLE
          FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE
          DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, OR
          GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF OR INABILITY TO
          USE THE SERVICE, REGARDLESS OF THE THEORY OF LIABILITY.
        </p>
        <p>
          IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING
          OUT OF OR RELATED TO THESE TERMS OR THE SERVICE EXCEED THE AMOUNT OF
          ONE HUNDRED US DOLLARS (USD $100.00). THIS LIMITATION APPLIES WHETHER
          THE ALLEGED LIABILITY IS BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT
          LIABILITY, OR ANY OTHER BASIS, EVEN IF WE HAVE BEEN ADVISED OF THE
          POSSIBILITY OF SUCH DAMAGES.
        </p>
        <p>
          Some jurisdictions do not allow the exclusion or limitation of
          incidental or consequential damages, so the above limitations may not
          apply to you. In such jurisdictions, our liability shall be limited
          to the greatest extent permitted by law.
        </p>
      </div>
    ),
  },
  {
    id: "data-accuracy",
    title: "6. Data Accuracy",
    content: (
      <div className="space-y-4 text-text-secondary leading-relaxed">
        <p>
          DefenseBudget Dash presents defense spending data sourced from
          reputable third-party institutions, including SIPRI and the World
          Bank. While we make every effort to present this data accurately, we
          do not guarantee the absolute accuracy, completeness, or currentness
          of any information displayed on the Service. Data may be subject to
          revisions by the source institutions, and there may be a delay
          between when updated figures are published and when they are reflected
          on our platform.
        </p>
        <p>
          Users should treat the data presented on DefenseBudget Dash as
          informational and should not rely on it as the sole basis for policy
          decisions, academic conclusions, financial analyses, or any other
          consequential actions. We strongly recommend consulting the original
          SIPRI and World Bank datasets for the most current and authoritative
          figures, particularly for professional or academic use.
        </p>
        <p>
          If you identify a data discrepancy or error on DefenseBudget Dash, we
          encourage you to report it to us so that we can investigate and
          correct it. We appreciate the support of our user community in
          maintaining the quality of the data we present.
        </p>
      </div>
    ),
  },
  {
    id: "intellectual-property",
    title: "7. Intellectual Property",
    content: (
      <div className="space-y-4 text-text-secondary leading-relaxed">
        <p>
          The DefenseBudget Dash name, logo, website design, visual elements,
          and original content (excluding third-party data) are the intellectual
          property of DefenseBudget Dash and are protected by applicable
          intellectual property laws. You may not use our branding, trademarks,
          or original content in any manner that suggests endorsement or
          affiliation without our prior written consent.
        </p>
        <p>
          The underlying defense spending data is sourced from publicly
          available datasets maintained by SIPRI and the World Bank. These
          datasets are subject to their respective terms of use and licensing
          agreements. Users who wish to use the raw data for their own projects
          should consult the original data providers directly for applicable
          terms and conditions.
        </p>
      </div>
    ),
  },
  {
    id: "third-party",
    title: "8. Third-Party Links and Services",
    content: (
      <div className="space-y-4 text-text-secondary leading-relaxed">
        <p>
          DefenseBudget Dash may contain links to third-party websites,
          services, or resources that are not owned or controlled by us. These
          links are provided for your convenience and reference only. We do not
          endorse and are not responsible for the content, privacy policies, or
          practices of any third-party websites or services. Your interaction
          with any third-party website or service is at your own risk.
        </p>
        <p>
          Our website uses third-party advertising services, including Google
          AdSense and Adsterra, which may display advertisements and collect
          data as described in our Privacy Policy. We are not responsible for
          the content of advertisements displayed on our website or for the
          products and services advertised by third parties.
        </p>
        <p>
          We strongly encourage you to review the terms and privacy policies of
          any third-party services you access through our website before
          providing any personal information or engaging in transactions.
        </p>
      </div>
    ),
  },
  {
    id: "acceptable-use",
    title: "9. Acceptable Use Policy",
    content: (
      <div className="space-y-4 text-text-secondary leading-relaxed">
        <p>
          You agree to use DefenseBudget Dash only for lawful purposes and in
          accordance with these Terms. You agree not to use the Service in any
          way that violates any applicable local, state, national, or
          international law or regulation. You further agree not to engage in
          any conduct that restricts or inhibits anyone&apos;s use or enjoyment
          of the Service, or that may harm DefenseBudget Dash or its users.
        </p>
        <p>
          Specifically, you agree not to: (a) use any automated system,
          including bots, scrapers, or crawlers, to access the Service in a
          manner that sends more request messages to our servers than a human
          can reasonably produce in the same period using a conventional web
          browser; (b) introduce any viruses, trojan horses, worms, or other
          malicious or technologically harmful material; (c) attempt to
          interfere with, compromise, or disrupt the Service or the servers
          and networks on which it operates; or (d) impersonate any person or
          entity or misrepresent your affiliation with any person or entity.
        </p>
      </div>
    ),
  },
  {
    id: "termination",
    title: "10. Termination",
    content: (
      <div className="space-y-4 text-text-secondary leading-relaxed">
        <p>
          We reserve the right to restrict, suspend, or terminate your access
          to the Service at any time, for any reason, without prior notice or
          liability. This includes, but is not limited to, situations where we
          believe that your use of the Service violates these Terms, applicable
          law, or is harmful to our interests or the interests of other users.
        </p>
        <p>
          Upon termination, your right to use the Service will immediately
          cease. All provisions of these Terms that by their nature should
          survive termination shall survive, including without limitation
          ownership provisions, warranty disclaimers, indemnification
          obligations, and limitations of liability.
        </p>
      </div>
    ),
  },
  {
    id: "governing-law",
    title: "11. Governing Law",
    content: (
      <div className="space-y-4 text-text-secondary leading-relaxed">
        <p>
          These Terms shall be governed by and construed in accordance with the
          laws of the United States, without regard to conflict of law
          principles. Any disputes arising under or in connection with these
          Terms shall be subject to the exclusive jurisdiction of the courts
          located within the United States.
        </p>
        <p>
          If any provision of these Terms is found to be invalid or
          unenforceable by a court of competent jurisdiction, the remaining
          provisions shall continue in full force and effect. Our failure to
          enforce any right or provision of these Terms shall not be deemed a
          waiver of such right or provision.
        </p>
      </div>
    ),
  },
  {
    id: "changes",
    title: "12. Changes to Terms",
    content: (
      <div className="space-y-4 text-text-secondary leading-relaxed">
        <p>
          We reserve the right to update or modify these Terms at any time at
          our sole discretion. When we make changes, we will revise the
          &quot;Last Updated&quot; date at the top of this page. We may also
          provide additional notice of significant changes through a prominent
          notice on our website. Your continued use of the Service following the
          posting of revised Terms means that you accept and agree to the
          changes.
        </p>
        <p>
          We encourage you to periodically review these Terms to stay informed
          about the conditions governing your use of DefenseBudget Dash. If you
          do not agree to the modified Terms, you should discontinue your use
          of the Service.
        </p>
      </div>
    ),
  },
  {
    id: "contact",
    title: "13. Contact Information",
    content: (
      <div className="space-y-4 text-text-secondary leading-relaxed">
        <p>
          If you have any questions or concerns about these Terms of Service,
          please contact us at:
        </p>
        <p>
          <a
            href="mailto:contact@defensebudgetdash.com"
            className="font-medium text-accent-navy underline underline-offset-2 hover:text-accent-navy/80 transition-colors duration-300"
          >
            contact@defensebudgetdash.com
          </a>
        </p>
        <p>
          We will make reasonable efforts to respond to your inquiry in a
          timely manner. For issues related to data accuracy or technical
          problems with the Service, you may also open an issue on our GitHub
          repository.
        </p>
      </div>
    ),
  },
];

export default function TermsPage() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary">
          Terms of Service
        </h1>
        <p className="mt-3 text-lg text-text-secondary max-w-3xl">
          Please read these Terms of Service carefully before using
          DefenseBudget Dash. These Terms govern your access to and use of our
          website and services. By using DefenseBudget Dash, you agree to be
          bound by these Terms.
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
