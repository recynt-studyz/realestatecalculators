'use client'

import { useState, useEffect } from 'react'
import AffiliateCTA from './AffiliateCTA'

const STORAGE_KEY = 'rec-payoff'
const fmt = (v: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v)

function calcMonthsToPayoff(balance: number, rate: number, monthlyPayment: number): number {
  if (balance <= 0) return 0
  if (rate <= 0) return Math.ceil(balance / monthlyPayment)
  const r = rate / 12 / 100
  if (monthlyPayment <= balance * r) return Infinity
  return Math.ceil(-Math.log(1 - (balance * r) / monthlyPayment) / Math.log(1 + r))
}

function calcTotalInterest(balance: number, rate: number, monthlyPayment: number): number {
  if (balance <= 0 || rate <= 0) return 0
  const months = calcMonthsToPayoff(balance, rate, monthlyPayment)
  if (!isFinite(months)) return Infinity
  return monthlyPayment * months - balance
}

function calcStandardPayment(principal: number, annualRate: number, termYears: number): number {
  if (principal <= 0) return 0
  if (annualRate <= 0) return principal / (termYears * 12)
  const r = annualRate / 12 / 100
  const n = termYears * 12
  return principal * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
}

export default function MortgagePayoffCalculator() {
  const [originalLoan, setOriginalLoan] = useState('320000')
  const [interestRate, setInterestRate] = useState('6.75')
  const [loanTerm,     setLoanTerm]     = useState('30')
  const [currentBalance,setCurrentBalance]=useState('285000')
  const [extraPayment, setExtraPayment] = useState('500')
  const [lumpSum,      setLumpSum]      = useState('0')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = JSON.parse(saved)
        if (p.originalLoan)    setOriginalLoan(p.originalLoan)
        if (p.interestRate)    setInterestRate(p.interestRate)
        if (p.loanTerm)        setLoanTerm(p.loanTerm)
        if (p.currentBalance)  setCurrentBalance(p.currentBalance)
        if (p.extraPayment)    setExtraPayment(p.extraPayment)
        if (p.lumpSum)         setLumpSum(p.lumpSum)
      }
    } catch { /* ignore */ }
  }, [])

  const save = (u: Record<string, unknown>) => {
    try {
      const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...cur, ...u }))
    } catch { /* ignore */ }
  }

  const origLoan  = parseFloat(originalLoan) || 0
  const rate      = parseFloat(interestRate) || 6.75
  const term      = parseFloat(loanTerm) || 30
  const balance   = parseFloat(currentBalance) || origLoan
  const extra     = parseFloat(extraPayment) || 0
  const lump      = parseFloat(lumpSum) || 0

  const standardPayment   = calcStandardPayment(origLoan, rate, term)
  const balanceAfterLump  = Math.max(0, balance - lump)

  const baseMonths   = calcMonthsToPayoff(balance, rate, standardPayment)
  const extraMonths  = calcMonthsToPayoff(balanceAfterLump, rate, standardPayment + extra)

  const baseInterest  = calcTotalInterest(balance, rate, standardPayment)
  const extraInterest = calcTotalInterest(balanceAfterLump, rate, standardPayment + extra)

  const interestSaved = isFinite(baseInterest) && isFinite(extraInterest)
    ? Math.max(0, baseInterest - extraInterest)
    : 0

  const monthsSaved = isFinite(baseMonths) && isFinite(extraMonths)
    ? Math.max(0, baseMonths - extraMonths)
    : 0

  function formatMonths(m: number) {
    if (!isFinite(m)) return 'N/A'
    const years = Math.floor(m / 12)
    const months = m % 12
    return `${years} yr${years !== 1 ? 's' : ''} ${months} mo`
  }

  const payoffDate = (months: number) => {
    if (!isFinite(months)) return 'N/A'
    const d = new Date()
    d.setMonth(d.getMonth() + months)
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  const scenarios = [
    { extra: 0,    label: 'No extra payment' },
    { extra: 250,  label: '+$250/month' },
    { extra: 500,  label: '+$500/month' },
    { extra: 1000, label: '+$1,000/month' },
  ]

  const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#1e293b] text-gray-900 dark:text-[#e2e8f0] text-sm focus:outline-none focus:ring-2 focus:ring-[#166534]'
  const labelCls = 'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* INPUTS */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Original Loan Amount</label>
              <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={originalLoan} min="0" onChange={e => { setOriginalLoan(e.target.value); save({ originalLoan: e.target.value }) }} className={`${inputCls} pl-7`} /></div>
            </div>
            <div>
              <label className={labelCls}>Interest Rate</label>
              <div className="relative">
                <input type="number" value={interestRate} min="0" step="0.125" onChange={e => { setInterestRate(e.target.value); save({ interestRate: e.target.value }) }} className={`${inputCls} pr-8`} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span></div>
            </div>
            <div>
              <label className={labelCls}>Loan Term</label>
              <select value={loanTerm} onChange={e => { setLoanTerm(e.target.value); save({ loanTerm: e.target.value }) }} className={inputCls}>
                {[10, 15, 20, 30].map(t => <option key={t} value={t}>{t} years</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Current Balance</label>
              <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" value={currentBalance} min="0" onChange={e => { setCurrentBalance(e.target.value); save({ currentBalance: e.target.value }) }} className={`${inputCls} pl-7`} /></div>
            </div>
          </div>

          <div>
            <label className={labelCls}>Extra Monthly Payment</label>
            <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={extraPayment} min="0" onChange={e => { setExtraPayment(e.target.value); save({ extraPayment: e.target.value }) }} className={`${inputCls} pl-7`} /></div>
            <input type="range" value={extraPayment} min="0" max="2000" step="50"
              onChange={e => { setExtraPayment(e.target.value); save({ extraPayment: e.target.value }) }}
              className="w-full mt-2 accent-[#166534]" />
            <div className="flex justify-between text-xs text-gray-400"><span>$0</span><span>$2,000</span></div>
          </div>

          <div>
            <label className={labelCls}>One-Time Lump Sum Payment Today</label>
            <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
              <input type="number" value={lumpSum} min="0" onChange={e => { setLumpSum(e.target.value); save({ lumpSum: e.target.value }) }} className={`${inputCls} pl-7`} /></div>
          </div>
        </div>

        {/* RESULTS */}
        <div className="space-y-4">
          {/* With extra */}
          {(extra > 0 || lump > 0) && (
            <div className="rounded-xl bg-[#166534]/10 dark:bg-[#166534]/20 border border-[#166534]/30 p-5">
              <p className="text-sm text-[#166534] dark:text-green-300 font-medium mb-2">WITH EXTRA PAYMENTS</p>
              <p className="text-2xl font-bold text-[#166534] dark:text-green-200">Payoff: {formatMonths(extraMonths)}</p>
              <p className="text-sm text-[#166534]/80 dark:text-green-400 mt-1">
                Saves {formatMonths(monthsSaved)} · Interest saved: {fmt(interestSaved)}
              </p>
              <p className="text-xs text-[#166534]/70 dark:text-green-500 mt-1">
                Payoff date: {payoffDate(extraMonths)}
              </p>
            </div>
          )}

          {/* Without extra */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Standard Payoff (no extra payments)</p>
            <div className="space-y-2 text-sm">
              {[
                { label: 'Monthly Payment', val: fmt(standardPayment) },
                { label: 'Current Balance', val: fmt(balance) },
                { label: 'Remaining Time',  val: formatMonths(baseMonths) },
                { label: 'Total Interest Remaining', val: fmt(baseInterest) },
                { label: 'Payoff Date',     val: payoffDate(baseMonths) },
              ].map(({ label, val }) => (
                <div key={label} className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">{label}</span>
                  <span className="font-medium text-gray-800 dark:text-[#e2e8f0]">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scenarios table */}
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-[#1e293b] p-4">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Extra Payment Scenarios</p>
            <div className="space-y-3">
              {scenarios.map(({ extra: e, label }) => {
                const months = calcMonthsToPayoff(balance, rate, standardPayment + e)
                const totalInt = calcTotalInterest(balance, rate, standardPayment + e)
                const saved = isFinite(baseInterest) && isFinite(totalInt) ? Math.max(0, baseInterest - totalInt) : 0
                const isCurrentExtra = e === extra
                return (
                  <div key={e} className={`text-sm rounded-lg px-3 py-2 ${isCurrentExtra ? 'bg-[#166534]/10 dark:bg-[#166534]/15 border border-[#166534]/30' : 'border border-gray-100 dark:border-gray-700'}`}>
                    <div className="flex justify-between font-medium">
                      <span className={isCurrentExtra ? 'text-[#166534] dark:text-green-300' : 'text-gray-800 dark:text-[#e2e8f0]'}>
                        {label} {isCurrentExtra && '← current'}
                      </span>
                      <span className={isCurrentExtra ? 'text-[#166534] dark:text-green-300' : 'text-gray-800 dark:text-[#e2e8f0]'}>
                        {formatMonths(months)}
                      </span>
                    </div>
                    {saved > 0 && <p className="text-xs text-gray-500 dark:text-gray-400">Saves {fmt(saved)} in interest</p>}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <AffiliateCTA variant="buyer" />

      <p className="mt-4 text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
        Mortgage payoff calculations are estimates. Verify with your loan servicer before making extra payments. Some loans have prepayment penalties — check your mortgage agreement.
      </p>
    </div>
  )
}
