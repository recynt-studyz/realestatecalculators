import { generateStateClosingCostsMetadata } from '@/components/StateClosingCostsPage'
import StateClosingCostsPage from '@/components/StateClosingCostsPage'

export const metadata = generateStateClosingCostsMetadata('AK')

export default function Page() {
  return <StateClosingCostsPage stateAbbr="AK" />
}
