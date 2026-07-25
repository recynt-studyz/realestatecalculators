'use client'

import dynamic from 'next/dynamic'

const FixFlipCalculator = dynamic(() => import('./FixFlipCalculator'), { ssr: false })

export default function FixFlipCalculatorWrapper() {
  return <FixFlipCalculator />
}
