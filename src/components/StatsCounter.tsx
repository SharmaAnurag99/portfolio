'use client'

import { useEffect, useRef, useState } from 'react'

const stats: { value: number; prefix?: string; suffix?: string; label: string; sublabel?: string }[] = [
  { value: 5, suffix: '+', label: 'Production projects shipped', sublabel: 'AstroRekhaaji · Riva · LK Sharma · Hive Bounty · Cross-Chain Bridge' },
  { value: 4, label: 'Clients served · 0 churn', sublabel: 'India · APAC · Web2 + Web3' },
  { value: 6, suffix: 'h', label: 'Median client reply time', sublabel: 'IST working hours' },
  { value: 100, suffix: '%', label: 'Projects shipped on scope', sublabel: 'No "soon"s. No silent slips.' },
]

function useInView<T extends HTMLElement>(ref: React.RefObject<T | null>) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold: 0.3 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref])
  return inView
}

function Counter({ to, prefix, suffix }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref)
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const dur = 1800
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(eased * to))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to])

  return (
    <span ref={ref}>
      {prefix ?? ''}
      {n}
      {suffix ?? ''}
    </span>
  )
}

export default function StatsCounter() {
  return (
    <section className="py-20 md:py-28 border-y border-border bg-background">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-12 md:mb-16">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            — By the numbers
          </span>
          <span className="hidden md:inline-block w-20 h-px bg-border" />
        </div>

        {/* Anti-card: pure spacing + dividers, no boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col gap-3 px-0 md:px-8 lg:px-10 py-8 md:py-0 first:pl-0 last:pr-0">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-display text-5xl md:text-6xl lg:text-7xl leading-none tracking-tight">
                <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
              </span>
              <span className="text-foreground/85 text-sm font-medium leading-snug">
                {s.label}
              </span>
              {s.sublabel ? (
                <span className="text-muted-foreground text-[11px] leading-relaxed">
                  {s.sublabel}
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
