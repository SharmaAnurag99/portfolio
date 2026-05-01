import { getPayload } from 'payload'
import configPromise from '../../payload.config'
import { resolveMediaUrl } from '@/lib/media'
import { useCmsContent } from '@/lib/use-cms-content'
import { localTestimonials } from '@/data/local/testimonials'
import TestimonialsCarousel, { CarouselTestimonial } from './TestimonialsCarousel'
import TestimonialsMarquee from './TestimonialsMarquee'

type Variant = 'carousel' | 'marquee'

type Props = {
  variant?: Variant
}

const Testimonials = async ({ variant = 'carousel' }: Props) => {
  const cmsEnabled = useCmsContent()

  const rawDocs = cmsEnabled
    ? (
        await (await getPayload({ config: configPromise })).find({
          collection: 'testimonials',
          depth: 1,
          limit: 100,
        })
      ).docs
    : localTestimonials

  const testimonials: CarouselTestimonial[] = rawDocs.map((t: any) => ({
    image: cmsEnabled ? resolveMediaUrl(t.image) : t.image || '/placeholder.svg',
    content: t.content || '',
    name: t.name || '',
    role: t.role || '',
  }))

  if (testimonials.length === 0) return null

  return (
    <section className="testimonials-section py-24 md:py-32 section-cream overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex items-end justify-between mb-12 md:mb-16 animate-on-scroll">
          <div>
            <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase block mb-4">
              — Testimonials
            </span>
            <h2 className="font-display text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] tracking-tight">
              CLIENT<br />
              <span className="italic font-light">words.</span>
            </h2>
          </div>
          <div className="hidden md:flex flex-col items-end gap-2">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.25em] uppercase">
              {String(testimonials.length).padStart(2, '0')} Reviews
            </span>
            <div className="w-20 h-px bg-border" />
          </div>
        </div>

        <div className="testimonial-card">
          {variant === 'marquee' ? (
            <TestimonialsMarquee testimonials={testimonials} />
          ) : (
            <TestimonialsCarousel testimonials={testimonials} />
          )}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
