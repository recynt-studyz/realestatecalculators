import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'
import AffiliateCTA from '@/components/AffiliateCTA'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import CapRateCalculatorWrapper from '@/components/CapRateCalculatorWrapper'

export const metadata: Metadata = {
  title: 'Cap Rate Calculator 2026 — Capitalization Rate for Rental Properties',
  description: 'Calculate the capitalization rate (cap rate) for any rental property. Free cap rate calculator with NOI breakdown, property value analysis, and market benchmarks for 2026.',
  keywords: ['cap rate calculator', 'capitalization rate calculator', 'cap rate formula 2026', 'rental property cap rate', 'NOI calculator'],
  alternates: { canonical: 'https://realestatecalculators.app/cap-rate' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Cap Rate Calculator 2026 — Capitalization Rate for Rental Properties',
    description: 'Calculate cap rate, NOI, and implied property value. Includes market benchmarks and interpretation.',
    url: 'https://realestatecalculators.app/cap-rate',
    type: 'website',
  },
}

const faqItems: FaqItem[] = [
  {
    q: 'What is a good cap rate for rental property in 2026?',
    a: 'A "good" cap rate depends entirely on your market and risk tolerance. In 2026, with the 10-year Treasury yielding around 4.5%, investors typically demand a 1–2% spread, so 5.5–6.5% cap rates represent fair value in stable markets. Class A properties in gateway cities (NYC, SF, LA) often trade at 3–4% cap rates due to appreciation expectations. Class B/C properties in secondary markets may offer 7–9%. Higher cap rates indicate higher risk or better value — context matters. Consult a licensed real estate professional for current market cap rates in your target area.',
  },
  {
    q: 'How do I calculate cap rate?',
    a: 'Cap Rate = Net Operating Income (NOI) ÷ Property Value × 100. NOI is calculated as: Gross Annual Rent × (1 − Vacancy Rate) − Annual Operating Expenses. Operating expenses include property taxes, insurance, management fees, maintenance, and reserves — but NOT mortgage payments. Example: A property generating $24,000 NOI with a $400,000 value has a 6% cap rate ($24,000 ÷ $400,000 = 0.06 = 6%).',
  },
  {
    q: 'Can I use cap rate to value a property?',
    a: 'Yes — cap rate is widely used to estimate property value: Property Value = NOI ÷ Cap Rate. If similar properties sell at 6% cap rates and your property generates $30,000 NOI, its implied market value is $30,000 ÷ 0.06 = $500,000. This "income approach" to valuation is the primary method appraisers use for commercial and investment properties. For single-family homes, comparable sales (the "sales comparison approach") is more commonly used.',
  },
  {
    q: 'Does cap rate include mortgage payments?',
    a: 'No — cap rate is calculated before any mortgage payments. This is intentional, as cap rate is a property metric that measures the asset\'s income potential independent of how it\'s financed. This allows fair comparison between all-cash and leveraged purchases, and between different investors with different financing terms. To evaluate leveraged returns, use cash-on-cash return instead.',
  },
  {
    q: 'What is the cap rate compression risk?',
    a: 'Cap rate compression happens when property values rise faster than income, causing cap rates to fall. For example, if a $400,000 property generating 6% cap rate appreciates to $500,000 while rents stay flat, the cap rate compresses to 4.8%. Buyers who purchase at compressed cap rates accept lower current income in anticipation of future appreciation or rent growth. This creates risk if appreciation reverses without rent growth materializing.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Cap Rate Calculator 2026',
      url: 'https://realestatecalculators.app/cap-rate',
      description: 'Free capitalization rate calculator with NOI breakdown and market benchmarks for real estate investors in 2026.',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqItems.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
    {
      '@type': 'HowTo',
      name: 'How to Calculate Cap Rate',
      description: 'Calculate capitalization rate for a rental property investment.',
      step: [
        { '@type': 'HowToStep', name: 'Enter property value', text: 'The current market value or purchase price of the property.' },
        { '@type': 'HowToStep', name: 'Enter gross annual rent', text: 'Total potential rent if fully occupied for 12 months.' },
        { '@type': 'HowToStep', name: 'Set vacancy rate', text: 'Expected percentage of time the property will be vacant.' },
        { '@type': 'HowToStep', name: 'Enter operating expenses', text: 'Taxes, insurance, management, maintenance, and other costs.' },
        { '@type': 'HowToStep', name: 'Calculate NOI and cap rate', text: 'NOI = Effective Gross Income − Expenses; Cap Rate = NOI ÷ Value.' },
      ],
    },
  ],
}

const trustSignals = ['Cap Rate Formula', 'NOI Breakdown', 'Market Benchmarks', 'Implied Value']

