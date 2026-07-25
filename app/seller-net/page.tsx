import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'
import AffiliateCTA from '@/components/AffiliateCTA'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import SellerNetCalculatorWrapper from '@/components/SellerNetCalculatorWrapper'

export const metadata: Metadata = {
  title: 'Seller Net Proceeds Calculator 2026 — How Much Will I Make Selling My Home?',
  description: 'Calculate your net proceeds after selling your home in 2026. Deducts agent commissions, closing costs, mortgage payoff, repairs, and estimates capital gains tax. Free tool.',
  keywords: ['seller net proceeds calculator', 'how much will I make selling my home', 'seller net sheet 2026', 'home sale proceeds', 'capital gains home sale'],
  alternates: { canonical: 'https://realestatecalculators.app/seller-net' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Seller Net Proceeds Calculator 2026 — How Much Will I Make Selling My Home?',
    description: 'Calculate your true net proceeds from selling your home, including capital gains tax analysis.',
    url: 'https://realestatecalculators.app/seller-net',
    type: 'website',
  },
}

const faqItems: FaqItem[] = [
  {
    q: 'How do I calculate my net proceeds from selling my home?',
    a: 'Net proceeds = Sale price − mortgage payoff − real estate commissions − closing costs − repairs/staging costs − transfer taxes. For example: $500,000 sale price − $280,000 mortgage payoff − $25,000 commissions − $5,000 closing costs − $8,000 repairs = $182,000 net proceeds. Capital gains taxes may further reduce your take-home if you don\'t qualify for the exclusion. A licensed real estate agent can prepare an accurate seller net sheet for your specific transaction.',
  },
  {
    q: 'Do I have to pay capital gains tax when I sell my home?',
    a: 'Most homeowners qualify for the capital gains exclusion: $250,000 for single filers and $500,000 for married couples filing jointly. To qualify, you must have owned and lived in the home as your primary residence for at least 2 of the last 5 years. Profits below these thresholds are completely tax-free. Profits above the exclusion are taxed at long-term capital gains rates (0%, 15%, or 20% depending on income). Consult a CPA or tax attorney for guidance specific to your situation.',
  },
  {
    q: 'What is a seller net sheet?',
    a: 'A seller net sheet (or seller\'s estimated proceeds) is a document your real estate agent or title company prepares showing all the costs of selling your home and your estimated net proceeds. It includes your sale price, all deductions (commissions, closing costs, mortgage payoff, taxes), and your estimated check at closing. Our calculator creates an instant digital version of this document.',
  },
  {
    q: 'Can I deduct home improvement costs from capital gains?',
    a: 'Yes. Your cost basis for capital gains purposes is your original purchase price plus the cost of any capital improvements you made while owning the home. Capital improvements are permanent upgrades that add value (new roof, kitchen remodel, addition) — not routine maintenance. Keeping records of all improvements can significantly reduce your taxable gain. A CPA can help you identify which expenses qualify.',
  },
  {
    q: 'What happens if I sell my home and don\'t buy another one?',
    a: 'Unlike pre-1997 rules, current tax law does not require you to "roll over" your gains into a new home. You can take your proceeds, rent, or use the money however you choose. As long as you meet the 2-of-5-year residency test and your profit is within the exclusion limits, you owe no capital gains tax regardless of whether you buy another home.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Seller Net Proceeds Calculator 2026',
      url: 'https://realestatecalculators.app/seller-net',
      description: 'Free seller net proceeds calculator with capital gains analysis for home sellers in 2026.',
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
      name: 'How to Calculate Seller Net Proceeds',
      description: 'Estimate your take-home amount after selling your home.',
      step: [
        { '@type': 'HowToStep', name: 'Enter your expected sale price', text: 'The price you expect to sell your home for.' },
        { '@type': 'HowToStep', name: 'Enter your mortgage payoff balance', text: 'Contact your lender for an exact payoff amount.' },
        { '@type': 'HowToStep', name: 'Set commission percentage', text: 'Typically 4–6% total for buyer and listing agents.' },
        { '@type': 'HowToStep', name: 'Enter repair and staging costs', text: 'Any pre-sale preparation costs reduce your proceeds.' },
        { '@type': 'HowToStep', name: 'Enter your original purchase price', text: 'Used to calculate capital gains and tax liability.' },
        { '@type': 'HowToStep', name: 'Review net proceeds and capital gains', text: 'See your estimated check at closing and tax implications.' },
      ],
    },
  ],
}

