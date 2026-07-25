import { generateStateClosingCostsMetadata } from '@/components/StateClosingCostsPage'
import StateClosingCostsPage from '@/components/StateClosingCostsPage'

export const metadata = generateStateClosingCostsMetadata('NC')

export default function Page() {
  return <StateClosingCostsPage stateAbbr="NC" />
}
