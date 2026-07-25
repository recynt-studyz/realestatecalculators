import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'
import AffiliateCTA from '@/components/AffiliateCTA'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import InvestmentROICalculatorWrapper from '@/components/InvestmentROICalculatorWrapper'

export const metadata: Metadata = {
  title: 'Real Estate Investment ROI Calculator 2026 — Rental Property Returns',
  description: 'Calculate rental property ROI, cap rate, cash-on-cash return, and 5-year projection. Free real estate investment analysis tool for buy-and-hold investors in 2026.',
  keywords: ['real estate ROI calculator', 'rental property ROI', 'investment property calculator 2026', 'cap rate calculator', 'cash on cash return'],
  alternates: { canonical: 'https://realestatecalculators.app/investment-roi' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Real Estate Investment ROI Calculator 2026 — Rental Property Returns',
    description: 'Full rental property analysis: NOI, cap rate, cash-on-cash, and 5-year cash flow projection.',
    url: 'https://realestatecalculators.app/investment-roi',
    type: 'website',
  },
}

const faqItems: FaqItem[] = [
  {
    q: 'What is a good ROI for a rental property?',
    a: 'A good rental property ROI depends on your investment strategy. For cash-on-cash return, most investors target 6–12%. For cap rate, 5–10% is typically considered good (lower in expensive markets like NYC/SF, higher in Midwest markets). Total ROI including appreciation should exceed the rate of inflation plus a risk premium. In 2026, with mortgage rates around 7%, many investors require 8%+ cash-on-cash to justify the purchase over alternatives. Consult a licensed real estate professional for guidance on target returns in your specific market.',
  },
  {
    q: 'What is the difference between cap rate and cash-on-cash return?',
    a: 'Cap rate (Capitalization Rate) measures a property\'s income relative to its value, ignoring financing: Cap Rate = NOI ÷ Property Value. It\'s useful for comparing properties regardless of how they\'re financed. Cash-on-cash return measures actual cash income relative to your cash investment: CoC = Annual Cash Flow ÷ Cash Invested. It accounts for your mortgage and reflects your actual return on invested capital. Both metrics together give a complete picture.',
  },
  {
    q: 'What expenses should I include in a rental property analysis?',
    a: 'Include all recurring operating expenses: property taxes, landlord insurance (typically 25–40% more than homeowner\'s insurance), property management (8–12% of rent if using a manager), maintenance and repairs (1–2% of property value annually), vacancy (typically 5–8% of gross rent), capital expenditures reserve (1% of value annually for roofs, HVAC, etc.), and HOA fees if applicable. Beginners often underestimate maintenance and vacancy, which kills projected returns.',
  },
  {
    q: 'What is the 1% rule for rental properties?',
    a: 'The 1% rule is a quick screening metric: monthly rent should equal at least 1% of the purchase price. A $200,000 property should rent for $2,000/month. Properties meeting this threshold generally produce positive cash flow. However, in 2026\'s high-rate, high-price environment, properties rarely meet the 1% rule in major metros — many investors use 0.7–0.8% as their adjusted benchmark. The rule doesn\'t account for financing terms or local expenses.',
  },
  {
    q: 'How does vacancy rate affect rental property returns?',
    a: 'Vacancy rate is one of the biggest variables in rental property analysis. Even a 5% vacancy rate (18 days/year) means your gross rent is reduced by $1,200 on a $2,000/month property, or $24,000 over 20 years. High-vacancy markets (college towns, vacation rentals, luxury rentals) need higher gross rents to offset vacancy risk. A 10% vacancy rate on an otherwise solid investment can turn a cash-flowing property into a money-loser.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Real Estate Investment ROI Calculator 2026',
      url: 'https://realestatecalculators.app/investment-roi',
      description: 'Free rental property ROI calculator with cap rate, cash-on-cash, NOI, and 5-year projection for 2026.',
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
      name: 'How to Analyze a Rental Property Investment',
      description: 'Calculate cap rate, cash-on-cash return, and NOI for rental property investments.',
      step: [
        { '@type': 'HowToStep', name: 'Enter purchase details', text: 'Property price, down payment, interest rate, and closing costs.' },
        { '@type': 'HowToStep', name: 'Enter income', text: 'Monthly rent, vacancy rate, and any other income (laundry, parking).' },
        { '@type': 'HowToStep', name: 'Enter all expenses', text: 'Taxes, insurance, management, maintenance, HOA, CapEx reserves.' },
        { '@type': 'HowToStep', name: 'Review key metrics', text: 'Cap rate, cash-on-cash, NOI, monthly cash flow, and GRM.' },
        { '@type': 'HowToStep', name: 'Analyze 5-year projection', text: 'See how cash flow grows with rent increases over time.' },
      ],
    },
  ],
}

