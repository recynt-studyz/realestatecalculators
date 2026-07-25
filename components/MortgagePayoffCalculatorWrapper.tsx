'use client'

import dynamic from 'next/dynamic'

const MortgagePayoffCalculator = dynamic(() => import('./MortgagePayoffCalculator'), { ssr: false })

export default function MortgagePayoffCalculatorWrapper() {
  return <MortgagePayoffCalculator />
}
