import { generateStateClosingCostsMetadata } from '@/components/StateClosingCostsPage'
import StateClosingCostsPage from '@/components/StateClosingCostsPage'

export const metadata = generateStateClosingCostsMetadata('AR')

export default function Page() {
  return <StateClosingCostsPage stateAbbr="AR" />
}
