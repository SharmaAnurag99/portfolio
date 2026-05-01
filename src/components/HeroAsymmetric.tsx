'use client'

import Link from 'next/link'
import { ArrowRight, ArrowDown } from '@phosphor-icons/react'
import MagneticButton from './MagneticButton'

const techBadges: { text: string; className: string }[] = [
  { text: 'NEXT.JS', className: 'left-[6%] top-[22%] -rotate-6' },
  { text: 'RUST', className: 'right-[10%] top-[28%] rotate-3' },
  { text: 'SOLIDITY', className: 'left-[14%] bottom-[24%] rotate-2' },
  { text: 'TYPESCRIPT', className: 'right-[16%] bottom-[34%] -rotate-3' },
]

export default function HeroAsymmetric() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-background min-h-[100dvh] flex items-center pt-32 pb-16"
    >
      {/* Subtle grid bg */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Floating tech badges (decorative, desktop only) */}
      {techBadges.map((b) => (
        <span
          key={b.text}
          aria-hidden
          className={`absolute hidden md:inline-block px-3 py-1.5 border border-border bg-card/60 backdrop-blur-sm font-mono text-[10px] tracking-[0.3em] uppercase ${b.className}`}
        >
          {b.text}
        </span>
      ))}

      <div className="container mx-auto px-6 relative">
        {/* Trust signal strip — left aligned, not centered */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-10">
          <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inset-0 rounded-full bg-[hsl(var(--accent))] animate-ping opacity-75" />
              <span className="relative w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent))]" />
            </span>
            Available · Q2 slots open
          </span>
          <span className="hidden sm:inline-block w-px h-3 bg-border" />
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
            Founding Developer · QodeML Labs
          </span>
        </div>

        {/* Main grid: type left, photo upper-right (asymmetric) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-12 items-start">
          {/* Type column */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            <h1 className="hero-title font-display leading-[0.85] tracking-tight">
              <span className="block text-[clamp(3.5rem,12vw,11rem)]">SHARMA</span>
              <span className="block text-[clamp(3rem,10vw,9rem)] italic font-light text-foreground/35">
                anurag.
              </span>
            </h1>
          </div>

          {/* Photo card — hangs upper-right with rotation */}
          <div className="lg:col-span-4 order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-[260px] md:w-[300px] aspect-[4/5] lg:mt-[-40px] lg:rotate-3 lg:hover:rotate-0 transition-all duration-700 overflow-hidden border border-border grayscale hover:grayscale-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/myphoto.png"
                alt="Anurag Sharma"
                className="w-full h-full object-cover"
              />
              {/* Corner labels */}
              <span className="absolute bottom-3 left-3 font-mono text-[9px] tracking-[0.3em] uppercase text-white mix-blend-difference">
                Delhi · IND
              </span>
              <span className="absolute top-3 right-3 font-mono text-[9px] tracking-[0.3em] uppercase text-white mix-blend-difference">
                EST. 2025
              </span>
            </div>
          </div>
        </div>

        {/* Bottom row: description + CTA */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-16 md:mt-20 items-end">
          <p className="md:col-span-5 text-foreground/70 text-base md:text-lg leading-relaxed max-w-[55ch]">
            I build production software that makes money or saves time —
            <span className="text-foreground"> Next.js applications, smart contracts, Rust systems</span>.
            Working with founders who care about shipping, not slides.
          </p>

          <div className="md:col-span-4 md:col-start-8 flex flex-col items-start md:items-end gap-5">
            <MagneticButton
              type="button"
              className="group inline-flex items-center gap-3 px-7 py-4 bg-foreground text-background rounded-full text-sm font-medium tracking-wide hover:bg-foreground/90 transition-colors"
              onClick={() => {
                const el = document.getElementById('contact')
                el?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <span className="inline-flex items-center gap-2">
                Let&apos;s build something
                <ArrowRight size={16} weight="regular" className="transition-transform group-hover:translate-x-1" />
              </span>
            </MagneticButton>
            <Link
              href="/journey"
              className="group font-mono text-[10px] tracking-[0.3em] text-muted-foreground hover:text-foreground uppercase transition-colors inline-flex items-center gap-2"
            >
              <span>Read my story</span>
              <ArrowRight size={12} weight="regular" className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Scroll cue (bottom-left, inside the section) */}
        <div className="hidden md:flex items-center gap-2 mt-20 text-muted-foreground">
          <ArrowDown size={14} weight="regular" className="animate-bounce" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase">
            Scroll · 5+ projects · 0 churn
          </span>
        </div>
      </div>
    </section>
  )
}
