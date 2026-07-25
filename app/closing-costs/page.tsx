import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'
import AffiliateCTA from '@/components/AffiliateCTA'
import FAQ from '@/components/FAQ'

const ClosingCostsCalculatorWrapper = dynamic(
  () => import('@/components/ClosingCostsCalculatorWrapper'),
  { ssr: false }
)

export const metadata: Metadata = {
  title: 'Closing Costs Calculator 2026 — Buyer & Seller Fees by State',
  description: 'Calculate closing costs for buyers and sellers in 2026. Includes transfer taxes, title insurance, origination fees, and all other closing fees by state. Free and instant.',
  keywords: ['closing costs calculator', 'closing costs 2026', 'buyer closing costs', 'seller closing costs', 'closing fees by state'],
  alternates: { canonical: 'https://realestatecalculators.app/closing-costs' },
  openGraph: {
    title: 'Closing Costs Calculator 2026 — Buyer & Seller Fees by State',
    description: 'Calculate all closing costs for buyers and sellers. State-specific transfer taxes, title fees, and more.',
    url: 'https://realestatecalculators.app/closing-costs',
    type: 'website',
  },
}

const faqItems = [
  {
    q: 'How much are typical closing costs for buyers in 2026?',
    a: 'Buyers typically pay 2–5% of the loan amount in closing costs. On a $400,000 home with a $360,000 mortgage, expect $7,200–$18,000 in closing costs. These include loan origination fees (0.5–1%), appraisal ($500–$900), title insurance, prepaid interest, escrow setup, and recording fees. Closing costs are higher in attorney states and states with high transfer taxes.'
  },
  {
    q: 'How much are typical closing costs for sellers in 2026?',
    a: 'Sellers typically pay 6–10% of the sale price, with real estate agent commissions (typically 4–6% total) being the largest expense. Other seller costs include title insurance, transfer taxes, recording fees, and attorney fees in some states. On a $400,000 home, a seller might pay $24,000–$40,000 in total closing costs and commissions.'
  },
  {
    q: 'Can you negotiate closing costs?',
    a: 'Yes, several closing costs are negotiable. You can shop for lower title insurance rates, negotiate lender origination fees (often by accepting a slightly higher rate), and ask the seller to pay some of your closing costs (seller concessions). Seller concessions are most common in buyer\'s markets. Lenders are required to provide a Loan Estimate within 3 business days of your application so you can compare costs.'
  },
  {
    q: 'What states have the highest transfer taxes?',
    a: 'States with the highest real estate transfer taxes include: Pennsylvania (2% combined state/local), Delaware (4% combined), New York (1.4%+ with mansion tax on luxury properties), Washington DC (2.2%), and Connecticut (1.25%+). Florida, Texas, and several other states have no state-level transfer taxes. Transfer taxes can be a significant cost — on a $500,000 home in PA, that\'s $10,000 in transfer taxes alone.'
  },
  {
    q: 'What is an attorney state for real estate closings?',
    a: 'In about 20 states (including New York, Massachusetts, Georgia, South Carolina, and others), real estate closings must be conducted by a licensed attorney rather than a title company. Attorney closing fees typically run $500–$1,500 per transaction. If you\'re buying or selling in an attorney state, budget for this additional cost.'
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Closing Costs Calculator',
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

export default function ClosingCostsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO */}
      <div className="relative min-h-[280px] flex flex-col" style={{ background: 'linear-gradient(135deg, #0a2e1a 0%, #166534 60%, #15803d 100%)' }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col flex-1">
          <ToolHeader />
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4 pb-10 pt-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 max-w-3xl">
              Closing Costs Calculator 2026
            </h1>
            <p className="text-green-100 text-lg max-w-xl mb-4">
              Buyer and seller closing fees, itemized by state. Know your real costs before you close.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['All 50 States', 'Buyer + Seller', 'Transfer Taxes', 'FHA & VA'].map(t => (
                <span key={t} className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 -mt-6 pb-16">
        <AdBanner slot="7890123456" />

        {/* CALCULATOR CARD */}
        <div className="bg-white/90 dark:bg-[#1e293b]/90 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 mb-8">
          <ClosingCostsCalculatorWrapper />
        </div>

        <AffiliateCTA variant="seller" />

        {/* HOW IT WORKS */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-[#e2e8f0] mb-4">What Are Closing Costs and Who Pays Them?</h2>
          <div className="prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              Closing costs are fees paid at the final stage of a real estate transaction — the "closing" — when ownership legally transfers from seller to buyer. Both parties typically pay closing costs, though the amounts and specific fees differ significantly.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Buyer Closing Costs (2–5% of Loan Amount)</h3>
            <p>
              Buyers face a mix of lender fees, third-party fees, and prepaid items:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Loan origination fee</strong> (0.5–1%): The lender's charge for processing your mortgage. Negotiable, especially if you accept a slightly higher rate.</li>
              <li><strong>Appraisal fee</strong> ($500–$900): Required by lenders to verify property value. FHA and VA have specific appraisal requirements.</li>
              <li><strong>Home inspection</strong> ($350–$600): Technically optional but strongly recommended. Not always included in closing costs.</li>
              <li><strong>Title insurance — lender's policy</strong> (0.5–1% of loan): Protects the lender from title defects. Required by all mortgage lenders.</li>
              <li><strong>Title insurance — owner's policy</strong> (optional but recommended): Protects you from pre-existing title claims. One-time premium.</li>
              <li><strong>Prepaid interest</strong>: Interest from closing date to end of month. Closing late in the month reduces this cost.</li>
              <li><strong>Escrow setup / impounds</strong>: 2–3 months of property taxes and insurance deposited into your escrow account.</li>
              <li><strong>Recording fees</strong> ($50–$500): County charges to record the new deed and mortgage.</li>
              <li><strong>Transfer taxes</strong>: Vary by state and sometimes municipality. Buyer pays in some states, seller in others, both in some.</li>
            </ul>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Seller Closing Costs (6–10% of Sale Price)</h3>
            <p>
              Sellers typically pay the largest single closing cost — the real estate commission — plus several other fees:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Real estate commissions</strong> (typically 4–6% total): Traditionally split between listing and buyer's agents. Post-2024 NAR settlement changes have made buyer's agent compensation more negotiable.</li>
              <li><strong>Owner's title insurance</strong>: Sellers often pay for the owner's policy as a standard in many states.</li>
              <li><strong>Transfer taxes</strong>: In most states, sellers pay at least a portion of transfer taxes.</li>
              <li><strong>Attorney fees</strong> (attorney states only): $500–$1,500 in states where attorneys handle closings.</li>
              <li><strong>Recording fees</strong>: Fees to record the satisfaction of the existing mortgage.</li>
            </ul>
          </div>
        </section>

        {/* WORKED EXAMPLE */}
        <section className="mb-10 rounded-xl border border-[#166534]/20 bg-[#166534]/5 dark:bg-[#166534]/10 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-[#e2e8f0] mb-4">Worked Example: $450,000 Home Sale in Georgia (Attorney State)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Buyer Closing Costs:</p>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>Loan origination (0.75%): $3,038</li>
                <li>Appraisal: $650</li>
                <li>Home inspection: $450</li>
                <li>Lender title insurance: $1,800</li>
                <li>Owner's title insurance: $1,200</li>
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
        </section>

        <AdBanner slot="8901234567" />

        <FAQ questions={faqItems} />

        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-800 p-4">
          <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
            <strong>Disclaimer:</strong> Closing cost estimates are based on typical industry rates and may not reflect your specific transaction. Actual costs vary by lender, title company, county, and negotiation. Transfer tax rates and attorney requirements reflect general state law but local rules may vary. Always review your Loan Estimate and Closing Disclosure carefully. Consult a real estate attorney and licensed lender for guidance specific to your transaction.
          </p>
        </div>
      </main>

      <Footer />
    </>
  )
}
