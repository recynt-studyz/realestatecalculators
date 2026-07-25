'use client'

import { useState, useEffect } from 'react'
import AffiliateCTA from './AffiliateCTA'
import { STATE_LIST, STATE_PROPERTY_TAX_RATES } from '@/lib/stateData'

const LOAN_TYPES = [
  { key: '30yr',  label: '30-yr Fixed', rate: 6.75, term: 30 },
  { key: '15yr',  label: '15-yr Fixed', rate: 6.10, term: 15 },
  { key: 'arm',   label: '5/1 ARM',     rate: 6.25, term: 30 },
  { key: 'fha',   label: 'FHA',         rate: 6.50, term: 30 },
  { key: 'va',    label: 'VA',          rate: 6.25, term: 30 },
  { key: 'jumbo', label: 'Jumbo',       rate: 7.00, term: 30 },
]

const TERM_OPTIONS = [30, 20, 15, 10]
const STORAGE_KEY = 'rec-mortgage'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)
const fmtD = (v: number, d = 2) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: d, maximumFractionDigits: d }).format(v)

function calcPayment(principal: number, annualRate: number, termYears: number): number {
  if (principal <= 0) return 0
  if (annualRate <= 0) return principal / (termYears * 12)
  const r = annualRate / 12 / 100
  const n = termYears * 12
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
}

