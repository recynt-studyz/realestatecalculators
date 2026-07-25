import { generateStatePropertyTaxMetadata } from '@/components/StatePropertyTaxPage'
import StatePropertyTaxPage from '@/components/StatePropertyTaxPage'

export const metadata = generateStatePropertyTaxMetadata('TX')

export default function Page() {
  return <StatePropertyTaxPage stateAbbr="TX" />
}
