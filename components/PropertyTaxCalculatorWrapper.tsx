'use client'

import dynamic from 'next/dynamic'

const PropertyTaxCalculator = dynamic(() => import('./PropertyTaxCalculator'), { ssr: false })

export default function PropertyTaxCalculatorWrapper() {
  return <PropertyTaxCalculator />
}
