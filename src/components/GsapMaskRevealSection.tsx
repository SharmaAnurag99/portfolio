'use client'

import { useEffect, useRef } from 'react'

export default function GsapMaskRevealSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cleanup: (() => void) | undefined
    let mounted = true

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    ;(async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (!mounted) return

      gsap.registerPlugin(ScrollTrigger)

      const section = sectionRef.current
      const media = mediaRef.current
      const copy = copyRef.current
      if (!section || !media || !copy) return

      const ctx = gsap.context(() => {
        gsap.set(media, { clipPath: 'inset(100% 0% 0% 0% round 24px)' })
        gsap.set(copy, { y: 28, opacity: 0 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 72%',
            end: 'bottom 38%',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })

        tl.to(media, {
          clipPath: 'inset(0% 0% 0% 0% round 24px)',
          ease: 'none',
          duration: 1,
        }).to(
          copy,
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            duration: 0.7,
          },
          0.15,
        )

        cleanup = () => {
          tl.scrollTrigger?.kill()
          tl.kill()
        }
      }, section)

      const innerCleanup = cleanup
      cleanup = () => {
        innerCleanup?.()
        ctx.revert()
      }
    })()

    return () => {
      mounted = false
      cleanup?.()
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-10 md:mb-14">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            — GSAP reveal lab / 07
          </span>
          <span className="hidden md:inline-block w-20 h-px bg-border" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-10 md:mb-14">
          <h2 className="lg:col-span-8 font-display text-[clamp(2.8rem,8.5vw,7.2rem)] leading-[0.9] tracking-tight">
            MASK<span className="italic font-light text-foreground/35"> reveal.</span>
          </h2>
          <div ref={copyRef} className="lg:col-span-4">
            <p className="text-foreground/75 text-sm md:text-base leading-relaxed max-w-[42ch]">
              GSAP clip-path masking reveal. Isko aage product intro, case-study hero, ya testimonial filmstrip me reuse kar sakte ho.
            </p>
          </div>
        </div>

        <div
          ref={mediaRef}
          className="relative overflow-hidden border border-border rounded-3xl aspect-[16/9] bg-muted"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/myphoto.png"
            alt="Mask reveal demo"
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
