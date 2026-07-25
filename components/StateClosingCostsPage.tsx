import type { Metadata } from 'next'
import ToolHeader from './ToolHeader'
import ClosingCostsCalculatorWrapper from './ClosingCostsCalculatorWrapper'
import AdBanner from './AdBanner'
import FAQ from './FAQ'
import type { FaqItem } from './FAQ'
import Footer from './Footer'
import AffiliateCTA from './AffiliateCTA'
import { STATES } from '@/lib/stateData'

const trustSignals = ['2026 Updated', 'Instant', 'Private', 'Free']

export function generateStateClosingCostsMetadata(stateAbbr: string): Metadata {
  const s = STATES[stateAbbr]
  if (!s) return {}
  const noTax = !s.hasTransferTax
  return {
    title: `${s.name} Closing Costs 2026 — Buyer & Seller Cost Calculator`,
    description: `Calculate closing costs for ${s.name} real estate transactions in 2026. ${noTax ? `${s.name} has no transfer tax` : `${s.name} transfer tax: ${s.transferTaxRate}%`} — see all buyer and seller fees including title insurance and lender costs.`,
    alternates: { canonical: `https://realestatecalculators.app/${s.slug}-closing-costs` },
    robots: { index: true, follow: true },
  }
}

export default function StateClosingCostsPage({ stateAbbr }: { stateAbbr: string }) {
  const s = STATES[stateAbbr]
  if (!s) return null

  const fmt = (v: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

  const examplePrice = s.medianHomeValue
  const exampleLoan  = examplePrice * 0.80
  const transferTax  = examplePrice * s.transferTaxRate / 100
  const commission   = examplePrice * 0.055
  const buyerEstLow  = examplePrice * 0.02
  const buyerEstHigh = examplePrice * 0.05
  const sellerEstLow = examplePrice * 0.06
  const sellerEstHigh= examplePrice * 0.10

  const faqs: FaqItem[] = [
    {
      q: `How much are closing costs in ${s.name}?`,
      a: `Closing costs in ${s.name} typically range from 2–5% of the purchase price for buyers and 6–10% for sellers. On the ${s.name} median home price of ${fmt(examplePrice)}, buyers can expect to pay roughly ${fmt(buyerEstLow)}–${fmt(buyerEstHigh)} in closing costs. Seller closing costs — dominated by the agent commission — run ${fmt(sellerEstLow)}–${fmt(sellerEstHigh)}. ${s.hasTransferTax ? `${s.name} charges a transfer tax of ${s.transferTaxRate}%, adding ${fmt(transferTax)} to a ${fmt(examplePrice)} transaction.` : `${s.name} has no state transfer tax, which keeps closing costs lower than many states.`}`,
    },
    {
      q: `Does ${s.name} have a transfer tax?`,
      a: s.hasTransferTax
        ? `Yes, ${s.name} charges a real estate transfer tax of ${s.transferTaxRate}% of the sale price. On a ${fmt(examplePrice)} home, this equals ${fmt(transferTax)}. The transfer tax is typically paid by the ${s.titlePayer === 'seller' ? 'seller' : 'buyer'}, though this can be negotiated. Some local jurisdictions in ${s.name} may add additional transfer taxes on top of the state rate.`
        : `No, ${s.name} does not have a state real estate transfer tax, which is one reason closing costs in ${s.name} are typically lower than in states like Delaware (1.5%) or Vermont (1.25%). However, some cities and counties in ${s.name} may charge local transfer fees — always verify with your title company or real estate attorney.`,
    },
    {
      q: `Is an attorney required at closing in ${s.name}?`,
      a: s.isAttorneyState
        ? `Yes, ${s.name} is an attorney state — a licensed real estate attorney must be present at or handle the closing. Attorney fees in ${s.name} typically range from $500–$1,500 depending on the complexity of the transaction and the attorney's rate. This is a required cost that buyers and sellers in ${s.name} must budget for, unlike title company states where a licensed title professional can conduct the closing without an attorney.`
        : `${s.name} is a title state, meaning a licensed title company can conduct the closing without an attorney present (though you can always hire one for additional review). Title company closings in ${s.name} are generally less expensive than attorney closings. Many buyers and sellers in ${s.name} choose to hire a real estate attorney for review on complex transactions even though it is not required.`,
    },
    {
      q: `Who pays title insurance in ${s.name}?`,
      a: `In ${s.name}, the ${s.titlePayer === 'seller' ? 'seller' : s.titlePayer === 'split' ? 'buyer and seller split' : 'buyer'} traditionally pays for the owner's title insurance policy. However, this is negotiable in most ${s.name} real estate transactions — particularly in a buyer's market. The lender's title insurance policy is almost always paid by the buyer. Owner's title insurance protects the buyer from defects in the title not discovered before closing, while lender's title insurance protects only the lender.`,
    },
    {
      q: `Can I negotiate closing costs in ${s.name}?`,
      a: `Yes, many closing costs in ${s.name} are negotiable or can be reduced. Lender fees (origination, processing) vary between lenders — shopping multiple lenders can save $1,000–$3,000. In a buyer's market, you can ask the seller to pay a portion of buyer closing costs as a seller concession — typically up to 3% of the purchase price on conventional loans. Agent commissions are also negotiable. Some costs — like ${s.name} ${s.hasTransferTax ? 'transfer taxes, ' : ''}government recording fees, and third-party services — are fixed. Using the calculator above helps you identify which costs are estimates vs. fixed charges.`,
    },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `${s.name} Closing Costs Calculator 2026`,
    url: `https://realestatecalculators.app/${s.slug}-closing-costs`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Calculate ${s.name} Closing Costs`,
    step: [
      { '@type': 'HowToStep', name: 'Enter transaction details', text: `Select whether you are buying, selling, or both. Enter the sale price and loan amount for your ${s.name} real estate transaction.` },
      { '@type': 'HowToStep', name: 'Select your state', text: `${s.name} is pre-selected. The calculator automatically applies the ${s.name} transfer tax rate of ${s.transferTaxRate}% and ${s.isAttorneyState ? 'attorney requirement' : 'title company closing'} customs.` },
      { '@type': 'HowToStep', name: 'Review your closing cost estimate', text: `See itemized buyer and seller closing costs for ${s.name}, including all lender fees, title insurance, transfer taxes, and agent commissions.` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema).replace(/</g, '\\u003c') }} />

      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgrec.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              {s.name} Closing Costs Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Estimate buyer and seller closing costs for {s.name} real estate transactions.{' '}
              {s.hasTransferTax ? `${s.transferTaxRate}% transfer tax.` : 'No state transfer tax.'}{' '}
              {s.isAttorneyState ? 'Attorney state.' : 'Title company closings.'}
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1111111111" /></div>
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
          <div className="pb-4"><AdBanner slot="2222222222" /></div>

          <div className="rounded-2xl bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/40 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-[#166534] dark:text-green-300 mb-2">
              {s.name} Closing Cost Overview
            </h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              {s.hasTransferTax
                ? `${s.name} charges a ${s.transferTaxRate}% real estate transfer tax, adding ${fmt(transferTax)} to a ${fmt(examplePrice)} transaction.`
                : `${s.name} has no state real estate transfer tax, which keeps closing costs lower than many states.`}{' '}
              {s.isAttorneyState
                ? `Attorney presence is required at closing in ${s.name}, adding $500–$1,500 to closing costs.`
                : `${s.name} allows title company closings without an attorney.`}{' '}
              Total buyer closing costs in ${s.name} typically run ${fmt(buyerEstLow)}–${fmt(buyerEstHigh)} on a ${fmt(examplePrice)} purchase.
            </p>
          </div>

          <div className="mb-4 text-center">
            <a href="/closing-costs" className="text-sm text-[#166534] dark:text-green-400 hover:underline">
              ← Back to Closing Costs Calculator
            </a>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              How Closing Costs Work in {s.name}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Closing costs in {s.name} are fees paid at the end of a real estate transaction when property ownership transfers from seller to buyer. These costs are separate from the down payment and are divided between buyer costs (primarily lender fees and title costs) and seller costs (primarily agent commissions and transfer taxes). Understanding these costs before entering a transaction allows both buyers and sellers to accurately budget and negotiate.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {s.isAttorneyState
                ? `In ${s.name}, a licensed real estate attorney must oversee the closing process. The attorney reviews all closing documents, ensures the title is clear, handles the disbursement of funds, and records the deed with the county. Attorney fees in ${s.name} typically range from $500 to $1,500 for a standard residential transaction.`
                : `In ${s.name}, a licensed title company handles the closing process. Title companies examine the title history, issue title insurance policies, prepare closing documents, and disburse funds to all parties. Using a reputable title company with competitive rates can meaningfully reduce your total closing costs.`}
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The largest single cost for most sellers is the real estate agent commission, which averages 5–6% of the sale price and accounts for both the listing agent and buyer&apos;s agent fees. On a {fmt(examplePrice)} home in {s.name}, this equals approximately {fmt(commission)}. Buyers can reduce lender fees by shopping multiple mortgage lenders before choosing one — origination fees and points can vary by hundreds or thousands of dollars between lenders for the same loan amount.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Worked Example: Buying a {fmt(examplePrice)} Home in {s.name}
            </h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Marcus and Diana are buying a {fmt(examplePrice)} home in {s.name} with a {fmt(exampleLoan)} conventional loan (20% down). Here are their estimated buyer closing costs:
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Loan origination (1%):          {fmt(exampleLoan * 0.01)}</div>
                <div>Appraisal:                                  $500</div>
                <div>Home inspection:                            $400</div>
                <div>Lender&apos;s title insurance (0.5%): {fmt(exampleLoan * 0.005)}</div>
                <div>Owner&apos;s title insurance (0.6%):  {fmt(examplePrice * 0.006)}</div>
                <div>Prepaid interest (15 days):    {fmt(exampleLoan * 0.0675 / 365 * 15)}</div>
                <div>Property tax escrow (2 mo):    {fmt(examplePrice * 0.01 / 6)}</div>
                <div>Insurance escrow (2 mo):                   $300</div>
                <div>Recording fees:                             $150</div>
                {s.hasTransferTax && <div>Transfer tax ({s.transferTaxRate}%):          {fmt(transferTax)}</div>}
                {s.isAttorneyState && <div>Attorney fees:                              $800</div>}
                <div className="font-bold pt-1 border-t border-gray-200 dark:border-gray-600">
                  TOTAL BUYER CLOSING:    {fmt(exampleLoan * 0.01 + 500 + 400 + exampleLoan * 0.005 + examplePrice * 0.006 + exampleLoan * 0.0675 / 365 * 15 + examplePrice * 0.01 / 6 + 300 + 150 + (s.hasTransferTax ? transferTax : 0) + (s.isAttorneyState ? 800 : 0))}
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Their total out-of-pocket at closing will be their down payment of {fmt(examplePrice * 0.20)} plus closing costs — total of approximately {fmt(examplePrice * 0.20 + exampleLoan * 0.01 + 500 + 400 + exampleLoan * 0.005 + examplePrice * 0.006 + 300 + 150 + (s.hasTransferTax ? transferTax : 0) + (s.isAttorneyState ? 800 : 0) + examplePrice * 0.01 / 6 + exampleLoan * 0.0675 / 365 * 15)}.
              </p>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect {s.name} Closing Costs</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Loan Type and Lender Fees</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">FHA loans include an upfront mortgage insurance premium (1.75% of the loan amount) not present in conventional loans, adding significantly to buyer closing costs. VA loans waive origination fees but charge a VA funding fee. Conventional loans typically have the most flexibility on lender fees. Shopping multiple lenders and negotiating origination fees can save $1,000–$3,000 on a typical {s.name} purchase.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">{s.name} Transfer Tax and Recording Fees</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {s.hasTransferTax
                    ? `${s.name} imposes a ${s.transferTaxRate}% transfer tax on real estate sales. On a ${fmt(examplePrice)} home, this is ${fmt(transferTax)}. Transfer taxes are generally not negotiable but are sometimes split between buyer and seller. Some ${s.name} counties or municipalities may impose additional local transfer taxes.`
                    : `${s.name} has no state transfer tax, which makes it less expensive for buyers and sellers compared to states like New Jersey (1.0%), Pennsylvania (1.0%), or Vermont (1.25%). County recording fees in ${s.name} are typically modest, ranging from $50–$300.`}
                </p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Title Insurance Customs in {s.name}</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">In {s.name}, the {s.titlePayer === 'seller' ? 'seller' : s.titlePayer === 'split' ? 'buyer and seller split the cost of' : 'buyer'} typically pays the owner&apos;s title insurance premium. Title insurance rates are regulated in most states, so the cost is similar between title companies — but shopping rates can still reveal some savings. The lender&apos;s title insurance is always paid by the buyer when financing is involved.</p>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <AffiliateCTA variant="seller" />
          </div>

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="pb-6"><AdBanner slot="3333333333" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
