'use client'

import { useState, useEffect } from 'react'
import AffiliateCTA from './AffiliateCTA'

const STORAGE_KEY = 'rec-caprate'
const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)
const fmtPct = (v: number, d = 2) => `${v.toFixed(d)}%`

const BENCHMARKS = [
  { range: 'Under 4%',  label: 'Expensive market (NYC, SF)',      color: 'text-red-600 dark:text-red-400' },
  { range: '4–6%',      label: 'Moderate market, stable returns', color: 'text-amber-600 dark:text-amber-400' },
  { range: '6–8%',      label: 'Good returns',                    color: 'text-[#166534] dark:text-green-400' },
  { range: '8–10%',     label: 'Strong returns, higher risk area', color: 'text-blue-600 dark:text-blue-400' },
  { range: 'Over 10%',  label: 'High returns — investigate why',  color: 'text-purple-600 dark:text-purple-400' },
]

export default function CapRateCalculator() {
  const [propertyValue,  setPropertyValue]  = useState('500000')
  const [monthlyRent,    setMonthlyRent]    = useState('3000')
  const [vacancyRate,    setVacancyRate]    = useState('5')
  const [propertyTax,    setPropertyTax]    = useState('5000')
  const [insurance,      setInsurance]      = useState('2000')
  const [maintenance,    setMaintenance]    = useState('5000')
  const [mgmtPct,        setMgmtPct]        = useState('10')
  const [otherExpenses,  setOtherExpenses]  = useState('0')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.propertyValue)  setPropertyValue(p.propertyValue)
        if (p.monthlyRent)    setMonthlyRent(p.monthlyRent)
        if (p.vacancyRate)    setVacancyRate(p.vacancyRate)
        if (p.propertyTax)    setPropertyTax(p.propertyTax)
        if (p.insurance)      setInsurance(p.insurance)
        if (p.maintenance)    setMaintenance(p.maintenance)
        if (p.mgmtPct)        setMgmtPct(p.mgmtPct)
        if (p.otherExpenses)  setOtherExpenses(p.otherExpenses)
      }
    } catch { /* ignore */ }
  }, [])

  const save = (u: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...u }))
    } catch { /* ignore */ }
  }

  const value     = parseFloat(propertyValue) || 0
  const rent      = parseFloat(monthlyRent) || 0
  const vacancy   = parseFloat(vacancyRate) || 5
  const tax       = parseFloat(propertyTax) || 0
  const ins       = parseFloat(insurance) || 0
  const maint     = parseFloat(maintenance) || 0
  const mgmt      = parseFloat(mgmtPct) || 10
  const other     = parseFloat(otherExpenses) || 0

  const grossRent     = rent * 12
  const vacancyLoss   = grossRent * vacancy / 100
  const egi           = grossRent - vacancyLoss
  const mgmtExpense   = egi * mgmt / 100
  const totalExpenses = tax + ins + maint + mgmtExpense + other
  const noi           = egi - totalExpenses
  const capRate       = value > 0 ? (noi / value) * 100 : 0

  // Implied value at different cap rates
  const impliedValues = [
    { cr: 4, label: '4%' },
    { cr: 5, label: '5%' },
    { cr: 6, label: '6%' },
    { cr: 7, label: '7%' },
    { cr: 8, label: '8%' },
  ]

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#166534]'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  const benchmarkIdx = capRate < 4 ? 0 : capRate < 6 ? 1 : capRate < 8 ? 2 : capRate < 10 ? 3 : 4

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INPUTS */}
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Property Value</label>
            <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={propertyValue} min="0" onChange={e => { setPropertyValue(e.target.value); save({ propertyValue: e.target.value }) }} className={`${inputCls} pl-7`} /></div>
          </div>
          <div>
            <label className={labelCls}>Monthly Rent</label>
            <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={monthlyRent} min="0" onChange={e => { setMonthlyRent(e.target.value); save({ monthlyRent: e.target.value }) }} className={`${inputCls} pl-7`} /></div>
          </div>
          <div>
            <label className={labelCls}>Vacancy Rate (%)</label>
            <div className="relative">
              <input type="number" value={vacancyRate} min="0" max="50" step="0.5" onChange={e => { setVacancyRate(e.target.value); save({ vacancyRate: e.target.value }) }} className={`${inputCls} pr-8`} />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span></div>
          </div>
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 p-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Annual Operating Expenses</p>
            {[
              { label: 'Property Tax ($/yr)',       val: propertyTax,   setter: setPropertyTax,   key: 'propertyTax' },
              { label: 'Insurance ($/yr)',           val: insurance,     setter: setInsurance,     key: 'insurance' },
              { label: 'Maintenance ($/yr)',         val: maintenance,   setter: setMaintenance,   key: 'maintenance' },
              { label: 'Other Expenses ($/yr)',      val: otherExpenses, setter: setOtherExpenses, key: 'otherExpenses' },
            ].map(({ label, val, setter, key }) => (
              <div key={key}>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{label}</label>
                <div className="relative"><span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                  <input type="number" value={val} min="0" onChange={e => { setter(e.target.value); save({ [key]: e.target.value }) }}
                    className="w-full pl-6 pr-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-1 focus:ring-[#166534]" /></div>
              </div>
            ))}
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Property Management (%)</label>
              <div className="relative">
                <input type="number" value={mgmtPct} min="0" max="20" step="1" onChange={e => { setMgmtPct(e.target.value); save({ mgmtPct: e.target.value }) }}
                  className="w-full pr-8 py-1.5 px-3 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-1 focus:ring-[#166534]" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">%</span></div>
            </div>
          </div>
        </div>

        {/* RESULTS */}
        <div className="space-y-4">
          <div className="rounded-xl bg-[#166534]/10 dark:bg-[#166534]/20 border border-[#166534]/30 p-5">
            <p className="text-sm text-[#166534] dark:text-green-300 font-medium mb-1">CAP RATE</p>
            <p className="text-5xl font-bold text-[#166534] dark:text-green-200">{fmtPct(capRate, 1)}</p>
            <p className="text-xs text-[#166534]/70 dark:text-green-400 mt-2">
              NOI {fmt(noi)} ÷ Value {fmt(value)} × 100
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Income Statement</p>
            <div className="space-y-2 text-sm">
              {[
                { label: 'Gross Rental Income',          val: fmt(grossRent) },
                { label: `Vacancy Loss (${vacancy}%)`,   val: `−${fmt(vacancyLoss)}` },
                { label: 'Effective Gross Income',       val: fmt(egi), bold: true },
                { label: 'Property Tax',                 val: `−${fmt(tax)}` },
                { label: 'Insurance',                    val: `−${fmt(ins)}` },
                { label: 'Maintenance',                  val: `−${fmt(maint)}` },
                { label: `Property Management (${mgmt}%)`, val: `−${fmt(mgmtExpense)}` },
                ...(other > 0 ? [{ label: 'Other Expenses', val: `−${fmt(other)}` }] : []),
                { label: 'Total Expenses',               val: `−${fmt(totalExpenses)}` },
                { label: 'NET OPERATING INCOME',         val: fmt(noi), bold: true },
              ].map(({ label, val, bold }) => (
                <div key={label} className={`flex justify-between ${bold ? 'border-t border-gray-100 dark:border-gray-700 pt-2 mt-1 font-semibold' : ''}`}>
                  <span className={bold ? 'text-gray-800 dark:text-[#e2e8f0]' : 'text-gray-600 dark:text-gray-400'}>{label}</span>
                  <span className={bold ? 'text-[#166534] dark:text-green-300' : 'text-gray-800 dark:text-[#e2e8f0]'}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interpretation */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Cap Rate Interpretation</p>
            <div className="space-y-2">
              {BENCHMARKS.map((b, i) => (
                <div key={b.range} className={`flex items-center gap-2 text-sm ${i === benchmarkIdx ? 'font-semibold' : ''}`}>
                  <span className={i === benchmarkIdx ? '●' : '○'} />
                  <span className={b.color}>{b.range}: {b.label}</span>
                  {i === benchmarkIdx && <span className="text-xs bg-[#166534]/10 text-[#166534] dark:text-green-300 px-2 py-0.5 rounded-full">Your property</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Implied values */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Implied Property Value at Different Cap Rates</p>
            <div className="space-y-2">
              {impliedValues.map(({ cr, label }) => (
                <div key={cr} className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">At {label} cap rate</span>
                  <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">{noi > 0 ? fmt(noi / (cr / 100)) : '—'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AffiliateCTA variant="investor" />

      <p className="mt-4 text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
        Cap rate does not account for financing costs or mortgage payments. It represents the unlevered return on the property. Consult a licensed real estate professional before making investment decisions.
      </p>
    </div>
  )
}
