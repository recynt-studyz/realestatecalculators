import { generateStatePropertyTaxMetadata } from '@/components/StatePropertyTaxPage'
import StatePropertyTaxPage from '@/components/StatePropertyTaxPage'

export const metadata = generateStatePropertyTaxMetadata('AR')

export default function Page() {
  return <StatePropertyTaxPage stateAbbr="AR" />
}
