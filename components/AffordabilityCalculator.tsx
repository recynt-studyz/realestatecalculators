'use client'

import { useState, useEffect } from 'react'
import AffiliateCTA from './AffiliateCTA'
import { STATE_LIST, STATE_PROPERTY_TAX_RATES } from '@/lib/stateData'

const CREDIT_RATES: Record<string, number> = {
  '760+':    6.50,
  '720-759': 6.75,
  '680-719': 7.00,
  '640-679': 7.50,
  '580-639': 8.25,
}

const LOAN_TYPES_AFFORD = [
  { key: 'conventional', label: 'Conventional', minDown: 3 },
  { key: 'fha',          label: 'FHA',          minDown: 3.5 },
  { key: 'va',           label: 'VA',           minDown: 0 },
]

const STORAGE_KEY = 'rec-affordability'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

function calcMaxLoan(monthlyPI: number, rate: number, term: number): number {
  if (rate <= 0) return monthlyPI * term * 12
  const r = rate / 12 / 100
  const n = term * 12
  return monthlyPI * (1 - Math.pow(1 + r, -n)) / r
}

function calcPayment(principal: number, annualRate: number, termYears: number): number {
  if (principal <= 0) return 0
  if (annualRate <= 0) return principal / (termYears * 12)
  const r = annualRate / 12 / 100
  const n = termYears * 12
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
}

