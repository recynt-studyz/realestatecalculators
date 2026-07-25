'use client'

import dynamic from 'next/dynamic'

const InvestmentROICalculator = dynamic(() => import('./InvestmentROICalculator'), { ssr: false })

export default function InvestmentROICalculatorWrapper() {
  return <InvestmentROICalculator />
}
