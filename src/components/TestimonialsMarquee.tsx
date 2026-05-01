'use client'

import type { CarouselTestimonial } from './TestimonialsCarousel'

type Props = { testimonials: CarouselTestimonial[] }

const styles = `
.tm-row { animation: tm-scroll var(--tm-duration, 50s) linear infinite; }
.tm-row.tm-reverse { animation-direction: reverse; }
.tm-track:hover .tm-row { animation-play-state: paused; }
@keyframes tm-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
`

function Card({ t, idx }: { t: CarouselTestimonial; idx: number }) {
  return (
    <article className="shrink-0 w-[340px] md:w-[420px] p-7 md:p-8 border border-border bg-card flex flex-col">
      <span aria-hidden className="font-display text-6xl text-foreground/10 leading-none mb-3">
        &ldquo;
      </span>
      <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground/40 uppercase mb-3 block">
        {String(idx + 1).padStart(2, '0')}
      </span>
      <p className="text-foreground/85 text-sm md:text-[0.95rem] leading-relaxed mb-6 flex-1 line-clamp-6">
        {t.content}
      </p>
      <div className="flex items-center gap-3 pt-4 border-t border-border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={t.image}
          alt={t.name}
          className="w-10 h-10 rounded-full object-cover grayscale"
          draggable={false}
        />
        <div className="min-w-0">
          <h4 className="font-display text-lg leading-tight truncate">{t.name}</h4>
          <p className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase truncate">
            {t.role}
          </p>
        </div>
      </div>
    </article>
  )
}

export default function TestimonialsMarquee({ testimonials }: Props) {
  if (testimonials.length === 0) return null
  // Duplicate row for seamless infinite loop
  const items = [...testimonials, ...testimonials]
  // Optional second row when many testimonials exist (offset for visual interest)
  const showSecondRow = testimonials.length >= 6
  const half = Math.ceil(testimonials.length / 2)
  const row1 = testimonials.slice(0, showSecondRow ? half : testimonials.length)
  const row2 = testimonials.slice(half)
  const row1Items = [...row1, ...row1]
  const row2Items = [...row2, ...row2]

  return (
    <div className="tm-track relative">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div
        className="overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <div
          className="tm-row flex gap-6"
          style={{ width: 'fit-content', ['--tm-duration' as any]: '55s' }}
        >
          {(showSecondRow ? row1Items : items).map((t, i) => (
            <Card key={`r1-${i}`} t={t} idx={i % (showSecondRow ? row1.length : testimonials.length)} />
          ))}
        </div>

        {showSecondRow && (
          <div
            className="tm-row tm-reverse flex gap-6 mt-6"
            style={{ width: 'fit-content', ['--tm-duration' as any]: '70s' }}
          >
            {row2Items.map((t, i) => (
              <Card key={`r2-${i}`} t={t} idx={(i % row2.length) + row1.length} />
            ))}
          </div>
        )}
      </div>

      <p className="mt-8 text-center font-mono text-[10px] tracking-[0.3em] text-muted-foreground/60 uppercase">
        Hover to pause · {String(testimonials.length).padStart(2, '0')} reviews
      </p>
    </div>
  )
}
