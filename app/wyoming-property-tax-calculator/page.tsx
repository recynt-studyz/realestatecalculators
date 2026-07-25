import { generateStatePropertyTaxMetadata } from '@/components/StatePropertyTaxPage'
import StatePropertyTaxPage from '@/components/StatePropertyTaxPage'

export const metadata = generateStatePropertyTaxMetadata('WY')

export default function Page() {
  return <StatePropertyTaxPage stateAbbr="WY" />
}
