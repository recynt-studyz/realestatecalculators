import { generateStateClosingCostsMetadata } from '@/components/StateClosingCostsPage'
import StateClosingCostsPage from '@/components/StateClosingCostsPage'

export const metadata = generateStateClosingCostsMetadata('WI')

export default function Page() {
  return <StateClosingCostsPage stateAbbr="WI" />
}
