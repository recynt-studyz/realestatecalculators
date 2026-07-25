'use client'

import { useState, useEffect } from 'react'
import AffiliateCTA from './AffiliateCTA'
import { STATE_LIST, STATES } from '@/lib/stateData'

const STORAGE_KEY = 'rec-sellernet'
const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

export default function SellerNetCalculator() {
  const [salePrice,       setSalePrice]       = useState('450000')
  const [mortgageBalance, setMortgageBalance] = useState('280000')
  const [commission,      setCommission]      = useState('5.5')
  const [stateCode,       setStateCode]       = useState('AZ')
  const [closingCosts,    setClosingCosts]    = useState('3000')
  const [repairs,         setRepairs]         = useState('5000')
  const [hoaTransfer,     setHoaTransfer]     = useState('0')
  const [originalPrice,   setOriginalPrice]   = useState('320000')
  const [filingStatus,    setFilingStatus]    = useState<'single' | 'married'>('single')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.salePrice)       setSalePrice(p.salePrice)
        if (p.mortgageBalance) setMortgageBalance(p.mortgageBalance)
        if (p.commission)      setCommission(p.commission)
        if (p.stateCode)       setStateCode(p.stateCode)
        if (p.closingCosts)    setClosingCosts(p.closingCosts)
        if (p.repairs)         setRepairs(p.repairs)
        if (p.hoaTransfer)     setHoaTransfer(p.hoaTransfer)
        if (p.originalPrice)   setOriginalPrice(p.originalPrice)
        if (p.filingStatus)    setFilingStatus(p.filingStatus)
      }
    } catch { /* ignore */ }
  }, [])

  const save = (u: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...u }))
    } catch { /* ignore */ }
  }

  const price    = parseFloat(salePrice) || 0
  const balance  = parseFloat(mortgageBalance) || 0
  const commPct  = parseFloat(commission) || 5.5
  const state    = STATES[stateCode]
  const closing  = parseFloat(closingCosts) || 0
  const repairAmt= parseFloat(repairs) || 0
  const hoaFee   = parseFloat(hoaTransfer) || 0
  const origPrice= parseFloat(originalPrice) || 0

  const commissionAmt  = price * commPct / 100
  const transferTax    = state ? price * state.transferTaxRate / 100 : 0
  const titleInsurance = price * 0.006
  const titleAmt       = state?.titlePayer === 'seller' ? titleInsurance : 0

  const totalDeductions = balance + commissionAmt + closing + repairAmt + hoaFee + transferTax + titleAmt
  const netProceeds     = price - totalDeductions

  // Capital gains
  const gain            = price - origPrice
  const exclusion       = filingStatus === 'married' ? 500000 : 250000
  const taxableGain     = Math.max(0, gain - exclusion)

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#166534]'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  const lineItems = [
    { label: 'Sale Price', val: price, sign: '' },
    { label: 'Mortgage Payoff', val: balance, sign: '−' },
    { label: `Agent Commission (${commPct}%)`, val: commissionAmt, sign: '−' },
    { label: 'Closing Costs', val: closing, sign: '−' },
    { label: 'Repairs / Staging', val: repairAmt, sign: '−' },
    { label: 'HOA Transfer Fee', val: hoaFee, sign: '−', show: hoaFee > 0 },
    { label: `Transfer Tax (${state ? state.transferTaxRate.toFixed(2) : '0.00'}%)`, val: transferTax, sign: '−', show: transferTax > 0 },
    { label: 'Owner\'s Title Insurance', val: titleAmt, sign: '−', show: titleAmt > 0 },
  ].filter(i => i.show !== false)

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INPUTS */}
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Sale Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={salePrice} min="0"
                onChange={e => { setSalePrice(e.target.value); save({ salePrice: e.target.value }) }}
                className={`${inputCls} pl-7`} />
            </div>
          </div>

          <div>
            <label className={labelCls}>Remaining Mortgage Balance</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={mortgageBalance} min="0"
                onChange={e => { setMortgageBalance(e.target.value); save({ mortgageBalance: e.target.value }) }}
                className={`${inputCls} pl-7`} />
            </div>
          </div>

          <div>
            <label className={labelCls}>Agent Commission (%)</label>
            <div className="relative">
              <input type="number" value={commission} min="0" max="10" step="0.25"
                onChange={e => { setCommission(e.target.value); save({ commission: e.target.value }) }}
                className={`${inputCls} pr-8`} />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
            </div>
          </div>

          <div>
            <label className={labelCls}>State</label>
            <select value={stateCode}
              onChange={e => { setStateCode(e.target.value); save({ stateCode: e.target.value }) }}
              className={inputCls}>
              {STATE_LIST.map(s => <option key={s.abbr} value={s.abbr}>{s.name}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Seller Closing Costs</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={closingCosts} min="0"
                  onChange={e => { setClosingCosts(e.target.value); save({ closingCosts: e.target.value }) }}
                  className={`${inputCls} pl-7`} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Repairs / Staging</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={repairs} min="0"
                  onChange={e => { setRepairs(e.target.value); save({ repairs: e.target.value }) }}
                  className={`${inputCls} pl-7`} />
              </div>
            </div>
          </div>

          <div>
            <label className={labelCls}>HOA Transfer Fee</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={hoaTransfer} min="0"
                onChange={e => { setHoaTransfer(e.target.value); save({ hoaTransfer: e.target.value }) }}
                className={`${inputCls} pl-7`} />
            </div>
          </div>

          <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Capital Gains Analysis</p>
            <div>
              <label className={labelCls}>Original Purchase Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={originalPrice} min="0"
                  onChange={e => { setOriginalPrice(e.target.value); save({ originalPrice: e.target.value }) }}
                  className={`${inputCls} pl-7`} />
              </div>
            </div>
            <div className="mt-3">
              <label className={labelCls}>Filing Status</label>
              <div className="flex gap-2">
                {(['single', 'married'] as const).map(s => (
                  <button key={s} onClick={() => { setFilingStatus(s); save({ filingStatus: s }) }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                      filingStatus === s ? 'bg-[#166534] text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}>
                    {s === 'married' ? 'Married' : 'Single'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS */}
        <div className="space-y-4">
          <div className="rounded-xl bg-[#166534]/10 dark:bg-[#166534]/20 border border-[#166534]/30 p-5">
            <p className="text-sm text-[#166534] dark:text-green-300 font-medium mb-1">YOUR NET PROCEEDS</p>
            <p className={`text-4xl font-bold ${netProceeds >= 0 ? 'text-[#166534] dark:text-green-200' : 'text-red-600 dark:text-red-400'}`}>
              {fmt(netProceeds)}
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] divide-y divide-gray-100 dark:divide-gray-700">
            {lineItems.map(({ label, val, sign }) => (
              <div key={label} className="flex justify-between px-4 py-3 text-sm">
                <span className="text-gray-600 dark:text-gray-400">{label}</span>
                <span className={`font-medium ${sign === '−' ? 'text-red-600 dark:text-red-400' : 'text-gray-800 dark:text-[#e2e8f0]'}`}>
                  {sign}{fmt(val)}
                </span>
              </div>
            ))}
            <div className="flex justify-between px-4 py-3 bg-[#166534]/5 dark:bg-[#166534]/10">
              <span className="font-bold text-[#166534] dark:text-green-300">NET TO YOU</span>
              <span className={`font-bold ${netProceeds >= 0 ? 'text-[#166534] dark:text-green-300' : 'text-red-600 dark:text-red-400'}`}>
                {fmt(netProceeds)}
              </span>
            </div>
          </div>

          {/* Capital gains */}
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 p-4">
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-2">Capital Gains Note</p>
            <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">
              You purchased for {fmt(origPrice)} and are selling for {fmt(price)} — a {fmt(gain)} gain.{' '}
              {gain <= exclusion
                ? `As a primary residence, the first ${fmt(exclusion)} (${filingStatus}) is excluded from capital gains tax. Your taxable gain: $0.`
                : `The ${fmt(exclusion)} primary residence exclusion (${filingStatus}) applies. Estimated taxable gain: ${fmt(taxableGain)}. Consult a tax advisor.`
              }
            </p>
          </div>
        </div>
      </div>

      <AffiliateCTA variant="seller" />

      <p className="mt-4 text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
        These calculators provide estimates for educational purposes only. Net proceeds vary based on actual costs, negotiated terms, and local market conditions. Consult a licensed real estate agent for accurate estimates.
      </p>
    </div>
  )
}
