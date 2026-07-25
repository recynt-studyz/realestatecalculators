import { generateStatePropertyTaxMetadata } from '@/components/StatePropertyTaxPage'
import StatePropertyTaxPage from '@/components/StatePropertyTaxPage'

export const metadata = generateStatePropertyTaxMetadata('CT')

export default function Page() {
  return <StatePropertyTaxPage stateAbbr="CT" />
}
