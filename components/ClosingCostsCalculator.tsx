'use client'

import { useState, useEffect } from 'react'
import AffiliateCTA from './AffiliateCTA'
import { STATE_LIST, STATES } from '@/lib/stateData'

const STORAGE_KEY = 'rec-closing'
const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)
const fmtPct = (v: number) => `${v.toFixed(2)}%`

type TxType = 'buying' | 'selling' | 'both'
type LoanType = 'conventional' | 'fha' | 'va' | 'cash'

export default function ClosingCostsCalculator() {
  const [txType, setTxType]       = useState<TxType>('buying')
  const [salePrice, setSalePrice] = useState('400000')
  const [loanAmt, setLoanAmt]     = useState('320000')
  const [stateCode, setStateCode] = useState('AZ')
  const [loanType, setLoanType]   = useState<LoanType>('conventional')
  const [firstTime, setFirstTime] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.txType)    setTxType(p.txType)
        if (p.salePrice) setSalePrice(p.salePrice)
        if (p.loanAmt)   setLoanAmt(p.loanAmt)
        if (p.stateCode) setStateCode(p.stateCode)
        if (p.loanType)  setLoanType(p.loanType)
        if (p.firstTime !== undefined) setFirstTime(p.firstTime)
      }
    } catch { /* ignore */ }
  }, [])

  const save = (u: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...u }))
    } catch { /* ignore */ }
  }

  const price  = parseFloat(salePrice) || 0
  const loan   = parseFloat(loanAmt) || 0
  const state  = STATES[stateCode]
  const transferTax = state ? price * state.transferTaxRate / 100 : 0

  // BUYER costs
  const originationFee    = loanType === 'va' ? 0 : loan * 0.01
  const appraisal         = loanType === 'cash' ? 0 : 500
  const inspection        = 400
  const lenderTitle       = loanType === 'cash' ? 0 : loan * 0.005
  const ownerTitle        = price * 0.006
  const prepaidInterest   = loanType === 'cash' ? 0 : loan * (6.75 / 100) / 365 * 15
  const propTaxEscrow     = price * (1.0 / 100) / 12 * 2
  const insEscrow         = (1800 / 12) * 2
  const recordingFees     = 150
  const buyerTransfer     = state?.titlePayer === 'buyer' ? transferTax : 0
  const fhaUpfront        = loanType === 'fha' ? loan * 0.0175 : 0

  const totalBuyer = originationFee + appraisal + inspection + lenderTitle + ownerTitle +
    prepaidInterest + propTaxEscrow + insEscrow + recordingFees + buyerTransfer + fhaUpfront

  // SELLER costs
  const agentCommission   = price * 0.055
  const sellerTitle       = state?.titlePayer === 'seller' ? ownerTitle : 0
  const sellerTransfer    = state?.hasTransferTax ? (state.titlePayer !== 'buyer' ? transferTax : 0) : 0
  const sellerRecording   = 150
  const attorneyFees      = state?.isAttorneyState ? 800 : 0
  const totalSeller       = agentCommission + sellerTitle + sellerTransfer + sellerRecording + attorneyFees

  const buyerLineItems = [
    { label: 'Loan Origination (1%)',              val: originationFee, show: loanType !== 'va' && loanType !== 'cash' },
    { label: 'Appraisal',                          val: appraisal,     show: loanType !== 'cash' },
    { label: 'Home Inspection',                    val: inspection,    show: true },
    { label: 'Lender\'s Title Insurance (0.5%)',   val: lenderTitle,   show: loanType !== 'cash' },
    { label: 'Owner\'s Title Insurance (0.6%)',    val: ownerTitle,    show: true },
    { label: 'Prepaid Interest (15 days)',         val: prepaidInterest, show: loanType !== 'cash' },
    { label: 'Property Tax Escrow (2 mo)',         val: propTaxEscrow, show: loanType !== 'cash' },
    { label: 'Insurance Escrow (2 mo)',            val: insEscrow,     show: loanType !== 'cash' },
    { label: 'Recording Fees',                     val: recordingFees, show: true },
    { label: `State Transfer Tax (${state ? fmtPct(state.transferTaxRate) : '0%'})`, val: buyerTransfer, show: buyerTransfer > 0 },
    { label: 'FHA Upfront MIP (1.75%)',            val: fhaUpfront,    show: loanType === 'fha' },
  ].filter(i => i.show)

  const sellerLineItems = [
    { label: 'Agent Commission (5.5%)',            val: agentCommission },
    { label: 'Owner\'s Title Insurance',           val: sellerTitle,     show: sellerTitle > 0 },
    { label: `State Transfer Tax (${state ? fmtPct(state.transferTaxRate) : '0%'})`, val: sellerTransfer, show: sellerTransfer > 0 },
    { label: 'Recording Fees',                     val: sellerRecording },
    { label: 'Attorney Fees (required in this state)', val: attorneyFees, show: attorneyFees > 0 },
  ].filter(i => i.show !== false)

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#166534]'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  return (
    <div className="p-6">
      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className={labelCls}>Transaction Type</label>
          <div className="grid grid-cols-3 gap-2">
            {(['buying', 'selling', 'both'] as TxType[]).map(t => (
              <button key={t}
                onClick={() => { setTxType(t); save({ txType: t }) }}
                className={`py-2 rounded-lg text-xs font-medium capitalize transition-colors ${
                  txType === t ? 'bg-[#166534] text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelCls}>Purchase / Sale Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input type="number" value={salePrice} min="0"
              onChange={e => { setSalePrice(e.target.value); save({ salePrice: e.target.value }) }}
              className={`${inputCls} pl-7`} />
          </div>
        </div>

        {txType !== 'selling' && (
          <div>
            <label className={labelCls}>Loan Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={loanAmt} min="0"
                onChange={e => { setLoanAmt(e.target.value); save({ loanAmt: e.target.value }) }}
                className={`${inputCls} pl-7`} />
            </div>
          </div>
        )}

        <div>
          <label className={labelCls}>State</label>
          <select value={stateCode}
            onChange={e => { setStateCode(e.target.value); save({ stateCode: e.target.value }) }}
            className={inputCls}>
            {STATE_LIST.map(s => <option key={s.abbr} value={s.abbr}>{s.name}</option>)}
          </select>
        </div>

        {txType !== 'selling' && (
          <div>
            <label className={labelCls}>Loan Type</label>
            <div className="grid grid-cols-4 gap-2">
              {(['conventional', 'fha', 'va', 'cash'] as LoanType[]).map(lt => (
                <button key={lt}
                  onClick={() => { setLoanType(lt); save({ loanType: lt }) }}
                  className={`py-2 rounded-lg text-xs font-medium uppercase transition-colors ${
                    loanType === lt ? 'bg-[#166534] text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}>
                  {lt}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <input type="checkbox" id="firstTime" checked={firstTime}
            onChange={e => { setFirstTime(e.target.checked); save({ firstTime: e.target.checked }) }}
            className="rounded border-gray-300 w-4 h-4 accent-[#166534]" />
          <label htmlFor="firstTime" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
            First-time homebuyer
          </label>
        </div>
      </div>

      {/* State Info Banner */}
      {state && (
        <div className="rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/40 px-5 py-4 mb-6">
          <p className="text-sm font-semibold text-[#166534] dark:text-green-300 mb-1">{state.name} Closing Cost Notes</p>
          <p className="text-xs text-green-800 dark:text-green-400 leading-relaxed">
            {state.hasTransferTax ? `Transfer tax: ${fmtPct(state.transferTaxRate)} (${fmt(transferTax)} on ${fmt(price)}).` : 'No state transfer tax.'}
            {' '}{state.isAttorneyState ? 'Attorney presence required at closing.' : 'Title company closings permitted.'}
            {' '}Owner&apos;s title insurance: traditionally paid by {state.titlePayer === 'seller' ? 'seller' : state.titlePayer === 'split' ? 'split between buyer and seller' : 'buyer'}.
          </p>
        </div>
      )}

      {/* Results */}
      <div className={`grid grid-cols-1 ${txType === 'both' ? 'lg:grid-cols-2' : ''} gap-6`}>
        {/* Buyer Costs */}
        {(txType === 'buying' || txType === 'both') && (
          <div>
            <h3 className="text-base font-bold text-gray-800 dark:text-[#e2e8f0] mb-3">Buyer Closing Costs</h3>
            <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] divide-y divide-gray-100 dark:divide-gray-700">
              {buyerLineItems.map(({ label, val }) => (
                <div key={label} className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{label}</span>
                  <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">{fmt(val)}</span>
                </div>
              ))}
              <div className="flex justify-between px-4 py-3 bg-[#166534]/5 dark:bg-[#166534]/10">
                <span className="font-bold text-[#166534] dark:text-green-300">Total Buyer Closing Costs</span>
                <div className="text-right">
                  <span className="font-bold text-[#166534] dark:text-green-300">{fmt(totalBuyer)}</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">({((totalBuyer / price) * 100).toFixed(1)}% of purchase)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Seller Costs */}
        {(txType === 'selling' || txType === 'both') && (
          <div>
            <h3 className="text-base font-bold text-gray-800 dark:text-[#e2e8f0] mb-3">Seller Closing Costs</h3>
            <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] divide-y divide-gray-100 dark:divide-gray-700">
              {sellerLineItems.map(({ label, val }) => (
                <div key={label} className="flex justify-between px-4 py-3 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{label}</span>
                  <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">{fmt(val)}</span>
                </div>
              ))}
              <div className="flex justify-between px-4 py-3 bg-[#166534]/5 dark:bg-[#166534]/10">
                <span className="font-bold text-[#166534] dark:text-green-300">Total Seller Closing Costs</span>
                <div className="text-right">
                  <span className="font-bold text-[#166534] dark:text-green-300">{fmt(totalSeller)}</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">({((totalSeller / price) * 100).toFixed(1)}% of sale)</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <AffiliateCTA variant="seller" />

      <p className="mt-4 text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
        These calculators provide estimates for educational purposes only. Closing costs vary by lender, location, and transaction. Consult a licensed real estate agent or mortgage lender for exact costs before closing.
      </p>
    </div>
  )
}
