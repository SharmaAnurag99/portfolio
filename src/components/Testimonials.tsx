import { getPayload } from 'payload'
import configPromise from '../../payload.config'
import { resolveMediaUrlIndexed } from '@/lib/media'
import { useCmsContent } from '@/lib/use-cms-content'
import { localTestimonials } from '@/data/local/testimonials'
import TestimonialsMarquee, { MarqueeTestimonial } from './TestimonialsMarquee'

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

  const testimonials: MarqueeTestimonial[] = rawDocs.map((t: any, i: number) => ({
    image: cmsEnabled ? resolveMediaUrlIndexed(t.image, i) : t.image || resolveMediaUrlIndexed(null, i),
    content: t.content || '',
    name: t.name || '',
    role: t.role || '',
    linkedinUrl: t.linkedinUrl || '',
  }))

  if (testimonials.length === 0) return null

  return <TestimonialsMarquee testimonials={testimonials} />
}

export default Testimonials
