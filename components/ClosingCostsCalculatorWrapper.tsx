'use client'

import dynamic from 'next/dynamic'

const ClosingCostsCalculator = dynamic(() => import('./ClosingCostsCalculator'), { ssr: false })

export default function ClosingCostsCalculatorWrapper() {
  return <ClosingCostsCalculator />
}
