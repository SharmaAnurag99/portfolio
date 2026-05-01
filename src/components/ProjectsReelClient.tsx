'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowDown } from '@phosphor-icons/react'

export type ReelProject = {
  slug: string
  title: string
  category: string
  outcome: string
  image: string
  year?: string
}

type Props = {
  projects: ReelProject[]
}

export default function ProjectsReelClient({ projects }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cleanup: (() => void) | undefined
    let mounted = true

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    if (reduceMotion || isMobile) return

    ;(async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (!mounted) return

      gsap.registerPlugin(ScrollTrigger)

      const section = sectionRef.current
      const track = trackRef.current
      const pin = pinRef.current
      if (!section || !track || !pin) return

      const ctx = gsap.context(() => {
        const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth)

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => `+=${getDistance()}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        const onResize = () => ScrollTrigger.refresh()
        window.addEventListener('resize', onResize)

        cleanup = () => {
          window.removeEventListener('resize', onResize)
          tween.scrollTrigger?.kill()
          tween.kill()
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
  }, [projects.length])

  const total = projects.length

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative bg-background"
    >
      {/* Section header — outside the pin so it scrolls in normally */}
      <div className="container mx-auto px-6 pt-24 md:pt-32 pb-12 md:pb-16">
        <div className="flex items-center justify-between mb-10 md:mb-14">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            — Selected work / 06
          </span>
          <span className="hidden md:inline-block w-20 h-px bg-border" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-12 items-end">
          <h2 className="lg:col-span-8 font-display text-[clamp(3rem,9vw,8rem)] leading-[0.9] tracking-tight">
            THE <span className="italic font-light text-foreground/30">work.</span>
          </h2>
          <p className="lg:col-span-4 text-foreground/70 leading-relaxed text-sm md:text-base max-w-[44ch]">
            Real software, real outcomes. Click any to read the full case study.
          </p>
        </div>

        {/* Scroll cue */}
        <div className="hidden md:flex items-center gap-3 mt-12 text-muted-foreground">
          <ArrowDown size={14} weight="regular" className="-rotate-90" />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase">
            Scroll horizontal · {String(total).padStart(2, '0')} projects
          </span>
        </div>
      </div>

      {/* Mobile fallback — vertical stack, no pin */}
      <div className="md:hidden container mx-auto px-6 pb-24 space-y-12">
        {projects.map((p, i) => (
          <ReelCard
            key={p.slug + i}
            project={p}
            index={i}
            total={total}
            mobile
          />
        ))}
      </div>

      {/* Desktop pinned horizontal reel */}
      <div ref={pinRef} className="hidden md:block relative h-[100dvh] overflow-hidden">
        <div
          ref={trackRef}
          className="absolute inset-y-0 left-0 flex items-center gap-10 lg:gap-16 px-[10vw] will-change-transform"
        >
          {projects.map((p, i) => (
            <ReelCard
              key={p.slug + i}
              project={p}
              index={i}
              total={total}
            />
          ))}

          {/* End-of-reel marker */}
          <div className="shrink-0 w-[40vw] flex items-center justify-center pr-[6vw]">
            <div className="flex flex-col items-start gap-4">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                — End of reel
              </span>
              <span className="font-display text-5xl lg:text-7xl leading-[0.95]">
                More to come<span className="text-foreground/30">.</span>
              </span>
              <Link
                href="/#contact"
                className="group mt-4 inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase text-foreground hover:text-[hsl(var(--accent))] transition-colors"
              >
                Start a project
                <ArrowRight size={14} weight="regular" className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ReelCard({
  project,
  index,
  total,
  mobile = false,
}: {
  project: ReelProject
  index: number
  total: number
  mobile?: boolean
}) {
  const num = String(index + 1).padStart(2, '0')
  const totalStr = String(total).padStart(2, '0')

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={[
        'group block shrink-0',
        mobile ? 'w-full' : 'w-[78vw] md:w-[64vw] lg:w-[44vw] xl:w-[38vw]',
      ].join(' ')}
    >
      <div className="flex items-center justify-between mb-5">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
          {num} / {totalStr}
        </span>
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
          {project.category}
          {project.year ? ` · ${project.year}` : ''}
        </span>
      </div>

      <div className="relative overflow-hidden aspect-[4/3] border border-border bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter,transform] duration-700 group-hover:scale-[1.02]"
          draggable={false}
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-end p-6 md:p-8 bg-gradient-to-t from-foreground/55 via-foreground/0 to-foreground/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.3em] uppercase text-background">
            View case study
            <ArrowRight size={14} weight="regular" />
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3">
        <h3 className="font-display text-4xl md:text-5xl leading-[0.95] tracking-tight">
          {project.title}
        </h3>
        {project.outcome ? (
          <p className="text-foreground/70 text-sm md:text-base leading-relaxed max-w-[42ch]">
            {project.outcome}
          </p>
        ) : null}
      </div>
    </Link>
  )
}
