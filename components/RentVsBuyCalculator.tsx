'use client'

import { useState, useEffect } from 'react'
import AffiliateCTA from './AffiliateCTA'
import { STATE_LIST, STATE_PROPERTY_TAX_RATES } from '@/lib/stateData'

const STORAGE_KEY = 'rec-rentbuy'

const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

function calcPayment(principal: number, annualRate: number, termYears: number): number {
  if (principal <= 0) return 0
  if (annualRate <= 0) return principal / (termYears * 12)
  const r = annualRate / 12 / 100
  const n = termYears * 12
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
}

export default function RentVsBuyCalculator() {
  const [homePrice, setHomePrice] = useState('400000')
  const [downPct, setDownPct] = useState('20')
  const [interestRate, setInterestRate] = useState('6.75')
  const [monthlyRent, setMonthlyRent] = useState('2200')
  const [yearsStay, setYearsStay] = useState('7')
  const [appreciation, setAppreciation] = useState('4')
  const [rentIncrease, setRentIncrease] = useState('3')
  const [stateCode, setStateCode] = useState('AZ')
  const [taxRate, setTaxRate] = useState('22')
  const [investReturn, setInvestReturn] = useState('7')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.homePrice)    setHomePrice(p.homePrice)
        if (p.downPct)      setDownPct(p.downPct)
        if (p.interestRate) setInterestRate(p.interestRate)
        if (p.monthlyRent)  setMonthlyRent(p.monthlyRent)
        if (p.yearsStay)    setYearsStay(p.yearsStay)
        if (p.appreciation) setAppreciation(p.appreciation)
        if (p.rentIncrease) setRentIncrease(p.rentIncrease)
        if (p.stateCode)    setStateCode(p.stateCode)
        if (p.taxRate)      setTaxRate(p.taxRate)
        if (p.investReturn) setInvestReturn(p.investReturn)
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
  const dp = price * (parseFloat(downPct) || 20) / 100
  const loan = price - dp
  const rate = parseFloat(interestRate) || 6.75
  const rent = parseFloat(monthlyRent) || 0
  const years = Math.max(1, Math.min(30, parseFloat(yearsStay) || 7))
  const apprRate = (parseFloat(appreciation) || 4) / 100
  const rentGrowth = (parseFloat(rentIncrease) || 3) / 100
  const margTaxRate = (parseFloat(taxRate) || 22) / 100
  const invReturn = (parseFloat(investReturn) || 7) / 100
  const propTaxRate = STATE_PROPERTY_TAX_RATES[stateCode] || 1.0

  // BUYING costs
  const pi = calcPayment(loan, rate, 30)
  const monthlyTax = price * propTaxRate / 100 / 12
  const monthlyIns = 150
  const maintenance = price * 0.01 / 12
  const closingCosts = price * 0.03
  const monthlyRate = rate / 12 / 100

  // Monthly mortgage interest (approximate first year)
  const monthlyInterest = loan * monthlyRate
  const taxDeduction = monthlyInterest * margTaxRate

  const monthlyBuy = pi + monthlyTax + monthlyIns + maintenance - taxDeduction

  // 5-year analysis (year by year)
  let totalCostBuy = closingCosts
  let totalCostRent = 0
  let balance = loan
  let currentRent = rent
  let dpCompounding = dp * Math.pow(1 + invReturn, years) - dp  // opportunity cost

  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      const interest = balance * monthlyRate
      const prin = pi - interest
      balance -= prin
      if (balance < 0) balance = 0
    }
    totalCostBuy += monthlyBuy * 12
    totalCostRent += currentRent * 12
    currentRent *= (1 + rentGrowth)
  }

  const sellingCosts = price * Math.pow(1 + apprRate, years) * 0.06
  const finalHomeValue = price * Math.pow(1 + apprRate, years)
  const equity = finalHomeValue - balance - sellingCosts
  const appreciation$ = finalHomeValue - price

  const netBuyCost = totalCostBuy - equity + dpCompounding
  const netRentCost = totalCostRent + (price * 0.02) // renters insurance + security deposit

  const buyWins = netBuyCost < netRentCost
  const savings = Math.abs(netBuyCost - netRentCost)

  // Break-even calculation (binary search)
  let breakEvenYears = 0
  for (let y = 1; y <= 30; y++) {
    let tBuy = closingCosts, tRent = 0, bal = loan, cr = rent
    for (let yr = 1; yr <= y; yr++) {
      for (let m = 0; m < 12; m++) {
        const int = bal * monthlyRate
        bal -= (pi - int)
        if (bal < 0) bal = 0
      }
      tBuy += monthlyBuy * 12
      tRent += cr * 12
      cr *= (1 + rentGrowth)
    }
    const fv = price * Math.pow(1 + apprRate, y)
    const sc = fv * 0.06
    const eq = fv - bal - sc
    const dpOpp = dp * Math.pow(1 + invReturn, y) - dp
    if (tBuy - eq + dpOpp < tRent) {
      breakEvenYears = y
      break
    }
  }

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#166534]'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INPUTS */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Home Purchase Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={homePrice} min="0"
                  onChange={e => { setHomePrice(e.target.value); save({ homePrice: e.target.value }) }}
                  className={`${inputCls} pl-7`} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Down Payment (%)</label>
              <div className="relative">
                <input type="number" value={downPct} min="0" max="100" step="1"
                  onChange={e => { setDownPct(e.target.value); save({ downPct: e.target.value }) }}
                  className={`${inputCls} pr-8`} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Interest Rate (%)</label>
              <div className="relative">
                <input type="number" value={interestRate} min="0" step="0.125"
                  onChange={e => { setInterestRate(e.target.value); save({ interestRate: e.target.value }) }}
                  className={`${inputCls} pr-8`} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
              </div>
            </div>
            <div>
              <label className={labelCls}>Monthly Rent Alternative</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={monthlyRent} min="0"
                  onChange={e => { setMonthlyRent(e.target.value); save({ monthlyRent: e.target.value }) }}
                  className={`${inputCls} pl-7`} />
              </div>
            </div>
          </div>

          <div>
            <label className={labelCls}>Years Planning to Stay: {yearsStay}</label>
            <input type="range" value={yearsStay} min="1" max="30" step="1"
              onChange={e => { setYearsStay(e.target.value); save({ yearsStay: e.target.value }) }}
              className="w-full accent-[#166534]" />
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>1 yr</span><span>30 yrs</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Annual Appreciation (%)</label>
              <div className="relative">
                <input type="number" value={appreciation} min="0" step="0.5"
                  onChange={e => { setAppreciation(e.target.value); save({ appreciation: e.target.value }) }}
                  className={`${inputCls} pr-8`} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
              </div>
            </div>
            <div>
              <label className={labelCls}>Annual Rent Increase (%)</label>
              <div className="relative">
                <input type="number" value={rentIncrease} min="0" step="0.5"
                  onChange={e => { setRentIncrease(e.target.value); save({ rentIncrease: e.target.value }) }}
                  className={`${inputCls} pr-8`} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
              </div>
            </div>
          </div>

          <div>
            <label className={labelCls}>State (property tax)</label>
            <select value={stateCode}
              onChange={e => { setStateCode(e.target.value); save({ stateCode: e.target.value }) }}
              className={inputCls}>
              {STATE_LIST.map(s => <option key={s.abbr} value={s.abbr}>{s.name}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Marginal Tax Rate (%)</label>
              <div className="relative">
                <input type="number" value={taxRate} min="0" max="50" step="1"
                  onChange={e => { setTaxRate(e.target.value); save({ taxRate: e.target.value }) }}
                  className={`${inputCls} pr-8`} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
              </div>
            </div>
            <div>
              <label className={labelCls}>Investment Return (%)</label>
              <div className="relative">
                <input type="number" value={investReturn} min="0" step="0.5"
                  onChange={e => { setInvestReturn(e.target.value); save({ investReturn: e.target.value }) }}
                  className={`${inputCls} pr-8`} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS */}
        <div className="space-y-4">
          <div className={`rounded-xl p-5 border ${buyWins ? 'bg-[#166534]/10 dark:bg-[#166534]/20 border-[#166534]/30' : 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/40'}`}>
            <p className={`text-sm font-medium mb-1 ${buyWins ? 'text-[#166534] dark:text-green-300' : 'text-blue-700 dark:text-blue-300'}`}>
              VERDICT AFTER {years} YEARS
            </p>
            <p className={`text-3xl font-bold ${buyWins ? 'text-[#166534] dark:text-green-200' : 'text-blue-700 dark:text-blue-200'}`}>
              {buyWins ? 'BUYING WINS' : 'RENTING WINS'}
            </p>
            <p className={`text-sm mt-1 ${buyWins ? 'text-[#166534]/80 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`}>
              {buyWins ? 'Buying saves' : 'Renting saves'} {fmt(savings)} over {years} years
            </p>
          </div>

          {breakEvenYears > 0 && (
            <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 p-4">
              <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">Break-Even Point</p>
              <p className="text-sm text-amber-700 dark:text-amber-400">
                If you stay less than <strong>{breakEvenYears} years</strong>: renting is better.<br />
                If you stay more than <strong>{breakEvenYears} years</strong>: buying wins.
              </p>
            </div>
          )}

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Monthly Costs</p>
            <div className="space-y-2">
              {[
                { label: `Monthly cost to BUY`, val: fmt(monthlyBuy), sub: '(P&I + tax + ins + maintenance − tax deduction)' },
                { label: `Monthly cost to RENT`, val: fmt(rent), sub: '(rent + renters insurance)' },
                { label: 'Monthly premium to buy', val: fmt(monthlyBuy - rent) },
              ].map(({ label, val, sub }) => (
                <div key={label} className="flex justify-between text-sm items-start">
                  <div>
                    <span className="text-gray-700 dark:text-gray-300">{label}</span>
                    {sub && <p className="text-xs text-gray-400">{sub}</p>}
                  </div>
                  <span className="font-semibold text-gray-800 dark:text-[#e2e8f0] whitespace-nowrap ml-2">{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">{years}-Year Summary (Buying)</p>
            <div className="space-y-2">
              {[
                { label: 'Home value at end', val: fmt(finalHomeValue) },
                { label: 'Equity gained (net of selling costs)', val: fmt(equity), green: true },
                { label: 'Appreciation', val: fmt(appreciation$), green: true },
                { label: 'Total housing costs paid', val: fmt(totalCostBuy) },
              ].map(({ label, val, green }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{label}</span>
                  <span className={`font-medium ${green ? 'text-[#166534] dark:text-green-300' : 'text-gray-800 dark:text-[#e2e8f0]'}`}>{val}</span>
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
