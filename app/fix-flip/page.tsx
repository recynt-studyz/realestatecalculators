import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'
import AffiliateCTA from '@/components/AffiliateCTA'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import FixFlipCalculatorWrapper from '@/components/FixFlipCalculatorWrapper'

export const metadata: Metadata = {
  title: 'Fix and Flip Calculator 2026 — House Flipping Profit & ROI',
  description: 'Calculate fix and flip profit, ROI, and annualized returns for 2026. Includes hard money financing, holding costs, 70% rule check, and full cost breakdown for house flippers.',
  keywords: ['fix and flip calculator', 'house flipping calculator 2026', 'fix flip ROI', '70 percent rule calculator', 'house flip profit calculator'],
  alternates: { canonical: 'https://realestatecalculators.app/fix-flip' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Fix and Flip Calculator 2026 — House Flipping Profit & ROI',
    description: 'Calculate your fix and flip profit, ROI, and annualized returns. Includes the 70% rule and hard money financing.',
    url: 'https://realestatecalculators.app/fix-flip',
    type: 'website',
  },
}

const faqItems: FaqItem[] = [
  {
    q: 'What is the 70% rule in house flipping?',
    a: 'The 70% rule states that you should pay no more than 70% of the After Repair Value (ARV) minus your estimated repair costs. Formula: Maximum Purchase Price = (ARV × 70%) − Repair Costs. For example, a home with a $300,000 ARV and $50,000 in repairs: max purchase price = ($300,000 × 70%) − $50,000 = $160,000. The remaining 30% covers holding costs, selling costs, and your profit margin. This rule serves as a quick screening tool to ensure deals make financial sense.',
  },
  {
    q: 'How profitable is house flipping in 2026?',
    a: 'With higher interest rates in 2026, hard money loans cost more (10–14% interest plus 2–4 points), which squeezes margins and makes holding time critical. Experienced flippers in strong markets can still achieve 25%+ annualized ROI by focusing on properties well below the 70% rule threshold and completing renovations quickly. Consult a licensed real estate professional familiar with local flip markets for realistic expectations in your area.',
  },
  {
    q: 'What are the biggest costs in a house flip?',
    a: 'The major cost categories in a fix and flip are: (1) Purchase price and buying closing costs (2–3%), (2) Renovation costs — the largest variable, often $20,000–$100,000+, (3) Holding costs: hard money interest (10–14%), property taxes, utilities, and insurance during the renovation period, (4) Selling costs: real estate commissions (4–6%) and seller closing costs (1–2%), (5) Unexpected costs — always budget 10–15% above your renovation estimate for surprises.',
  },
  {
    q: 'What is hard money lending for house flipping?',
    a: 'Hard money loans are short-term loans secured by real estate, primarily used by house flippers. Unlike conventional mortgages, hard money lenders focus on the property\'s value (especially ARV) rather than the borrower\'s income and credit. They charge higher rates (10–15% interest) and upfront points (2–4% of loan amount), but they close fast (days vs. weeks), allow distressed properties, and typically lend 70–80% of ARV. Their higher cost is justified by speed, flexibility, and access to deals banks won\'t finance.',
  },
  {
    q: 'How long does it take to flip a house?',
    a: 'The average house flip takes 4–6 months from purchase to resale: 1–3 months for renovations, 1–2 months on market, 30–45 days to close. Each additional month of holding adds significant cost — hard money at 12% on a $200,000 loan costs $2,000/month in interest alone. Experienced flippers focus intensely on reducing holding time through upfront planning, reliable contractors, and staged marketing (listing before work is complete when possible).',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Fix and Flip Calculator 2026',
      url: 'https://realestatecalculators.app/fix-flip',
      description: 'Free fix and flip calculator with 70% rule, hard money financing, holding costs, and ROI for house flippers in 2026.',
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
      name: 'How to Calculate Fix and Flip Profit',
      description: 'Estimate profit and ROI for a house flipping project.',
      step: [
        { '@type': 'HowToStep', name: 'Enter the After Repair Value (ARV)', text: 'Research comparable sales to estimate what the home will sell for after renovation.' },
        { '@type': 'HowToStep', name: 'Enter purchase price and repair budget', text: 'The price you\'re paying and your total renovation estimate.' },
        { '@type': 'HowToStep', name: 'Select financing type', text: 'Cash, hard money, or conventional loan — each has different holding cost structures.' },
        { '@type': 'HowToStep', name: 'Set holding period', text: 'Estimate total months from purchase to closing the sale.' },
        { '@type': 'HowToStep', name: 'Review profit and ROI', text: 'See gross profit, net profit, ROI, and annualized return.' },
      ],
    },
  ],
}