export default function CapRatePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />

      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgrec.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              Cap Rate Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate capitalization rate and NOI for any rental property. Instant results with 2026 market benchmarks.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="3456721098" /></div>
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <CapRateCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="4567832109" /></div>

          <div className="rounded-2xl bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/40 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-[#166534] dark:text-green-300 mb-2">2026 Cap Rate Context</h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              With the 10-year Treasury yielding ~4.5% in 2026, investors typically require a 1–2% risk premium over Treasuries, making 5.5–6.5% a reasonable minimum cap rate for stabilized residential rentals. Gateway city properties (NYC, SF, LA) continue trading at 3–4% caps due to appreciation expectations. Secondary Midwest and Sun Belt markets offer 6–9% cap rates, attracting cash-flow-focused investors.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Cap Rate Deep Dive: Formula, Benchmarks, and Limitations</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The capitalization rate is the most widely used metric in commercial and investment real estate. It allows investors to compare properties of different sizes and prices on equal terms, and to estimate value based on income.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">The Cap Rate Formula</h3>
            <p className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mb-3">
              Cap Rate (%) = (Net Operating Income ÷ Property Value) × 100<br />
              NOI = Effective Gross Income − Operating Expenses<br />
              Effective Gross Income = Gross Rent × (1 − Vacancy Rate)
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">What Should Be Included in NOI?</h3>
            <div className="space-y-2 mb-4">
              {[
                ['Property taxes', 'Typically 1–3% of value annually depending on state'],
                ['Property insurance', 'Landlord policies typically $100–$200/month on a single-family home'],
                ['Property management', '8–12% of collected rent if using a manager'],
                ['Maintenance and repairs', 'Budget 1% of property value annually'],
                ['Capital expenditure reserves', '1% of value for major systems replacement'],
              ].map(([title, desc]) => (
                <div key={title} className="border-l-4 border-[#166534] pl-4">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4"><strong>Not included in NOI:</strong> mortgage principal, mortgage interest, depreciation, income taxes.</p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Cap Rate Benchmarks by Market Type (2026)</h3>
            <div className="overflow-x-auto mb-3">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <th className="text-left p-2 border border-gray-200 dark:border-gray-700">Market Type</th>
                    <th className="text-left p-2 border border-gray-200 dark:border-gray-700">Typical Cap Rate</th>
                    <th className="text-left p-2 border border-gray-200 dark:border-gray-700">Examples</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Tier 1 Gateway Cities', '3–4.5%', 'NYC, SF, LA, Boston'],
                    ['Major Metros', '4.5–6%', 'Chicago, Seattle, Denver, Miami'],
                    ['Sun Belt Growth Markets', '5.5–7%', 'Phoenix, Atlanta, Dallas, Charlotte'],
                    ['Secondary Midwest', '7–9%', 'Columbus, Indianapolis, Memphis, Cleveland'],
                    ['Rural / Tertiary Markets', '8–12%', 'Small cities, rural areas'],
                  ].map(([type, rate, ex]) => (
                    <tr key={type} className="border border-gray-200 dark:border-gray-700">
                      <td className="p-2 text-gray-700 dark:text-gray-300">{type}</td>
                      <td className="p-2 font-semibold text-[#166534] dark:text-green-300">{rate}</td>
                      <td className="p-2 text-gray-600 dark:text-gray-400">{ex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Cap rate is a powerful tool but has limitations: it doesn't account for appreciation, leverage, tax benefits (depreciation), or future rent growth. Always use cap rate alongside other metrics for a complete investment analysis.
            </p>
          </div>

          <div className="mb-10 rounded-xl border border-[#166534]/20 bg-[#166534]/5 dark:bg-[#166534]/10 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Example: Calculating Cap Rate on a 4-Unit Building in Kansas City, MO</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Income:</p>
                <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                  <li>4 units × $1,100/mo = $4,400/mo gross</li>
                  <li>Annual gross rent: $52,800</li>
                  <li>Less 5% vacancy: −$2,640</li>
                  <li>Effective gross income: $50,160</li>
                </ul>
                <p className="font-semibold text-gray-700 dark:text-gray-300 mt-3 mb-2">Expenses:</p>
                <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                  <li>Property taxes: $4,200/yr</li>
                  <li>Insurance: $2,400/yr</li>
                  <li>Management (10%): $5,016/yr</li>
                  <li>Maintenance + CapEx: $4,000/yr</li>
                  <li>Total expenses: $15,616/yr</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Cap Rate Calculation:</p>
                <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                  <li>NOI: $50,160 − $15,616 = $34,544</li>
                  <li>Purchase price: $420,000</li>
                  <li><strong className="text-[#166534] dark:text-green-300">Cap Rate: $34,544 ÷ $420,000 = 8.2%</strong></li>
                  <li className="mt-2">Above Kansas City median → strong value</li>
                  <li>GRM: $420,000 ÷ $52,800 = 7.95</li>
                  <li>Implied value at 7% cap: $493,486</li>
                  <li><strong className="text-gray-800 dark:text-gray-200">Potential upside if market compresses to 7%: +$73K</strong></li>
                </ul>
              </div>
            </div>
          </div>

          <AffiliateCTA variant="investor" />

          <div className="pb-10">
            <FAQ questions={faqItems} />
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-800 p-4 mb-6">
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              <strong>Disclaimer:</strong> Cap rate calculations are estimates based on information you provide. Actual NOI depends on occupancy, rent collection, actual expenses, and market conditions. Cap rates vary by property type, condition, location, and financing environment. Past cap rates and appreciation do not guarantee future performance. Real estate investing involves risk of loss. This calculator is for educational purposes only and does not constitute investment advice. Consult licensed real estate, financial, and tax professionals before investing.
            </p>
          </div>

          <div className="pb-6"><AdBanner slot="3465721098" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
