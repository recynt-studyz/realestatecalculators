'use client'

import dynamic from 'next/dynamic'

const CapRateCalculator = dynamic(() => import('./CapRateCalculator'), { ssr: false })

export default function CapRateCalculatorWrapper() {
  return <CapRateCalculator />
}
