'use client'

import { useState, useEffect } from 'react'
import { STATE_LIST } from '@/lib/stateData'

const STORAGE_KEY = 'rec-propertytax'
const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)
const fmtPct = (v: number, d = 2) => `${v.toFixed(d)}%`

export default function PropertyTaxCalculator() {
  const [homeValue,         setHomeValue]         = useState('400000')
  const [stateCode,         setStateCode]         = useState('AZ')
  const [assessmentRatio,   setAssessmentRatio]   = useState('100')
  const [homesteadExemption,setHomesteadExemption]= useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.homeValue)          setHomeValue(p.homeValue)
        if (p.stateCode)          setStateCode(p.stateCode)
        if (p.assessmentRatio)    setAssessmentRatio(p.assessmentRatio)
        if (p.homesteadExemption !== undefined) setHomesteadExemption(p.homesteadExemption)
      }
    } catch { /* ignore */ }
  }, [])

  const save = (u: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...u }))
    } catch { /* ignore */ }
  }

  const value    = parseFloat(homeValue) || 0
  const ratio    = (parseFloat(assessmentRatio) || 100) / 100
  const state    = STATE_LIST.find(s => s.abbr === stateCode)
  const rate     = state?.propertyTaxRate || 1.0
  const exemption = homesteadExemption ? (state?.homesteadExemption || 0) : 0

  const assessedValue = value * ratio
  const taxableValue  = Math.max(0, assessedValue - exemption)
  const annualTax     = taxableValue * rate / 100
  const monthlyTax    = annualTax / 12

  // State comparisons
  const lowestState  = STATE_LIST.reduce((a, b) => a.propertyTaxRate < b.propertyTaxRate ? a : b)
  const highestState = STATE_LIST.reduce((a, b) => a.propertyTaxRate > b.propertyTaxRate ? a : b)
  const nationalAvgRate = 1.1
  const nationalAvgTax = value * nationalAvgRate / 100

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#166534]'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INPUTS */}
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Home Value</label>
            <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={homeValue} min="0" onChange={e => { setHomeValue(e.target.value); save({ homeValue: e.target.value }) }} className={`${inputCls} pl-7`} /></div>
          </div>

          <div>
            <label className={labelCls}>State</label>
            <select value={stateCode} onChange={e => { setStateCode(e.target.value); save({ stateCode: e.target.value }) }} className={inputCls}>
              {STATE_LIST.map(s => (
                <option key={s.abbr} value={s.abbr}>{s.name} — {fmtPct(s.propertyTaxRate)} effective rate</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelCls}>Assessment Ratio (%)</label>
            <div className="relative">
              <input type="number" value={assessmentRatio} min="1" max="100" step="1"
                onChange={e => { setAssessmentRatio(e.target.value); save({ assessmentRatio: e.target.value }) }}
                className={`${inputCls} pr-8`} />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Most states assess at 100% of market value. Some states use a lower ratio.</p>
          </div>

          {state && state.homesteadExemption > 0 && (
            <div className="flex items-center gap-2">
              <input type="checkbox" id="homestead" checked={homesteadExemption}
                onChange={e => { setHomesteadExemption(e.target.checked); save({ homesteadExemption: e.target.checked }) }}
                className="rounded border-gray-300 w-4 h-4 accent-[#166534]" />
              <label htmlFor="homestead" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                Apply homestead exemption ({fmt(state.homesteadExemption)} reduction in assessed value)
              </label>
            </div>
          )}
        </div>

        {/* RESULTS */}
        <div className="space-y-4">
          <div className="rounded-xl bg-[#166534]/10 dark:bg-[#166534]/20 border border-[#166534]/30 p-5">
            <p className="text-sm text-[#166534] dark:text-green-300 font-medium mb-1">ESTIMATED ANNUAL PROPERTY TAX</p>
            <p className="text-4xl font-bold text-[#166534] dark:text-green-200">{fmt(annualTax)}</p>
            <p className="text-sm text-[#166534]/80 dark:text-green-400 mt-1">= {fmt(monthlyTax)}/month</p>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Calculation Details</p>
            <div className="space-y-2 text-sm">
              {[
                { label: 'Market Value',                val: fmt(value) },
                { label: `Assessment Ratio (${assessmentRatio}%)`, val: fmt(assessedValue) },
                ...(exemption > 0 ? [{ label: 'Homestead Exemption', val: `−${fmt(exemption)}` }] : []),
                { label: 'Taxable Value',               val: fmt(taxableValue), bold: true },
                { label: `Effective Rate (${state?.name || 'State'})`, val: fmtPct(rate) },
                { label: 'Annual Tax',                  val: fmt(annualTax), bold: true },
                { label: 'Monthly Tax',                 val: fmt(monthlyTax) },
              ].map(({ label, val, bold }) => (
                <div key={label} className={`flex justify-between ${bold ? 'border-t border-gray-100 dark:border-gray-700 pt-2 mt-1 font-semibold' : ''}`}>
                  <span className={bold ? 'text-gray-800 dark:text-[#e2e8f0]' : 'text-gray-600 dark:text-gray-400'}>{label}</span>
                  <span className={bold ? 'text-[#166534] dark:text-green-300' : 'text-gray-800 dark:text-[#e2e8f0]'}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">State Comparison (same {fmt(value)} home)</p>
            <div className="space-y-2 text-sm">
              {[
                { label: `${highestState.name} (highest)`, val: value * highestState.propertyTaxRate / 100, rate: highestState.propertyTaxRate },
                { label: 'National average',               val: nationalAvgTax, rate: nationalAvgRate },
                { label: state?.name || 'Your state',      val: annualTax, rate, highlight: true },
                { label: `${lowestState.name} (lowest)`,  val: value * lowestState.propertyTaxRate / 100, rate: lowestState.propertyTaxRate },
              ].map(({ label, val, rate: r, highlight }) => (
                <div key={label} className={`flex justify-between ${highlight ? 'font-semibold text-[#166534] dark:text-green-300' : ''}`}>
                  <span className={highlight ? '' : 'text-gray-600 dark:text-gray-400'}>{label} ({fmtPct(r)})</span>
                  <span>{fmt(val)}/yr</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
        Property tax estimates use state effective rates and are for educational purposes only. Actual property taxes are set by local tax authorities and may differ significantly. Consult your county assessor for your actual tax bill.
      </p>
    </div>
  )
}
