'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

const WORD = 'TRANSIT'

/** Keep overlay visible at least this long so the animation reads (not a flash). */
const MIN_VISIBLE_MS = 1000

export function RouteLoaderPanel() {
  return (
    <div
      className="fixed inset-0 z-[10001] flex min-h-[100dvh] flex-col items-center justify-center bg-cream text-foreground"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-multiply"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            hsl(var(--foreground) / 0.04) 2px,
            hsl(var(--foreground) / 0.04) 3px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 2px,
            hsl(var(--foreground) / 0.03) 2px,
            hsl(var(--foreground) / 0.03) 3px
          )`,
        }}
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute inset-x-0 top-[18%] h-px bg-foreground/15" />
        <div className="absolute inset-x-0 bottom-[22%] h-px bg-foreground/15" />
        <div className="absolute inset-x-0 top-0 h-[28%] animate-pulse bg-gradient-to-b from-foreground/[0.07] to-transparent" />
      </div>

      <div className="pointer-events-none absolute left-6 top-6 h-10 w-10 border-l-2 border-t-2 border-foreground/40 md:left-10 md:top-10" />
      <div className="pointer-events-none absolute right-6 top-6 h-10 w-10 border-r-2 border-t-2 border-foreground/40 md:right-10 md:top-10" />
      <div className="pointer-events-none absolute bottom-6 left-6 h-10 w-10 border-b-2 border-l-2 border-foreground/40 md:bottom-10 md:left-10" />
      <div className="pointer-events-none absolute bottom-6 right-6 h-10 w-10 border-b-2 border-r-2 border-foreground/40 md:bottom-10 md:right-10" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.08]" aria-hidden>
        <div className="h-[min(70vw,420px)] w-[min(70vw,420px)] animate-route-loader-orbit rounded-full border border-foreground" />
      </div>

      <div className="relative px-6 text-center">
        <p className="font-body mb-3 text-[10px] font-semibold uppercase tracking-[0.55em] text-muted-foreground md:text-xs">
          Sharma Portfolio
        </p>
        <h2 className="font-display flex flex-wrap justify-center gap-x-1 text-6xl leading-none tracking-tight sm:text-7xl md:text-8xl">
          {WORD.split('').map((char, i) => (
            <span
              key={`${char}-${i}`}
              className="inline-block animate-route-loader-letter"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              {char}
            </span>
          ))}
        </h2>
        <p className="font-body mt-6 max-w-md text-sm text-muted-foreground md:text-base">
          Reticulating splines… grabbing the next view.
        </p>
        <div className="mt-10 flex justify-center">
          <svg width="200" height="24" className="text-foreground" aria-hidden>
            <rect x="1" y="9" width="198" height="6" fill="none" stroke="currentColor" strokeOpacity="0.15" />
            <line
              x1="1"
              y1="12"
              x2="160"
              y2="12"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="40 120"
              className="animate-route-loader-dash"
            />
          </svg>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-0 right-0 px-6 md:bottom-10">
        <div className="relative mx-auto h-0.5 max-w-xl overflow-hidden rounded-full bg-foreground/10">
          <div className="absolute inset-y-0 w-2/5 animate-route-loader-scan rounded-full bg-foreground/35" />
        </div>
      </div>
    </div>
  )
}

export default function RouteTransitionLoader() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const pathRef = useRef(pathname)
  const blocked = useRef(false)
  const overlayShownAtRef = useRef<number | null>(null)

  useEffect(() => {
    if (pathname !== pathRef.current) {
      pathRef.current = pathname
      blocked.current = false

      const start = overlayShownAtRef.current
      if (start == null) return

      const elapsed = Date.now() - start
      const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed)
      const t = window.setTimeout(() => {
        setVisible(false)
        overlayShownAtRef.current = null
      }, remaining)
      return () => window.clearTimeout(t)
    }
  }, [pathname])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || blocked.current) return
      const target = e.target
      if (!(target instanceof Element)) return

      const anchor = target.closest('a[href]')
      if (!anchor || !(anchor instanceof HTMLAnchorElement)) return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      if (anchor.target === '_blank' || anchor.hasAttribute('download')) return

      const raw = anchor.getAttribute('href')
      if (!raw || raw.startsWith('#') || raw.startsWith('mailto:') || raw.startsWith('tel:')) return

      let url: URL
      try {
        url = new URL(raw, window.location.origin)
      } catch {
        return
      }
      if (url.origin !== window.location.origin) return
      if (url.pathname === pathname && url.search === window.location.search) return

      blocked.current = true
      overlayShownAtRef.current = Date.now()
      setVisible(true)
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [pathname])

  if (!visible) return null

  return (
    <div className="pointer-events-auto fixed inset-0 z-[10002] cursor-wait">
      <RouteLoaderPanel />
    </div>
  )
}
