import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import MortgageCalculatorWrapper from '@/components/MortgageCalculatorWrapper'
import AdBanner from '@/components/AdBanner'
import AffiliateCTA from '@/components/AffiliateCTA'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Mortgage Calculator 2026 — Monthly Payment Estimator with Taxes & Insurance',
  description:
    'Calculate your 2026 mortgage payment including principal, interest, property taxes, insurance, HOA and PMI. Free mortgage calculator with amortization schedule.',
  alternates: { canonical: 'https://realestatecalculators.app' },
  robots: { index: true, follow: true },
}

const faqs: FaqItem[] = [
  {
    q: 'What is the average mortgage rate in 2026?',
    a: 'The average 30-year fixed mortgage rate in 2026 is approximately 6.75%, down from the peaks of 7–8% seen in 2023–2024 as the Federal Reserve eased monetary policy. The 15-year fixed rate averages 6.10%, offering significant interest savings for buyers who can afford the higher monthly payment. FHA loans average 6.50%, VA loans average 6.25%, and jumbo loans (above the $806,500 conforming limit) average 7.00%. Rates vary by credit score, down payment, loan type, lender, and market conditions — the best rates are reserved for borrowers with 740+ credit scores and 20%+ down payments.',
  },
  {
    q: 'How is a monthly mortgage payment calculated?',
    a: 'A monthly mortgage payment consists of principal (loan repayment), interest (lender compensation), property tax (1/12 of annual tax), homeowners insurance (1/12 of annual premium), HOA fees (if applicable), and PMI (if down payment is below 20%). The principal and interest portion is calculated using the PMT formula: P&I = Loan Amount × (r × (1+r)^n) / ((1+r)^n − 1), where r = monthly interest rate (annual rate ÷ 12) and n = number of monthly payments. On a $320,000 loan at 6.75% for 30 years, P&I = $2,076/month.',
  },
  {
    q: 'What is PMI and when can I remove it?',
    a: 'PMI (Private Mortgage Insurance) is required when your down payment is less than 20% on a conventional loan. PMI rates in 2026 typically range from 0.5–1.5% of the loan amount annually, depending on your credit score and LTV ratio. On a $320,000 loan with 10% down, PMI costs approximately $130–$400/month. You can request PMI removal once you reach 20% equity (based on original appraised value), and it must be automatically canceled when you reach 22% equity under the Homeowners Protection Act. VA loans have no PMI, and FHA loans have mortgage insurance premiums (MIP) for the life of the loan in most cases.',
  },
  {
    q: 'Should I choose a 15 or 30-year mortgage?',
    a: 'A 30-year mortgage has lower monthly payments but costs significantly more in total interest — often 2–3× the total interest of a 15-year loan. A 15-year mortgage at 6.10% builds equity twice as fast and saves tens of thousands in interest but requires roughly 40–50% higher monthly payments. On a $320,000 loan: 30-year at 6.75% = $2,076/month with $427,340 total interest; 15-year at 6.10% = $2,715/month with $168,700 total interest — saving $258,640 over the life of the loan. Choose 30-year if cash flow is tight; choose 15-year if you can comfortably afford the higher payment and prioritize paying less total interest.',
  },
  {
    q: 'How much do I need for a down payment?',
    a: 'Minimum down payments in 2026 depend on loan type: conventional loans require as little as 3% (but require PMI below 20%), FHA loans require 3.5% (with 580+ credit score), VA loans require 0% for eligible veterans, and USDA loans require 0% for eligible rural properties. While 20% down avoids PMI and lowers your monthly payment, many first-time buyers in 2026 put down 3–10%. On a $400,000 home: 3% = $12,000, 5% = $20,000, 10% = $40,000, 20% = $80,000. Beyond the down payment, budget 2–5% of the purchase price for closing costs and 3–6 months of mortgage payments in reserves.',
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
  name: 'Mortgage Calculator 2026',
  url: 'https://realestatecalculators.app',
  description: 'Free 2026 mortgage calculator with monthly payment breakdown, amortization schedule, and affordability check.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Calculate Your 2026 Mortgage Payment',
  step: [
    { '@type': 'HowToStep', name: 'Enter your home price and down payment', text: 'Enter the home purchase price and your down payment amount (in dollars or as a percentage). The calculator shows your loan amount and whether PMI is required.' },
    { '@type': 'HowToStep', name: 'Select your loan type and interest rate', text: 'Choose from 30-yr fixed, 15-yr fixed, 5/1 ARM, FHA, VA, or jumbo. The 2026 average rate auto-fills. Adjust the rate to match your actual quote from lenders.' },
    { '@type': 'HowToStep', name: 'Add taxes, insurance, and HOA', text: 'Select your state to auto-fill the property tax rate, or enter a custom rate. Add your annual homeowners insurance and monthly HOA. Your complete PITI payment appears instantly.' },
  ],
}

const trustSignals = ['2026 Updated', 'Instant Results', 'Private', 'Free']

export default function HomePage() {
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
              Free Mortgage Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate your monthly mortgage payment with taxes, insurance, HOA, and PMI. Includes amortization schedule and affordability check. 2026 rates.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4">
            <AdBanner slot="1111111111" />
          </div>
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <MortgageCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4">
            <AdBanner slot="2222222222" />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-10">
            {[
              { icon: '🔒', label: 'Private',      sub: 'Calculations stay in your browser' },
              { icon: '⚡', label: 'Instant',      sub: 'Results update as you type' },
              { icon: '📋', label: '2026 Updated', sub: 'Current rates and limits' },
              { icon: '✓',  label: 'Free',         sub: 'No signup, no limits' },
            ].map(t => (
              <div key={t.label} className="flex flex-col items-center rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#1e293b] p-4 text-center shadow-sm">
                <span className="text-2xl mb-1">{t.icon}</span>
                <span className="text-sm font-semibold text-gray-800 dark:text-[#e2e8f0]">{t.label}</span>
                <span className="text-xs text-gray-400 mt-0.5">{t.sub}</span>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-[#166534] dark:text-green-300 mb-2">
              2026 Mortgage Rates at a Glance
            </h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              As of 2026, the average 30-year fixed mortgage rate is 6.75%, down from the 8% peak of late 2023. The conforming loan limit rose to $806,500 ($1,209,750 in high-cost areas). FHA loan limits start at $524,225. All calculations use your browser&apos;s JavaScript — your financial data never leaves your device.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How Mortgage Payments Are Calculated</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              A mortgage payment has four core components known as PITI: Principal, Interest, Taxes, and Insurance. Lenders add HOA dues and PMI when applicable, making PITIA or PITIA+PMI. Understanding each component helps you budget accurately and compare loan options intelligently.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The Principal and Interest portion is calculated using the amortization formula: <strong className="text-gray-900 dark:text-white">P&I = L × (r × (1+r)^n) / ((1+r)^n − 1)</strong> where L = loan amount, r = monthly interest rate (annual rate ÷ 12 ÷ 100), and n = total number of monthly payments. On a $320,000 loan at 6.75% for 30 years: r = 0.005625, n = 360, P&I = $2,076/month.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Early in a 30-year mortgage, about 80–85% of each payment goes to interest. By year 15, the split approaches 50/50. By the final payments, nearly everything goes to principal. This is why extra early payments are so powerful — each extra dollar reduces the balance on which future interest is calculated. Making one extra payment per year on a $320,000 loan at 6.75% cuts the 30-year loan to approximately 25 years and saves over $80,000 in interest.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Worked Example: Jennifer and Mark Buy in Scottsdale, AZ</h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Jennifer and Mark are buying their first home in Scottsdale, AZ for $425,000 with 10% down ($42,500) using a 30-year fixed conventional loan at 6.75%.
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Home price:                         $425,000</div>
                <div>Down payment (10%):                 −$42,500</div>
                <div>Loan amount:                        $382,500</div>
                <div className="pt-2">Principal & Interest (6.75%, 30yr):  $2,480</div>
                <div>Property tax (AZ 0.63%/12):           $223</div>
                <div>Homeowners insurance:                  $150</div>
                <div>PMI (0.65% annual, 10% down):          $207</div>
                <div className="font-bold pt-1">TOTAL MONTHLY PAYMENT:             $3,060</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                At $3,060/month, the 28% DTI rule suggests a combined gross income of $131,143/year. Once their equity reaches 20% (approximately year 7 at normal amortization, or sooner with extra payments), PMI drops off and their payment falls to $2,853/month.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Over 30 years, they will pay $892,800 in total principal and interest on the $382,500 loan — $510,300 in interest. If they refinance at year 5 if rates fall to 5.5%, they could save $150,000+ over the remaining loan term.
              </p>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Your Mortgage Payment</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Interest rate</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Even a 0.5% rate difference has a significant impact. On a $320,000 loan, the difference between 6.75% and 6.25% is $98/month — $35,280 over 30 years. Your rate depends on your credit score (740+ gets best rates), down payment (20%+ typically qualifies for better rates), loan type, property type, and current market conditions. Shopping multiple lenders before committing typically saves $1,500–$3,000 over the life of the loan.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Down payment amount</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">A larger down payment reduces your loan balance (lowering P&I), can eliminate PMI if you reach 20%, and often qualifies you for better interest rates. However, it also means less cash available for emergencies, repairs, and investment opportunities. Many financial advisors recommend keeping at least 3–6 months of expenses in liquid savings even after the down payment — don&apos;t drain your emergency fund to maximize your down payment.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Property location and tax rate</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Property taxes are a major variable in total housing cost. The same $400,000 home costs $967/year in Hawaii (0.29% rate) but $9,960/year in New Jersey (2.49% rate) — a difference of $750/month just in taxes. States like Texas (1.80%) and Illinois (2.23%) have high property taxes despite no state income tax. Always factor your specific state and county tax rates into your total housing budget, not just the mortgage payment.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Loan term selection</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">The 30-year mortgage offers lower monthly payments but higher total interest costs. The 15-year mortgage charges a lower rate (typically 0.65% lower than 30-year) and pays off the home in half the time, saving hundreds of thousands in interest. A 20-year mortgage offers a middle ground. Some borrowers take a 30-year loan but make extra payments to accelerate payoff with flexibility to revert to the minimum if needed — use the Mortgage Payoff Calculator to see how extra payments affect your timeline.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Loan type (conventional vs. government)</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">FHA loans allow lower credit scores (580+) and smaller down payments (3.5%) but include mandatory mortgage insurance for most borrowers. VA loans offer 0% down with no PMI for eligible veterans and active duty military — often the most affordable option for those who qualify. Conventional loans offer the most flexibility and eliminate PMI with 20%+ down. Jumbo loans (above $806,500) typically carry slightly higher rates and stricter qualification requirements.</p>
              </li>
            </ul>
          </div>

          <AffiliateCTA variant="buyer" />

          <div className="pb-10">
            <FAQ questions={faqs} />
          </div>

          <div className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 p-6 mb-10">
            <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
              <strong>Disclaimer:</strong> These calculators provide estimates for educational purposes only. Real estate markets, mortgage rates, and costs vary by location and change frequently. Consult a licensed real estate agent, mortgage lender, or financial advisor before making any real estate decisions.
            </p>
          </div>

          <div className="pb-6">
            <AdBanner slot="3333333333" />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
