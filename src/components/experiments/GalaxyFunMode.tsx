'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowLeft, Sparkles } from 'lucide-react'

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

export default function GalaxyFunMode() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const parallax = useRef({ x: 0, y: 0 })
  const nodesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    const stars: { x: number; y: number; z: number; tw: number }[] = []
    const n = 520

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      stars.length = 0
      for (let i = 0; i < n; i++) {
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          z: Math.random(),
          tw: Math.random() * Math.PI * 2,
        })
      }
    }

    resize()
    window.addEventListener('resize', resize)

    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      parallax.current.x = (e.clientX - cx) / cx
      parallax.current.y = (e.clientY - cy) / cy
    }
    window.addEventListener('mousemove', onMove)

    const draw = (t: number) => {
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.fillStyle = '#07060f'
      ctx.fillRect(0, 0, w, h)

      const { x: px, y: py } = parallax.current
      for (const s of stars) {
        const depth = 0.15 + s.z * 0.85
        const shiftX = px * 40 * depth
        const shiftY = py * 40 * depth
        const twinkle = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 0.002 + s.tw))
        const alpha = twinkle * depth
        ctx.fillStyle = `rgba(220, 230, 255, ${alpha})`
        const size = depth * 1.8
        ctx.beginPath()
        ctx.arc(s.x + shiftX * 0.3, s.y + shiftY * 0.3, size, 0, Math.PI * 2)
        ctx.fill()
      }

      const gx = w * 0.5 + px * 20
      const gy = h * 0.42 + py * 15
      const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, Math.max(w, h) * 0.45)
      g.addColorStop(0, 'rgba(120, 90, 255, 0.18)')
      g.addColorStop(0.35, 'rgba(60, 40, 140, 0.08)')
      g.addColorStop(1, 'rgba(7, 6, 15, 0)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  useEffect(() => {
    const root = nodesRef.current
    if (!root) return
    const cards = root.querySelectorAll('[data-orbit-card]')
    cards.forEach((el, i) => {
      gsap.to(el, {
        y: '+=10',
        duration: 2.2 + i * 0.15,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    })
    return () => {
      cards.forEach((el) => gsap.killTweensOf(el))
    }
  }, [])

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[#07060f] text-white md:cursor-auto">
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" aria-hidden />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.06)_0%,transparent_55%)]" />

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
          Fun orbit v0
        </div>
      </header>

      <main className="relative z-10 mx-auto flex min-h-[calc(100dvh-5rem)] max-w-6xl flex-col items-center justify-center px-4 pb-16 pt-4 text-center md:px-8">
        <p className="font-body mb-2 text-[10px] font-semibold uppercase tracking-[0.45em] text-violet-300/90">
          Experimental lane
        </p>
        <h1 className="font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
          DRIFT
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-200 via-white to-cyan-200">
            THROUGH
          </span>
          <br />
          THE GRID
        </h1>
        <p className="font-body mx-auto mt-6 max-w-lg text-sm leading-relaxed text-white/65 md:text-base">
          Mouse parallax starfield + floating portals. This is the playground branch — we can swap in Three.js galaxies,
          quest maps, or scroll bosses next.
        </p>

        <div
          ref={nodesRef}
          className="relative mt-14 h-[min(52vh,420px)] w-full max-w-3xl md:mt-16 md:h-[min(48vh,480px)]"
        >
          <div className="absolute left-1/2 top-1/2 z-10 w-[min(88vw,280px)] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/10 bg-black/35 p-6 shadow-[0_0_60px_rgba(139,92,246,0.25)] backdrop-blur-md">
            <p className="font-display text-3xl tracking-wide text-white">You</p>
            <p className="font-body mt-1 text-xs text-white/50">Move the mouse — stars follow. Click a portal.</p>
          </div>

          {ORBIT_NODES.map((node) => (
            <div
              key={node.href + node.label}
              data-orbit-card
              className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: node.x, top: node.y }}
            >
              <Link
                href={node.href}
                className="group flex min-w-[7.5rem] flex-col items-center rounded-2xl border border-white/15 bg-white/[0.07] px-4 py-3 text-center shadow-lg backdrop-blur-md transition hover:border-violet-400/50 hover:bg-violet-500/15 hover:shadow-[0_0_28px_rgba(139,92,246,0.35)]"
              >
                <span className="font-display text-lg tracking-wide text-white group-hover:text-violet-100">
                  {node.label}
                </span>
                <span className="font-body text-[10px] uppercase tracking-wider text-white/45">{node.sub}</span>
              </Link>
            </div>
          ))}
        </div>
      </main>

      <p className="pointer-events-none absolute bottom-3 left-0 right-0 text-center font-body text-[10px] text-white/35">
        Built for the experiments branch — ship weird ideas here first.
      </p>
    </div>
  )
}
