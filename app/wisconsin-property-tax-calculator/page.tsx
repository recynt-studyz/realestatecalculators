import { generateStatePropertyTaxMetadata } from '@/components/StatePropertyTaxPage'
import StatePropertyTaxPage from '@/components/StatePropertyTaxPage'

export const metadata = generateStatePropertyTaxMetadata('WI')

export default function Page() {
  return <StatePropertyTaxPage stateAbbr="WI" />
}
