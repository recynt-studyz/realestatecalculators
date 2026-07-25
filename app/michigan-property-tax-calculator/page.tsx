import { generateStatePropertyTaxMetadata } from '@/components/StatePropertyTaxPage'
import StatePropertyTaxPage from '@/components/StatePropertyTaxPage'

export const metadata = generateStatePropertyTaxMetadata('MI')

export default function Page() {
  return <StatePropertyTaxPage stateAbbr="MI" />
}
