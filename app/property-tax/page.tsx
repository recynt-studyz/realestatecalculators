import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'
import AffiliateCTA from '@/components/AffiliateCTA'
import FAQ from '@/components/FAQ'
import type { FaqItem } from '@/components/FAQ'
import PropertyTaxCalculatorWrapper from '@/components/PropertyTaxCalculatorWrapper'
import { STATE_LIST } from '@/lib/stateData'

export const metadata: Metadata = {
  title: 'Property Tax Calculator 2026 — Estimate Annual Property Taxes by State',
  description: 'Calculate annual property taxes for any home value in all 50 states. Includes homestead exemptions, assessment ratios, and state-by-state comparison. Free and instant for 2026.',
  keywords: ['property tax calculator', 'property tax by state 2026', 'annual property tax estimator', 'property tax rates 2026', 'homestead exemption calculator'],
  alternates: { canonical: 'https://realestatecalculators.app/property-tax' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Property Tax Calculator 2026 — Estimate Annual Property Taxes by State',
    description: 'Estimate annual property taxes for any home value across all 50 states, with homestead exemptions and assessment ratios.',
    url: 'https://realestatecalculators.app/property-tax',
    type: 'website',
  },
}

const faqItems: FaqItem[] = [
  {
    q: 'Which state has the highest property taxes in 2026?',
    a: 'New Jersey has the highest effective property tax rate in the nation at approximately 2.49% — more than twice the national average. On a $400,000 home, NJ property taxes would be approximately $9,960/year ($830/month). Other high-tax states include Illinois (2.23%), New Hampshire (2.09%), Vermont (1.90%), and Wisconsin (1.85%). These states often rely more heavily on property taxes to fund local schools and services. Consult a licensed real estate agent for current local rates in the specific area you\'re considering.',
  },
  {
    q: 'Which state has the lowest property taxes?',
    a: 'Hawaii has the lowest effective property tax rate in the nation at approximately 0.29%, though home prices are extremely high. Other low property tax states include Alabama (0.41%), Nevada (0.60%), Arizona (0.63%), and Utah (0.63%). Many southern states also have below-average property tax rates. However, low property tax states often have higher sales taxes or income taxes — consider the overall state and local tax burden when evaluating.',
  },
  {
    q: 'What is an assessment ratio and how does it affect my property taxes?',
    a: 'The assessment ratio is the percentage of a property\'s market value that is subject to taxation. While many states assess at 100% of market value, others use lower ratios. For example, Arizona assesses residential properties at just 10% of market value. On a $300,000 Arizona home assessed at 10%, the taxable "assessed value" is $30,000, and taxes are calculated on that $30,000. When comparing property tax rates across states, always look at effective rates (as a percentage of market value) for valid comparisons.',
  },
  {
    q: 'What is a homestead exemption?',
    a: 'A homestead exemption reduces the taxable assessed value of your primary residence, lowering your property tax bill. Florida offers up to $50,000 exemption. Texas offers a $100,000 homestead exemption for general taxes. Senior citizens, veterans, and disabled persons may qualify for additional exemptions. You typically must apply with your county assessor — some states have deadlines to apply for the following tax year. Check with your local assessor\'s office or a licensed real estate agent for details in your area.',
  },
  {
    q: 'How are property taxes calculated?',
    a: 'Property taxes are calculated as: Annual Tax = (Market Value × Assessment Ratio − Exemptions) × Effective Tax Rate. For example: $500,000 home in New Jersey (100% assessment, $0 exemption, 2.49% rate) = $500,000 × 1.0 × 2.49% = $12,450/year. Compare to Hawaii: $500,000 × 1.0 × 0.29% = $1,450/year. The difference in annual taxes between these two states for the same home value is over $11,000/year — a major factor in affordability and retirement planning.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Property Tax Calculator 2026',
      url: 'https://realestatecalculators.app/property-tax',
      description: 'Free property tax calculator for all 50 states with homestead exemptions, assessment ratios, and 2026 rates.',
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
      name: 'How to Calculate Property Taxes',
      description: 'Estimate annual property taxes for any home in any state.',
      step: [
        { '@type': 'HowToStep', name: 'Enter your home\'s market value', text: 'The estimated or appraised market value of the property.' },
        { '@type': 'HowToStep', name: 'Select your state', text: 'Each state has a different effective property tax rate.' },
        { '@type': 'HowToStep', name: 'Adjust assessment ratio if needed', text: 'Most states assess at 100%, but some use lower ratios.' },
        { '@type': 'HowToStep', name: 'Apply homestead exemption if eligible', text: 'Check if your state offers a homestead exemption for primary residences.' },
        { '@type': 'HowToStep', name: 'Review annual and monthly tax estimates', text: 'See your estimated property tax and how it compares to other states.' },
      ],
    },
  ],
}

const trustSignals = ['All 50 States', 'Homestead Exemptions', 'Assessment Ratios', 'Monthly Escrow']

