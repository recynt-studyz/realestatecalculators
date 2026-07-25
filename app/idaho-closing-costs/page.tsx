import { generateStateClosingCostsMetadata } from '@/components/StateClosingCostsPage'
import StateClosingCostsPage from '@/components/StateClosingCostsPage'

export const metadata = generateStateClosingCostsMetadata('ID')

export default function Page() {
  return <StateClosingCostsPage stateAbbr="ID" />
}
