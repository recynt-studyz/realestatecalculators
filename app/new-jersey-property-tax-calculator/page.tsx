import { generateStatePropertyTaxMetadata } from '@/components/StatePropertyTaxPage'
import StatePropertyTaxPage from '@/components/StatePropertyTaxPage'

export const metadata = generateStatePropertyTaxMetadata('NJ')

export default function Page() {
  return <StatePropertyTaxPage stateAbbr="NJ" />
}