const trustSignals = ['70% Rule', 'Hard Money', 'Holding Costs', 'Annualized ROI']

export default function FixFlipPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />

      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgrec.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              Fix and Flip Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate house flipping profit, ROI, and annualized returns. Includes 70% rule check and hard money cost analysis.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="5678943210" /></div>
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <FixFlipCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="6789054321" /></div>

          <div className="rounded-2xl bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/40 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-[#166534] dark:text-green-300 mb-2">2026 Fix & Flip Market Context</h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              Higher borrowing costs in 2026 (hard money at 10–14%) compress flip margins compared to the 2020–2022 era. Successful flippers are adapting by being more selective on purchase price (targeting further below the 70% rule), shortening renovation timelines, and targeting markets where ARV growth continues. Deals below 65% of ARV minus repairs remain viable even with current financing costs.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Fix and Flip Profitability: A Complete Framework</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              House flipping requires mastering the math before you make an offer. The most common reason flips fail financially is underestimating costs — particularly renovation surprises, holding time overruns, and selling expenses.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">After Repair Value (ARV): The Foundation</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              ARV is what the property will sell for after all renovations are complete. Accurate ARV estimation requires analyzing comparable recent sales (comps) of similar renovated homes within 0.5 miles and sold within the last 3–6 months. Overestimating ARV is the #1 cause of failed flips — consult a licensed real estate agent for accurate comp analysis in your target market.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">The 70% Rule</h3>
            <p className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mb-3">
              Max Purchase Price = (ARV × 0.70) − Repair Costs
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              This rule ensures enough room for holding costs (5%), selling costs (8%), and profit margin (17%). The 70% threshold can be adjusted based on your cost structure — cash buyers with no financing costs might use 75%, while high-rate hard money borrowers in 2026 may need to use 60–65%.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Holding Costs: The Silent Profit Killer</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Every month your money is tied up in a flip project, it's not earning returns elsewhere. Holding costs typically include hard money interest (12% annual = 1% per month on the loan), property taxes (prorated), utilities, insurance (vacant property coverage costs 2–3× standard homeowner's), and HOA dues if applicable.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Renovation Budget Realism</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              First-time flippers consistently underestimate renovation costs. Add 10–20% contingency to your initial estimate for surprises (hidden water damage, outdated electrical, permit delays). The highest-ROI renovation categories are kitchen (minor remodel), bathrooms, fresh paint, flooring, and curb appeal.
            </p>
          </div>

          <div className="mb-10 rounded-xl border border-[#166534]/20 bg-[#166534]/5 dark:bg-[#166534]/10 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Example: Flip in Charlotte, NC — $285K ARV Property</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Deal Structure:</p>
                <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                  <li>ARV: $285,000</li>
                  <li>70% rule max: $199,500 − $45,000 repairs = $154,500 max</li>
                  <li>Actual purchase price: $148,000 ✓</li>
                  <li>Repair budget: $45,000</li>
                  <li>Hard money loan: $148,000 at 12%, 3 pts</li>
                  <li>Holding period: 5 months</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Cost & Profit:</p>
                <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                  <li>Purchase + buying closing: $151,800</li>
                  <li>Repairs: $45,000</li>
                  <li>Hard money interest (5 mo): $7,400</li>
                  <li>Hard money points (3%): $4,440</li>
                  <li>Utilities + taxes + ins: $2,500</li>
                  <li>Commissions + selling: $19,950</li>
                  <li>Total costs: $231,090</li>
                  <li><strong className="text-[#166534] dark:text-green-300">Net profit: $285,000 − $231,090 = $53,910</strong></li>
                  <li>ROI on $55,240 cash in: 97.6%</li>
                  <li><strong className="text-[#166534] dark:text-green-300">Annualized ROI: ~234%</strong></li>
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
              <strong>Disclaimer:</strong> Fix and flip projections are estimates based on your inputs. Actual renovation costs, ARV, and sale prices vary significantly. House flipping involves substantial financial risk including loss of invested capital. Hard money loan terms vary by lender and are subject to qualification. Real estate markets fluctuate and ARV may be lower than estimated at time of sale. This calculator is for educational purposes only. Consult licensed real estate professionals, contractors, and financial advisors before undertaking any fix and flip project.
            </p>
          </div>

          <div className="pb-6"><AdBanner slot="5687943210" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
