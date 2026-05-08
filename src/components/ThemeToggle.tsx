'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from '@phosphor-icons/react'

const TRANSITION_MS = 380

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <span className="inline-block h-9 w-[4.75rem] shrink-0 rounded-full bg-muted/60" aria-hidden />
  }

  const isDark = resolvedTheme === 'dark'

  const cycle = () => {
    document.documentElement.classList.add('theme-transition-active')
    setTheme(isDark ? 'light' : 'dark')
    window.setTimeout(() => {
      document.documentElement.classList.remove('theme-transition-active')
    }, TRANSITION_MS)
  }

  return (
    <button
      type="button"
      onClick={cycle}
      className="relative flex h-9 w-[4.75rem] shrink-0 items-center rounded-full border border-border/80 bg-muted/50 p-1 backdrop-blur-sm transition-[box-shadow] hover:shadow-sm active:scale-[0.98]"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <motion.span
        className="absolute top-1 left-1 z-0 flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background shadow-sm"
        initial={false}
        animate={{ x: isDark ? 36 : 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      />
      <span className="relative z-10 flex w-full items-center justify-between px-2.5 pointer-events-none">
        <Sun size={14} weight="regular" className={isDark ? 'text-foreground/35' : 'text-[hsl(var(--accent))]'} />
        <Moon size={14} weight="regular" className={isDark ? 'text-[hsl(var(--accent))]' : 'text-foreground/35'} />
      </span>
    </button>
  )
}
