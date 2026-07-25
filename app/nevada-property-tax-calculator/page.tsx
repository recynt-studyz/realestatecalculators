import { generateStatePropertyTaxMetadata } from '@/components/StatePropertyTaxPage'
import StatePropertyTaxPage from '@/components/StatePropertyTaxPage'

export const metadata = generateStatePropertyTaxMetadata('NV')

export default function Page() {
  return <StatePropertyTaxPage stateAbbr="NV" />
}
