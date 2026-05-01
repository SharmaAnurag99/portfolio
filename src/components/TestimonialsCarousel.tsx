'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export type CarouselTestimonial = {
  image: string
  content: string
  name: string
  role: string
}

type Props = {
  testimonials: CarouselTestimonial[]
}

export default function TestimonialsCarousel({ testimonials }: Props) {
  const count = testimonials.length

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'start',
      loop: count > 2,
      dragFree: false,
      containScroll: 'trimSnaps',
      skipSnaps: false,
    },
    [
      Autoplay({
        delay: 5500,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  )

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [progress, setProgress] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  const onScroll = useCallback(() => {
    if (!emblaApi) return
    const p = Math.max(0, Math.min(1, emblaApi.scrollProgress()))
    setProgress(p)
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    onSelect()
    onScroll()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('scroll', onScroll)
    emblaApi.on('reInit', onScroll)
  }, [emblaApi, onSelect, onScroll])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi],
  )

  if (count === 0) return null

  return (
    <div className="relative">
      {/* Embla viewport */}
      <div
        className="overflow-hidden cursor-grab active:cursor-grabbing select-none"
        ref={emblaRef}
      >
        <div className="flex">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className={[
                'relative shrink-0 grow-0',
                'pl-4 first:pl-0',
                'basis-[88%] sm:basis-[70%] md:basis-[55%] lg:basis-[42%] xl:basis-[36%]',
              ].join(' ')}
            >
              <article
                className={[
                  'group relative h-full',
                  'flex flex-col justify-between',
                  'p-8 md:p-10 min-h-[340px] md:min-h-[380px]',
                  'border border-border bg-card',
                  'transition-colors duration-500',
                  'hover:bg-muted/40',
                  'overflow-hidden',
                ].join(' ')}
              >
                {/* Decorative quote glyph */}
                <span
                  aria-hidden
                  className="absolute -top-4 right-6 font-display text-[10rem] leading-none text-foreground/[0.05] select-none pointer-events-none"
                >
                  "
                </span>

                {/* Index */}
                <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground/40 uppercase mb-6 block">
                  {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                </span>

                {/* Quote */}
                <p className="relative z-10 text-foreground/85 text-base md:text-lg leading-relaxed flex-1">
                  {t.content}
                </p>

                {/* Author row */}
                <div className="relative z-10 flex items-center gap-4 pt-6 mt-8 border-t border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                    draggable={false}
                  />
                  <div className="min-w-0">
                    <h4 className="font-display text-xl leading-tight tracking-wide truncate">
                      {t.name}
                    </h4>
                    <p className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase mt-0.5 truncate">
                      {t.role}
                    </p>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* Controls row */}
      <div className="mt-10 flex items-center justify-between gap-6">
        {/* Progress bar */}
        <div className="relative flex-1 h-px bg-border overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-foreground transition-[width] duration-150 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {/* Dots (only when count is reasonable) */}
        {count <= 8 && (
          <div className="hidden sm:flex items-center gap-2">
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={[
                  'w-2 h-2 rounded-full transition-all duration-300',
                  i === selectedIndex
                    ? 'bg-foreground w-6'
                    : 'bg-foreground/20 hover:bg-foreground/40',
                ].join(' ')}
              />
            ))}
          </div>
        )}

        {/* Counter + arrows */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">
            {String(selectedIndex + 1).padStart(2, '0')}
            <span className="text-foreground/30 mx-1">/</span>
            {String(count).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous testimonial"
              className="w-11 h-11 flex items-center justify-center border border-border hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next testimonial"
              className="w-11 h-11 flex items-center justify-center border border-border hover:bg-foreground hover:text-background transition-colors duration-300"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Drag hint (mobile-first nudge) */}
      <p className="mt-4 text-center sm:text-right font-mono text-[10px] tracking-[0.3em] text-muted-foreground/60 uppercase">
        Drag · Swipe · Auto
      </p>
    </div>
  )
}
