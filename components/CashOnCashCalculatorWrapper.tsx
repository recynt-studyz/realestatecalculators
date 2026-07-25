'use client'

import dynamic from 'next/dynamic'

const CashOnCashCalculator = dynamic(() => import('./CashOnCashCalculator'), { ssr: false })

export default function CashOnCashCalculatorWrapper() {
  return <CashOnCashCalculator />
}
