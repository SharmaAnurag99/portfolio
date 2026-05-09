'use client'

import { useEffect, useRef, type HTMLAttributes, type ReactNode } from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  pauseVh?: number
}

/**
 * Adds a short GSAP pin pause (desktop) so each section "holds" briefly
 * before the next section starts scrolling, similar to showcase behavior.
 */
export default function ScrollPauseSection({
  children,
  className,
  pauseVh = 28,
  ...rest
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cleanup: (() => void) | undefined
    let mounted = true

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 1023px)').matches
    if (reduceMotion || isMobile) return

    ;(async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (!mounted) return

      gsap.registerPlugin(ScrollTrigger)
      const section = sectionRef.current
      if (!section) return

      const ctx = gsap.context(() => {
        const trigger = ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: () => `+=${window.innerHeight * (pauseVh / 100)}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        })

        const onResize = () => ScrollTrigger.refresh()
        window.addEventListener('resize', onResize)

        cleanup = () => {
          window.removeEventListener('resize', onResize)
          trigger.kill()
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
  }, [pauseVh])

  return (
    <div ref={sectionRef} className={className} {...rest}>
      {children}
    </div>
  )
}
