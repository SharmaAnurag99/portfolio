'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowLeft, Sparkles } from 'lucide-react'
import ParticleWaveField from '@/components/experiments/ParticleWaveField'

const ExperimentSpaceCanvas = dynamic(() => import('@/components/experiments/ExperimentSpaceCanvas'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 z-0 bg-[#07060f]" aria-hidden />,
})

type OrbitNode = {
  label: string
  href: string
  sub: string
  x: string
  y: string
}

const ORBIT_NODES: OrbitNode[] = [
  { label: 'Journey', href: '/journey', sub: 'Story arc', x: '12%', y: '22%' },
  { label: 'Web2', href: '/projects/web2', sub: 'Shipped apps', x: '78%', y: '18%' },
  { label: 'Web3', href: '/projects/web3', sub: 'On-chain', x: '82%', y: '62%' },
  { label: 'Blog', href: '/blog', sub: 'Notes', x: '14%', y: '68%' },
  { label: 'Contact', href: '/#contact', sub: 'Say hi', x: '48%', y: '12%' },
]

function PortalLink({ node }: { node: OrbitNode }) {
  const linkRef = useRef<HTMLAnchorElement>(null)

  const onEnter = () => {
    const el = linkRef.current
    if (!el) return
    gsap.to(el, {
      scale: 1.07,
      borderRadius: '35% 65% 68% 32% / 32% 32% 68% 68%',
      duration: 0.55,
      ease: 'elastic.out(1, 0.35)',
    })
  }

  const onLeave = () => {
    const el = linkRef.current
    if (!el) return
    gsap.to(el, {
      scale: 1,
      borderRadius: '1rem',
      duration: 0.65,
      ease: 'elastic.out(1, 0.45)',
    })
  }

  return (
    <div
      data-orbit-card
      className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: node.x, top: node.y }}
    >
      <Link
        ref={linkRef}
        href={node.href}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className="group flex min-w-[7.5rem] flex-col items-center rounded-2xl border border-white/15 bg-white/[0.07] px-4 py-3 text-center shadow-lg backdrop-blur-md will-change-transform"
      >
        <span className="font-display text-lg tracking-wide text-white group-hover:text-violet-100">
          {node.label}
        </span>
        <span className="font-body text-[10px] uppercase tracking-wider text-white/45">{node.sub}</span>
      </Link>
    </div>
  )
}

export default function GalaxyFunMode() {
  const mainRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const root = mainRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.exp-hero-badge', { opacity: 0, y: 20, duration: 0.55 }, 0)
      tl.from(
        '.exp-hero-line',
        {
          opacity: 0,
          y: 52,
          duration: 0.88,
          stagger: 0.11,
        },
        0.08
      )
      tl.from('.exp-hero-sub', { opacity: 0, y: 28, duration: 0.65 }, '-=0.35')
      tl.from(
        '.exp-center-card',
        {
          opacity: 0,
          scale: 0.9,
          y: 16,
          duration: 0.75,
        },
        '-=0.45'
      )
      tl.from(
        '[data-orbit-card]',
        {
          opacity: 0,
          scale: 0,
          duration: 0.72,
          stagger: 0.065,
          ease: 'elastic.out(1, 0.55)',
          onComplete: () => {
            const cards = root.querySelectorAll('[data-orbit-card]')
            cards.forEach((el, i) => {
              gsap.to(el, {
                y: '+=9',
                duration: 2.1 + i * 0.12,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
              })
            })
          },
        },
        '-=0.35'
      )
    }, mainRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[#07060f] text-white md:cursor-auto">
      <ExperimentSpaceCanvas />
      <ParticleWaveField />

      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.07)_0%,transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#07060f] via-transparent to-[#07060f]/80" />

      <header className="relative z-20 flex items-center justify-between px-4 py-4 md:px-8">
        <Link
          href="/"
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/90 backdrop-blur-md transition hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" />
          Serious mode
        </Link>
        <div className="hidden items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-200 md:flex">
          <Sparkles className="h-3.5 w-3.5" />
          Explore v1 · R3F + wave
        </div>
      </header>

      <main
        ref={mainRef}
        className="relative z-10 mx-auto flex min-h-[calc(100dvh-5rem)] max-w-6xl flex-col items-center justify-center px-4 pb-16 pt-4 text-center md:px-8"
      >
        <p className="exp-hero-badge font-body mb-2 text-[10px] font-semibold uppercase tracking-[0.45em] text-violet-300/90">
          Experimental lane
        </p>
        <h1 className="font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
          <span className="exp-hero-line block">DRIFT</span>
          <span className="exp-hero-line block text-transparent bg-clip-text bg-gradient-to-r from-violet-200 via-white to-cyan-200">
            THROUGH
          </span>
          <span className="exp-hero-line block">THE GRID</span>
        </h1>
        <p className="exp-hero-sub font-body mx-auto mt-6 max-w-lg text-sm leading-relaxed text-white/65 md:text-base">
          Three.js starfield + torus orbit, canvas wave particles, GSAP entrance — Aniruddh-style explore lane meets
          Fahad-style motion layers.
        </p>

        <div className="relative mt-14 h-[min(52vh,420px)] w-full max-w-3xl md:mt-16 md:h-[min(48vh,480px)]">
          <div className="exp-center-card absolute left-1/2 top-1/2 z-10 w-[min(88vw,280px)] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/10 bg-black/40 p-6 shadow-[0_0_60px_rgba(139,92,246,0.25)] backdrop-blur-md">
            <p className="font-display text-3xl tracking-wide text-white">You</p>
            <p className="font-body mt-1 text-xs text-white/50">
              Drag the cursor — wave grid reacts. Orbit the purple ring in 3D.
            </p>
          </div>

          {ORBIT_NODES.map((node) => (
            <PortalLink key={node.href + node.label} node={node} />
          ))}
        </div>
      </main>

      <p className="pointer-events-none absolute bottom-3 left-0 right-0 z-10 text-center font-body text-[10px] text-white/35">
        Fun mode loads Three + GSAP only on this route — keep shipping on main.
      </p>
    </div>
  )
}
