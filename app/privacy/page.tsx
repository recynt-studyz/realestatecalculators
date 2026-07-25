import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy — RealEstateCalculators.app',
  description: 'Privacy policy for RealEstateCalculators.app. We do not collect or store your financial data. All calculations run in your browser.',
  alternates: { canonical: 'https://realestatecalculators.app/privacy' },
}

export default function PrivacyPage() {
  return (
    <>
      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgrec.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight">
              Privacy Policy
            </h1>
            <p className="text-lg text-white/80 max-w-xl mx-auto">
              Last updated: January 2026
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-6">

          <p>
            RealEstateCalculators.app (&quot;we,&quot; &quot;our,&quot; &quot;the site&quot;) is committed to your privacy. This policy explains what information we collect, how we use it, and your rights regarding that information.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-[#e2e8f0]">Calculator Data — We Don&apos;t Store It</h2>
          <p>
            All calculations on this site run entirely within your browser using JavaScript. The numbers you enter into our calculators — home values, income, loan amounts, investment figures — are never transmitted to our servers. We have no access to this data.
          </p>
          <p>
            Your calculator inputs are saved to your browser&apos;s localStorage solely to preserve your settings between sessions on the same device. This data never leaves your device.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-[#e2e8f0]">Google Analytics</h2>
          <p>
            We use Google Analytics (GA4) to collect aggregate, anonymized information about how visitors use our site. This includes:
          </p>
          <ul>
            <li>Pages visited and time spent on each page</li>
            <li>General geographic location (country/region level)</li>
            <li>Browser type and device type</li>
            <li>Referring websites</li>
          </ul>
          <p>
            We do not collect personally identifiable information through Analytics. Google may set cookies to support Analytics. You can opt out of Google Analytics tracking using the{' '}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#166534] dark:text-green-400 hover:underline">Google Analytics Opt-out Browser Add-on</a>.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-[#e2e8f0]">Google AdSense</h2>
          <p>
            We use Google AdSense to display advertisements that help fund the free operation of this site. Google AdSense may use cookies to serve ads based on your prior visits to our site or other sites. You can opt out of personalized advertising by visiting{' '}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#166534] dark:text-green-400 hover:underline">Google&apos;s Ads Settings</a>.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-[#e2e8f0]">Affiliate Links</h2>
          <p>
            Some pages on this site contain affiliate links to third-party financial products and services. When you click these links, we may receive compensation. This compensation does not influence our calculator results or recommendations. We only feature products we believe may be genuinely useful to our users.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-[#e2e8f0]">Cookies</h2>
          <p>
            We use cookies for the following purposes:
          </p>
          <ul>
            <li><strong>Google Analytics cookies</strong> — aggregate traffic analysis</li>
            <li><strong>Google AdSense cookies</strong> — ad personalization (can be opted out)</li>
            <li><strong>No first-party session cookies</strong> — we do not set our own session or tracking cookies</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 dark:text-[#e2e8f0]">localStorage</h2>
          <p>
            Your browser&apos;s localStorage is used to save your calculator preferences between sessions. Each calculator uses a separate key (e.g., &quot;rec-mortgage&quot;, &quot;rec-affordability&quot;). This data never leaves your browser. You can clear it at any time by clearing your browser&apos;s site data for realestatecalculators.app.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-[#e2e8f0]">Third-Party Links</h2>
          <p>
            Our site contains links to third-party websites. We are not responsible for the privacy practices of those sites. We encourage you to read the privacy policies of any third-party sites you visit.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-[#e2e8f0]">Children&apos;s Privacy</h2>
          <p>
            This site is not directed to children under 13. We do not knowingly collect information from children. If you believe a child has provided information on our site, please contact us.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-[#e2e8f0]">Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date. Continued use of the site after changes constitutes acceptance of the updated policy.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-[#e2e8f0]">Contact</h2>
          <p>
            For privacy questions or concerns, please contact us via the email address listed in the site footer.
          </p>

        </div>
      </main>

      <Footer />
    </>
  )
}
