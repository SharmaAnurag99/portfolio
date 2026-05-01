import { getPayload } from 'payload'
import configPromise from '../../payload.config'
import { resolveMediaUrl } from '@/lib/media'
import { useCmsContent } from '@/lib/use-cms-content'
import { localTestimonials } from '@/data/local/testimonials'

const Testimonials = async () => {
  const cmsEnabled = useCmsContent()
  const testimonials = cmsEnabled
    ? (
        await (await getPayload({ config: configPromise })).find({
          collection: 'testimonials',
          depth: 1,
          limit: 100,
        })
      ).docs
    : localTestimonials

  const count = testimonials.length

  if (count === 0) return null

  return (
    <section className="testimonials-section py-24 section-cream overflow-hidden">
      <div className="container mx-auto px-6">

        {/* Section header */}
        <div className="flex items-end justify-between mb-16 animate-on-scroll">
          <h2 className="font-display text-6xl md:text-8xl lg:text-[10rem] leading-none tracking-tight">
            CLIENT<br />WORDS
          </h2>
          <div className="hidden md:flex flex-col items-end gap-2">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.25em] uppercase">
              {String(count).padStart(2, '0')} Reviews
            </span>
            <div className="w-20 h-px bg-border" />
          </div>
        </div>

        {/* Adaptive grid — always looks balanced regardless of count */}
        <div
          className={
            count === 1
              ? 'grid grid-cols-1 max-w-3xl'
              : count === 2
              ? 'grid grid-cols-1 md:grid-cols-2 gap-px'
              : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px'
          }
        >
          {testimonials.map((testimonial: any, index: number) => {
            const imageUrl = cmsEnabled
              ? resolveMediaUrl(testimonial.image)
              : (testimonial as any).image

            // First card is "featured" — spans 2 cols on lg when there are 3+ items
            const isFeatured = index === 0 && count >= 3

            return (
              <div
                key={index}
                className={[
                  'testimonial-card group relative border border-border bg-card',
                  'flex flex-col justify-between',
                  'p-8 md:p-10 min-h-[300px]',
                  'hover:bg-muted/30 transition-colors duration-500',
                  'overflow-hidden',
                  isFeatured ? 'lg:col-span-2' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {/* Decorative large quote glyph */}
                <span
                  aria-hidden
                  className="absolute -top-2 right-6 font-display text-[9rem] leading-none text-foreground/[0.04] select-none pointer-events-none"
                >
                  "
                </span>

                {/* Index badge */}
                <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground/40 uppercase mb-6 block">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Quote text */}
                <p
                  className={[
                    'relative z-10 text-foreground/80 leading-relaxed flex-1',
                    isFeatured
                      ? 'text-lg md:text-xl'
                      : 'text-sm md:text-[0.95rem]',
                  ].join(' ')}
                >
                  {testimonial.content}
                </p>

                {/* Author row */}
                <div className="relative z-10 flex items-center gap-4 pt-6 mt-8 border-t border-border">
                  <img
                    src={imageUrl}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover grayscale"
                  />
                  <div className="min-w-0">
                    <h4 className="font-display text-xl leading-tight tracking-wide truncate">
                      {testimonial.name}
                    </h4>
                    <p className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase mt-0.5 truncate">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

export default Testimonials
