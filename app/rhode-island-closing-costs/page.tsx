import { generateStateClosingCostsMetadata } from '@/components/StateClosingCostsPage'
import StateClosingCostsPage from '@/components/StateClosingCostsPage'

export const metadata = generateStateClosingCostsMetadata('RI')

export default function Page() {
  return <StateClosingCostsPage stateAbbr="RI" />
}
