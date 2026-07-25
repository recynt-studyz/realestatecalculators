import type { Metadata } from 'next'
import ToolHeader from './ToolHeader'
import PropertyTaxCalculatorWrapper from './PropertyTaxCalculatorWrapper'
import AdBanner from './AdBanner'
import FAQ from './FAQ'
import type { FaqItem } from './FAQ'
import Footer from './Footer'
import { STATES } from '@/lib/stateData'

const trustSignals = ['2026 Updated', 'Instant', 'Private', 'Free']

export function generateStatePropertyTaxMetadata(stateAbbr: string): Metadata {
  const s = STATES[stateAbbr]
  if (!s) return {}
  return {
    title: `${s.name} Property Tax Calculator 2026`,
    description: `Calculate ${s.name} property taxes for 2026. ${s.name} has a ${s.propertyTaxRate}% effective property tax rate. Free calculator with homestead exemption and ${s.name} median home value.`,
    alternates: { canonical: `https://realestatecalculators.app/${s.slug}-property-tax-calculator` },
    robots: { index: true, follow: true },
  }
}

export default function StatePropertyTaxPage({ stateAbbr }: { stateAbbr: string }) {
  const s = STATES[stateAbbr]
  if (!s) return null

  const fmt = (v: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)
  const fmtPct = (v: number, d = 2) => `${v.toFixed(d)}%`

  const medianTax     = s.medianHomeValue * s.propertyTaxRate / 100
  const nationalAvgTax = s.medianHomeValue * 1.1 / 100
  const highTax = s.medianHomeValue * 2.49 / 100  // NJ rate
  const lowTax  = s.medianHomeValue * 0.29 / 100  // HI rate

  const exemptionTax = s.homesteadExemption > 0
    ? Math.max(0, s.medianHomeValue - s.homesteadExemption) * s.propertyTaxRate / 100
    : null

  const faqs: FaqItem[] = [
    {
      q: `What is the property tax rate in ${s.name} for 2026?`,
      a: `${s.name} has an effective property tax rate of ${fmtPct(s.propertyTaxRate)} for 2026. On the ${s.name} median home value of ${fmt(s.medianHomeValue)}, this works out to approximately ${fmt(medianTax)}/year or ${fmt(medianTax / 12)}/month. The effective rate represents the actual percentage of home value paid in taxes, which may differ from the nominal mill rate used by your county assessor. Property taxes in ${s.name} fund local schools, roads, parks, and government services.`,
    },
    {
      q: `How is property tax calculated in ${s.name}?`,
      a: `${s.name} property taxes are calculated using the formula: Assessed Value × Tax Rate − Exemptions = Annual Tax. First, the county assessor determines your home's assessed value, which may equal market value or a fraction of it depending on the local assessment ratio. The tax rate (expressed as mills or a percentage) is set by local taxing authorities. In ${s.name}, the effective combined rate across all taxing jurisdictions averages ${fmtPct(s.propertyTaxRate)}. Then any exemptions, such as ${s.homesteadExemption > 0 ? `the ${fmt(s.homesteadExemption)} homestead exemption` : 'veteran or senior exemptions'}, are subtracted from the assessed value before calculating the final tax bill.`,
    },
    {
      q: `Does ${s.name} have a homestead exemption?`,
      a: s.homesteadExemption > 0
        ? `Yes, ${s.name} offers a homestead exemption of ${fmt(s.homesteadExemption)} reduction in assessed value for qualifying primary residences. On a home with the ${s.name} median value of ${fmt(s.medianHomeValue)}, this would reduce your taxable value to ${fmt(Math.max(0, s.medianHomeValue - s.homesteadExemption))} and save approximately ${fmt(Math.max(0, medianTax - (exemptionTax || 0)))}/year in property taxes. You must apply for the homestead exemption through your county assessor's office — it is not automatically applied.`
        : `${s.name} does not have a statewide homestead exemption that reduces assessed value for all homeowners. However, some counties and municipalities in ${s.name} offer local exemptions for primary residences, veterans, seniors, or disabled homeowners. Contact your county assessor's office to determine what exemptions you may qualify for and how to apply.`,
    },
    {
      q: `How does ${s.name}'s property tax compare to other states?`,
      a: `${s.name}'s effective property tax rate of ${fmtPct(s.propertyTaxRate)} ${s.propertyTaxRate < 1.1 ? 'is below' : 'is above'} the national average of approximately 1.10%. On a ${fmt(s.medianHomeValue)} home — the ${s.name} median — you pay ${fmt(medianTax)}/year compared to the national average of ${fmt(nationalAvgTax)}/year, New Jersey's highest rate at ${fmt(highTax)}/year, and Hawaii's lowest at ${fmt(lowTax)}/year. Keep in mind that states with low income taxes often have higher property taxes to compensate — total tax burden is a better comparison than any single tax type.`,
    },
    {
      q: `How do I appeal my property tax assessment in ${s.name}?`,
      a: `If you believe your ${s.name} property assessment is too high, you can file an appeal with your county Board of Assessment Review or Equalization. Gather evidence that your home is over-assessed: recent comparable sales of similar homes in your area, an independent appraisal, or documentation of condition issues the assessor may have missed. Most ${s.name} counties require you to file an appeal within 30–90 days of receiving your assessment notice. Successful appeals in ${s.name} can reduce property taxes by $500–$3,000/year. Many property tax attorneys and consultants work on contingency — no fee unless they win your appeal.`,
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
    name: `${s.name} Property Tax Calculator 2026`,
    url: `https://realestatecalculators.app/${s.slug}-property-tax-calculator`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to Calculate ${s.name} Property Taxes`,
    step: [
      { '@type': 'HowToStep', name: 'Enter your home value', text: `Enter your ${s.name} home's market value or assessed value. The calculator defaults to the ${s.name} median home value of ${fmt(s.medianHomeValue)}.` },
      { '@type': 'HowToStep', name: `${s.name} is pre-selected`, text: `The ${s.name} effective property tax rate of ${fmtPct(s.propertyTaxRate)} is automatically applied. Adjust the assessment ratio if your county assesses at a fraction of market value.` },
      { '@type': 'HowToStep', name: 'Apply exemptions and view results', text: `${s.homesteadExemption > 0 ? `Check the homestead exemption box to apply ${s.name}'s ${fmt(s.homesteadExemption)} exemption.` : 'Review any applicable exemptions.'} See your estimated annual and monthly property tax with a comparison to other states.` },
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
              {s.name} Property Tax Calculator 2026
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-6 max-w-2xl mx-auto">
              Estimate {s.name} property taxes for 2026. {s.name}&apos;s {fmtPct(s.propertyTaxRate)} effective rate means{' '}
              {fmt(medianTax)}/year on the state median home value of {fmt(s.medianHomeValue)}.
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
              <PropertyTaxCalculatorWrapper />
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
              {s.name} Property Tax 2026
            </h2>
            <p className="text-sm text-green-800 dark:text-green-400 leading-relaxed">
              {s.name}&apos;s effective property tax rate of {fmtPct(s.propertyTaxRate)} is {s.propertyTaxRate < 1.1 ? 'below' : 'above'} the national average of 1.10%.
              On the {s.name} median home value of {fmt(s.medianHomeValue)}, annual property taxes average {fmt(medianTax)} ({fmt(medianTax / 12)}/month).
              {s.homesteadExemption > 0 ? ` ${s.name} offers a homestead exemption of ${fmt(s.homesteadExemption)} for qualifying primary residences.` : ''}
              Use the calculator above to estimate your specific property tax with adjustments for assessment ratio and exemptions.
            </p>
          </div>

          <div className="mb-4 text-center">
            <a href="/property-tax" className="text-sm text-[#166534] dark:text-green-400 hover:underline">
              ← Compare all 50 state property tax rates
            </a>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              How {s.name} Property Taxes Work
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Property taxes in {s.name} are administered at the county or local level and fund schools, roads, parks, libraries, emergency services, and local government operations. While the state sets the overall framework, your actual property tax rate depends on which county and city you live in — and rates can vary significantly within {s.name} itself. The {fmtPct(s.propertyTaxRate)} effective rate used in this calculator is the statewide average across all taxing jurisdictions.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              The property tax calculation process begins with the county assessor determining your home&apos;s assessed value, which in {s.name} is typically based on recent sales of comparable properties in your area. If you believe your assessment is too high, you have the right to appeal — and many homeowners in {s.name} successfully reduce their assessments each year.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl px-4 py-3 mb-4 text-sm font-mono text-gray-800 dark:text-gray-200">
              {s.name} Property Tax = Assessed Value × {fmtPct(s.propertyTaxRate)} effective rate{s.homesteadExemption > 0 ? ` − ${fmt(s.homesteadExemption)} (homestead exemption)` : ''}
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Property taxes are typically due in {s.name} on an annual or semi-annual schedule, depending on the county. Most mortgage lenders escrow property taxes, collecting 1/12 of the annual bill each month and paying the county on your behalf. If you own your home free and clear or your lender does not escrow, you are responsible for paying directly to avoid late penalties.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Worked Example: Property Tax on a {fmt(s.medianHomeValue)} Home in {s.name}
            </h2>
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 rounded-2xl p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Priya buys a single-family home in {s.name} for {fmt(s.medianHomeValue)} — the state median value. Here is how her estimated annual property tax is calculated:
              </p>
              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4 font-mono bg-white/60 dark:bg-black/20 rounded-xl px-4 py-3">
                <div>Market value:                         {fmt(s.medianHomeValue)}</div>
                <div>Assessment ratio:                          100%</div>
                <div>Assessed value:                        {fmt(s.medianHomeValue)}</div>
                {s.homesteadExemption > 0 && (
                  <div>Homestead exemption:               −{fmt(s.homesteadExemption)}</div>
                )}
                <div>Taxable value:           {fmt(s.homesteadExemption > 0 ? Math.max(0, s.medianHomeValue - s.homesteadExemption) : s.medianHomeValue)}</div>
                <div>Effective tax rate:                    {fmtPct(s.propertyTaxRate)}</div>
                <div className="font-bold pt-1">Annual property tax:     {fmt(exemptionTax ?? medianTax)}</div>
                <div>Monthly (escrowed):      {fmt((exemptionTax ?? medianTax) / 12)}</div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Priya&apos;s mortgage lender will collect {fmt((exemptionTax ?? medianTax) / 12)}/month in her escrow account and pay the county on her behalf.
                Compared to the national average of {fmt(nationalAvgTax)}/year on the same home,
                {(exemptionTax ?? medianTax) < nationalAvgTax
                  ? ` Priya saves ${fmt(nationalAvgTax - (exemptionTax ?? medianTax))}/year by owning in ${s.name}.`
                  : ` Priya pays ${fmt((exemptionTax ?? medianTax) - nationalAvgTax)}/year more than the national average.`}
              </p>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Factors That Affect Your {s.name} Property Tax</h2>
            <ul className="space-y-5">
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Local Mill Rate Variation</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">The {fmtPct(s.propertyTaxRate)} rate used in this calculator is the {s.name} statewide average. In practice, your actual rate depends on your specific county, city, school district, and special taxing districts. Rates can vary by 0.5–1.5 percentage points within {s.name} — homebuyers should research the specific rates in their target neighborhoods before purchasing.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">Assessment vs. Market Value</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">Your county assessor values your property at the assessed value used to calculate taxes. While many states assess at 100% of market value, some assess at 80%, 60%, or even lower fractions. If {s.name}&apos;s assessments lag market values — common in rapidly appreciating markets — you may appear to pay a low effective rate even though your nominal rate is relatively high.</p>
              </li>
              <li>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">{s.homesteadExemption > 0 ? `${s.name} Homestead Exemption` : 'Exemptions and Relief Programs'}</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {s.homesteadExemption > 0
                    ? `${s.name} offers a ${fmt(s.homesteadExemption)} homestead exemption for primary residences, saving qualifying homeowners approximately ${fmt(s.homesteadExemption * s.propertyTaxRate / 100)}/year. You must apply for this exemption through your county assessor's office — typically within the first year of ownership. Additional exemptions are available for seniors, veterans, and disabled homeowners.`
                    : `While ${s.name} may not have a broad statewide homestead exemption, specific relief programs exist for seniors, veterans, and disabled homeowners. Contact your county assessor's office to find out which programs you qualify for — these can meaningfully reduce your annual property tax burden.`}
                </p>
              </li>
            </ul>
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
