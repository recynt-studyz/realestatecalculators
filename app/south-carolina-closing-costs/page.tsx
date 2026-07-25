import { generateStateClosingCostsMetadata } from '@/components/StateClosingCostsPage'
import StateClosingCostsPage from '@/components/StateClosingCostsPage'

export const metadata = generateStateClosingCostsMetadata('SC')

export default function Page() {
  return <StateClosingCostsPage stateAbbr="SC" />
}
