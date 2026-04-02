'use client'

import { useEffect, useRef } from 'react'

type Particle = {
  gx: number
  gy: number
  bx: number
  by: number
}

/**
 * Grid particle field with cursor-driven wave (DEV article pattern).
 * Sits above WebGL with blend so motion reads without replacing the 3D layer.
 */
export default function ParticleWaveField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const particles = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const gap = 14
    let raf = 0
    let w = 0
    let h = 0
    let cols = 0
    let rows = 0

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      cols = Math.ceil(w / gap) + 1
      rows = Math.ceil(h / gap) + 1
      const list: Particle[] = []
      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          const bx = gx * gap + gap * 0.35
          const by = gy * gap + gap * 0.35
          list.push({ gx, gy, bx, by })
        }
      }
      particles.current = list
    }

    build()
    const cx = typeof window !== 'undefined' ? window.innerWidth / 2 : 0
    const cy = typeof window !== 'undefined' ? window.innerHeight / 2 : 0
    target.current = { x: cx, y: cy }
    mouse.current = { x: cx, y: cy }

    window.addEventListener('resize', build)

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
    }
    window.addEventListener('mousemove', onMove)

    let t = 0
    const draw = () => {
      t += 0.018
      mouse.current.x += (target.current.x - mouse.current.x) * 0.08
      mouse.current.y += (target.current.y - mouse.current.y) * 0.08

      const mx = mouse.current.x
      const my = mouse.current.y

      ctx.clearRect(0, 0, w, h)

      for (const p of particles.current) {
        const dx = p.bx - mx
        const dy = p.by - my
        const dist = Math.sqrt(dx * dx + dy * dy) + 0.001
        const falloff = Math.max(0, 1 - dist / 220)
        const wave = Math.sin(dist * 0.045 - t * 3) * 6 * falloff
        const nx = dx / dist
        const ny = dy / dist
        const px = p.bx + nx * wave + nx * falloff * 14
        const py = p.by + ny * wave + ny * falloff * 14

        const ang = Math.atan2(my - py, mx - px)
        const alpha = 0.08 + falloff * 0.55
        const size = 0.9 + falloff * 1.4

        ctx.fillStyle = `rgba(196, 181, 253, ${alpha})`
        ctx.save()
        ctx.translate(px, py)
        ctx.rotate(ang)
        ctx.fillRect(-size * 2.2, -0.35, size * 4.4, 0.7)
        ctx.restore()
      }

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', build)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full mix-blend-screen opacity-[0.55]"
      aria-hidden
    />
  )
}
