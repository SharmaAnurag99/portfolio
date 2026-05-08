'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

type Props = React.ComponentProps<typeof motion.button> & {
  strength?: number
  childTrailFactor?: number
}

const SPRING = { stiffness: 220, damping: 18, mass: 0.4 }

/**
 * Magnetic button — Framer Motion motion values, never useState.
 * Uses transform-only animation for hardware acceleration.
 * Disabled on touch devices via @media hover.
 */
export default function MagneticButton({
  children,
  className,
  strength = 0.35,
  childTrailFactor = 0.45,
  ...props
}: Props) {
  const ref = useRef<HTMLButtonElement>(null)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, SPRING)
  const y = useSpring(my, SPRING)
  const cx = useTransform(x, (v) => v * childTrailFactor)
  const cy = useTransform(y, (v) => v * childTrailFactor)

  return (
    <motion.button
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect()
        if (!r) return
        mx.set((e.clientX - (r.left + r.width / 2)) * strength)
        my.set((e.clientY - (r.top + r.height / 2)) * strength)
      }}
      onMouseLeave={() => {
        mx.set(0)
        my.set(0)
      }}
      style={{ x, y }}
      className={cn(
        'will-change-transform [@media(hover:none)]:!transform-none',
        className,
      )}
      {...props}
    >
      <motion.span style={{ x: cx, y: cy }} className="block will-change-transform">
        {children}
      </motion.span>
    </motion.button>
  )
}
