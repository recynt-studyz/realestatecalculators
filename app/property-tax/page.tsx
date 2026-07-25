import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'
import FAQ from '@/components/FAQ'

const PropertyTaxCalculatorWrapper = dynamic(
  () => import('@/components/PropertyTaxCalculatorWrapper'),
  { ssr: false }
)

export const metadata: Metadata = {
  title: 'Property Tax Calculator 2026 — Estimate Annual Property Taxes by State',
  description: 'Calculate annual property taxes for any home value in all 50 states. Includes homestead exemptions, assessment ratios, and state-by-state comparison. Free and instant for 2026.',
  keywords: ['property tax calculator', 'property tax by state 2026', 'annual property tax estimator', 'property tax rates 2026', 'homestead exemption calculator'],
  alternates: { canonical: 'https://realestatecalculators.app/property-tax' },
  openGraph: {
    title: 'Property Tax Calculator 2026 — Estimate Annual Property Taxes by State',
    description: 'Estimate annual property taxes for any home value across all 50 states, with homestead exemptions and assessment ratios.',
    url: 'https://realestatecalculators.app/property-tax',
    type: 'website',
  },
}

const faqItems = [
  {
    q: 'Which state has the highest property taxes in 2026?',
    a: 'New Jersey consistently has the highest effective property tax rate in the nation at approximately 2.13% — more than twice the national average. On a $400,000 home, NJ property taxes would be approximately $8,520/year ($710/month). Other high-tax states include Illinois (2.05%), Connecticut (1.91%), New Hampshire (1.86%), and Vermont (1.83%). These states often have lower or no income taxes and rely more heavily on property taxes for local services.'
  },
  {
    q: 'Which state has the lowest property taxes?',
    a: 'Hawaii has the lowest effective property tax rate in the nation at approximately 0.31%, though home prices are extremely high. Other low property tax states include Alabama (0.41%), Nevada (0.48%), Arizona (0.51%), and Colorado (0.52%). Many southern states also have below-average property tax rates. However, low property tax states often have higher sales taxes or income taxes, so consider the overall state and local tax burden when evaluating.'
  },
  {
    q: 'What is an assessment ratio and how does it affect my property taxes?',
    a: 'The assessment ratio is the percentage of a property\'s market value that is subject to taxation. While many states assess at 100% of market value, others use lower ratios. For example, Arizona assesses residential properties at just 10% of market value. On a $300,000 Arizona home assessed at 10%, the taxable "assessed value" is $30,000, and taxes are calculated on that $30,000. When comparing property tax rates across states, make sure you\'re looking at effective rates (as a percentage of market value) to make valid comparisons.'
  },
  {
    q: 'What is a homestead exemption?',
    a: 'A homestead exemption reduces the taxable assessed value of your primary residence, lowering your property tax bill. Florida offers up to $50,000 exemption (the first $25,000 off all taxes; the next $25,000 off school taxes only). Texas offers a $100,000 homestead exemption for general taxes. Senior citizens, veterans, and disabled persons may qualify for additional exemptions. You typically must apply for homestead exemption with your county assessor, and some states have deadlines to apply for the following tax year.'
  },
  {
    q: 'How are property taxes calculated?',
    a: 'Property taxes are calculated as: Annual Tax = (Market Value × Assessment Ratio − Exemptions) × Effective Tax Rate. For example: $500,000 home in New Jersey (100% assessment, $0 exemption, 2.13% rate) = $500,000 × 1.0 × 2.13% = $10,650/year. Compare to Hawaii: $500,000 × 1.0 × 0.31% = $1,550/year. The difference in annual taxes between these two states for the same home value is over $9,000/year — a major factor in housing affordability and retirement planning.'
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Property Tax Calculator',
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

export default function PropertyTaxPage() {
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
              Property Tax Calculator 2026
            </h1>
            <p className="text-green-100 text-lg max-w-xl mb-4">
              Estimate annual property taxes for any home value across all 50 states. Compare rates instantly.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['All 50 States', 'Homestead Exemptions', 'Assessment Ratios', 'Monthly Escrow'].map(t => (
                <span key={t} className="bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 -mt-6 pb-16">
        <AdBanner slot="1234509870" />

        {/* CALCULATOR CARD */}
        <div className="bg-white/90 dark:bg-[#1e293b]/90 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-100 dark:border-gray-700 mb-8">
          <PropertyTaxCalculatorWrapper />
        </div>

        {/* HOW IT WORKS */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-[#e2e8f0] mb-4">Property Taxes: How They Work and Why They Vary So Much</h2>
          <div className="prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-4">
            <p>
              Property taxes are the primary funding mechanism for local government services — schools, police, fire departments, roads, and parks. They're set at the local level (county and municipality), which is why there's enormous variation even within the same state: a home just across a county line might have dramatically different property taxes.
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">The Property Tax Formula</h3>
            <p className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
              Annual Tax = (Market Value × Assessment Ratio − Exemptions) × Mill Rate<br />
              <br />
              Effective Tax Rate = Annual Tax ÷ Market Value × 100
            </p>
            <p>
              The "mill rate" (or millage rate) is the property tax rate expressed in mills (tenths of a cent). A 10 mill rate means $10 per $1,000 of assessed value. Counties typically apply multiple overlapping mill rates for different taxing districts (county, city/township, school district, fire district, etc.).
            </p>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">State-by-State Property Tax Rate Summary (2026)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Highest Property Tax States:</p>
                <ul className="space-y-1 text-sm">
                  {[
                    ['New Jersey', '2.13%'],
                    ['Illinois', '2.05%'],
                    ['Connecticut', '1.91%'],
                    ['New Hampshire', '1.86%'],
                    ['Vermont', '1.83%'],
                    ['Wisconsin', '1.76%'],
                    ['Texas', '1.68%'],
                    ['Nebraska', '1.67%'],
                  ].map(([state, rate]) => (
                    <li key={state} className="flex justify-between text-gray-700 dark:text-gray-300">
                      <span>{state}</span><span className="font-medium text-red-600 dark:text-red-400">{rate}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Lowest Property Tax States:</p>
                <ul className="space-y-1 text-sm">
                  {[
                    ['Hawaii', '0.31%'],
                    ['Alabama', '0.41%'],
                    ['Nevada', '0.48%'],
                    ['Arizona', '0.51%'],
                    ['Colorado', '0.52%'],
                    ['Idaho', '0.55%'],
                    ['Tennessee', '0.56%'],
                    ['West Virginia', '0.57%'],
                  ].map(([state, rate]) => (
                    <li key={state} className="flex justify-between text-gray-700 dark:text-gray-300">
                      <span>{state}</span><span className="font-medium text-green-600 dark:text-green-400">{rate}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">How Property Tax Affects Your Monthly Budget</h3>
            <p>
              Mortgage lenders collect property taxes monthly through your escrow account. They estimate your annual tax bill and divide by 12 to add to your monthly payment. On a $450,000 home, the monthly property tax varies from $116 in Hawaii to $799 in New Jersey — a $683/month difference that significantly impacts what you can afford in each location.
            </p>
            <p>
              When comparing homes in different states (or even different counties in the same state), always factor in property taxes. A $350,000 home in New Jersey costs about $7,455/year in property taxes; the same price home in Alabama costs just $1,435/year. That $6,020/year difference represents $501/month in real purchasing power.
            </p>
          </div>
        </section>

        {/* WORKED EXAMPLE */}
        <section className="mb-10 rounded-xl border border-[#166534]/20 bg-[#166534]/5 dark:bg-[#166534]/10 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-[#e2e8f0] mb-4">Property Tax Impact: Same $450,000 Home in Four States</h2>
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
                  ['New Jersey', '2.13%', '$9,585', '$799'],
                  ['Texas', '1.68%', '$7,560', '$630'],
                  ['National Avg.', '1.10%', '$4,950', '$413'],
                  ['Florida', '0.89%', '$4,005', '$334'],
                  ['Hawaii', '0.31%', '$1,395', '$116'],
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
          <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Difference between NJ and HI: $8,190/year ($683/month) for an identical $450,000 home.</p>
        </section>

        <AdBanner slot="2345610980" />

        <FAQ questions={faqItems} />

        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-800 p-4">
          <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
            <strong>Disclaimer:</strong> Property tax estimates use state effective average rates and are for educational purposes only. Actual property taxes are set by local taxing authorities (county, city, school district) and vary significantly within states. Assessment ratios, exemptions, and mill rates change annually. For your actual property tax liability, contact your county assessor or property tax authority. Do not use this calculator for tax planning, mortgage budgeting, or financial advice purposes without confirming actual rates with local authorities.
          </p>
        </div>
      </main>

      <Footer />
    </>
  )
}