export default function PropertyTaxPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />

      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/herobgrec.webp')" }}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 pb-10">
          <ToolHeader />
          <div className="text-center text-white px-4 py-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
              Property Tax Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Estimate annual property taxes for any home value across all 50 states. Compare rates instantly.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {trustSignals.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white font-medium">{t}</span>
              ))}
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 mb-4"><AdBanner slot="1234509870" /></div>
          <div className="max-w-5xl mx-auto px-4">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
              <PropertyTaxCalculatorWrapper />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent pointer-events-none" />
      </section>

      <section className="bg-white dark:bg-[#0f172a] pt-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="pb-4"><AdBanner slot="2345610980" /></div>

          <div className="rounded-2xl bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/40 px-6 py-5 mb-10">
            <h2 className="text-base font-bold text-[#166534] dark:text-green-300 mb-2">2026 Property Tax Context</h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              With home values elevated in most markets, property tax bills are higher in absolute dollar terms in 2026 even where effective rates haven't changed. New Jersey leads the nation at 2.49%, while Hawaii remains the lowest at 0.29%. For a $450,000 home, monthly property taxes range from $109 in Hawaii to $934 in New Jersey — a $825/month difference that dramatically affects affordability and monthly cash flow.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Property Taxes: How They Work and Why They Vary So Much</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Property taxes are the primary funding mechanism for local government services — schools, police, fire departments, roads, and parks. They're set at the local level (county and municipality), which is why there's enormous variation even within the same state: a home just across a county line might have dramatically different property taxes.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">The Property Tax Formula</h3>
            <p className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mb-3">
              Annual Tax = (Market Value × Assessment Ratio − Exemptions) × Mill Rate<br />
              <br />
              Effective Tax Rate = Annual Tax ÷ Market Value × 100
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The "mill rate" (or millage rate) is the property tax rate expressed in mills (tenths of a cent). A 10 mill rate means $10 per $1,000 of assessed value. Counties typically apply multiple overlapping mill rates for different taxing districts (county, city/township, school district, fire district, etc.).
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">How Property Tax Affects Your Monthly Budget</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
              Mortgage lenders collect property taxes monthly through your escrow account. They estimate your annual tax bill and divide by 12 to add to your monthly payment. When comparing homes in different states (or even different counties in the same state), always factor in property taxes. A $350,000 home in New Jersey costs about $8,715/year in property taxes; the same price home in Alabama costs just $1,435/year — a $7,280/year ($607/month) difference in real purchasing power.
            </p>
          </div>

          <div className="mb-10 rounded-xl border border-[#166534]/20 bg-[#166534]/5 dark:bg-[#166534]/10 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Property Tax Impact: Same $450,000 Home in Five States</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#166534]/20">
                    <th className="text-left py-2 pr-4 text-gray-700 dark:text-gray-300">State</th>
                    <th className="text-right py-2 pr-4 text-gray-700 dark:text-gray-300">Eff. Rate</th>
                    <th className="text-right py-2 pr-4 text-gray-700 dark:text-gray-300">Annual Tax</th>
                    <th className="text-right py-2 text-gray-700 dark:text-gray-300">Monthly</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {[
                    ['New Jersey', '2.49%', '$11,205', '$934'],
                    ['Illinois', '2.23%', '$10,035', '$836'],
                    ['Texas', '1.80%', '$8,100', '$675'],
                    ['National Avg.', '1.10%', '$4,950', '$413'],
                    ['Hawaii', '0.29%', '$1,305', '$109'],
                  ].map(([state, rate, annual, monthly]) => (
                    <tr key={state}>
                      <td className="py-2 pr-4 font-medium text-gray-800 dark:text-[#e2e8f0]">{state}</td>
                      <td className="text-right py-2 pr-4 text-gray-600 dark:text-gray-400">{rate}</td>
                      <td className="text-right py-2 pr-4 text-gray-800 dark:text-[#e2e8f0]">{annual}</td>
                      <td className="text-right py-2 font-semibold text-[#166534] dark:text-green-300">{monthly}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Difference between NJ and HI: $9,900/year ($825/month) for an identical $450,000 home.</p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Property Tax Rates by State</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
              Select your state for a detailed breakdown of effective property tax rates, homestead exemptions, and a personalized property tax calculator.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {STATE_LIST.map(state => (
                <a
                  key={state.abbr}
                  href={`/${state.slug}-property-tax-calculator`}
                  className="text-center text-sm px-2 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e293b] text-[#166534] dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-950/20 transition-colors font-medium"
                >
                  {state.name}
                </a>
              ))}
            </div>
          </div>

          <AffiliateCTA variant="buyer" />

          <div className="pb-10">
            <FAQ questions={faqItems} />
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-800 p-4 mb-6">
            <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
              <strong>Disclaimer:</strong> Property tax estimates use state effective average rates and are for educational purposes only. Actual property taxes are set by local taxing authorities (county, city, school district) and vary significantly within states. Assessment ratios, exemptions, and mill rates change annually. For your actual property tax liability, contact your county assessor or property tax authority. Consult a licensed real estate agent and financial advisor before making major real estate decisions.
            </p>
          </div>

          <div className="pb-6"><AdBanner slot="1234609870" /></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
