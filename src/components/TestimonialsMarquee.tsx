'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LinkedinLogo, X } from '@phosphor-icons/react'

export type MarqueeTestimonial = {
  image: string
  content: string
  name: string
  role: string
  linkedinUrl?: string
}

type Props = {
  testimonials: MarqueeTestimonial[]
}

const styles = `
.tm-row { display: flex; gap: 1.25rem; will-change: transform; }
.tm-row-a { animation: tm-scroll-left 80s linear infinite; }
.tm-row-b { animation: tm-scroll-right 100s linear infinite; }
.tm-marquee:hover .tm-row { animation-play-state: paused; }
@keyframes tm-scroll-left {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes tm-scroll-right {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}
`

export default function TestimonialsMarquee({ testimonials }: Props) {
  const [active, setActive] = useState<MarqueeTestimonial | null>(null)

  // Split into two roughly equal rows. If only one item, use the same row both ways.
  const half = Math.max(1, Math.ceil(testimonials.length / 2))
  const rowA = testimonials.slice(0, half)
  const rowB = testimonials.slice(half).length > 0 ? testimonials.slice(half) : testimonials.slice(0, half)

  // Duplicate streams for seamless infinite loop
  const streamA = [...rowA, ...rowA]
  const streamB = [...rowB, ...rowB]

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active])

  return (
    <section
      id="testimonials"
      className="tm-marquee py-24 md:py-32 bg-background overflow-hidden relative"
    >
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-10 md:mb-14">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            — What clients say / 04
          </span>
          <span className="hidden md:inline-block w-20 h-px bg-border" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-12 items-end mb-16 md:mb-20">
          <h2 className="lg:col-span-8 font-display text-[clamp(3rem,9vw,8rem)] leading-[0.9] tracking-tight">
            WORDS<span className="text-foreground/30">.</span>
          </h2>
          <p className="lg:col-span-4 text-foreground/70 text-sm md:text-base leading-relaxed max-w-[44ch]">
            What founders and engineers I&apos;ve shipped with say after the fact.
            Hover to pause. Click any to read the full quote.
          </p>
        </div>
      </div>

      {/* Marquee rows — full bleed */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

        <div className="overflow-hidden mb-6">
          <div className="tm-row tm-row-a" style={{ width: 'max-content' }}>
            {streamA.map((t, i) => (
              <Card
                key={`a-${i}`}
                t={t}
                onOpen={() => setActive(t)}
              />
            ))}
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="tm-row tm-row-b" style={{ width: 'max-content' }}>
            {streamB.map((t, i) => (
              <Card
                key={`b-${i}`}
                t={t}
                onOpen={() => setActive(t)}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            key="testimonial-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
            onClick={() => setActive(null)}
          >
            <div className="absolute inset-0 bg-foreground/40 backdrop-blur-md" />
            <motion.div
              initial={{ y: 24, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 24, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-2xl w-full bg-background border border-border p-8 md:p-12"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close"
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setActive(null)}
              >
                <X size={18} weight="regular" />
              </button>

              <span
                aria-hidden
                className="absolute -top-4 left-4 font-display text-[8rem] leading-none text-foreground/[0.05] select-none pointer-events-none"
              >
                &ldquo;
              </span>

              <p className="relative font-display text-2xl md:text-3xl leading-[1.2] tracking-tight text-foreground/90 mb-10">
                &ldquo;{active.content}&rdquo;
              </p>

              <div className="flex items-center gap-5 pt-6 border-t border-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={active.image}
                  alt={active.name}
                  className="w-14 h-14 rounded-full object-cover border border-border"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-display text-xl tracking-tight">{active.name}</h4>
                  <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-1">
                    {active.role}
                  </p>
                </div>
                {active.linkedinUrl ? (
                  <a
                    href={active.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 border border-border font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground hover:text-[hsl(var(--accent))] hover:border-[hsl(var(--accent))] transition-colors"
                  >
                    <LinkedinLogo size={12} weight="regular" />
                    Verified
                  </a>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  )
}

function Card({
  t,
  onOpen,
}: {
  t: MarqueeTestimonial
  onOpen: () => void
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="shrink-0 group text-left w-[320px] md:w-[420px] border border-border bg-card hover:bg-muted/40 transition-colors p-6 md:p-7"
    >
      <p className="text-foreground/85 text-sm md:text-base italic leading-relaxed line-clamp-2 mb-6">
        &ldquo;{t.content}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-4 border-t border-border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={t.image}
          alt={t.name}
          className="w-9 h-9 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all"
          draggable={false}
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-display text-base tracking-tight truncate">{t.name}</h4>
          <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-muted-foreground truncate">
            {t.role}
          </p>
        </div>
        {t.linkedinUrl ? (
          <span
            aria-label="Verified on LinkedIn"
            className="inline-flex items-center gap-1 font-mono text-[9px] tracking-[0.25em] uppercase text-muted-foreground"
          >
            <LinkedinLogo size={11} weight="regular" />
            Verified
          </span>
        ) : null}
      </div>
    </button>
  )
}
