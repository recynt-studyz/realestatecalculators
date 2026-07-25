import { generateStateClosingCostsMetadata } from '@/components/StateClosingCostsPage'
import StateClosingCostsPage from '@/components/StateClosingCostsPage'

export const metadata = generateStateClosingCostsMetadata('WV')

export default function Page() {
  return <StateClosingCostsPage stateAbbr="WV" />
}
