'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import {
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
  TwitterLogo,
} from '@phosphor-icons/react'

const NOW_STATES: { label: string; value: string }[] = [
  { label: 'Currently', value: 'Building AstroRekhaaji v2' },
  { label: 'Latest ship', value: 'Cloudflare R2 + Payload CMS' },
  { label: 'Open to', value: 'Founding-engineer roles' },
  { label: 'Reply time', value: 'Median 6h · IST' },
]

const KONAMI: string[] = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

export default function Footer() {
  const [nowIdx, setNowIdx] = useState(0)
  const seqRef = useRef<string[]>([])
  const logoControls = useAnimation()

  useEffect(() => {
    const id = setInterval(() => {
      setNowIdx((n) => (n + 1) % NOW_STATES.length)
    }, 3500)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      seqRef.current.push(key)
      if (seqRef.current.length > KONAMI.length) {
        seqRef.current.shift()
      }
      const matches = seqRef.current.length === KONAMI.length &&
        seqRef.current.every((k, i) => k === KONAMI[i])
      if (matches) {
        seqRef.current = []
        // eslint-disable-next-line no-console
        console.log('you found it')
        logoControls.start({
          rotate: 360,
          transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
        }).then(() => {
          logoControls.set({ rotate: 0 })
        })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [logoControls])

  const today = new Date()
  const dateStr = today.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  const now = NOW_STATES[nowIdx]

  return (
    <footer className="relative border-t border-border bg-background">
      <div className="container mx-auto px-6 py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-10">
          {/* Brand */}
          <div className="md:col-span-5">
            <motion.div
              animate={logoControls}
              className="inline-block origin-center"
            >
              <Link
                href="/"
                className="font-display leading-[0.85] tracking-tight inline-block"
                aria-label="Home"
              >
                <span className="block text-[clamp(3rem,8vw,7rem)]">SHARMA</span>
                <span className="block text-[clamp(2.4rem,6vw,5rem)] italic font-light text-foreground/35">
                  anurag.
                </span>
              </Link>
            </motion.div>
            <p className="mt-6 text-foreground/70 text-sm md:text-base leading-relaxed max-w-[40ch]">
              Software that makes money or saves time. Everything else is decoration.
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-2">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              — Pages
            </span>
            <ul className="mt-6 space-y-3">
              {[
                { href: '/#work', label: 'Work' },
                { href: '/blog', label: 'Writing' },
                { href: '/#about', label: 'About' },
                { href: '/#contact', label: 'Contact' },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-mono text-[11px] tracking-[0.25em] uppercase text-foreground/85 hover:text-[hsl(var(--accent))] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Live status */}
          <div className="md:col-span-2">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              — Live
            </span>
            <div className="mt-6 h-[68px] relative overflow-hidden">
              <motion.div
                key={nowIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-2"
              >
                <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                  <span className="relative flex w-1.5 h-1.5">
                    <span className="absolute inset-0 rounded-full bg-[hsl(var(--accent))] animate-ping opacity-75" />
                    <span className="relative w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent))]" />
                  </span>
                  {now.label}
                </span>
                <span className="text-foreground/85 text-sm leading-tight">{now.value}</span>
              </motion.div>
            </div>
          </div>

          {/* Contact strip */}
          <div className="md:col-span-3">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              — Direct
            </span>
            <div className="mt-6 flex flex-col gap-4">
              <a
                href="mailto:contact@sharmaanurag.in"
                className="inline-flex items-center gap-2 text-sm text-foreground/85 hover:text-[hsl(var(--accent))] transition-colors"
              >
                <EnvelopeSimple size={14} weight="regular" />
                contact@sharmaanurag.in
              </a>
              <div className="flex items-center gap-3">
                {[
                  {
                    href: 'https://github.com/SharmaAnurag99',
                    label: 'GitHub',
                    icon: <GithubLogo size={16} weight="regular" />,
                  },
                  {
                    href: 'https://linkedin.com/in/sharma-anurag-umesh',
                    label: 'LinkedIn',
                    icon: <LinkedinLogo size={16} weight="regular" />,
                  },
                  {
                    href: 'https://twitter.com/SharmaAnurag99',
                    label: 'Twitter',
                    icon: <TwitterLogo size={16} weight="regular" />,
                  },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 inline-flex items-center justify-center border border-border text-foreground/70 hover:text-background hover:bg-foreground transition-colors"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                Median reply 6h · IST
              </span>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-16 md:mt-24 pt-8 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
            Available for Q2 2026 · last updated {dateStr}
          </span>
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
            Built with Next.js · Payload · R2 · GSAP · Framer Motion
          </span>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground/70">
            © {today.getFullYear()} Anurag Sharma. All rights reserved.
          </span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  )
}
