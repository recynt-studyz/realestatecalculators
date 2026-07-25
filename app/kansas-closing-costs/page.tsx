import { generateStateClosingCostsMetadata } from '@/components/StateClosingCostsPage'
import StateClosingCostsPage from '@/components/StateClosingCostsPage'

export const metadata = generateStateClosingCostsMetadata('KS')

export default function Page() {
  return <StateClosingCostsPage stateAbbr="KS" />
}
