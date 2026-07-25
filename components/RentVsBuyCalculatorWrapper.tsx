'use client'

import dynamic from 'next/dynamic'

const RentVsBuyCalculator = dynamic(() => import('./RentVsBuyCalculator'), { ssr: false })

export default function RentVsBuyCalculatorWrapper() {
  return <RentVsBuyCalculator />
}