const trustSignals = ['Cap Rate', 'Cash-on-Cash', 'NOI', '5-Year Projection']

export default function InvestmentROIPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />

      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgrec.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              Real Estate Investment ROI Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Full rental property analysis — cap rate, cash-on-cash, NOI, and 5-year cash flow projection.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1234509876" /></div>
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <InvestmentROICalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2345610987" /></div>

          <div className="rounded-2xl bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/40 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-[#166534] dark:text-green-300 mb-2">2026 Rental Property Investment Context</h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              With mortgage rates around 7% in 2026, positive cash flow is harder to achieve than in the 2015–2021 era. Many properties in major metros show negative leverage — where the mortgage rate exceeds the cap rate. Investors are adapting by targeting secondary markets with stronger rent-to-price ratios, seeking seller financing, or focusing on value-add opportunities. Cap rates of 6%+ are generally required in 2026 to justify leveraged purchases.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Rental Property Investment Analysis: Key Metrics Explained</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Successful real estate investors don't rely on gut feelings — they analyze properties using proven financial metrics. Here are the most important calculations for evaluating a rental property investment in 2026.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Net Operating Income (NOI)</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
              NOI is the foundation of rental property analysis. It equals all rental income minus all operating expenses, but before mortgage payments and income taxes.
            </p>
            <p className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mb-3">
              NOI = Gross Rent − Vacancy Loss − Operating Expenses
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Capitalization Rate (Cap Rate)</h3>
            <p className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mb-3">
              Cap Rate = NOI ÷ Property Value × 100
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              A 6% cap rate on a $300,000 property means it generates $18,000 in NOI annually. Cap rates are inversely related to property values. Investors in 2026 see cap rates of 3–4% in coastal metros and 7–9% in many Midwest and Sun Belt markets.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Cash-on-Cash Return</h3>
            <p className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mb-3">
              CoC = Annual Cash Flow ÷ Total Cash Invested × 100
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Total cash invested includes your down payment, closing costs, and any immediate repairs. Annual cash flow is NOI minus annual mortgage payments. With 2026 mortgage rates around 7%, many investors find it difficult to achieve positive leverage.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Gross Rent Multiplier (GRM)</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              GRM is a quick screening tool: Property Value ÷ Annual Gross Rent. Lower GRMs indicate better value. A GRM of 10 means the property costs 10× annual rent. Compare GRM across similar properties in the same market for quick screening before doing a full analysis.
            </p>
          </div>

          <div className="mb-10 rounded-xl border border-[#166534]/20 bg-[#166534]/5 dark:bg-[#166534]/10 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Example: $275,000 Duplex in Columbus, OH</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Property Details:</p>
                <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                  <li>Purchase price: $275,000</li>
                  <li>Down payment (25%): $68,750</li>
                  <li>Mortgage (7%, 30yr): $1,369/mo P&I</li>
                  <li>Monthly gross rent: $2,800 (2 units × $1,400)</li>
                  <li>Vacancy (7%): −$196/mo</li>
                  <li>Effective gross rent: $2,604/mo</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Returns Analysis:</p>
                <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                  <li>Monthly expenses: $860 (taxes, ins, mgmt, maint)</li>
                  <li>NOI: ($2,604 − $860) × 12 = $20,928/yr</li>
                  <li>Cap rate: $20,928 ÷ $275,000 = <strong className="text-gray-800 dark:text-gray-200">7.6%</strong></li>
                  <li>Annual cash flow: $20,928 − $16,428 = $4,500</li>
                  <li>Total cash invested: $68,750 + $5,500 closing = $74,250</li>
                  <li><strong className="text-[#166534] dark:text-green-300">Cash-on-cash: 6.1%</strong></li>
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
              <strong>Disclaimer:</strong> Real estate investment calculations are projections based on assumptions you provide. Actual returns depend on rental market conditions, property management, unexpected repairs, tenant quality, and economic factors that cannot be predicted. Real estate investing involves risk, including potential loss of capital. Projections do not account for income taxes, depreciation benefits, or equity build-up from mortgage paydown. Consult a licensed real estate professional, financial advisor, and CPA before making investment decisions.
            </p>
          </div>

          <div className="pb-6"><AdBanner slot="1243509876" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
