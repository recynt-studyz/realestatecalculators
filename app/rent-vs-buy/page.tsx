import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'
import AffiliateCTA from '@/components/AffiliateCTA'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import RentVsBuyCalculatorWrapper from '@/components/RentVsBuyCalculatorWrapper'

export const metadata: Metadata = {
  title: 'Rent vs Buy Calculator 2026 — Is It Better to Rent or Buy a Home?',
  description: 'Compare the true cost of renting vs buying in 2026. Includes appreciation, opportunity cost, tax benefits, and break-even year analysis. Free rent vs buy tool.',
  keywords: ['rent vs buy calculator', 'renting vs buying 2026', 'should I rent or buy', 'break-even calculator', 'rent or buy analysis'],
  alternates: { canonical: 'https://realestatecalculators.app/rent-vs-buy' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Rent vs Buy Calculator 2026 — Is It Better to Rent or Buy a Home?',
    description: 'True cost comparison of renting vs buying with break-even year, opportunity cost, and home appreciation.',
    url: 'https://realestatecalculators.app/rent-vs-buy',
    type: 'website',
  },
}

const faqs: FaqItem[] = [
  {
    q: 'Is it better to rent or buy a home in 2026?',
    a: 'The answer depends on how long you plan to stay, local price-to-rent ratios, and your finances. With mortgage rates around 6.75%, buying often requires staying 4–7 years to break even versus renting, depending on the market. In expensive coastal cities the break-even can exceed 8 years. In affordable Midwest markets buyers may break even in 2–3 years. Consult a licensed real estate agent for guidance on your specific market.',
  },
  {
    q: 'How is the rent vs buy break-even year calculated?',
    a: 'The break-even year is when cumulative net costs of buying fall below cumulative net costs of renting. Buying costs include mortgage interest, property taxes, insurance, maintenance (1% of home value annually), closing costs, and opportunity cost of the down payment. Renting costs include rent payments plus renters insurance, minus the investment return on the down payment. After the break-even point, buying typically becomes financially advantageous as equity builds and rent rises.',
  },
  {
    q: 'What is the price-to-rent ratio and what does it tell me?',
    a: 'The price-to-rent ratio is the home price divided by annual rent for a comparable property. A ratio below 15 generally favors buying; 15–20 is neutral; above 20 typically favors renting. For example, a $400,000 home with $2,000/month rent has a P/R ratio of 16.7, which is borderline. With 2026 mortgage rates at 6.75%, markets with P/R ratios above 18 are challenging to make work financially without significant appreciation expectations.',
  },
  {
    q: 'Does the mortgage interest deduction make buying cheaper?',
    a: 'The mortgage interest deduction can reduce your tax bill, but most homeowners no longer benefit from it since the 2018 Tax Cuts and Jobs Act raised the standard deduction to $29,200 for married couples (2026). You only benefit from itemizing if your total deductions exceed this threshold. Borrowers with large mortgages in high-tax states are most likely to benefit. The deduction reduces the effective cost of mortgage interest but rarely flips the rent vs buy calculation on its own.',
  },
  {
    q: 'What annual home appreciation rate should I assume in 2026?',
    a: 'The long-term national average for home appreciation is approximately 3–4% per year. However, real estate is highly local — some markets have averaged 6–8% annually while others have seen flat or negative appreciation. Our calculator defaults to 3.5%, which is conservative but historically reasonable. Avoid assuming recent above-average appreciation will continue indefinitely. A licensed real estate agent with local market expertise can provide more accurate appreciation estimates for your area.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Rent vs Buy Calculator 2026',
      url: 'https://realestatecalculators.app/rent-vs-buy',
      description: 'Free rent vs buy calculator with break-even analysis, opportunity cost, and appreciation for 2026.',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    },
    {
      '@type': 'HowTo',
      name: 'How to Compare Renting vs Buying',
      description: 'Calculate the financial break-even between renting and buying a home.',
      step: [
        { '@type': 'HowToStep', name: 'Enter home price and mortgage details', text: 'Input the purchase price, down payment, and interest rate.' },
        { '@type': 'HowToStep', name: 'Enter current or comparable rent', text: 'The monthly rent you would pay for a comparable home.' },
        { '@type': 'HowToStep', name: 'Set your time horizon and growth rates', text: 'How many years you plan to stay, appreciation rate, and rent growth assumptions.' },
      ],
    },
  ],
}

const trustSignals = ['Break-Even Year', 'Opportunity Cost', 'Appreciation', '2026 Rates']

