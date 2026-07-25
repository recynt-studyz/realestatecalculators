'use client'

import { useState, useEffect } from 'react'
import AffiliateCTA from './AffiliateCTA'

const STORAGE_KEY = 'rec-investment'
const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)
const fmtPct = (v: number, d = 1) => `${v.toFixed(d)}%`

function calcPayment(principal: number, annualRate: number, termYears: number): number {
  if (principal <= 0) return 0
  if (annualRate <= 0) return principal / (termYears * 12)
  const r = annualRate / 12 / 100
  const n = termYears * 12
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
}

export default function InvestmentROICalculator() {
  const [purchasePrice,  setPurchasePrice]  = useState('300000')
  const [downPct,        setDownPct]        = useState('25')
  const [closingCosts,   setClosingCosts]   = useState('6000')
  const [renovationCosts,setRenovationCosts]= useState('15000')
  const [interestRate,   setInterestRate]   = useState('7.25')
  const [monthlyRent,    setMonthlyRent]    = useState('2200')
  const [rentIncrease,   setRentIncrease]   = useState('3')
  const [vacancyRate,    setVacancyRate]    = useState('5')
  const [propertyTax,    setPropertyTax]    = useState('3000')
  const [propertyIns,    setPropertyIns]    = useState('1500')
  const [mgmtPct,        setMgmtPct]        = useState('10')
  const [maintenancePct, setMaintenancePct] = useState('1')
  const [hoaMonthly,     setHoaMonthly]     = useState('0')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.purchasePrice)   setPurchasePrice(p.purchasePrice)
        if (p.downPct)         setDownPct(p.downPct)
        if (p.closingCosts)    setClosingCosts(p.closingCosts)
        if (p.renovationCosts) setRenovationCosts(p.renovationCosts)
        if (p.interestRate)    setInterestRate(p.interestRate)
        if (p.monthlyRent)     setMonthlyRent(p.monthlyRent)
        if (p.rentIncrease)    setRentIncrease(p.rentIncrease)
        if (p.vacancyRate)     setVacancyRate(p.vacancyRate)
        if (p.propertyTax)     setPropertyTax(p.propertyTax)
        if (p.propertyIns)     setPropertyIns(p.propertyIns)
        if (p.mgmtPct)         setMgmtPct(p.mgmtPct)
        if (p.maintenancePct)  setMaintenancePct(p.maintenancePct)
        if (p.hoaMonthly)      setHoaMonthly(p.hoaMonthly)
      }
    } catch { /* ignore */ }
  }, [])

  const save = (u: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...u }))
    } catch { /* ignore */ }
  }

  const price   = parseFloat(purchasePrice) || 0
  const dpPct   = parseFloat(downPct) || 25
  const dp      = price * dpPct / 100
  const loan    = price - dp
  const rate    = parseFloat(interestRate) || 7.25
  const closing = parseFloat(closingCosts) || 0
  const reno    = parseFloat(renovationCosts) || 0

  const totalCashInvested = dp + closing + reno

  const rent      = parseFloat(monthlyRent) || 0
  const vacancy   = parseFloat(vacancyRate) || 5
  const mgmt      = parseFloat(mgmtPct) || 10
  const maint     = parseFloat(maintenancePct) || 1
  const tax       = parseFloat(propertyTax) || 0
  const ins       = parseFloat(propertyIns) || 0
  const hoa       = (parseFloat(hoaMonthly) || 0) * 12

  const annualRent        = rent * 12
  const vacancyLoss       = annualRent * vacancy / 100
  const effectiveGrossIncome = annualRent - vacancyLoss
  const mgmtExpense       = effectiveGrossIncome * mgmt / 100
  const maintExpense      = price * maint / 100
  const totalOpExpenses   = tax + ins + mgmtExpense + maintExpense + hoa
  const noi               = effectiveGrossIncome - totalOpExpenses
  const capRate           = price > 0 ? (noi / price) * 100 : 0

  const monthlyPI         = calcPayment(loan, rate, 30)
  const annualDebtService = monthlyPI * 12
  const annualCashFlow    = noi - annualDebtService
  const monthlyCashFlow   = annualCashFlow / 12
  const cashOnCash        = totalCashInvested > 0 ? (annualCashFlow / totalCashInvested) * 100 : 0
  const grm               = annualRent > 0 ? price / annualRent : 0
  const breakEvenOccupancy= annualRent > 0 ? ((totalOpExpenses + annualDebtService) / annualRent) * 100 : 0

  // 5-year projection
  const rentGrow = (parseFloat(rentIncrease) || 3) / 100
  const appreciation = 0.04
  const fiveYearData = Array.from({ length: 5 }, (_, i) => {
    const yr = i + 1
    const yrRent  = annualRent * Math.pow(1 + rentGrow, yr - 1)
    const yrCF    = (yrRent * (1 - vacancy / 100) - totalOpExpenses) - annualDebtService
    const yrEquity = monthlyPI * 12 * yr // simplified equity build
    const yrAppreciation = price * (Math.pow(1 + appreciation, yr) - 1)
    return { yr, cashFlow: yrCF, equity: yrEquity, appreciation: yrAppreciation }
  })

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#166534]'
  const labelCls = 'block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1'

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INPUTS */}
        <div className="space-y-4">
          {/* Purchase */}
          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Purchase</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Purchase Price</label>
                <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                  <input type="number" value={purchasePrice} min="0" onChange={e => { setPurchasePrice(e.target.value); save({ purchasePrice: e.target.value }) }} className={`${inputCls} pl-7 text-sm`} /></div>
              </div>
              <div>
                <label className={labelCls}>Down Payment (%)</label>
                <div className="relative">
                  <input type="number" value={downPct} min="0" max="100" step="1" onChange={e => { setDownPct(e.target.value); save({ downPct: e.target.value }) }} className={`${inputCls} pr-8 text-sm`} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">%</span></div>
              </div>
              <div>
                <label className={labelCls}>Closing Costs</label>
                <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                  <input type="number" value={closingCosts} min="0" onChange={e => { setClosingCosts(e.target.value); save({ closingCosts: e.target.value }) }} className={`${inputCls} pl-7 text-sm`} /></div>
              </div>
              <div>
                <label className={labelCls}>Renovation Costs</label>
                <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                  <input type="number" value={renovationCosts} min="0" onChange={e => { setRenovationCosts(e.target.value); save({ renovationCosts: e.target.value }) }} className={`${inputCls} pl-7 text-sm`} /></div>
              </div>
              <div>
                <label className={labelCls}>Interest Rate (investment)</label>
                <div className="relative">
                  <input type="number" value={interestRate} min="0" step="0.125" onChange={e => { setInterestRate(e.target.value); save({ interestRate: e.target.value }) }} className={`${inputCls} pr-8 text-sm`} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">%</span></div>
              </div>
            </div>
          </div>

          {/* Income */}
          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Income</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Monthly Rent</label>
                <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                  <input type="number" value={monthlyRent} min="0" onChange={e => { setMonthlyRent(e.target.value); save({ monthlyRent: e.target.value }) }} className={`${inputCls} pl-7 text-sm`} /></div>
              </div>
              <div>
                <label className={labelCls}>Annual Rent Increase (%)</label>
                <div className="relative">
                  <input type="number" value={rentIncrease} min="0" step="0.5" onChange={e => { setRentIncrease(e.target.value); save({ rentIncrease: e.target.value }) }} className={`${inputCls} pr-8 text-sm`} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">%</span></div>
              </div>
              <div>
                <label className={labelCls}>Vacancy Rate (%)</label>
                <div className="relative">
                  <input type="number" value={vacancyRate} min="0" max="50" step="0.5" onChange={e => { setVacancyRate(e.target.value); save({ vacancyRate: e.target.value }) }} className={`${inputCls} pr-8 text-sm`} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">%</span></div>
              </div>
            </div>
          </div>

          {/* Expenses */}
          <div>
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Annual Expenses</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Property Tax ($/yr)</label>
                <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                  <input type="number" value={propertyTax} min="0" onChange={e => { setPropertyTax(e.target.value); save({ propertyTax: e.target.value }) }} className={`${inputCls} pl-7 text-sm`} /></div>
              </div>
              <div>
                <label className={labelCls}>Insurance ($/yr)</label>
                <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                  <input type="number" value={propertyIns} min="0" onChange={e => { setPropertyIns(e.target.value); save({ propertyIns: e.target.value }) }} className={`${inputCls} pl-7 text-sm`} /></div>
              </div>
              <div>
                <label className={labelCls}>Property Mgmt (%)</label>
                <div className="relative">
                  <input type="number" value={mgmtPct} min="0" max="20" step="1" onChange={e => { setMgmtPct(e.target.value); save({ mgmtPct: e.target.value }) }} className={`${inputCls} pr-8 text-sm`} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">%</span></div>
              </div>
              <div>
                <label className={labelCls}>Maintenance (% of value)</label>
                <div className="relative">
                  <input type="number" value={maintenancePct} min="0" step="0.25" onChange={e => { setMaintenancePct(e.target.value); save({ maintenancePct: e.target.value }) }} className={`${inputCls} pr-8 text-sm`} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">%</span></div>
              </div>
              <div>
                <label className={labelCls}>HOA ($/mo)</label>
                <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                  <input type="number" value={hoaMonthly} min="0" onChange={e => { setHoaMonthly(e.target.value); save({ hoaMonthly: e.target.value }) }} className={`${inputCls} pl-7 text-sm`} /></div>
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS */}
        <div className="space-y-4">
          {/* Key metrics */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Cap Rate', val: fmtPct(capRate), good: capRate >= 5 },
              { label: 'Cash-on-Cash', val: fmtPct(cashOnCash), good: cashOnCash >= 6 },
              { label: 'Monthly Cash Flow', val: fmt(monthlyCashFlow), good: monthlyCashFlow > 0 },
              { label: 'Gross Rent Multiplier', val: `${grm.toFixed(1)}x`, good: grm < 15 },
            ].map(({ label, val, good }) => (
              <div key={label} className={`rounded-xl p-4 border ${good ? 'bg-[#166534]/10 border-[#166534]/30' : 'bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700'}`}>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
                <p className={`text-xl font-bold ${good ? 'text-[#166534] dark:text-green-300' : 'text-gray-700 dark:text-gray-300'}`}>{val}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Income Statement</p>
            <div className="space-y-2 text-sm">
              {[
                { label: 'Gross Rental Income',     val: fmt(annualRent) },
                { label: `Vacancy Loss (${vacancy}%)`, val: `−${fmt(vacancyLoss)}` },
                { label: 'Effective Gross Income',  val: fmt(effectiveGrossIncome), bold: true },
                { label: 'Property Tax',            val: `−${fmt(tax)}` },
                { label: 'Insurance',               val: `−${fmt(ins)}` },
                { label: `Property Mgmt (${mgmt}%)`,val: `−${fmt(mgmtExpense)}` },
                { label: `Maintenance (${maint}%)`, val: `−${fmt(maintExpense)}` },
                ...(hoa > 0 ? [{ label: 'HOA', val: `−${fmt(hoa)}` }] : []),
                { label: 'Net Operating Income',    val: fmt(noi), bold: true },
                { label: 'Annual Debt Service',     val: `−${fmt(annualDebtService)}` },
                { label: 'Annual Cash Flow',        val: fmt(annualCashFlow), bold: true },
              ].map(({ label, val, bold }) => (
                <div key={label} className={`flex justify-between ${bold ? 'border-t border-gray-100 dark:border-gray-700 pt-2 mt-1 font-semibold' : ''}`}>
                  <span className={bold ? 'text-gray-800 dark:text-[#e2e8f0]' : 'text-gray-600 dark:text-gray-400'}>{label}</span>
                  <span className={bold ? 'text-[#166534] dark:text-green-300' : 'text-gray-800 dark:text-[#e2e8f0]'}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Total Cash Invested</p>
            <p className="text-2xl font-bold text-[#166534] dark:text-green-300 mb-2">{fmt(totalCashInvested)}</p>
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <div className="flex justify-between"><span>Down payment ({dpPct}%)</span><span>{fmt(dp)}</span></div>
              <div className="flex justify-between"><span>Closing costs</span><span>{fmt(closing)}</span></div>
              <div className="flex justify-between"><span>Renovation</span><span>{fmt(reno)}</span></div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">5-Year Projection</p>
            <div className="space-y-2">
              {fiveYearData.map(({ yr, cashFlow, equity, appreciation }) => (
                <div key={yr} className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Year {yr}</span>
                  <div className="text-right text-xs text-gray-500 dark:text-gray-400">
                    <span className="text-[#166534] dark:text-green-300 font-medium">{fmt(cashFlow)} CF</span>
                    {' + '}{fmt(equity)} equity{' + '}{fmt(appreciation)} appr.
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 p-4">
            <p className="text-xs text-amber-700 dark:text-amber-400">
              <strong>Break-even occupancy:</strong> {fmtPct(Math.min(100, breakEvenOccupancy))} — your property breaks even at{' '}
              {fmtPct(Math.min(100, breakEvenOccupancy))} occupancy. At {fmtPct(100 - vacancy)} you generate{' '}
              {fmt(monthlyCashFlow)}/month cash flow.
            </p>
          </div>
        </div>
      </div>

      <AffiliateCTA variant="investor" />

      <p className="mt-4 text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
        These calculators provide estimates for educational purposes only. Investment property returns depend on many factors including market conditions, tenant quality, and unexpected expenses. Consult a licensed real estate professional before investing.
      </p>
    </div>
  )
}
