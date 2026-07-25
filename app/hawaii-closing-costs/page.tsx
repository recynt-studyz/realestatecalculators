import { generateStateClosingCostsMetadata } from '@/components/StateClosingCostsPage'
import StateClosingCostsPage from '@/components/StateClosingCostsPage'

export const metadata = generateStateClosingCostsMetadata('HI')

export default function Page() {
  return <StateClosingCostsPage stateAbbr="HI" />
}
