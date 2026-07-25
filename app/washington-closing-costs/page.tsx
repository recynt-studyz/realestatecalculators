import { generateStateClosingCostsMetadata } from '@/components/StateClosingCostsPage'
import StateClosingCostsPage from '@/components/StateClosingCostsPage'

export const metadata = generateStateClosingCostsMetadata('WA')

export default function Page() {
  return <StateClosingCostsPage stateAbbr="WA" />
}
