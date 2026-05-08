'use client'

import { useEffect, useMemo, useState } from 'react'

const SECTION_COPY: Record<string, string> = {
  home: 'Welcome - this is my intro and what I build.',
  work: 'Projects - real products, real outcomes.',
  stats: 'Numbers that show impact and consistency.',
  social: 'Client voices and feedback snapshots.',
  stack: 'Core tech stack and tools I ship with.',
  manifesto: 'How I think, design, and build products.',
  journey: 'Experience timeline and growth story.',
  services: 'Ways I can help your business.',
  contact: 'Let us talk about your next build.',
}

export default function SectionNarrator() {
  const sectionIds = useMemo(() => Object.keys(SECTION_COPY), [])
  const [activeSection, setActiveSection] = useState<string>('home')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(id)
          })
        },
        { threshold: 0.45 },
      )

      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [sectionIds])

  return (
    <aside className="fixed bottom-5 right-5 z-50 hidden md:flex items-center gap-2 rounded-full border border-border bg-background/85 backdrop-blur px-4 py-2">
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent))]" />
      <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-foreground/80">
        {SECTION_COPY[activeSection]}
      </p>
    </aside>
  )
}