const trustSignals = ['Net Proceeds', 'Capital Gains', 'Commission', 'Mortgage Payoff']

export default function SellerNetPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />

      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgrec.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              Seller Net Proceeds Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              How much will you actually make selling your home? Get your net sheet instantly — commissions, payoff, closing costs, and capital gains.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="9012345678" /></div>
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <SellerNetCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="0123456789" /></div>

          <div className="rounded-2xl bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/40 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-[#166534] dark:text-green-300 mb-2">2026 Home Sale Context</h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              With home prices elevated in most markets, seller proceeds are often larger in dollar terms in 2026 — but so are the costs. Real estate commissions (typically 4–6% total) remain the biggest deduction, followed by mortgage payoff. Most sellers with 2+ years of primary residence occupancy qualify for the capital gains exclusion ($250K single / $500K married) and owe no federal capital gains tax on their profit.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Understanding Your Home Sale Proceeds</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Many sellers are surprised to discover how much of their sale price doesn't make it to their bank account. Understanding all the deductions ahead of time helps you set realistic expectations and plan your next move.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">The Biggest Deduction: Agent Commissions</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Real estate commissions are typically the largest single cost of selling a home, historically 5–6% of the sale price. On a $500,000 home, that's $25,000–$30,000. Following the 2024 NAR settlement, buyer's agent compensation is no longer mandated to be offered through the MLS — sellers have more flexibility to negotiate, and some sellers are successfully reducing total commission to 3–4% by working with fee-conscious agents.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Mortgage Payoff</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Your mortgage payoff amount is the total amount needed to completely pay off your loan as of your closing date. It's slightly more than your current balance because interest accrues daily. Contact your lender for an official payoff quote — it's typically valid for 30 days. If you have a home equity line of credit (HELOC), that must also be paid off at closing.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Capital Gains Tax — the Hidden Cost</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              If your profit exceeds the IRS exclusion ($250,000 single / $500,000 married), the excess is taxed as long-term capital gains. In 2026, the long-term capital gains rates are 0% (for incomes below ~$47,000 single / ~$94,000 married), 15% (most taxpayers), or 20% (high earners). High-income earners also face a 3.8% Net Investment Income Tax (NIIT).
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Your taxable gain is reduced by your adjusted basis: original purchase price + capital improvements + buying closing costs + selling closing costs. Good recordkeeping can save tens of thousands in capital gains taxes. Consult a CPA for guidance specific to your situation.
            </p>
          </div>

          <div className="mb-10 rounded-xl border border-[#166534]/20 bg-[#166534]/5 dark:bg-[#166534]/10 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Example: Selling a $580,000 Home in Florida</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Seller&apos;s Deductions:</p>
                <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                  <li>Sale price: $580,000</li>
                  <li>Mortgage payoff balance: $210,000</li>
                  <li>Commission: 5% = $29,000</li>
                  <li>Closing costs: $4,500</li>
                  <li>Repairs + staging: $7,500</li>
                  <li>HOA transfer fee: $500</li>
                  <li><strong className="text-gray-800 dark:text-gray-200">Total deductions: $251,500</strong></li>
                  <li><strong className="text-[#166534] dark:text-green-300">Net proceeds: $328,500</strong></li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Capital Gains (Married Filing Jointly):</p>
                <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                  <li>Original purchase price: $295,000</li>
                  <li>Capital improvements: $35,000</li>
                  <li>Adjusted basis: $330,000</li>
                  <li>Gain: $580,000 − $330,000 = $250,000</li>
                  <li>MFJ exclusion: $500,000</li>
                  <li><strong className="text-[#166534] dark:text-green-300">Taxable gain: $0 (fully excluded)</strong></li>
                  <li className="mt-2">Net proceeds are completely tax-free!</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">Consult a licensed real estate agent for a personalized seller net sheet and a CPA for capital gains tax advice.</p>
          </div>

          <AffiliateCTA variant="seller" />

          <div className="pb-10">
            <FAQ questions={faqItems} />
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-800 p-4 mb-6">
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              <strong>Disclaimer:</strong> Seller net proceeds estimates are for planning purposes only. Actual proceeds depend on final negotiated sale price, exact mortgage payoff amount, actual closing costs, and your specific tax situation. Capital gains tax calculations are simplified estimates. Tax law is complex and individual circumstances vary significantly. Consult a CPA or tax attorney for capital gains advice, and a licensed real estate agent for an accurate seller net sheet specific to your transaction.
            </p>
          </div>

          <div className="pb-6"><AdBanner slot="0123489678" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
