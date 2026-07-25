import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'
import AffiliateCTA from '@/components/AffiliateCTA'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import CashOnCashCalculatorWrapper from '@/components/CashOnCashCalculatorWrapper'

export const metadata: Metadata = {
  title: 'Cash on Cash Return Calculator 2026 — Rental Property CoC Analysis',
  description: 'Calculate cash-on-cash return for rental properties in 2026. Compare your actual cash yield against S&P 500, Treasury bonds, and savings rates. Free investment analysis tool.',
  keywords: ['cash on cash return calculator', 'cash on cash ROI', 'rental property cash return 2026', 'CoC return real estate', 'cash yield calculator'],
  alternates: { canonical: 'https://realestatecalculators.app/cash-on-cash' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Cash on Cash Return Calculator 2026 — Rental Property CoC Analysis',
    description: 'Calculate and benchmark your cash-on-cash return against stocks, bonds, and savings accounts.',
    url: 'https://realestatecalculators.app/cash-on-cash',
    type: 'website',
  },
}

const faqItems: FaqItem[] = [
  {
    q: 'What is cash-on-cash return in real estate?',
    a: 'Cash-on-cash (CoC) return measures the annual cash income from a rental property as a percentage of your total cash invested. Unlike cap rate, it accounts for your actual financing — mortgage payments reduce your cash flow, and your down payment plus closing costs represent your total cash investment. Formula: CoC = Annual Pre-Tax Cash Flow ÷ Total Cash Invested × 100. A 8% CoC means you earn 8 cents annually for every dollar you put in.',
  },
  {
    q: 'What is a good cash-on-cash return in 2026?',
    a: 'In 2026, with mortgage rates around 7% and alternative investments like Treasury bonds yielding 4.5%, most real estate investors target 6–10% cash-on-cash to justify the illiquidity and management burden of rental properties. In competitive markets (coastal cities), 3–5% CoC is common but accepted due to appreciation potential. In cash-flow-focused markets (Midwest, Southeast), investors routinely find 8–12% CoC deals. Below 4% CoC is generally considered unacceptable for a leveraged rental property.',
  },
  {
    q: 'How does cash-on-cash differ from ROI?',
    a: 'Cash-on-cash measures only annual cash income, ignoring equity build-up (mortgage paydown) and appreciation. Total ROI includes all forms of return: cash flow + principal paydown + appreciation + tax benefits (depreciation). Investors use CoC to evaluate current income potential and compare it to other investments. Total ROI tells you the complete picture over your holding period. A property with 5% CoC might have 15% total ROI once appreciation and equity are included.',
  },
  {
    q: 'What reduces cash-on-cash return?',
    a: 'Higher purchase prices, higher mortgage rates, larger down payments (paradoxically), high operating expenses, and low rents all reduce CoC. In 2026, the combination of elevated home prices and 7%+ mortgage rates has compressed CoC significantly compared to the 2010–2020 period. Investors are adapting by targeting markets with stronger rent-to-price ratios, seller financing, or value-add properties where rents can be raised after improvements.',
  },
  {
    q: 'Should I use a larger or smaller down payment to maximize CoC?',
    a: 'Counterintuitively, a smaller down payment often (but not always) increases CoC, because you\'re deploying less cash while still earning the same rental income spread. This is "positive leverage" — when your cash-on-cash return exceeds the cap rate, leverage is working in your favor. However, at 2026 mortgage rates of 7%, many properties are negatively leveraged: the mortgage cost exceeds the cap rate, making larger down payments (or all-cash) actually better for current cash flow per dollar invested.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Cash on Cash Return Calculator 2026',
      url: 'https://realestatecalculators.app/cash-on-cash',
      description: 'Free cash-on-cash return calculator for rental property investors, with benchmarks vs. stocks and bonds for 2026.',
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
      name: 'How to Calculate Cash-on-Cash Return',
      description: 'Calculate your actual cash yield on a rental property investment.',
      step: [
        { '@type': 'HowToStep', name: 'Calculate annual cash flow', text: 'Gross rent minus vacancy, operating expenses, and mortgage payments.' },
        { '@type': 'HowToStep', name: 'Sum your total cash invested', text: 'Down payment plus closing costs plus immediate repair costs.' },
        { '@type': 'HowToStep', name: 'Divide and multiply', text: 'CoC = Annual Cash Flow ÷ Total Cash Invested × 100.' },
        { '@type': 'HowToStep', name: 'Compare to benchmarks', text: 'Evaluate your CoC against stocks, bonds, and savings rates.' },
      ],
    },
  ],
}

const trustSignals = ['CoC Formula', 'vs S&P 500', 'vs Treasury', 'vs HYSA']

