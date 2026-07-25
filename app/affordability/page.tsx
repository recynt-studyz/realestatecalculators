import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'

const AffordabilityCalculatorWrapper = dynamic(
  () => import('@/components/AffordabilityCalculatorWrapper'),
  { ssr: false }
)

export const metadata: Metadata = {
  title: 'Home Affordability Calculator 2026 — How Much House Can I Afford?',
  description: 'Find out how much house you can afford in 2026. Calculate your maximum home price based on income, debts, down payment, and current mortgage rates. Free, instant, no signup.',
  keywords: ['home affordability calculator', 'how much house can I afford', 'affordability calculator 2026', 'mortgage affordability', 'home buying budget'],
  alternates: { canonical: 'https://realestatecalculators.app/affordability' },
  openGraph: {
    title: 'Home Affordability Calculator 2026 — How Much House Can I Afford?',
    description: 'Calculate your maximum home purchase price based on income, debts, and down payment. Uses 28/43 DTI guidelines.',
    url: 'https://realestatecalculators.app/affordability',
    type: 'website',
  },
}

const faqItems = [
  {
    q: 'How much house can I afford on a $100,000 salary?',
    a: 'On a $100,000 annual salary with no other debts, you can generally afford a home priced between $350,000 and $450,000 using the 28% front-end DTI rule at current rates around 6.75%. Your maximum monthly housing payment would be about $2,333 ($100,000 × 28% ÷ 12). The exact amount depends on your down payment, credit score, debts, and local property taxes.'
  },
  {
    q: 'What is the 28/36 rule for home affordability?',
    a: 'The 28/36 rule says your monthly mortgage payment (including taxes and insurance) should not exceed 28% of your gross monthly income, and your total debt payments should not exceed 36% of gross income. Many lenders today use a 43% back-end DTI limit as the maximum, though some loan programs allow up to 50% with compensating factors.'
  },
  {
    q: 'How does my credit score affect how much house I can afford?',
    a: 'Your credit score directly affects your mortgage interest rate. Borrowers with 760+ credit scores typically qualify for rates 0.5–1.0% lower than borrowers with 620 scores. On a $400,000 mortgage, a 1% rate difference changes your monthly payment by about $240 and your total interest cost by over $85,000 over 30 years.'
  },
  {
    q: 'Should I include property taxes in my affordability calculation?',
    a: 'Yes, always include property taxes (and homeowner\'s insurance) in your affordability calculation. Lenders use PITI — Principal, Interest, Taxes, and Insurance — when calculating your DTI ratio. Property taxes vary widely by state: New Jersey averages 2.1%, while Hawaii averages just 0.31%. This difference can add hundreds of dollars to your monthly payment.'
  },
  {
    q: 'What is the minimum down payment to buy a house?',
    a: 'Minimum down payment requirements depend on loan type: Conventional loans require 3–5% down (with PMI below 20%), FHA loans require 3.5% down (with 580+ credit score), VA loans require 0% down for eligible veterans, and USDA loans require 0% down in eligible rural areas. A larger down payment reduces your monthly payment, eliminates PMI at 20%+, and can qualify you for better interest rates.'
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Home Affordability Calculator',
      url: 'https://realestatecalculators.app/affordability',
      description: 'Free home affordability calculator using 28/43 DTI guidelines with 2026 mortgage rates.',
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
      name: 'How to Calculate Home Affordability',
      description: 'Use the 28/43 DTI method to find your maximum home purchase price.',
      step: [
        { '@type': 'HowToStep', name: 'Enter your gross annual income', text: 'Input your pre-tax household income.' },
        { '@type': 'HowToStep', name: 'Add monthly debt payments', text: 'Include minimum payments on car loans, student loans, credit cards.' },
        { '@type': 'HowToStep', name: 'Enter your down payment', text: 'The amount you have saved for a down payment.' },
        { '@type': 'HowToStep', name: 'Select your credit score range', text: 'Higher credit scores qualify for lower interest rates.' },
        { '@type': 'HowToStep', name: 'Choose your state', text: 'Property taxes vary significantly by state and affect affordability.' },
        { '@type': 'HowToStep', name: 'Review your maximum home price', text: 'The calculator shows conservative, moderate, and maximum home prices.' },
      ],
    },
  ],
}