export default function AffordabilityCalculator() {
  const [income, setIncome] = useState('95000')
  const [monthlyDebts, setMonthlyDebts] = useState('500')
  const [downPayment, setDownPayment] = useState('60000')
  const [creditScore, setCreditScore] = useState('720-759')
  const [stateCode, setStateCode] = useState('AZ')
  const [loanType, setLoanType] = useState('conventional')
  const [hoa, setHoa] = useState('0')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.income)       setIncome(p.income)
        if (p.monthlyDebts) setMonthlyDebts(p.monthlyDebts)
        if (p.downPayment)  setDownPayment(p.downPayment)
        if (p.creditScore)  setCreditScore(p.creditScore)
        if (p.stateCode)    setStateCode(p.stateCode)
        if (p.loanType)     setLoanType(p.loanType)
        if (p.hoa)          setHoa(p.hoa)
      }
    } catch { /* ignore */ }
  }, [])

  const save = (u: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...u }))
    } catch { /* ignore */ }
  }

  const annualIncome = parseFloat(income) || 0
  const monthlyIncome = annualIncome / 12
  const debts = parseFloat(monthlyDebts) || 0
  const dp = parseFloat(downPayment) || 0
  const moHoa = parseFloat(hoa) || 0
  const rate = CREDIT_RATES[creditScore] || 6.75
  const taxRate = STATE_PROPERTY_TAX_RATES[stateCode] || 1.0
  const annualIns = 1800
  const monthlyIns = annualIns / 12

  // Front-end DTI: 28% of gross monthly income
  const maxFrontEnd = monthlyIncome * 0.28
  // Back-end DTI: 43% of gross monthly income (subtract existing debts)
  const maxBackEnd = monthlyIncome * 0.43 - debts

  // Available PI from each constraint (after tax, insurance, HOA)
  const maxPIFront = maxFrontEnd - monthlyIns - moHoa
  const maxPIBack  = maxBackEnd  - monthlyIns - moHoa

  const maxPIFromFront = Math.max(0, maxPIFront)
  const maxPIFromBack  = Math.max(0, maxPIBack)
  const bindingPI = Math.min(maxPIFromFront, maxPIFromBack)
  const binding = maxPIFromBack < maxPIFromFront ? 'Back-end DTI' : 'Front-end DTI'

  const maxLoan = calcMaxLoan(bindingPI, rate, 30)
  const maxPrice = maxLoan + dp

  // Adjust for property tax (iterative approach - tax is % of home price)
  // Monthly tax = price * taxRate/100/12
  // PI = binding - tax - ins - hoa
  // More accurate: solve for price where PI = calcPayment(price - dp, rate, 30) and tax = price*taxRate/100/12
  // price ≈ (maxLoan_from_PI_adj + dp) where PI_adj = bindingPI - (price * taxRate/100/12)
  // Approximate: reduce maxPrice by estimated tax impact
  const adjMaxPrice = Math.max(0, maxPrice - (maxPrice * taxRate / 100 / 12) * 12 / rate * 0.5)

  const priceConservative = Math.round(adjMaxPrice / 5000) * 5000
  const priceModerate  = Math.round(priceConservative * 1.10 / 5000) * 5000
  const priceAggressive = Math.round(priceConservative * 1.21 / 5000) * 5000

  function monthlyAtPrice(price: number) {
    const loan = Math.max(0, price - dp)
    const pi = calcPayment(loan, rate, 30)
    const tax = price * taxRate / 100 / 12
    const pmiRate = dp / price < 0.20 ? 0.65 : 0
    const pmi = loan * pmiRate / 100 / 12
    return { total: pi + tax + monthlyIns + moHoa + pmi, pi, tax }
  }

  const conservative = monthlyAtPrice(priceConservative)
  const moderate      = monthlyAtPrice(priceModerate)
  const aggressive    = monthlyAtPrice(priceAggressive)

  // Down payment scenarios
  function maxPriceAtDownPct(pct: number) {
    const dpAmt = priceConservative * pct / 100
    const pmiRate = pct < 20 ? 0.65 : 0
    // Rough: loan = price - dpAmt, PI + tax + ins + pmi = bindingPI
    // Iterative
    let price = maxLoan + dpAmt
    for (let i = 0; i < 5; i++) {
      const loan = price - dpAmt
      const tax  = price * taxRate / 100 / 12
      const pmi  = loan * pmiRate / 100 / 12
      const piAvail = bindingPI - tax - pmi
      const newLoan = calcMaxLoan(Math.max(0, piAvail), rate, 30)
      price = newLoan + dpAmt
    }
    return Math.round(Math.max(0, price) / 5000) * 5000
  }

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#166534]'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INPUTS */}
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Annual Gross Income</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={income} min="0" placeholder="95000"
                onChange={e => { setIncome(e.target.value); save({ income: e.target.value }) }}
                className={`${inputCls} pl-7`} />
            </div>
          </div>

          <div>
            <label className={labelCls}>Monthly Debt Payments (car, student loans, cards)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={monthlyDebts} min="0" placeholder="500"
                onChange={e => { setMonthlyDebts(e.target.value); save({ monthlyDebts: e.target.value }) }}
                className={`${inputCls} pl-7`} />
            </div>
          </div>

          <div>
            <label className={labelCls}>Down Payment Available</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={downPayment} min="0"
                onChange={e => { setDownPayment(e.target.value); save({ downPayment: e.target.value }) }}
                className={`${inputCls} pl-7`} />
            </div>
          </div>

          <div>
            <label className={labelCls}>Credit Score</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.keys(CREDIT_RATES).map(score => (
                <button key={score}
                  onClick={() => { setCreditScore(score); save({ creditScore: score }) }}
                  className={`px-2 py-2 rounded-lg text-xs font-medium transition-colors ${
                    creditScore === score
                      ? 'bg-[#166534] text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}>
                  {score}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Estimated rate: {CREDIT_RATES[creditScore]}%
            </p>
          </div>

          <div>
            <label className={labelCls}>State</label>
            <select value={stateCode}
              onChange={e => { setStateCode(e.target.value); save({ stateCode: e.target.value }) }}
              className={inputCls}>
              {STATE_LIST.map(s => <option key={s.abbr} value={s.abbr}>{s.name} ({s.propertyTaxRate}%)</option>)}
            </select>
          </div>

          <div>
            <label className={labelCls}>Loan Type</label>
            <div className="grid grid-cols-3 gap-2">
              {LOAN_TYPES_AFFORD.map(lt => (
                <button key={lt.key}
                  onClick={() => { setLoanType(lt.key); save({ loanType: lt.key }) }}
                  className={`px-2 py-2 rounded-lg text-xs font-medium transition-colors ${
                    loanType === lt.key
                      ? 'bg-[#166534] text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}>
                  {lt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls}>Monthly HOA (if applicable)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={hoa} min="0"
                onChange={e => { setHoa(e.target.value); save({ hoa: e.target.value }) }}
                className={`${inputCls} pl-7`} />
            </div>
          </div>
        </div>

        {/* RESULTS */}
        <div className="space-y-4">
          <div className="rounded-xl bg-[#166534]/10 dark:bg-[#166534]/20 border border-[#166534]/30 p-5">
            <p className="text-sm text-[#166534] dark:text-green-300 font-medium mb-1">YOU CAN AFFORD UP TO</p>
            <p className="text-4xl font-bold text-[#166534] dark:text-green-200">{fmt(priceConservative)}</p>
            <p className="text-xs text-[#166534]/70 dark:text-green-400 mt-1">Binding constraint: {binding}</p>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Monthly Payment at {fmt(priceConservative)}</p>
            <div className="space-y-2">
              {[
                { label: 'Principal & Interest', val: `${fmt(conservative.pi)}/mo` },
                { label: `Property Tax (${taxRate}%)`, val: `${fmt(conservative.tax)}/mo` },
                { label: 'Home Insurance', val: `${fmt(monthlyIns)}/mo` },
                { label: 'Total', val: `${fmt(conservative.total)}/mo`, bold: true },
                { label: '% of gross income', val: `${((conservative.total / monthlyIncome) * 100).toFixed(1)}%`, bold: true },
              ].map(({ label, val, bold }) => (
                <div key={label} className={`flex justify-between text-sm ${bold ? 'border-t border-gray-100 dark:border-gray-700 pt-2 mt-1 font-semibold' : ''}`}>
                  <span className={bold ? 'text-gray-800 dark:text-[#e2e8f0]' : 'text-gray-600 dark:text-gray-400'}>{label}</span>
                  <span className={bold ? 'text-[#166534] dark:text-green-300' : 'text-gray-800 dark:text-[#e2e8f0]'}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Price Range Options</p>
            <div className="space-y-3">
              {[
                { label: 'Conservative', price: priceConservative, mo: conservative.total, note: 'Recommended — stays within 28% DTI' },
                { label: 'Moderate',     price: priceModerate,     mo: moderate.total,      note: 'Stretching budget slightly' },
                { label: 'Aggressive',   price: priceAggressive,   mo: aggressive.total,    note: 'Maximum — leaves little cushion' },
              ].map(({ label, price, mo, note }) => (
                <div key={label} className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-[#e2e8f0]">{label}: {fmt(price)}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{note}</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">{fmt(mo)}/mo</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Down Payment Scenarios</p>
            <div className="space-y-2">
              {[
                { pct: 5,  label: '5% down', note: 'PMI required' },
                { pct: 10, label: '10% down', note: 'PMI required' },
                { pct: 20, label: '20% down', note: 'No PMI ✓' },
              ].map(({ pct, label, note }) => (
                <div key={pct} className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{label} <span className="text-xs text-gray-400">({note})</span></span>
                  <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">max {fmt(maxPriceAtDownPct(pct))}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AffiliateCTA variant="buyer" />

      <p className="mt-4 text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
        These calculators provide estimates for educational purposes only. Real estate markets, mortgage rates, and costs vary by location and change frequently. Consult a licensed real estate agent, mortgage lender, or financial advisor before making any real estate decisions.
      </p>
    </div>
  )
}