export default function RentVsBuyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />

      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgrec.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              Rent vs Buy Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Is it cheaper to rent or buy? Find your break-even year with a complete true-cost comparison including opportunity cost and appreciation.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="5678901234" /></div>
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <RentVsBuyCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="6789012345" /></div>

          <div className="rounded-2xl bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/40 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-[#166534] dark:text-green-300 mb-2">2026 Rent vs Buy Context</h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              With 30-year mortgage rates at 6.75% and elevated home prices in most markets, the monthly cost of buying typically exceeds renting in 2026. The break-even point for most markets falls between years 4–7. Rising rents (3–4% annually in most metros) increasingly favor buying for those with a 5+ year horizon and adequate down payment.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How the Rent vs Buy Comparison Works</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              A true rent vs buy comparison goes beyond comparing your mortgage payment to your rent. Both sides have hidden costs and benefits that dramatically change the outcome. Our calculator accounts for the complete picture including opportunity cost, appreciation, maintenance, and closing costs.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">True Cost of Buying</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Buying costs include mortgage interest, property taxes, homeowner&apos;s insurance, maintenance (1% of home value annually), HOA fees, and closing costs amortized over your holding period. On a $400,000 loan at 6.75%, about $2,250/month goes to interest in year one — not equity. Early years heavily favor renting unless appreciation is strong.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">True Cost of Renting</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Renting costs include monthly rent (rising ~3% annually) plus renters insurance. Crucially, renters have their down payment capital available to invest. A $60,000 down payment invested at 7% annually grows to $118,000 over 10 years — this opportunity cost is real and must be weighed against home equity.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">The Break-Even Point</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              The break-even year is when cumulative costs of buying fall below cumulative costs of renting. Before break-even, renting saves money. After it, buying builds more wealth as amortization accelerates equity growth. In most 2026 markets, break-even falls between years 4–7. If you&apos;re planning to stay shorter than that, renting likely makes more financial sense.
            </p>
          </div>

          <div className="mb-10 rounded-xl border border-[#166534]/20 bg-[#166534]/5 dark:bg-[#166534]/10 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Buying vs Renting a $380,000 Home in Denver, CO</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Monthly Cost to Buy:</p>
                <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                  <li>Loan: $342,000 (10% down, 6.75%, 30yr)</li>
                  <li>P&amp;I: $2,218/mo</li>
                  <li>Property tax (CO 0.55%): $174/mo</li>
                  <li>Insurance + HOA: $135/mo</li>
                  <li>Maintenance (1%): $317/mo</li>
                  <li>PMI (10% down): $156/mo</li>
                  <li><strong className="text-gray-800 dark:text-gray-200">Total ~$3,000/mo</strong></li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Renting a Comparable Home:</p>
                <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                  <li>Rent: $2,300/mo</li>
                  <li>Renters insurance: $25/mo</li>
                  <li>Foregone return on $38K (7%): $222/mo equiv.</li>
                  <li><strong className="text-gray-800 dark:text-gray-200">Net cost ~$2,103/mo</strong></li>
                  <li className="mt-2 text-[#166534] dark:text-green-300 font-medium">Break-even: approximately Year 5</li>
                  <li>Year 10 home equity advantage: ~$85,000</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">Assumes 3.5% annual home appreciation and 3% annual rent growth. Consult a licensed real estate agent for local market assumptions.</p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors in the Rent vs Buy Decision</h2>
            <div className="space-y-4">
              {[
                { title: 'How Long You Plan to Stay', body: 'Buying has high transaction costs — 2–5% to buy, 6–8% to sell. These must be recouped over time. If you plan to move in under 3 years, renting almost always makes more financial sense. A 5+ year horizon generally favors buying in most markets.' },
                { title: 'Local Price-to-Rent Ratio', body: 'Divide the home price by annual rent. Ratios below 15 favor buying; above 20 favor renting. High P/R cities like San Francisco (30+) and NYC (25+) heavily favor renting on cash flow, though long-term appreciation has historically justified buying. Lower-cost Midwest markets often have P/R ratios of 10–14.' },
                { title: 'Home Appreciation vs Investment Returns', body: 'At 3.5% annual appreciation, a $380,000 home becomes $535,000 in 10 years. But a $38,000 down payment invested at 8% becomes $82,000 over the same period. The comparison depends heavily on local appreciation rates relative to alternative investment returns.' },
                { title: 'Rent Growth and Inflation Hedge', body: 'A fixed-rate mortgage locks in your largest housing cost permanently. Renters face escalating rent indefinitely. Over 10–20 years, rent inflation creates a compounding advantage for homeowners — especially important for retirement planning when fixed incomes can&apos;t absorb rent increases.' },
              ].map(({ title, body }) => (
                <div key={title} className="border-l-4 border-[#166534] pl-4">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 mb-1">{title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <AffiliateCTA variant="buyer" />

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-800 p-4 mb-6">
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              <strong>Disclaimer:</strong> Rent vs buy calculations are estimates for educational purposes only. Real estate markets are local and unpredictable. Home values can decline as well as appreciate. Investment returns are not guaranteed. Rates and costs change frequently. Consult a licensed real estate agent and financial advisor before making major housing decisions.
            </p>
          </div>

          <div className="pb-6"><AdBanner slot="7890123456" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
