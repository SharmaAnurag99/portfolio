'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ArrowDown } from '@phosphor-icons/react'
import { AnimatePresence, motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import MagneticButton from './MagneticButton'
import { HOME_CONTACT } from '@/lib/site-links'

/* ---- copy: kinetic marquee strip at hero foot --------------------- */
const ROLE_TOKENS = [
  'Full-stack developer',
  'Smart contract engineer',
  'Production shipper',
  'India · global',
  'Available Q2 2026',
]

/* ---- entrance variants --------------------------------------------- */
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const wordVariants = {
  hidden: { y: 28, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 220, damping: 22, mass: 0.5 },
  },
}

const photoVariants = {
  hidden: { clipPath: 'inset(100% 0 0 0)' },
  show: {
    clipPath: 'inset(0% 0 0 0)',
    transition: { duration: 1.2, ease: [0.65, 0, 0.35, 1] as [number, number, number, number] },
  },
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
}

/* ---- inline keyframes ---------------------------------------------- */
const styles = `
.hero-marquee-track { animation: hero-marquee 70s linear infinite; }
.hero-marquee:hover .hero-marquee-track { animation-play-state: paused; }
@keyframes hero-marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@media (prefers-reduced-motion: reduce) {
  .hero-marquee-track { animation: none; }
}
`

