'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const tools = [
  { href: '/',               label: 'Mortgage' },
  { href: '/affordability',  label: 'Affordability' },
  { href: '/rent-vs-buy',    label: 'Rent vs Buy' },
  { href: '/closing-costs',  label: 'Closing Costs' },
  { href: '/seller-net',     label: 'Seller Net' },
  { href: '/investment-roi', label: 'Investment ROI' },
  { href: '/cap-rate',       label: 'Cap Rate' },
  { href: '/fix-flip',       label: 'Fix & Flip' },
  { href: '/cash-on-cash',   label: 'Cash on Cash' },
  { href: '/mortgage-payoff',label: 'Mortgage Payoff' },
  { href: '/property-tax',   label: 'Property Tax' },
]

export default function CalcNav() {
  const pathname = usePathname()
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const sync = () => setDarkMode(document.documentElement.classList.contains('dark'))
    sync()
    const obs = new MutationObserver(sync)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  const toggleDark = () => {
    const next = !darkMode
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('rec-theme', next ? 'dark' : 'light')
    } catch {
      // ignore
    }
  }

  const isClosingCostStatePage = pathname?.endsWith('-closing-costs')
  const isPropertyTaxStatePage = pathname?.endsWith('-property-tax-calculator')

  return (
    <nav aria-label="Real estate calculator navigation" className="px-4 sm:px-6 overflow-x-auto">
      <div className="flex items-center gap-1.5 py-3 max-w-[1600px] mx-auto">
        <div className="flex gap-1.5 flex-1 min-w-0 overflow-x-auto">
          {tools.map(({ href, label }) => {
            const isActive =
              pathname === href ||
              (href === '/closing-costs' && isClosingCostStatePage) ||
              (href === '/property-tax' && isPropertyTaxStatePage)
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-white text-[#166534] shadow-sm'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </div>
        <button
          onClick={toggleDark}
          className="ml-2 shrink-0 p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  )
}
