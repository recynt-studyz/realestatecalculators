import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'

import RentVsBuyCalculatorWrapper from '@/components/RentVsBuyCalculatorWrapper'
export const metadata: Metadata = {
  title: 'Rent vs Buy Calculator 2026 — Is It Better to Rent or Buy a Home?',
  description: 'Compare the true cost of renting vs buying in 2026. Includes home appreciation, opportunity cost, tax benefits, and break-even year. Free rent vs buy analysis tool.',
  keywords: ['rent vs buy calculator', 'renting vs buying 2026', 'should I rent or buy', 'rent or buy analysis', 'break-even calculator'],
  alternates: { canonical: 'https://realestatecalculators.app/rent-vs-buy' },
  openGraph: {
    title: 'Rent vs Buy Calculator 2026 — Is It Better to Rent or Buy a Home?',
    description: 'True cost comparison of renting vs buying, including appreciation, opportunity cost, and break-even year.',
    url: 'https://realestatecalculators.app/rent-vs-buy',
    type: 'website',
  },
}

const faqItems = [
  {
    q: 'Is it better to rent or buy a home in 2026?',
    a: 'The answer depends on how long you plan to stay, local price-to-rent ratios, and your personal finances. With mortgage rates around 6.5–7%, buying often requires staying 4–7 years to break even versus renting, depending on the market. In expensive coastal cities, the break-even point can exceed 8 years. In affordable Midwest markets, buyers may break even in 2–3 years.'
  },
  {
    q: 'How is the rent vs buy break-even calculated?',
    a: 'The break-even year is when the total cumulative cost of buying (mortgage interest, taxes, insurance, maintenance, minus appreciation equity and tax savings) equals the total cumulative cost of renting (rent payments minus returns on the down payment if invested). After the break-even point, buying typically becomes financially advantageous.'
  },
  {
    q: 'What is the price-to-rent ratio and what does it tell me?',
    a: 'The price-to-rent ratio is the home price divided by annual rent for a comparable property. A ratio below 15 generally favors buying; 15–20 is neutral; above 20 typically favors renting. For example, a $400,000 home with $2,000/month rent has a P/R ratio of 16.7 ($400,000 ÷ $24,000), which is borderline between renting and buying.'
  },
  {
    q: 'Does the mortgage interest deduction make buying cheaper?',
    a: 'The mortgage interest deduction can reduce your tax bill, but most homeowners no longer benefit from it due to the 2018 Tax Cuts and Jobs Act, which raised the standard deduction to $29,200 for married couples (2026). You only benefit from the mortgage deduction if your itemized deductions exceed the standard deduction. Borrowers with large mortgages and high tax rates are most likely to benefit.'
  },
  {
    q: 'What annual home appreciation rate should I assume?',
    a: 'The long-term national average for home appreciation is approximately 3–4% per year, slightly above inflation. However, real estate is highly local. Some markets have averaged 6–8% annually, while others have seen 0–2%. Our calculator defaults to 3.5%, which is a conservative but historically reasonable national assumption. Avoid assuming recent above-average appreciation will continue.'
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Rent vs Buy Calculator',
      url: 'https://realestatecalculators.app/rent-vs-buy',
      description: 'Free rent vs buy calculator with break-even analysis, opportunity cost, and home appreciation for 2026.',
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
      name: 'How to Compare Renting vs Buying',
      description: 'Calculate the true financial break-even between renting and buying a home.',
      step: [
        { '@type': 'HowToStep', name: 'Enter home price and mortgage details', text: 'Input the purchase price, down payment, and interest rate.' },
        { '@type': 'HowToStep', name: 'Enter current or comparable rent', text: 'The monthly rent you would pay for a comparable home.' },
        { '@type': 'HowToStep', name: 'Set your time horizon', text: 'How many years you plan to stay in the home.' },
        { '@type': 'HowToStep', name: 'Adjust appreciation and rent growth rates', text: 'Customize assumptions to match your local market.' },
        { '@type': 'HowToStep', name: 'Review break-even year', text: 'See when buying becomes cheaper than renting.' },
      ],
    },
  ],
}

