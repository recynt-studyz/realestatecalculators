import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'
import AffiliateCTA from '@/components/AffiliateCTA'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import AffordabilityCalculatorWrapper from '@/components/AffordabilityCalculatorWrapper'

export const metadata: Metadata = {
  title: 'Home Affordability Calculator 2026 — How Much House Can I Afford?',
  description: 'Find out how much house you can afford in 2026. Calculate your maximum home price based on income, debts, down payment, and current mortgage rates. Free, instant, no signup.',
  keywords: ['home affordability calculator', 'how much house can I afford', 'affordability calculator 2026', 'mortgage affordability', 'DTI ratio calculator'],
  alternates: { canonical: 'https://realestatecalculators.app/affordability' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Home Affordability Calculator 2026 — How Much House Can I Afford?',
    description: 'Calculate your maximum home purchase price using 28/43 DTI guidelines and 2026 mortgage rates.',
    url: 'https://realestatecalculators.app/affordability',
    type: 'website',
  },
}

const faqs: FaqItem[] = [
  {
    q: 'How much house can I afford on a $100,000 salary?',
    a: 'On a $100,000 annual salary with no other debts, you can generally afford a home priced between $350,000 and $450,000 using the 28% front-end DTI rule at current rates around 6.75%. Your maximum monthly housing payment (PITI — principal, interest, taxes, insurance) would be about $2,333 ($100,000 × 28% ÷ 12). The exact amount depends on your down payment, credit score, existing debts, and local property taxes. Consult a licensed real estate agent and mortgage lender for a personalized pre-approval.',
  },
  {
    q: 'What is the 28/43 rule for home affordability?',
    a: 'The 28/43 rule says your monthly mortgage payment (including taxes and insurance) should not exceed 28% of your gross monthly income (front-end DTI), and your total debt payments should not exceed 43% of gross income (back-end DTI). The binding constraint is whichever limit is lower. Many lenders today use a 43% back-end DTI limit as the maximum, though FHA loans allow up to 50% with compensating factors and strong credit.',
  },
  {
    q: 'How does my credit score affect how much house I can afford?',
    a: 'Your credit score directly affects your mortgage interest rate, which significantly changes how much house you can afford. Borrowers with 760+ credit scores typically qualify for rates 0.5–1.0% lower than borrowers with 620 scores. On a $400,000 mortgage, a 1% rate difference changes your monthly payment by about $240 and your total interest cost by over $85,000 over 30 years. Higher scores also unlock better loan programs and eliminate the need for costly mortgage insurance in some cases.',
  },
  {
    q: 'Should I include property taxes in my affordability calculation?',
    a: 'Yes, always include property taxes (and homeowner\'s insurance) in your affordability calculation. Lenders use PITI — Principal, Interest, Taxes, and Insurance — when calculating your DTI ratio. Property taxes vary widely by state: New Jersey averages 2.49%, while Hawaii averages just 0.29%. This difference can add hundreds of dollars to your monthly payment and dramatically change how much house you can afford in different states. Our calculator uses state-specific 2026 effective property tax rates.',
  },
  {
    q: 'What is the minimum down payment to buy a house in 2026?',
    a: 'Minimum down payment requirements depend on loan type: Conventional loans require 3–5% down (with PMI below 20%), FHA loans require 3.5% down (with 580+ credit score), VA loans require 0% down for eligible veterans and active-duty military, and USDA loans require 0% down in eligible rural areas. A larger down payment reduces your loan amount, lowers your monthly payment, eliminates PMI at 20%+, and may qualify you for better interest rates. The 2026 conforming loan limit is $806,500.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Home Affordability Calculator 2026',
      url: 'https://realestatecalculators.app/affordability',
      description: 'Free home affordability calculator using 28/43 DTI guidelines and 2026 mortgage rates.',
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
      name: 'How to Calculate Home Affordability',
      description: 'Use the 28/43 DTI method to find your maximum home purchase price.',
      step: [
        { '@type': 'HowToStep', name: 'Enter your gross annual income', text: 'Input your pre-tax household income from all sources.' },
        { '@type': 'HowToStep', name: 'Add monthly debt payments', text: 'Include minimum payments on car loans, student loans, and credit cards.' },
        { '@type': 'HowToStep', name: 'Enter down payment and select state', text: 'Enter your saved down payment and choose your state for accurate property tax rates.' },
      ],
    },
  ],
}

const trustSignals = ['28/43 DTI Method', 'Credit Score Impact', '2026 Rates', 'Free & Private']

