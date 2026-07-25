import { generateStatePropertyTaxMetadata } from '@/components/StatePropertyTaxPage'
import StatePropertyTaxPage from '@/components/StatePropertyTaxPage'

export const metadata = generateStatePropertyTaxMetadata('IA')

export default function Page() {
  return <StatePropertyTaxPage stateAbbr="IA" />
}
