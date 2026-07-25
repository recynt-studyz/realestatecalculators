'use client'

import dynamic from 'next/dynamic'

const SellerNetCalculator = dynamic(() => import('./SellerNetCalculator'), { ssr: false })

export default function SellerNetCalculatorWrapper() {
  return <SellerNetCalculator />
}
