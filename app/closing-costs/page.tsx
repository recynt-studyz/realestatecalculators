import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'
import AffiliateCTA from '@/components/AffiliateCTA'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import ClosingCostsCalculatorWrapper from '@/components/ClosingCostsCalculatorWrapper'
import { STATE_LIST } from '@/lib/stateData'

export const metadata: Metadata = {
  title: 'Closing Costs Calculator 2026 — Buyer & Seller Fees by State',
  description: 'Calculate closing costs for buyers and sellers in 2026. Includes transfer taxes, title insurance, origination fees, and all other closing fees by state. Free and instant.',
  keywords: ['closing costs calculator', 'closing costs 2026', 'buyer closing costs', 'seller closing costs', 'closing fees by state'],
  alternates: { canonical: 'https://realestatecalculators.app/closing-costs' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Closing Costs Calculator 2026 — Buyer & Seller Fees by State',
    description: 'Calculate all closing costs for buyers and sellers. State-specific transfer taxes, title fees, and more.',
    url: 'https://realestatecalculators.app/closing-costs',
    type: 'website',
  },
}

const faqItems: FaqItem[] = [
  {
    q: 'How much are typical closing costs for buyers in 2026?',
    a: 'Buyers typically pay 2–5% of the loan amount in closing costs. On a $400,000 home with a $360,000 mortgage, expect $7,200–$18,000 in closing costs. These include loan origination fees (0.5–1%), appraisal ($500–$900), title insurance, prepaid interest, escrow setup, and recording fees. Closing costs are higher in attorney states and states with high transfer taxes. Consult a licensed real estate agent and mortgage lender for an accurate cost estimate.',
  },
  {
    q: 'How much are typical closing costs for sellers in 2026?',
    a: 'Sellers typically pay 6–10% of the sale price, with real estate agent commissions (typically 4–6% total) being the largest expense. Other seller costs include title insurance, transfer taxes, recording fees, and attorney fees in some states. On a $400,000 home, a seller might pay $24,000–$40,000 in total closing costs and commissions. A licensed real estate agent can prepare an accurate seller net sheet for your specific transaction.',
  },
  {
    q: 'Can you negotiate closing costs?',
    a: 'Yes, several closing costs are negotiable. You can shop for lower title insurance rates, negotiate lender origination fees (often by accepting a slightly higher rate), and ask the seller to pay some of your closing costs (seller concessions). Seller concessions are most common in buyer\'s markets. Lenders are required to provide a Loan Estimate within 3 business days of your application so you can compare costs.',
  },
  {
    q: 'What states have the highest transfer taxes?',
    a: 'States with the highest real estate transfer taxes include: Pennsylvania (2% combined state/local), Delaware (4% combined), New York (1.4%+ with mansion tax on luxury properties), Washington DC (2.2%), and Connecticut (1.25%+). Florida, Texas, and several other states have no state-level transfer taxes. Transfer taxes can be a significant cost — on a $500,000 home in PA, that\'s $10,000 in transfer taxes alone.',
  },
  {
    q: 'What is an attorney state for real estate closings?',
    a: 'In about 20 states (including New York, Massachusetts, Georgia, South Carolina, and others), real estate closings must be conducted by a licensed attorney rather than a title company. Attorney closing fees typically run $500–$1,500 per transaction. If you\'re buying or selling in an attorney state, budget for this additional cost. A licensed real estate agent familiar with your market can recommend qualified closing attorneys.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Closing Costs Calculator 2026',
      url: 'https://realestatecalculators.app/closing-costs',
      description: 'Free closing costs calculator for buyers and sellers with state-specific transfer taxes and 2026 fee schedules.',
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
      name: 'How to Calculate Closing Costs',
      description: 'Estimate buyer and seller closing costs for a real estate transaction.',
      step: [
        { '@type': 'HowToStep', name: 'Select transaction type', text: 'Choose whether you are buying, selling, or doing both.' },
        { '@type': 'HowToStep', name: 'Enter purchase price and loan amount', text: 'The sale price and your financing amount.' },
        { '@type': 'HowToStep', name: 'Select your state', text: 'State determines transfer tax rates and whether attorney fees apply.' },
        { '@type': 'HowToStep', name: 'Choose loan type', text: 'Conventional, FHA, VA, or cash — each has different fee structures.' },
        { '@type': 'HowToStep', name: 'Review itemized costs', text: 'See all buyer and seller fees broken down by category.' },
      ],
    },
  ],
}

const trustSignals = ['All 50 States', 'Buyer + Seller', 'Transfer Taxes', 'FHA & VA']

