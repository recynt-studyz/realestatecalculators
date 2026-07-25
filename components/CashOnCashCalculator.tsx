'use client'

import { useState, useEffect } from 'react'
import AffiliateCTA from './AffiliateCTA'

const STORAGE_KEY = 'rec-cashoncash'
const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)
const fmtPct = (v: number, d = 1) => `${v.toFixed(d)}%`

export default function CashOnCashCalculator() {
  const [annualCashFlow, setAnnualCashFlow] = useState('8400')
  const [downPayment,    setDownPayment]    = useState('75000')
  const [closingCosts,   setClosingCosts]   = useState('5500')
  const [immediateRepairs,setImmediateRepairs]=useState('8000')
  const [otherUpfront,   setOtherUpfront]   = useState('0')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.annualCashFlow)    setAnnualCashFlow(p.annualCashFlow)
        if (p.downPayment)       setDownPayment(p.downPayment)
        if (p.closingCosts)      setClosingCosts(p.closingCosts)
        if (p.immediateRepairs)  setImmediateRepairs(p.immediateRepairs)
        if (p.otherUpfront)      setOtherUpfront(p.otherUpfront)
      }
    } catch { /* ignore */ }
  }, [])

  const save = (u: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...u }))
    } catch { /* ignore */ }
  }

  const cf      = parseFloat(annualCashFlow) || 0
  const dp      = parseFloat(downPayment) || 0
  const closing = parseFloat(closingCosts) || 0
  const repairs = parseFloat(immediateRepairs) || 0
  const other   = parseFloat(otherUpfront) || 0

  const totalCashInvested = dp + closing + repairs + other
  const cashOnCash = totalCashInvested > 0 ? (cf / totalCashInvested) * 100 : 0
  const monthlyCF  = cf / 12

  const comparisons = [
    { label: 'S&P 500 historical avg', val: 10.5, note: '50-year average' },
    { label: '10-year Treasury',       val: 4.5,  note: '2026 rate' },
    { label: 'HYSA (2026)',            val: 4.8,  note: 'High-yield savings' },
    { label: 'Your cash-on-cash',      val: cashOnCash, note: 'This investment', highlight: true },
  ]

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#166534]'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INPUTS */}
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Annual Pre-Tax Cash Flow</label>
            <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={annualCashFlow} onChange={e => { setAnnualCashFlow(e.target.value); save({ annualCashFlow: e.target.value }) }} className={`${inputCls} pl-7`} /></div>
            <p className="text-xs text-gray-400 mt-1">Net rent income minus all expenses and mortgage payments</p>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 p-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Total Cash Invested</p>
            {[
              { label: 'Down Payment', val: downPayment, setter: setDownPayment, key: 'downPayment' },
              { label: 'Closing Costs', val: closingCosts, setter: setClosingCosts, key: 'closingCosts' },
              { label: 'Immediate Repairs / Renovations', val: immediateRepairs, setter: setImmediateRepairs, key: 'immediateRepairs' },
              { label: 'Other Upfront Costs', val: otherUpfront, setter: setOtherUpfront, key: 'otherUpfront' },
            ].map(({ label, val, setter, key }) => (
              <div key={key}>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{label}</label>
                <div className="relative"><span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                  <input type="number" value={val} min="0" onChange={e => { setter(e.target.value); save({ [key]: e.target.value }) }}
                    className="w-full pl-6 pr-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-1 focus:ring-[#166534]" /></div>
              </div>
            ))}
            <div className="flex justify-between text-sm border-t border-gray-100 dark:border-gray-700 pt-2">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Total Cash Invested</span>
              <span className="font-semibold text-[#166534] dark:text-green-300">{fmt(totalCashInvested)}</span>
            </div>
          </div>
        </div>

        {/* RESULTS */}
        <div className="space-y-4">
          <div className="rounded-xl bg-[#166534]/10 dark:bg-[#166534]/20 border border-[#166534]/30 p-5">
            <p className="text-sm text-[#166534] dark:text-green-300 font-medium mb-1">CASH ON CASH RETURN</p>
            <p className="text-5xl font-bold text-[#166534] dark:text-green-200">{fmtPct(cashOnCash)}</p>
            <p className="text-xs text-[#166534]/70 dark:text-green-400 mt-2">
              {fmt(cf)} ÷ {fmt(totalCashInvested)} × 100
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Summary</p>
            <div className="space-y-2 text-sm">
              {[
                { label: 'Total Cash Invested',  val: fmt(totalCashInvested) },
                { label: 'Annual Cash Flow',     val: fmt(cf) },
                { label: 'Monthly Cash Flow',    val: fmt(monthlyCF) },
                { label: 'Cash-on-Cash Return',  val: fmtPct(cashOnCash), bold: true },
              ].map(({ label, val, bold }) => (
                <div key={label} className={`flex justify-between ${bold ? 'border-t border-gray-100 dark:border-gray-700 pt-2 mt-1 font-semibold' : ''}`}>
                  <span className={bold ? 'text-gray-800 dark:text-[#e2e8f0]' : 'text-gray-600 dark:text-gray-400'}>{label}</span>
                  <span className={bold ? 'text-[#166534] dark:text-green-300' : 'text-gray-800 dark:text-[#e2e8f0]'}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Investment comparison */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Return Comparison</p>
            <div className="space-y-3">
              {comparisons.map(({ label, val, note, highlight }) => (
                <div key={label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className={highlight ? 'font-semibold text-[#166534] dark:text-green-300' : 'text-gray-600 dark:text-gray-400'}>{label}</span>
                    <span className={`font-semibold ${highlight ? 'text-[#166534] dark:text-green-300' : 'text-gray-800 dark:text-[#e2e8f0]'}`}>{fmtPct(val)}</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${highlight ? 'bg-[#166534]' : 'bg-gray-300 dark:bg-gray-600'}`}
                      style={{ width: `${Math.min(100, val / 15 * 100)}%` }} />
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 p-4">
            <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
              Cash-on-cash measures only your actual cash return. It does not include property appreciation,
              equity buildup from principal paydown, or tax benefits. Total return typically exceeds cash-on-cash
              by 3–5% annually when these factors are included.
            </p>
          </div>
        </div>
      </div>

      <AffiliateCTA variant="investor" />

      <p className="mt-4 text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
        Cash-on-cash return provides estimates for educational purposes only. Actual returns depend on rental income, expenses, and market conditions. Consult a licensed real estate professional before investing.
      </p>
    </div>
  )
}
