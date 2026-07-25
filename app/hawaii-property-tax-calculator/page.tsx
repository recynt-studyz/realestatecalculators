import { generateStatePropertyTaxMetadata } from '@/components/StatePropertyTaxPage'
import StatePropertyTaxPage from '@/components/StatePropertyTaxPage'

export const metadata = generateStatePropertyTaxMetadata('HI')

export default function Page() {
  return <StatePropertyTaxPage stateAbbr="HI" />
}
