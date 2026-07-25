import { generateStatePropertyTaxMetadata } from '@/components/StatePropertyTaxPage'
import StatePropertyTaxPage from '@/components/StatePropertyTaxPage'

export const metadata = generateStatePropertyTaxMetadata('FL')

export default function Page() {
  return <StatePropertyTaxPage stateAbbr="FL" />
}