export default function RentVsBuyPage() {
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
              Rent vs Buy Calculator 2026
            </h1>
            <p className="text-green-100 text-lg max-w-xl mb-4">
              Is it cheaper to rent or buy? Find your break-even year with a full cost comparison.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Break-Even Year', 'Opportunity Cost', 'Appreciation', '2026 Rates'].map(t => (
                <span key={t} className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 -mt-6 pb-16">
        <AdBanner slot="5678901234" />

        {/* CALCULATOR CARD */}
        <div className="bg-white/90 dark:bg-[#1e293b]/90 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 mb-8">
          <RentVsBuyCalculatorWrapper />
        </div>

        {/* HOW IT WORKS */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-[#e2e8f0] mb-4">How the Rent vs Buy Comparison Works</h2>
          <div className="prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              A true rent vs buy comparison goes far beyond comparing your monthly mortgage payment to your rent check. Many first-time buyers underestimate the full cost of homeownership, while renters underestimate the wealth-building potential they're missing. Our calculator accounts for both sides.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">True Cost of Buying</h3>
            <p>
              Buying includes mortgage interest (not just principal), property taxes, homeowner's insurance, maintenance (typically 1% of home value annually), HOA fees, and closing costs. In early years, the vast majority of your mortgage payment goes to interest — on a $400,000 loan at 6.75%, you pay about $2,250/month in interest in year one versus only $250 in principal paydown.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">True Cost of Renting</h3>
            <p>
              Renting includes your monthly rent (which typically increases 2–4% annually) plus renters insurance. But crucially, renters also have their down payment available to invest. If you would have put $60,000 down on a home, that money invested in index funds at a historical 7–10% annual return creates real wealth. Our calculator includes this opportunity cost.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Home Appreciation vs Investment Returns</h3>
            <p>
              Homeowners build equity through both mortgage paydown and appreciation. At 3.5% annual appreciation, a $400,000 home becomes worth $563,000 after 10 years. However, renters who invest their down payment at 8% annual returns turn $60,000 into $129,000 over the same period. The comparison is nuanced and depends heavily on local appreciation rates and investment returns.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">The Break-Even Point</h3>
            <p>
              The break-even year is when cumulative net costs of buying fall below cumulative net costs of renting. Before break-even, renting is financially advantageous. After it, buying pulls ahead. In most markets at current rates, the break-even is between 3 and 7 years — which is why housing experts often say "don't buy if you're moving in 3 years."
            </p>
          </div>
        </section>

        {/* WORKED EXAMPLE */}
        <section className="mb-10 rounded-xl border border-[#166534]/20 bg-[#166534]/5 dark:bg-[#166534]/10 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-[#e2e8f0] mb-4">Example: Buying vs Renting a $350,000 Home in Denver, CO</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Buying Costs (Year 1):</p>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>P&I payment: $2,166/mo (6.75%, 30yr, 10% down)</li>
                <li>Property taxes: $245/mo (0.84% CO rate)</li>
                <li>Insurance: $150/mo</li>
                <li>Maintenance: $292/mo (1% annually)</li>
                <li>PMI: $160/mo (less than 20% down)</li>
                <li><strong className="text-gray-800 dark:text-gray-200">Total: ~$3,013/mo</strong></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Renting (Comparable Home):</p>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>Monthly rent: $2,200</li>
                <li>Renters insurance: $25/mo</li>
                <li>Investment return on $35K down: ~$175/mo equivalent</li>
                <li><strong className="text-gray-800 dark:text-gray-200">Net cost: ~$2,050/mo</strong></li>
                <li className="mt-2 text-[#166534] dark:text-green-300 font-medium">Break-even year: ~Year 5</li>
                <li>After year 5, buying gains ~$45K in home equity advantage</li>
              </ul>
            </div>
          </div>
        </section>

        <AdBanner slot="6789012345" />

        <FAQ questions={faqItems} />

        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-800 p-4">
          <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
            <strong>Disclaimer:</strong> Rent vs buy calculations are estimates based on the assumptions you enter. Real estate markets are local and unpredictable. Home values can decline as well as appreciate. Investment returns are not guaranteed. Tax treatment depends on your individual situation. This tool is for educational purposes only and does not constitute financial, tax, or real estate advice. Consult qualified professionals before making major financial decisions.
          </p>
        </div>
      </main>

      <Footer />
    </>
  )
}