export default function AffordabilityPage() {
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
              Home Affordability Calculator 2026
            </h1>
            <p className="text-green-100 text-lg max-w-xl mb-4">
              How much house can you afford? Get your personalized price range in seconds.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['28/43 DTI Method', 'Credit Score Impact', '2026 Rates', 'Free & Private'].map(t => (
                <span key={t} className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 -mt-6 pb-16">
        <AdBanner slot="3456789012" />

        {/* CALCULATOR CARD */}
        <div className="bg-white/90 dark:bg-[#1e293b]/90 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 mb-8">
          <AffordabilityCalculatorWrapper />
        </div>

        {/* HOW IT WORKS */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-[#e2e8f0] mb-4">How Home Affordability Is Calculated</h2>
          <div className="prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              Mortgage lenders use two debt-to-income (DTI) ratios to determine how much home you can afford: the front-end ratio and the back-end ratio. Understanding both is essential to knowing your true buying power.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Front-End DTI (Housing Ratio) — 28% Guideline</h3>
            <p>
              The front-end ratio looks at your proposed monthly housing payment as a percentage of your gross monthly income. Lenders typically want this to be no more than 28% for conventional loans. Your housing payment includes:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Principal and interest on your mortgage</li>
              <li>Property taxes (escrowed monthly)</li>
              <li>Homeowner's insurance (escrowed monthly)</li>
              <li>HOA dues, if applicable</li>
              <li>Private mortgage insurance (PMI) if your down payment is under 20%</li>
            </ul>
            <p>
              For example, on a $120,000 annual income, your maximum monthly housing payment under the 28% rule would be $120,000 × 28% ÷ 12 = <strong>$2,800</strong>.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Back-End DTI (Total Debt Ratio) — 43% Guideline</h3>
            <p>
              The back-end ratio adds all monthly debt obligations to your housing payment. This includes minimum payments on credit cards, auto loans, student loans, personal loans, and other recurring debts. Most conventional lenders cap this at 43%, while FHA loans can go up to 50% with strong compensating factors.
            </p>
            <p>
              Continuing the example: with $500/month in existing debt payments, your maximum housing payment under the 43% back-end rule would be ($120,000 × 43% ÷ 12) − $500 = $3,800/month available for housing. The lower of the two calculations — $2,800 in this case — determines your actual limit.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Converting Monthly Payment to Home Price</h3>
            <p>
              Once you know your maximum monthly payment, you work backwards to find the maximum loan amount. At 6.75% for 30 years, each $1,000 of monthly P&I payment supports approximately $149,900 in loan amount. Add your down payment to get your maximum purchase price.
            </p>
            <p>
              Because property taxes and insurance vary by location, our calculator uses state-specific effective property tax rates to give you a more accurate affordability estimate than calculators that use national averages.
            </p>
          </div>
        </section>

        {/* WORKED EXAMPLE */}
        <section className="mb-10 rounded-xl border border-[#166534]/20 bg-[#166534]/5 dark:bg-[#166534]/10 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-[#e2e8f0] mb-4">Worked Example: Sarah and David in Austin, TX</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Their Situation:</p>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>Combined gross income: $145,000/year ($12,083/month)</li>
                <li>Monthly debts: $650 (car + student loans)</li>
                <li>Down payment saved: $60,000</li>
                <li>Credit score: 740 (qualifies for ~6.625%)</li>
                <li>State: Texas (1.68% effective property tax)</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Calculation:</p>
              <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                <li>28% front-end limit: $12,083 × 28% = <strong className="text-gray-800 dark:text-gray-200">$3,383/mo</strong></li>
                <li>43% back-end limit: ($12,083 × 43%) − $650 = <strong className="text-gray-800 dark:text-gray-200">$3,546/mo</strong></li>
                <li>Binding constraint: $3,383/mo housing payment</li>
                <li>Estimated taxes + insurance: ~$650/mo on a $450K home</li>
                <li>Available for P&I: $3,383 − $650 = $2,733/mo</li>
                <li>Maximum loan at 6.625%: ~$425,000</li>
                <li><strong className="text-[#166534] dark:text-green-300">Max home price: ~$485,000</strong></li>
              </ul>
            </div>
          </div>
        </section>

        {/* KEY FACTORS */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-[#e2e8f0] mb-5">5 Factors That Determine How Much House You Can Afford</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Gross Income', body: 'Lenders use your pre-tax income. Both W-2 wages and verifiable self-employment income count. Two-year averages are used for variable income sources like bonuses, overtime, and freelance work.' },
              { title: 'Monthly Debt Load', body: 'Every $100/month in minimum debt payments reduces your buying power by roughly $15,000 at today\'s rates. Paying off debts before applying for a mortgage can significantly increase what you can borrow.' },
              { title: 'Down Payment', body: 'A larger down payment means a smaller loan, lower monthly payment, and potentially no PMI (at 20%+). It also signals financial stability to lenders and may qualify you for better rates.' },
              { title: 'Credit Score', body: 'At 6.75% vs 7.5%, a $400,000 mortgage costs $200 less per month. Good credit saves tens of thousands over the life of a loan — and lets you qualify for more house.' },
              { title: 'Location & Property Taxes', body: 'Texas property taxes (1.68%) add $630/month on a $450K home. In Hawaii (0.31%), that same home costs only $116/month in taxes. Your location dramatically affects real affordability.' },
            ].map(({ title, body }) => (
              <div key={title} className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
                <p className="font-semibold text-gray-800 dark:text-[#e2e8f0] mb-1">{title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{body}</p>
              </div>
            ))}
          </div>
        </section>

        <AdBanner slot="4567890123" />

        <FAQ questions={faqItems} />

        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-800 p-4">
          <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
            <strong>Disclaimer:</strong> Home affordability calculations are estimates based on standard underwriting guidelines. Actual loan approval depends on your complete financial profile, lender policies, current market conditions, and property characteristics. DTI limits and qualifying criteria vary by loan program and lender. Consult a licensed mortgage professional before making home-buying decisions. This calculator does not constitute financial or mortgage advice.
          </p>
        </div>
      </main>

      <Footer />
    </>
  )
}