function calcAmortizationYearly(principal: number, annualRate: number, termYears: number) {
  if (principal <= 0) return []
  const r = annualRate > 0 ? annualRate / 12 / 100 : 0
  const monthly = calcPayment(principal, annualRate, termYears)
  const rows: { year: number; payment: number; principal: number; interest: number; balance: number }[] = []
  let balance = principal
  for (let year = 1; year <= termYears && balance > 0.01; year++) {
    let yPrin = 0, yInt = 0, yPmt = 0
    for (let m = 0; m < 12 && balance > 0.01; m++) {
      const interest = balance * r
      const prin = Math.min(monthly - interest, balance)
      yPrin += prin; yInt += interest; yPmt += monthly
      balance -= prin
      if (balance < 0.01) balance = 0
    }
    rows.push({ year, payment: yPmt, principal: yPrin, interest: yInt, balance: Math.max(0, balance) })
  }
  return rows
}

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState('400000')
  const [downDollar, setDownDollar] = useState('80000')
  const [downPct, setDownPct] = useState('20')
  const [downMode, setDownMode] = useState<'dollar' | 'pct'>('dollar')
  const [loanType, setLoanType] = useState('30yr')
  const [interestRate, setInterestRate] = useState('6.75')
  const [term, setTerm] = useState(30)
  const [taxRate, setTaxRate] = useState('1.0')
  const [stateCode, setStateCode] = useState('')
  const [insurance, setInsurance] = useState('1800')
  const [hoa, setHoa] = useState('0')
  const [showAllAmort, setShowAllAmort] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.homePrice)    setHomePrice(p.homePrice)
        if (p.downDollar)   setDownDollar(p.downDollar)
        if (p.downPct)      setDownPct(p.downPct)
        if (p.downMode)     setDownMode(p.downMode)
        if (p.loanType)     setLoanType(p.loanType)
        if (p.interestRate) setInterestRate(p.interestRate)
        if (p.term)         setTerm(p.term)
        if (p.taxRate)      setTaxRate(p.taxRate)
        if (p.stateCode)    setStateCode(p.stateCode)
        if (p.insurance)    setInsurance(p.insurance)
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

  const price = parseFloat(homePrice) || 0

  let dpAmt: number, dpPct: number
  if (downMode === 'dollar') {
    dpAmt = parseFloat(downDollar) || 0
    dpPct = price > 0 ? (dpAmt / price) * 100 : 0
  } else {
    dpPct = parseFloat(downPct) || 0
    dpAmt = price * dpPct / 100
  }
  dpAmt = Math.min(dpAmt, price)
  dpPct = Math.min(dpPct, 100)

  const loanAmt = Math.max(0, price - dpAmt)
  const rate = parseFloat(interestRate) || 0

  const pi = calcPayment(loanAmt, rate, term)
  const effectiveTaxRate = parseFloat(taxRate) || 1.0
  const monthlyTax = price * effectiveTaxRate / 100 / 12
  const monthlyIns = (parseFloat(insurance) || 0) / 12
  const monthlyHoa = parseFloat(hoa) || 0

  const pmiRate = dpPct < 3 ? 1.5 : dpPct < 5 ? 1.25 : dpPct < 10 ? 1.0 : dpPct < 20 ? 0.65 : 0
  const monthlyPmi = pmiRate > 0 ? loanAmt * pmiRate / 100 / 12 : 0

  const totalMonthly = pi + monthlyTax + monthlyIns + monthlyHoa + monthlyPmi

  const amortRows = calcAmortizationYearly(loanAmt, rate, term)
  const totalInterest = amortRows.reduce((s, r) => s + r.interest, 0)
  const totalPI = amortRows.reduce((s, r) => s + r.payment, 0)

  const payoffDate = new Date()
  payoffDate.setMonth(payoffDate.getMonth() + term * 12)
  const payoffStr = payoffDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const recommendedIncome = totalMonthly > 0 ? (totalMonthly / 0.28) * 12 : 0

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#166534] dark:focus:ring-green-500'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  const displayRows = showAllAmort ? amortRows : amortRows.slice(0, 10)

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INPUTS */}
        <div className="space-y-4">
          {/* Home Price */}
          <div>
            <label className={labelCls}>Home Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={homePrice} min="0" placeholder="400000"
                onChange={e => { setHomePrice(e.target.value); save({ homePrice: e.target.value }) }}
                className={`${inputCls} pl-7`} />
            </div>
          </div>

          {/* Down Payment */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Down Payment</label>
              <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 text-xs">
                <button onClick={() => { setDownMode('dollar'); save({ downMode: 'dollar' }) }}
                  className={`px-3 py-1 transition ${downMode === 'dollar' ? 'bg-[#166534] text-white' : 'bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-300'}`}>
                  $
                </button>
                <button onClick={() => { setDownMode('pct'); save({ downMode: 'pct' }) }}
                  className={`px-3 py-1 transition ${downMode === 'pct' ? 'bg-[#166534] text-white' : 'bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-300'}`}>
                  %
                </button>
              </div>
            </div>
            {downMode === 'dollar' ? (
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={downDollar} min="0"
                  onChange={e => { setDownDollar(e.target.value); save({ downDollar: e.target.value }) }}
                  className={`${inputCls} pl-7`} />
              </div>
            ) : (
              <div className="relative">
                <input type="number" value={downPct} min="0" max="100" step="0.5"
                  onChange={e => { setDownPct(e.target.value); save({ downPct: e.target.value }) }}
                  className={`${inputCls} pr-8`} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
              </div>
            )}
            {price > 0 && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                = {fmt(dpAmt)} ({dpPct.toFixed(1)}% down) — Loan: {fmt(loanAmt)}
                {pmiRate > 0 && <span className="text-amber-600 dark:text-amber-400"> · PMI required</span>}
              </p>
            )}
          </div>

          {/* Loan Type */}
          <div>
            <label className={labelCls}>Loan Type</label>
            <div className="grid grid-cols-3 gap-2">
              {LOAN_TYPES.map(lt => (
                <button key={lt.key}
                  onClick={() => {
                    setLoanType(lt.key)
                    setInterestRate(lt.rate.toString())
                    setTerm(lt.term)
                    save({ loanType: lt.key, interestRate: lt.rate.toString(), term: lt.term })
                  }}
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

          {/* Rate and Term */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Interest Rate</label>
              <div className="relative">
                <input type="number" value={interestRate} min="0" max="30" step="0.125"
                  onChange={e => { setInterestRate(e.target.value); save({ interestRate: e.target.value }) }}
                  className={`${inputCls} pr-8`} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
              </div>
            </div>
            <div>
              <label className={labelCls}>Loan Term</label>
              <select value={term} onChange={e => { setTerm(Number(e.target.value)); save({ term: Number(e.target.value) }) }} className={inputCls}>
                {TERM_OPTIONS.map(t => <option key={t} value={t}>{t} years</option>)}
              </select>
            </div>
          </div>

          {/* Property Tax */}
          <div>
            <label className={labelCls}>Property Tax</label>
            <div className="grid grid-cols-2 gap-2">
              <select value={stateCode}
                onChange={e => {
                  const code = e.target.value
                  setStateCode(code)
                  if (code && STATE_PROPERTY_TAX_RATES[code]) {
                    const r = STATE_PROPERTY_TAX_RATES[code].toString()
                    setTaxRate(r)
                    save({ stateCode: code, taxRate: r })
                  } else {
                    save({ stateCode: code })
                  }
                }}
                className={`${inputCls} text-xs`}>
                <option value="">Select state</option>
                {STATE_LIST.map(s => <option key={s.abbr} value={s.abbr}>{s.name}</option>)}
              </select>
              <div className="relative">
                <input type="number" value={taxRate} min="0" step="0.01"
                  onChange={e => { setTaxRate(e.target.value); save({ taxRate: e.target.value }) }}
                  className={`${inputCls} pr-8`} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%/yr</span>
              </div>
            </div>
          </div>

          {/* Insurance and HOA */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Home Insurance ($/yr)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={insurance} min="0"
                  onChange={e => { setInsurance(e.target.value); save({ insurance: e.target.value }) }}
                  className={`${inputCls} pl-7`} />
              </div>
            </div>
            <div>
              <label className={labelCls}>HOA ($/mo)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={hoa} min="0"
                  onChange={e => { setHoa(e.target.value); save({ hoa: e.target.value }) }}
                  className={`${inputCls} pl-7`} />
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS */}
        <div className="space-y-4">
          {/* Main result */}
          <div className="rounded-xl bg-[#166534]/10 dark:bg-[#166534]/20 border border-[#166534]/30 p-5">
            <p className="text-sm text-[#166534] dark:text-green-300 font-medium mb-1">MONTHLY PAYMENT</p>
            <p className="text-4xl font-bold text-[#166534] dark:text-green-200">{fmt(totalMonthly)}</p>
          </div>

          {/* Breakdown */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Monthly Payment Breakdown</p>
            <div className="space-y-2">
              {[
                { label: 'Principal & Interest', val: fmtD(pi) },
                { label: `Property Tax (${effectiveTaxRate}%/yr)`, val: fmtD(monthlyTax) },
                { label: 'Home Insurance', val: fmtD(monthlyIns) },
                ...(monthlyHoa > 0 ? [{ label: 'HOA', val: fmtD(monthlyHoa) }] : []),
                ...(monthlyPmi > 0 ? [{ label: `PMI (${pmiRate}%/yr, until 20% equity)`, val: fmtD(monthlyPmi) }] : []),
              ].map(({ label, val }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{label}</span>
                  <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">{val}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm border-t border-gray-200 dark:border-gray-600 pt-2 mt-1">
                <span className="font-bold text-[#166534] dark:text-green-300">TOTAL</span>
                <span className="font-bold text-[#166534] dark:text-green-300">{fmtD(totalMonthly)}</span>
              </div>
            </div>
          </div>

          {/* Loan Summary */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Amortization Summary</p>
            <div className="space-y-2">
              {[
                { label: 'Loan Amount', val: fmt(loanAmt) },
                { label: 'Total P&I Paid', val: fmt(totalPI) },
                { label: 'Total Interest Paid', val: fmt(totalInterest) },
                { label: 'Payoff Date', val: payoffStr },
              ].map(({ label, val }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{label}</span>
                  <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Income recommendation */}
          {totalMonthly > 0 && (
            <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 p-4">
              <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">Affordability Check</p>
              <p className="text-sm text-amber-700 dark:text-amber-400">
                At {fmt(totalMonthly)}/month, recommended gross income is{' '}
                <strong>{fmt(recommendedIncome)}/year</strong>{' '}
                (28% front-end DTI rule).
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Affiliate CTA */}
      <AffiliateCTA variant="buyer" />

      {/* Amortization Table */}
      {amortRows.length > 0 && (
        <div className="mt-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-[#e2e8f0] mb-3">
            Year-by-Year Amortization Schedule
          </h3>
          <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-700">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 text-left">
                  {['Year', 'Payment', 'Principal', 'Interest', 'Balance'].map(h => (
                    <th key={h} className={`px-4 py-3 font-semibold text-gray-700 dark:text-gray-300 ${h !== 'Year' ? 'text-right' : ''}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {displayRows.map(row => (
                  <tr key={row.year} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{row.year}</td>
                    <td className="px-4 py-2 text-right text-gray-700 dark:text-gray-300">{fmt(row.payment)}</td>
                    <td className="px-4 py-2 text-right text-[#166534] dark:text-green-300">{fmt(row.principal)}</td>
                    <td className="px-4 py-2 text-right text-red-600 dark:text-red-400">{fmt(row.interest)}</td>
                    <td className="px-4 py-2 text-right text-gray-700 dark:text-gray-300">{fmt(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {amortRows.length > 10 && (
            <button onClick={() => setShowAllAmort(!showAllAmort)}
              className="mt-3 text-sm text-[#166534] dark:text-green-400 hover:underline">
              {showAllAmort ? '↑ Show fewer years' : `↓ Show all ${amortRows.length} years`}
            </button>
          )}
        </div>
      )}

      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
        These calculators provide estimates for educational purposes only. Real estate markets, mortgage rates, and costs vary by location and change frequently. Consult a licensed real estate agent, mortgage lender, or financial advisor before making any real estate decisions.
      </p>
    </div>
  )
}