export default function HeroAsymmetric() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const [now, setNow] = useState<string>('')
  const [showIntroCard, setShowIntroCard] = useState(false)

  // Live IST clock
  useEffect(() => {
    const fmt = (d: Date) =>
      d.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    setNow(fmt(new Date()))
    const id = setInterval(() => setNow(fmt(new Date())), 30_000)
    return () => clearInterval(id)
  }, [])

  // Subtle parallax on photo strip — transform-only
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -60])

  const marqueeStream = [...ROLE_TOKENS, ...ROLE_TOKENS, ...ROLE_TOKENS]
  const introLine =
    "Hello, I am Anurag Sharma. I build fast, modern products with Next.js, blockchain and cloud systems. Let's build something impactful together."

  const speakIntro = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(introLine)
    utterance.rate = 1
    utterance.pitch = 1
    utterance.volume = 0.95
    window.speechSynthesis.speak(utterance)
  }

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-label="Hero"
      className="relative overflow-hidden min-h-[100dvh] flex flex-col pt-28 md:pt-32"
      style={{
        background:
          'linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--background)) 60%, hsl(var(--muted)) 100%)',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      {/* Subtle radial-masked grid bg */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage:
            'radial-gradient(ellipse 90% 70% at 50% 50%, black 40%, transparent 90%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 90% 70% at 50% 50%, black 40%, transparent 90%)',
        }}
      />

      {/* Warm terracotta blob — upper right, behind photo */}
      <div
        aria-hidden
        className="absolute top-0 right-0 -z-10 w-[55vw] h-[55vw] max-w-[720px] max-h-[720px] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 70% 30%, hsl(var(--accent) / 0.08), transparent 65%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="container mx-auto px-6 relative flex-1 flex flex-col">
        {/* Trust signal strip */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUpVariants}
          className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-12 md:mb-16"
        >
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
          <span className="hidden md:inline-block w-px h-3 bg-border" />
          <span className="hidden md:inline font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
            Reply &lt; 6h IST
          </span>
        </motion.div>

        {/* Main asymmetric grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-10 items-start">
          {/* Type column (8 cols) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="lg:col-span-8 order-2 lg:order-1"
          >
            <div className="relative">
              <p className="font-mono text-[10px] md:text-[11px] tracking-[0.42em] uppercase text-muted-foreground mb-5 md:mb-6 max-w-[52ch] leading-relaxed">
                Full-stack · Blockchain · Systems — shipping production software from Delhi.
              </p>
              <h1 className="font-display leading-[0.86] tracking-[-0.045em]">
                <span className="block overflow-visible pb-1">
                  <motion.span
                    variants={wordVariants}
                    className="inline-block text-[clamp(4rem,14vw,13rem)] font-[800] text-foreground"
                  >
                    SHARMA
                  </motion.span>
                </span>
                <span className="block h-px w-[min(42vw,220px)] bg-[hsl(var(--accent))]/35 my-4 md:my-5 ml-[4%]" aria-hidden />
                <span className="block overflow-visible mt-1 md:mt-2 pl-[8%] pb-2">
                  <motion.span
                    variants={wordVariants}
                    className="inline-block text-[clamp(3rem,11vw,10rem)] italic font-light text-[hsl(var(--accent))]"
                  >
                    anurag.
                  </motion.span>
                </span>
              </h1>
              <p className="mt-6 md:mt-8 font-mono text-[10px] tracking-[0.28em] uppercase text-muted-foreground/90">
                Anurag Sharma · Engineer · India / remote
              </p>
            </div>

            {/* Description + CTA cluster */}
            <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 max-w-[880px]">
              <motion.p
                variants={fadeUpVariants}
                className="text-foreground/70 text-base md:text-lg leading-relaxed max-w-[42ch]"
              >
                I build production software that makes money or saves time —
                <span className="text-foreground"> Next.js, smart contracts, Rust systems</span>.
                Working with founders who care about shipping, not slides.
              </motion.p>

              <motion.div
                variants={fadeUpVariants}
                className="flex flex-col items-start gap-5"
              >
                <Link href={HOME_CONTACT} className="inline-block">
                  <MagneticButton
                    type="button"
                    className="group inline-flex items-center gap-3 px-7 py-4 bg-foreground text-background rounded-full text-sm font-medium tracking-wide hover:bg-foreground/90 transition-colors"
                  >
                    <span className="inline-flex items-center gap-2">
                      Let&apos;s build something
                      <ArrowRight
                        size={16}
                        weight="regular"
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </MagneticButton>
                </Link>

                <Link
                  href="/journey"
                  className="group font-mono text-[10px] tracking-[0.3em] text-muted-foreground hover:text-foreground uppercase transition-colors inline-flex items-center gap-2"
                >
                  <span>Read my story</span>
                  <ArrowRight
                    size={12}
                    weight="regular"
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Photo column — vertical full-bleed strip (4 cols) */}
          <div className="lg:col-span-4 order-1 lg:order-2 relative">
            <motion.div
              variants={photoVariants}
              initial="hidden"
              animate="show"
              style={reduceMotion ? undefined : { y: photoY }}
              className="relative w-full aspect-[3/5] lg:aspect-auto lg:h-[78vh] lg:max-h-[860px] overflow-hidden border border-border bg-muted will-change-transform"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/myphoto.png"
                alt="Anurag Sharma"
                className="w-full h-full object-cover grayscale-[0.25] contrast-[1.03] mix-blend-normal dark:grayscale-0 dark:brightness-100 dark:contrast-100"
              />

              {/* Tonal warm tint over photo — integrates with background */}
              <div
                aria-hidden
                className="absolute inset-0 mix-blend-overlay pointer-events-none"
                style={{
                  background:
                    'linear-gradient(180deg, hsl(var(--accent) / 0.06) 0%, transparent 40%, hsl(var(--background) / 0.15) 100%)',
                }}
              />

              {/* Corner labels */}
              <span className="absolute bottom-4 left-4 font-mono text-[9px] tracking-[0.3em] uppercase text-white mix-blend-difference">
                Delhi · IND
              </span>
              <span className="absolute top-4 right-4 font-mono text-[9px] tracking-[0.3em] uppercase text-white mix-blend-difference">
                Est. 2025
              </span>
              <button
                type="button"
                onClick={() => {
                  setShowIntroCard(true)
                  speakIntro()
                }}
                className="absolute bottom-4 right-4 rounded-full border border-white/35 bg-black/25 px-3 py-1.5 text-[10px] font-mono tracking-[0.25em] uppercase text-white backdrop-blur hover:bg-black/40 transition-colors"
              >
                Tap to intro
              </button>
            </motion.div>

            {/* Live signals — vertical mini-strip below photo */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 grid grid-cols-2 gap-x-3 gap-y-3"
            >
              <LiveSignal label="Now" value={now ? `${now} IST` : '— IST'} />
              <LiveSignal label="Building" value="AstroRekhaaji v2" />
              <LiveSignal label="Reply" value="Median 6h" />
              <LiveSignal label="Status" value="Open" pulsing />
            </motion.div>
          </div>
        </div>

        {/* Bottom row: scroll cue (left) — pushed to bottom */}
        <div className="mt-auto pt-16 md:pt-24 pb-10 flex flex-col gap-6">
          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex items-center gap-3 text-muted-foreground"
          >
            <ArrowDown
              size={14}
              weight="regular"
              className="motion-safe:animate-bounce"
            />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase">
              Next: selected work / 06
            </span>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showIntroCard ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-6"
            onClick={() => setShowIntroCard(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-xl rounded-2xl border border-border bg-background p-6 md:p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
                About Anurag
              </p>
              <h3 className="font-display text-4xl md:text-5xl tracking-tight mb-4">
                Hello, I am Anurag<span className="text-foreground/30">.</span>
              </h3>
              <p className="text-foreground/75 leading-relaxed mb-6">
                I build fast and thoughtful digital products from idea to launch. My focus is
                on clean UX, strong engineering, and outcomes that actually move business.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={speakIntro}
                  className="rounded-full bg-foreground text-background px-4 py-2 text-sm"
                >
                  Speak intro
                </button>
                <button
                  type="button"
                  onClick={() => setShowIntroCard(false)}
                  className="rounded-full border border-border px-4 py-2 text-sm text-foreground/80"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Kinetic role marquee — full bleed, hero foot */}
      <div className="hero-marquee relative border-y border-border overflow-hidden bg-[hsl(var(--background))]">
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-r from-[hsl(var(--background))] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-l from-[hsl(var(--background))] to-transparent pointer-events-none" />
        <div
          className="hero-marquee-track flex items-center gap-12 py-5 whitespace-nowrap will-change-transform"
          style={{ width: 'max-content' }}
        >
          {marqueeStream.map((token, i) => (
            <span key={i} className="inline-flex items-center gap-12 shrink-0">
              <span className="font-display text-2xl md:text-3xl tracking-tight italic font-light text-foreground/55">
                {token}
              </span>
              <span
                aria-hidden
                className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent))]/60 shrink-0"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function LiveSignal({
  label,
  value,
  pulsing = false,
}: {
  label: string
  value: string
  pulsing?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5 border-l border-border pl-3 py-1">
      <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.3em] uppercase text-muted-foreground">
        {pulsing ? (
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inset-0 rounded-full bg-[hsl(var(--accent))] animate-ping opacity-75" />
            <span className="relative w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent))]" />
          </span>
        ) : null}
        {label}
      </span>
      <span className="font-mono text-[11px] text-foreground/80 truncate">{value}</span>
    </div>
  )
}
