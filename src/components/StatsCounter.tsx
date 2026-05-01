'use client'

import { useEffect, useRef, useState } from 'react'

const stats: { value: number; prefix?: string; suffix?: string; label: string }[] = [
  { value: 5, suffix: '+', label: 'Production projects shipped' },
  { value: 4, label: 'Clients served · 0 churn' },
  { value: 6, suffix: 'h', label: 'Median client reply time' },
  { value: 100, suffix: '%', label: 'Projects shipped on scope' },
]

function useInView<T extends HTMLElement>(ref: React.RefObject<T | null>) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true)
      },
      { threshold: 0.3 },
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref])
  return inView
}

function Counter({ to, suffix, prefix }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref)
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf: number
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
    <section className="py-20 md:py-28 border-t border-b border-border bg-background">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">
            — By the numbers
          </span>
          <span className="hidden md:block w-20 h-px bg-border" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col gap-3">
              <span className="font-display text-5xl md:text-7xl lg:text-8xl leading-none tracking-tight">
                <Counter to={s.value} suffix={s.suffix} prefix={s.prefix} />
              </span>
              <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
