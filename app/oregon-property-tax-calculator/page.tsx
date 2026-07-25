import { generateStatePropertyTaxMetadata } from '@/components/StatePropertyTaxPage'
import StatePropertyTaxPage from '@/components/StatePropertyTaxPage'

export const metadata = generateStatePropertyTaxMetadata('OR')

export default function Page() {
  return <StatePropertyTaxPage stateAbbr="OR" />
}
