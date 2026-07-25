import { generateStatePropertyTaxMetadata } from '@/components/StatePropertyTaxPage'
import StatePropertyTaxPage from '@/components/StatePropertyTaxPage'

export const metadata = generateStatePropertyTaxMetadata('KY')

export default function Page() {
  return <StatePropertyTaxPage stateAbbr="KY" />
}
