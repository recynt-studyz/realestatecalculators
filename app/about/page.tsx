import type { Metadata } from 'next'
import ToolHeader from '@/components/ToolHeader'
import Footer from '@/components/Footer'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About — RealEstateCalculators.app',
  description: 'Free, accurate real estate calculators for buyers, sellers, and investors. No signup required, no data collected, all calculations run in your browser.',
  alternates: { canonical: 'https://realestatecalculators.app/about' },
}

export default function AboutPage() {
  return (
    <>
      <div className="relative min-h-[200px] flex flex-col" style={{ background: 'linear-gradient(135deg, #0a2e1a 0%, #166534 60%, #15803d 100%)' }}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col flex-1">
          <ToolHeader />
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4 pb-8 pt-4">
            <h1 className="text-3xl font-bold text-white">About RealEstateCalculators.app</h1>
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-6">
          <p className="text-lg">
            RealEstateCalculators.app is a free suite of real estate tools built for buyers, sellers, homeowners, and investors who want fast, accurate calculations without signing up for anything or sharing personal data.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-[#e2e8f0]">Our Mission</h2>
          <p>
            Real estate is one of the most important financial decisions most people make in their lives. We believe everyone deserves access to the same analytical tools that professional real estate agents and investors use — for free, without any strings attached.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-[#e2e8f0]">What We Offer</h2>
          <ul className="space-y-2">
            {[
              { href: '/', label: 'Mortgage Calculator', desc: 'Full PITI payment with taxes, insurance, PMI, and HOA' },
              { href: '/affordability', label: 'Home Affordability Calculator', desc: 'Maximum purchase price using 28/43 DTI guidelines' },
              { href: '/rent-vs-buy', label: 'Rent vs Buy Calculator', desc: 'True cost comparison with break-even analysis' },
              { href: '/closing-costs', label: 'Closing Costs Calculator', desc: 'Buyer and seller fees for all 50 states' },
              { href: '/seller-net', label: 'Seller Net Proceeds Calculator', desc: 'Your take-home after commissions, costs, and taxes' },
              { href: '/investment-roi', label: 'Investment ROI Calculator', desc: 'Cap rate, cash-on-cash, NOI, and 5-year projection' },
              { href: '/cap-rate', label: 'Cap Rate Calculator', desc: 'Capitalization rate with full NOI breakdown' },
              { href: '/fix-flip', label: 'Fix & Flip Calculator', desc: '70% rule, hard money financing, and profit analysis' },
              { href: '/cash-on-cash', label: 'Cash on Cash Return Calculator', desc: 'Actual cash yield benchmarked against alternatives' },
              { href: '/mortgage-payoff', label: 'Mortgage Payoff Calculator', desc: 'Interest saved and years cut from extra payments' },
              { href: '/property-tax', label: 'Property Tax Calculator', desc: 'Annual tax estimates for all 50 states' },
            ].map(({ href, label, desc }) => (
              <li key={href}>
                <Link href={href} className="font-medium text-[#166534] dark:text-green-400 hover:underline">{label}</Link>
                <span className="text-gray-500 dark:text-gray-400"> — {desc}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-bold text-gray-900 dark:text-[#e2e8f0]">Privacy by Design</h2>
          <p>
            All calculations run entirely in your browser. We do not store, transmit, or analyze any of the numbers you enter. Your financial information stays on your device. We use Google Analytics to understand aggregate traffic patterns (not individual user behavior) and Google AdSense to serve ads that keep the site free.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-[#e2e8f0]">Data Sources</h2>
          <p>
            Our calculators use 2026 data including current mortgage rates, state property tax effective rates from the Tax Foundation and U.S. Census Bureau, state transfer tax rates, and standard industry closing cost benchmarks. All hardcoded data is reviewed and updated annually.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-[#e2e8f0]">Disclaimers</h2>
          <p>
            All calculators are for educational and planning purposes only. They do not constitute financial, legal, tax, or real estate advice. Results are estimates — actual costs, rates, and outcomes depend on your individual circumstances. Always consult licensed professionals for important financial decisions.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-[#e2e8f0]">Contact</h2>
          <p>
            Questions, suggestions, or feedback? We'd love to hear from you. See the{' '}
            <Link href="/" className="text-[#166534] dark:text-green-400 hover:underline">footer</Link>
            {' '}for contact information.
          </p>
        </div>
      </main>

      <Footer />
    </>
  )
}