export default function CashOnCashPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />

      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgrec.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              Cash on Cash Return Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Calculate your rental property&apos;s actual cash yield and compare it to stocks, bonds, and savings rates.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="7890165432" /></div>
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <CashOnCashCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="8901276543" /></div>

          <div className="rounded-2xl bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/40 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-[#166534] dark:text-green-300 mb-2">2026 Cash-on-Cash Context</h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              With mortgage rates at 7% and Treasury bonds yielding ~4.5% in 2026, real estate investors face higher opportunity costs than at any point since 2007. Positive leverage (where CoC exceeds cap rate) requires either a cap rate above 7% or alternative financing below market rates. Most analysts suggest a minimum 6–8% CoC to justify the illiquidity and management burden of direct real estate ownership over a diversified portfolio.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Cash-on-Cash Return: Why It&apos;s the Investor&apos;s Most Important Metric</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Cash-on-cash return answers the most fundamental investment question: "How much actual cash do I get back each year for every dollar I put in?" Unlike cap rate (which ignores financing) or total ROI (which includes paper gains), CoC measures real, spendable income in your pocket.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">The Cash-on-Cash Formula</h3>
            <p className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mb-3">
              Cash-on-Cash Return = Annual Pre-Tax Cash Flow ÷ Total Cash Invested<br />
              <br />
              Annual Cash Flow = Effective Gross Income − Operating Expenses − Annual Debt Service<br />
              Total Cash Invested = Down Payment + Closing Costs + Immediate Repairs
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Positive vs Negative Leverage in 2026</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Leverage is "positive" when your CoC exceeds your cap rate — meaning debt is amplifying your returns. This worked well from 2013–2022 when mortgage rates were 3–5% and cap rates were often 5–7%. In 2026, with mortgage rates at 7%, positive leverage is much harder to achieve. If a property has a 5.5% cap rate but your mortgage costs 7%, you&apos;re negatively leveraged. Investors have adapted by seeking higher-cap-rate markets, negotiating seller financing, or buying all-cash and refinancing later.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Real Estate vs. Alternative Investments (2026 Context)</h3>
            <div className="overflow-x-auto mb-3">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <th className="text-left p-2 border border-gray-200 dark:border-gray-700">Investment</th>
                    <th className="text-left p-2 border border-gray-200 dark:border-gray-700">2026 Return</th>
                    <th className="text-left p-2 border border-gray-200 dark:border-gray-700">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Real Estate (cash-on-cash)', '4–12%', 'Plus appreciation, depreciation, equity build'],
                    ['S&P 500 (historical avg)', '~10.5%', 'Highly variable; liquid'],
                    ['10-Year Treasury Bond', '~4.5%', 'Guaranteed; low risk; no inflation hedge'],
                    ['High-Yield Savings (HYSA)', '~4.8%', 'FDIC insured; liquid; rate may fall'],
                    ['REITs (publicly traded)', '5–8%', 'Liquid real estate; dividend income'],
                  ].map(([inv, ret, note]) => (
                    <tr key={inv} className="border border-gray-200 dark:border-gray-700">
                      <td className="p-2 text-gray-700 dark:text-gray-300">{inv}</td>
                      <td className="p-2 font-semibold text-[#166534] dark:text-green-300">{ret}</td>
                      <td className="p-2 text-gray-600 dark:text-gray-400 text-xs">{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-10 rounded-xl border border-[#166534]/20 bg-[#166534]/5 dark:bg-[#166534]/10 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Example: Single-Family Rental in Indianapolis, IN</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Investment Inputs:</p>
                <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                  <li>Purchase price: $220,000</li>
                  <li>Down payment (25%): $55,000</li>
                  <li>Closing costs: $4,000</li>
                  <li>Immediate repairs: $6,000</li>
                  <li>Total cash invested: <strong className="text-gray-800 dark:text-gray-200">$65,000</strong></li>
                  <li>Mortgage payment (7%, 30yr): $1,105/mo</li>
                  <li>Monthly rent: $1,750</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Cash Flow Analysis:</p>
                <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                  <li>Gross annual rent: $21,000</li>
                  <li>Less vacancy (5%): −$1,050</li>
                  <li>Less operating expenses: −$5,800</li>
                  <li>NOI: $14,150</li>
                  <li>Less mortgage payments: −$13,260</li>
                  <li>Annual cash flow: <strong className="text-gray-800 dark:text-gray-200">$890</strong></li>
                  <li><strong className="text-[#166534] dark:text-green-300">Cash-on-cash return: $890 ÷ $65,000 = 1.4%</strong></li>
                  <li className="mt-2 text-amber-600 dark:text-amber-400">Below target — reconsider price or financing terms</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">This illustrates why 2026&apos;s rate environment makes many deals marginal on cash flow alone — total ROI including appreciation and equity build may still justify the purchase depending on investment goals and local market trajectory.</p>
          </div>

          <AffiliateCTA variant="investor" />

          <div className="pb-10">
            <FAQ questions={faqItems} />
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-800 p-4 mb-6">
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              <strong>Disclaimer:</strong> Cash-on-cash calculations are estimates based on your inputs. Actual cash flow depends on occupancy, rent collection, operating costs, and financing terms which can all vary. Alternative investment returns shown are historical averages and are not guaranteed. Real estate investing involves risk of loss and illiquidity. This calculator is for educational purposes only and does not constitute investment, financial, or tax advice. Consult licensed professionals before making investment decisions.
            </p>
          </div>

          <div className="pb-6"><AdBanner slot="7890265432" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
