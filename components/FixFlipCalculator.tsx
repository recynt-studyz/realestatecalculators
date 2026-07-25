'use client'

import { useState, useEffect } from 'react'
import AffiliateCTA from './AffiliateCTA'

const STORAGE_KEY = 'rec-fixflip'
const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)
const fmtPct = (v: number, d = 1) => `${v.toFixed(d)}%`

type FinanceType = 'cash' | 'hardmoney' | 'conventional'

export default function FixFlipCalculator() {
  const [arv,           setArv]           = useState('350000')
  const [purchasePrice, setPurchasePrice] = useState('195000')
  const [repairCosts,   setRepairCosts]   = useState('45000')
  const [financeType,   setFinanceType]   = useState<FinanceType>('hardmoney')
  const [hardMoneyRate, setHardMoneyRate] = useState('12')
  const [hardMoneyPoints,setHardMoneyPoints]=useState('2')
  const [holdingMonths, setHoldingMonths] = useState('6')
  const [utilities,     setUtilities]     = useState('200')
  const [staging,       setStaging]       = useState('3000')
  const [commissionPct, setCommissionPct] = useState('5.5')
  const [sellerClosing, setSellerClosing] = useState('1')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.arv)             setArv(p.arv)
        if (p.purchasePrice)   setPurchasePrice(p.purchasePrice)
        if (p.repairCosts)     setRepairCosts(p.repairCosts)
        if (p.financeType)     setFinanceType(p.financeType)
        if (p.hardMoneyRate)   setHardMoneyRate(p.hardMoneyRate)
        if (p.hardMoneyPoints) setHardMoneyPoints(p.hardMoneyPoints)
        if (p.holdingMonths)   setHoldingMonths(p.holdingMonths)
        if (p.utilities)       setUtilities(p.utilities)
        if (p.staging)         setStaging(p.staging)
        if (p.commissionPct)   setCommissionPct(p.commissionPct)
        if (p.sellerClosing)   setSellerClosing(p.sellerClosing)
      }
    } catch { /* ignore */ }
  }, [])

  const save = (u: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...u }))
    } catch { /* ignore */ }
  }

  const arvVal    = parseFloat(arv) || 0
  const purchase  = parseFloat(purchasePrice) || 0
  const repair    = parseFloat(repairCosts) || 0
  const months    = parseFloat(holdingMonths) || 6
  const util      = (parseFloat(utilities) || 0) * months
  const stageAmt  = parseFloat(staging) || 0
  const commPct   = parseFloat(commissionPct) || 5.5
  const scPct     = parseFloat(sellerClosing) || 1

  // Financing costs
  const hmRate   = parseFloat(hardMoneyRate) || 12
  const hmPoints = parseFloat(hardMoneyPoints) || 2
  const loanAmt  = financeType !== 'cash' ? purchase : 0
  const hmInterest = financeType === 'hardmoney' ? loanAmt * hmRate / 100 / 12 * months : 0
  const hmOrigin   = financeType === 'hardmoney' ? loanAmt * hmPoints / 100 : 0
  const convInterest = financeType === 'conventional' ? loanAmt * 6.75 / 100 / 12 * months : 0
  const financingCost = hmInterest + hmOrigin + convInterest

  // Property tax during hold (est 1.0%/yr)
  const holdTax = purchase * 0.01 / 12 * months
  // Insurance during hold
  const holdIns = 150 * months

  const holdingCosts = util + holdTax + holdIns

  // Selling costs
  const commissionAmt = arvVal * commPct / 100
  const sellerClosingAmt = arvVal * scPct / 100
  const sellingCosts = commissionAmt + sellerClosingAmt + stageAmt

  const totalCosts = purchase + repair + holdingCosts + sellingCosts + financingCost
  const profit     = arvVal - totalCosts
  const roi        = totalCosts > 0 ? (profit / totalCosts) * 100 : 0
  const annualizedROI = months > 0 ? roi * (12 / months) : 0

  // 70% rule
  const maxOffer70 = arvVal * 0.70 - repair
  const rule70Pass = purchase <= maxOffer70

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#166534]'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INPUTS */}
        <div className="space-y-4">
          <div>
            <label className={labelCls}>After Repair Value (ARV)</label>
            <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={arv} min="0" onChange={e => { setArv(e.target.value); save({ arv: e.target.value }) }} className={`${inputCls} pl-7`} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Purchase Price</label>
              <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={purchasePrice} min="0" onChange={e => { setPurchasePrice(e.target.value); save({ purchasePrice: e.target.value }) }} className={`${inputCls} pl-7`} /></div>
            </div>
            <div>
              <label className={labelCls}>Repair Costs</label>
              <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={repairCosts} min="0" onChange={e => { setRepairCosts(e.target.value); save({ repairCosts: e.target.value }) }} className={`${inputCls} pl-7`} /></div>
            </div>
          </div>

          {/* Financing */}
          <div>
            <label className={labelCls}>Financing Type</label>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {(['cash', 'hardmoney', 'conventional'] as FinanceType[]).map(ft => (
                <button key={ft} onClick={() => { setFinanceType(ft); save({ financeType: ft }) }}
                  className={`py-2 rounded-lg text-xs font-medium transition-colors ${
                    financeType === ft ? 'bg-[#166534] text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}>
                  {ft === 'hardmoney' ? 'Hard Money' : ft === 'conventional' ? 'Conventional' : 'Cash'}
                </button>
              ))}
            </div>
            {financeType === 'hardmoney' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Rate (%/yr)</label>
                  <div className="relative">
                    <input type="number" value={hardMoneyRate} min="0" step="0.5" onChange={e => { setHardMoneyRate(e.target.value); save({ hardMoneyRate: e.target.value }) }}
                      className="w-full pr-8 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-sm focus:outline-none focus:ring-1 focus:ring-[#166534] text-gray-900 dark:text-[#e2e8f0]" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">%</span></div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Points</label>
                  <input type="number" value={hardMoneyPoints} min="0" max="5" step="0.5" onChange={e => { setHardMoneyPoints(e.target.value); save({ hardMoneyPoints: e.target.value }) }}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-sm focus:outline-none focus:ring-1 focus:ring-[#166534] text-gray-900 dark:text-[#e2e8f0]" />
                </div>
              </div>
            )}
          </div>

          {/* Holding */}
          <div>
            <label className={labelCls}>Holding Period (months): {holdingMonths}</label>
            <input type="range" value={holdingMonths} min="1" max="24" step="1"
              onChange={e => { setHoldingMonths(e.target.value); save({ holdingMonths: e.target.value }) }}
              className="w-full accent-[#166534]" />
            <div className="flex justify-between text-xs text-gray-400"><span>1 mo</span><span>24 mo</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Monthly Utilities</label>
              <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={utilities} min="0" onChange={e => { setUtilities(e.target.value); save({ utilities: e.target.value }) }} className={`${inputCls} pl-7`} /></div>
            </div>
            <div>
              <label className={labelCls}>Staging Costs</label>
              <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={staging} min="0" onChange={e => { setStaging(e.target.value); save({ staging: e.target.value }) }} className={`${inputCls} pl-7`} /></div>
            </div>
            <div>
              <label className={labelCls}>Agent Commission (%)</label>
              <div className="relative">
                <input type="number" value={commissionPct} min="0" step="0.25" onChange={e => { setCommissionPct(e.target.value); save({ commissionPct: e.target.value }) }} className={`${inputCls} pr-8`} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span></div>
            </div>
            <div>
              <label className={labelCls}>Seller Closing Costs (%)</label>
              <div className="relative">
                <input type="number" value={sellerClosing} min="0" step="0.25" onChange={e => { setSellerClosing(e.target.value); save({ sellerClosing: e.target.value }) }} className={`${inputCls} pr-8`} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span></div>
            </div>
          </div>
        </div>

        {/* RESULTS */}
        <div className="space-y-4">
          <div className={`rounded-xl p-5 border ${profit >= 0 ? 'bg-[#166534]/10 dark:bg-[#166534]/20 border-[#166534]/30' : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/40'}`}>
            <p className={`text-sm font-medium mb-1 ${profit >= 0 ? 'text-[#166534] dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>PROJECTED PROFIT</p>
            <p className={`text-4xl font-bold ${profit >= 0 ? 'text-[#166534] dark:text-green-200' : 'text-red-700 dark:text-red-200'}`}>{fmt(profit)}</p>
            <div className="flex gap-4 mt-2">
              <p className={`text-sm ${profit >= 0 ? 'text-[#166534]/80 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>ROI: {fmtPct(roi)}</p>
              <p className={`text-sm ${annualizedROI >= 20 ? 'text-[#166534]/80 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>Annualized: {fmtPct(annualizedROI)}</p>
            </div>
          </div>

          {/* 70% Rule */}
          <div className={`rounded-xl p-4 border ${rule70Pass ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900/40' : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/40'}`}>
            <p className={`text-sm font-semibold mb-1 ${rule70Pass ? 'text-[#166534] dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
              70% Rule {rule70Pass ? '✓ PASSES' : '✗ FAILS'}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 font-mono">
              Max offer = ARV × 70% − repairs<br />
              = {fmt(arvVal)} × 70% − {fmt(repair)} = <strong>{fmt(maxOffer70)}</strong><br />
              Your offer: {fmt(purchase)} {rule70Pass ? '✓ under max' : '✗ exceeds max by ' + fmt(purchase - maxOffer70)}
            </p>
          </div>

          {/* Cost Breakdown */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] divide-y divide-gray-100 dark:divide-gray-700">
            {[
              { label: 'Purchase Price',          val: fmt(purchase) },
              { label: 'Repair Costs',            val: fmt(repair) },
              { label: `Holding Costs (${months} mo)`, val: fmt(holdingCosts) },
              { label: 'Selling Costs',           val: fmt(sellingCosts) },
              ...(financingCost > 0 ? [{ label: `Financing Cost (${financeType === 'hardmoney' ? 'hard money' : 'conventional'})`, val: fmt(financingCost) }] : []),
              { label: 'TOTAL COSTS',             val: fmt(totalCosts), bold: true },
              { label: 'Sale Price (ARV)',         val: fmt(arvVal) },
              { label: 'NET PROFIT',              val: fmt(profit), bold: true },
            ].map(({ label, val, bold }) => (
              <div key={label} className={`flex justify-between px-4 py-3 text-sm ${bold ? 'bg-[#166534]/5 dark:bg-[#166534]/10' : ''}`}>
                <span className={bold ? 'font-bold text-gray-800 dark:text-[#e2e8f0]' : 'text-gray-600 dark:text-gray-400'}>{label}</span>
                <span className={bold ? 'font-bold text-[#166534] dark:text-green-300' : 'text-gray-800 dark:text-[#e2e8f0]'}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AffiliateCTA variant="investor" />

      <p className="mt-4 text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
        Fix and flip projections are estimates based on inputs provided. Actual costs, timelines, and sale prices vary significantly. Consult a licensed real estate professional and contractor before purchasing a fix-and-flip property.
      </p>
    </div>
  )
}
