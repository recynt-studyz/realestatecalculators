import { generateStatePropertyTaxMetadata } from '@/components/StatePropertyTaxPage'
import StatePropertyTaxPage from '@/components/StatePropertyTaxPage'

export const metadata = generateStatePropertyTaxMetadata('NH')

export default function Page() {
  return <StatePropertyTaxPage stateAbbr="NH" />
}
