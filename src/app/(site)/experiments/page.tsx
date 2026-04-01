import type { Metadata } from 'next'
import GalaxyFunMode from '@/components/experiments/GalaxyFunMode'

export const metadata: Metadata = {
  title: 'Fun mode',
  description: 'Playful experimental orbit view of the portfolio — parallax starfield and portal navigation.',
}

export default function ExperimentsPage() {
  return <GalaxyFunMode />
}
