'use client'

import { useRouter } from 'next/navigation'
import { ArrowRight } from '@phosphor-icons/react'
import MagneticButton from './MagneticButton'

export default function ProjectCaseCTA() {
  const router = useRouter()
  return (
    <MagneticButton
      type="button"
      onClick={() => router.push('/contact')}
      className="group inline-flex items-center gap-3 px-7 py-4 bg-foreground text-background rounded-full text-sm font-medium tracking-wide hover:bg-foreground/90 transition-colors"
    >
      <span className="inline-flex items-center gap-2">
        Start a project
        <ArrowRight
          size={16}
          weight="regular"
          className="transition-transform group-hover:translate-x-1"
        />
      </span>
    </MagneticButton>
  )
}
