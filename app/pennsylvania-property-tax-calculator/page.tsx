import { generateStatePropertyTaxMetadata } from '@/components/StatePropertyTaxPage'
import StatePropertyTaxPage from '@/components/StatePropertyTaxPage'

export const metadata = generateStatePropertyTaxMetadata('PA')

export default function Page() {
  return <StatePropertyTaxPage stateAbbr="PA" />
}
