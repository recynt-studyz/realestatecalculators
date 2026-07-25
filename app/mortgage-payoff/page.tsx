import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'
import AffiliateCTA from '@/components/AffiliateCTA'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import MortgagePayoffCalculatorWrapper from '@/components/MortgagePayoffCalculatorWrapper'

export const metadata: Metadata = {
  title: 'Mortgage Payoff Calculator 2026 — Pay Off Your Mortgage Early',
  description: 'Calculate how extra mortgage payments accelerate your payoff date and save on interest. See how $100, $500, or $1,000 extra per month reduces your loan term. Free tool.',
  keywords: ['mortgage payoff calculator', 'pay off mortgage early', 'extra mortgage payment calculator 2026', 'mortgage prepayment calculator', 'mortgage payoff date calculator'],
  alternates: { canonical: 'https://realestatecalculators.app/mortgage-payoff' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Mortgage Payoff Calculator 2026 — Pay Off Your Mortgage Early',
    description: 'See exactly how much interest you save and how many years you shave off by making extra mortgage payments.',
    url: 'https://realestatecalculators.app/mortgage-payoff',
    type: 'website',
  },
}

const faqItems: FaqItem[] = [
  {
    q: 'How much interest can I save by paying extra on my mortgage?',
    a: 'The interest savings from extra payments can be dramatic. On a $300,000 mortgage at 6.75%, adding just $250/month extra saves approximately $70,000 in interest and pays off the loan 7 years early. Adding $500/month saves about $105,000 and cuts 10+ years off the term. The earlier in the loan term you start, the more you save — since more of each early payment goes to interest.',
  },
  {
    q: 'Should I pay extra on my mortgage or invest instead?',
    a: 'This is one of personal finance\'s most debated questions. Mathematically, if your mortgage rate (6.75%) is lower than your expected investment return (S&P 500 historical ~10%), investing wins in expected value. However, paying off your mortgage gives guaranteed, tax-free returns equal to your mortgage rate, provides psychological peace of mind, reduces risk, and eliminates housing-related cash flow risk in retirement. Many financial planners recommend a blended approach: maximize 401(k) match, build 6-month emergency fund, then split extra money between investing and mortgage paydown. Consult a financial advisor for guidance specific to your situation.',
  },
  {
    q: 'Does my lender automatically apply extra payments to principal?',
    a: 'Not always. When making extra payments, you should clearly designate them "apply to principal" either online, on your check, or by calling your servicer. Some servicers default to advancing your next payment due date rather than reducing principal. Always verify on your next statement that the extra payment was correctly applied to principal balance reduction.',
  },
  {
    q: 'Does paying biweekly help pay off a mortgage faster?',
    a: 'Yes — a biweekly payment strategy results in 26 half-payments per year (equal to 13 full monthly payments instead of 12), effectively making one extra monthly payment per year. On a 30-year $300,000 mortgage at 6.75%, biweekly payments pay off the loan about 4 years early and save approximately $50,000 in interest. It\'s a lower-commitment strategy than a fixed extra monthly payment but still significantly accelerates payoff.',
  },
  {
    q: 'Do I need to check for prepayment penalties before making extra payments?',
    a: 'Yes, always check your mortgage agreement before making large extra payments. Prepayment penalties are rare on most residential mortgages (illegal on most government-backed loans), but some conventional loans, especially those originated before 2014 or by portfolio lenders, may have them. Prepayment penalties typically only apply in the first 3–5 years and often only above a certain amount. Call your servicer to confirm before sending a large lump sum payment.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Mortgage Payoff Calculator 2026',
      url: 'https://realestatecalculators.app/mortgage-payoff',
      description: 'Free mortgage payoff calculator showing interest savings and years saved from extra monthly payments or lump sum contributions.',
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
      name: 'How to Calculate Mortgage Payoff with Extra Payments',
      description: 'Calculate how extra mortgage payments reduce your loan term and total interest paid.',
      step: [
        { '@type': 'HowToStep', name: 'Enter your original loan details', text: 'Original loan amount, interest rate, and term.' },
        { '@type': 'HowToStep', name: 'Enter your current balance', text: 'Your outstanding mortgage balance today.' },
        { '@type': 'HowToStep', name: 'Set your extra monthly payment', text: 'How much additional principal you want to pay each month.' },
        { '@type': 'HowToStep', name: 'Add optional lump sum', text: 'A one-time extra payment today, such as a bonus or inheritance.' },
        { '@type': 'HowToStep', name: 'Review your savings', text: 'See months saved, interest saved, and your new payoff date.' },
      ],
    },
  ],
}

const trustSignals = ['Interest Saved', 'Years Cut', 'Payoff Date', 'Lump Sum']