export default function ClosingCostsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />

      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgrec.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              Closing Costs Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Buyer and seller closing fees, itemized by state. Know your real costs before you close.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="7890123456" /></div>
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <ClosingCostsCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="8901234567" /></div>

          <div className="rounded-2xl bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/40 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-[#166534] dark:text-green-300 mb-2">2026 Closing Cost Context</h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              With home prices elevated in most markets, closing costs are higher in absolute terms in 2026. Buyers typically pay 2–5% of the loan amount; sellers typically pay 6–10% of the sale price (including commissions). State transfer taxes, attorney requirements, and title insurance practices vary significantly — our calculator applies state-specific rules for all 50 states.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What Are Closing Costs and Who Pays Them?</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Closing costs are fees paid at the final stage of a real estate transaction — the "closing" — when ownership legally transfers from seller to buyer. Both parties typically pay closing costs, though the amounts and specific fees differ significantly. Understanding your full cost picture is essential before entering any real estate transaction.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Buyer Closing Costs (2–5% of Loan Amount)</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Buyers face a mix of lender fees, third-party fees, and prepaid items. The most significant costs are:
            </p>
            <div className="space-y-2 mb-4">
              {[
                ['Loan origination fee (0.5–1%)', 'The lender\'s charge for processing your mortgage. Negotiable, especially if you accept a slightly higher rate.'],
                ['Appraisal fee ($500–$900)', 'Required by lenders to verify property value. FHA and VA have specific appraisal requirements.'],
                ['Title insurance — lender\'s policy (0.5–1% of loan)', 'Protects the lender from title defects. Required by all mortgage lenders.'],
                ['Title insurance — owner\'s policy (optional but recommended)', 'Protects you from pre-existing title claims. One-time premium.'],
                ['Prepaid interest', 'Interest from closing date to end of month. Closing late in the month reduces this cost.'],
                ['Escrow setup / impounds', '2–3 months of property taxes and insurance deposited into your escrow account.'],
                ['Transfer taxes', 'Vary by state and sometimes municipality. Buyer pays in some states, seller in others, both in some.'],
              ].map(([title, desc]) => (
                <div key={title} className="border-l-4 border-[#166534] pl-4">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
                </div>
              ))}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Seller Closing Costs (6–10% of Sale Price)</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Sellers typically pay the largest single closing cost — the real estate commission — plus several other fees. Post-2024 NAR settlement changes have made buyer's agent compensation more negotiable, giving sellers more flexibility in some markets.
            </p>
          </div>

          <div className="mb-10 rounded-xl border border-[#166534]/20 bg-[#166534]/5 dark:bg-[#166534]/10 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: $450,000 Home Sale in Georgia (Attorney State)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Buyer Closing Costs:</p>
                <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                  <li>Loan origination (0.75%): $3,038</li>
                  <li>Appraisal: $650</li>
                  <li>Home inspection: $450</li>
                  <li>Lender title insurance: $1,800</li>
                  <li>Owner&apos;s title insurance: $1,200</li>
                  <li>Prepaid interest (15 days): $1,266</li>
                  <li>Escrow setup (3 months): $2,100</li>
                  <li>Attorney fee: $900</li>
                  <li>Recording fees: $150</li>
                  <li><strong className="text-[#166534] dark:text-green-300">Total buyer costs: ~$11,554 (2.6%)</strong></li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Seller Closing Costs:</p>
                <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                  <li>Real estate commissions (5%): $22,500</li>
                  <li>GA transfer tax (0.1%): $450</li>
                  <li>Attorney fee: $900</li>
                  <li>Title search: $300</li>
                  <li>Recording release of mortgage: $50</li>
                  <li><strong className="text-[#166534] dark:text-green-300">Total seller costs: ~$24,200 (5.4%)</strong></li>
                  <li className="mt-2">Net proceeds depend on mortgage payoff balance</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">Consult a licensed real estate agent for an accurate seller net sheet specific to your transaction and market.</p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Closing Costs by State</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
              Select your state for a detailed breakdown of transfer taxes, attorney requirements, title insurance practices, and typical closing cost ranges.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {STATE_LIST.map(state => (
                <a
                  key={state.abbr}
                  href={`/${state.slug}-closing-costs`}
                  className="text-center text-sm px-2 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e293b] text-[#166534] dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-950/20 transition-colors font-medium"
                >
                  {state.name}
                </a>
              ))}
            </div>
          </div>

          <AffiliateCTA variant="seller" />

          <div className="pb-10">
            <FAQ questions={faqItems} />
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-800 p-4 mb-6">
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              <strong>Disclaimer:</strong> Closing cost estimates are based on typical industry rates and may not reflect your specific transaction. Actual costs vary by lender, title company, county, and negotiation. Transfer tax rates and attorney requirements reflect general state law but local rules may vary. Always review your Loan Estimate and Closing Disclosure carefully. Consult a licensed real estate agent and real estate attorney before making major real estate decisions.
            </p>
          </div>

          <div className="pb-6"><AdBanner slot="9012345678" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
