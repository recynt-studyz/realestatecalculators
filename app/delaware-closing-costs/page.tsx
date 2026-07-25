import { generateStateClosingCostsMetadata } from '@/components/StateClosingCostsPage'
import StateClosingCostsPage from '@/components/StateClosingCostsPage'

export const metadata = generateStateClosingCostsMetadata('DE')

export default function Page() {
  return <StateClosingCostsPage stateAbbr="DE" />
}
