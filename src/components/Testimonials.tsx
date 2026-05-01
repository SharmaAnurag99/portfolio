import { getPayload } from 'payload'
import configPromise from '../../payload.config'
import { resolveMediaUrl } from '@/lib/media'
import { useCmsContent } from '@/lib/use-cms-content'
import { localTestimonials } from '@/data/local/testimonials'
import TestimonialsMarquee, { MarqueeTestimonial } from './TestimonialsMarquee'

const Testimonials = async () => {
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

  const testimonials: MarqueeTestimonial[] = rawDocs.map((t: any) => ({
    image: cmsEnabled ? resolveMediaUrl(t.image) : t.image || '/placeholder.svg',
    content: t.content || '',
    name: t.name || '',
    role: t.role || '',
    linkedinUrl: t.linkedinUrl || '',
  }))

  if (testimonials.length === 0) return null

  return <TestimonialsMarquee testimonials={testimonials} />
}

export default Testimonials