export default function MortgagePayoffPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />

      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgrec.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              Mortgage Payoff Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              See how much interest you save and how many years you cut by paying extra on your mortgage.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="9012387654" /></div>
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <MortgagePayoffCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="0123498765" /></div>

          <div className="rounded-2xl bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/40 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-[#166534] dark:text-green-300 mb-2">2026 Mortgage Payoff Context</h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              With 30-year mortgage rates at 6.75% in 2026, the case for extra payments is strong for risk-averse homeowners. Each extra dollar of principal payment earns a guaranteed, tax-free return equivalent to your mortgage rate. Homeowners with mortgages originated at 2.5–3.5% may prefer investing — but those at 6.5–7.5% rates benefit significantly from accelerated payoff.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Math Behind Early Mortgage Payoff</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Understanding why extra mortgage payments are so powerful requires understanding mortgage amortization — specifically how much of each payment goes to interest versus principal in the early years.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">How Mortgage Amortization Works</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Every month, your lender calculates interest on your current balance: Interest = Balance × (Annual Rate ÷ 12). On a $350,000 mortgage at 6.75% (30-year), your monthly payment is about $2,269. In the very first payment: $1,969 goes to interest and only $300 reduces your principal. By year 10, the split is roughly $1,700 interest vs. $569 principal. Only in the final years does principal paydown accelerate significantly.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Why Extra Payments Have Outsized Impact</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              When you make an extra principal payment, you permanently reduce the balance that future interest is calculated on. At 6.75%, each $1 of extra principal payment saves approximately $1.67 in total interest over the loan&apos;s life. The earlier you start, the greater the compounding savings.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Extra Payment Strategies Compared</h3>
            <div className="overflow-x-auto mb-3">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <th className="text-left p-2 border border-gray-200 dark:border-gray-700">Strategy</th>
                    <th className="text-left p-2 border border-gray-200 dark:border-gray-700">Approx. Years Saved</th>
                    <th className="text-left p-2 border border-gray-200 dark:border-gray-700">Approx. Interest Saved</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['$100/mo extra', '2.5 years', '$28,000'],
                    ['$250/mo extra', '5.5 years', '$60,000'],
                    ['$500/mo extra', '9 years', '$100,000'],
                    ['$1,000/mo extra', '14 years', '$148,000'],
                    ['Biweekly payments', '4 years', '$50,000'],
                  ].map(([strat, years, saved]) => (
                    <tr key={strat} className="border border-gray-200 dark:border-gray-700">
                      <td className="p-2 text-gray-700 dark:text-gray-300">{strat}</td>
                      <td className="p-2 text-[#166534] dark:text-green-300 font-semibold">{years}</td>
                      <td className="p-2 text-gray-800 dark:text-[#e2e8f0]">{saved}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 dark:text-gray-500">Based on a $320,000 mortgage at 6.75% for 30 years. Amounts are approximate.</p>
          </div>

          <div className="mb-10 rounded-xl border border-[#166534]/20 bg-[#166534]/5 dark:bg-[#166534]/10 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Example: The Rodriguez Family&apos;s Payoff Strategy</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Their Mortgage:</p>
                <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                  <li>Original loan: $380,000 at 6.75%, 30 years</li>
                  <li>Current balance: $355,000 (3 years in)</li>
                  <li>Standard monthly payment: $2,464</li>
                  <li>Remaining standard payoff: ~27 years</li>
                  <li>Remaining standard interest: ~$445,000</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">With $500/Month Extra:</p>
                <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                  <li>New payoff time: ~18 years (saves 9 years)</li>
                  <li>Interest saved: ~$112,000</li>
                  <li>Payoff date: ~2044 instead of ~2053</li>
                  <li>Effective &quot;return&quot; on extra payments: 6.75% guaranteed</li>
                  <li><strong className="text-[#166534] dark:text-green-300">Total interest paid: ~$333,000 vs $445,000</strong></li>
                </ul>
              </div>
            </div>
          </div>

          <AffiliateCTA variant="buyer" />

          <div className="pb-10">
            <FAQ questions={faqItems} />
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-800 p-4 mb-6">
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              <strong>Disclaimer:</strong> Mortgage payoff calculations are estimates based on your inputs. Interest savings depend on exact payment amounts, timing, and how your servicer applies extra payments. Some mortgages have prepayment penalties — check your loan agreement before making large extra payments. Verify all extra payment applications with your loan servicer. The decision to pay extra on your mortgage involves personal financial tradeoffs that depend on your complete financial picture. Consult a licensed financial advisor for personalized guidance.
            </p>
          </div>

          <div className="pb-6"><AdBanner slot="9012487654" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