export default function AffordabilityPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />

      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgrec.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              Home Affordability Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              How much house can you afford? Get your personalized price range using the 28/43 DTI method with 2026 rates.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="3456789012" /></div>
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <AffordabilityCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="4567890123" /></div>

          <div className="rounded-2xl bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/40 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-[#166534] dark:text-green-300 mb-2">2026 Affordability Snapshot</h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              With the average 30-year fixed mortgage rate at 6.75% in 2026 and the conforming loan limit at $806,500, affordability remains stretched in many markets. The 28/43 DTI rules are the standard lender guidelines — our calculator applies both and uses the binding (lower) constraint. Property taxes vary from 0.29% (Hawaii) to 2.49% (New Jersey) and significantly affect your monthly payment.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Home Affordability Is Calculated</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Mortgage lenders use two debt-to-income (DTI) ratios to determine how much home you can afford: the front-end ratio and the back-end ratio. Understanding both is essential to knowing your true buying power in 2026.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Front-End DTI (Housing Ratio) — 28% Guideline</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              The front-end ratio looks at your proposed monthly PITI (Principal, Interest, Taxes, Insurance) payment as a percentage of your gross monthly income. Lenders typically want this at no more than 28% for conventional loans. On a $120,000 annual income, your maximum monthly housing payment is $120,000 × 28% ÷ 12 = <strong className="text-gray-900 dark:text-white">$2,800/month</strong>.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Back-End DTI (Total Debt Ratio) — 43% Guideline</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              The back-end ratio adds all monthly debt payments (car loans, student loans, credit cards, personal loans) to your housing payment. Most conventional lenders cap this at 43%. With $500/month in existing debts on a $120,000 income: ($120,000 × 43% ÷ 12) − $500 = $3,800/month available for housing. The lower of the two limits — $2,800 in this case — is your actual constraint.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Converting Monthly Payment to Maximum Home Price</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              At 6.75% for 30 years, each $1,000 of monthly P&amp;I payment supports approximately $149,900 in loan amount. Subtract estimated taxes and insurance from your maximum PITI payment to get available P&amp;I, then add your down payment to determine maximum purchase price. Because property taxes and insurance vary by location, our calculator uses state-specific 2026 effective rates for accuracy.
            </p>
          </div>

          <div className="mb-10 rounded-xl border border-[#166534]/20 bg-[#166534]/5 dark:bg-[#166534]/10 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Sarah and David in Austin, TX</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Their Situation:</p>
                <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                  <li>Combined gross income: $145,000/year ($12,083/month)</li>
                  <li>Monthly debts: $650 (car + student loans)</li>
                  <li>Down payment saved: $60,000</li>
                  <li>Credit score: 740 (qualifies for ~6.625%)</li>
                  <li>State: Texas (1.80% effective property tax rate)</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Calculation:</p>
                <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                  <li>28% front-end limit: $12,083 × 28% = <strong className="text-gray-800 dark:text-gray-200">$3,383/mo</strong></li>
                  <li>43% back-end limit: ($12,083 × 43%) − $650 = <strong className="text-gray-800 dark:text-gray-200">$3,546/mo</strong></li>
                  <li>Binding constraint: $3,383/mo housing payment</li>
                  <li>Est. taxes + insurance on $450K TX home: ~$750/mo</li>
                  <li>Available for P&amp;I: $3,383 − $750 = $2,633/mo</li>
                  <li>Maximum loan at 6.625%, 30yr: ~$410,000</li>
                  <li><strong className="text-[#166534] dark:text-green-300">Max home price: ~$470,000</strong></li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">Consult a licensed real estate agent and mortgage lender for an accurate pre-approval based on your complete financial profile.</p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">5 Factors That Determine How Much House You Can Afford</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Gross Income', body: 'Lenders use your pre-tax income. Both W-2 wages and verifiable self-employment income count. Two-year averages are used for variable income sources like bonuses, overtime, and freelance work.' },
                { title: 'Monthly Debt Load', body: 'Every $100/month in minimum debt payments reduces your buying power by roughly $15,000 at 2026 rates. Paying off debts before applying for a mortgage can significantly increase what you can borrow.' },
                { title: 'Down Payment', body: 'A larger down payment means a smaller loan, lower monthly payment, and potentially no PMI (at 20%+). It also signals financial stability to lenders and may qualify you for better interest rates.' },
                { title: 'Credit Score', body: 'At 6.75% vs 7.5%, a $400,000 mortgage costs about $200 less per month. Good credit saves tens of thousands over the life of a loan and lets you qualify for more house.' },
                { title: 'Location & Property Taxes', body: 'Texas property taxes (1.80%) add $675/month on a $450K home. In Hawaii (0.29%), that same home costs only $109/month in taxes. Your location dramatically affects real affordability.' },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
                  <p className="font-semibold text-gray-800 dark:text-[#e2e8f0] mb-1">{title}</p>
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
              <strong>Disclaimer:</strong> Home affordability calculations are estimates for educational purposes only. Actual loan approval depends on your complete financial profile, lender policies, and current market conditions. Rates and costs change frequently. Consult a licensed real estate agent and mortgage lender before making home-buying decisions.
            </p>
          </div>

          <div className="pb-6"><AdBanner slot="5678901234" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
