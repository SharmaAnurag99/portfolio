import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'

import { getPayload } from 'payload'
import configPromise from '../../../../payload.config'
import { useCmsContent } from '@/lib/use-cms-content'
import { localBlogPosts } from '@/data/local/blog-posts'

export const revalidate = 60

type Row = {
  slug: string
  title: string
  category: string
  date: string
  readMins: number
}

const stripTags = (input: string): string => input.replace(/<[^>]*>/g, ' ')

const richTextToString = (rt: any): string => {
  if (!rt) return ''
  if (typeof rt === 'string') return rt
  if (Array.isArray(rt)) return rt.map(richTextToString).join(' ')
  if (typeof rt === 'object') {
    const out: string[] = []
    if (typeof rt.text === 'string') out.push(rt.text)
    if (rt.children) out.push(richTextToString(rt.children))
    if (rt.root) out.push(richTextToString(rt.root))
    return out.join(' ')
  }
  return ''
}

const computeReadMins = (raw: string): number => {
  const text = stripTags(raw).trim()
  const words = text ? text.split(/\s+/).length : 0
  return Math.max(1, Math.round(words / 200))
}

const Blog = async () => {
  const cmsEnabled = useCmsContent()

  let posts: Row[] = []

  if (cmsEnabled) {
    const payload = await getPayload({ config: configPromise })
    const { docs } = await payload.find({
      collection: 'blogs',
      depth: 0,
      limit: 200,
      sort: '-createdAt',
    })
    posts = docs.map((p: any) => {
      const text = richTextToString(p.content)
      return {
        slug: p.slug || '',
        title: p.title || 'Untitled',
        category: p.category || 'Note',
        date: p.date || '',
        readMins: computeReadMins(text),
      }
    })
  } else {
    posts = localBlogPosts.map((p) => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      date: p.date,
      readMins: computeReadMins(p.content),
    }))
  }

  const count = posts.length

  return (
    <div className="min-h-[100dvh] bg-background">
      <Header />

      <main className="pt-32 md:pt-40 pb-32">
        <div className="container mx-auto px-6">
          {/* Header — editorial NYT feel */}
          <div className="flex items-center justify-between mb-10 md:mb-14">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              — Reading list / 02
            </span>
            <span className="hidden md:inline-block w-20 h-px bg-border" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-12 items-end mb-16 md:mb-24">
            <h1 className="lg:col-span-8 font-display text-[clamp(3.5rem,11vw,10rem)] leading-[0.88] tracking-tight">
              WRITING<span className="text-foreground/30">.</span>
            </h1>
            <p className="lg:col-span-4 font-mono text-[11px] tracking-[0.25em] uppercase text-muted-foreground">
              {count > 0
                ? `${String(count).padStart(2, '0')} posts since 2024`
                : 'No posts yet — first one shipping soon'}
            </p>
          </div>

          {count === 0 ? (
            <div className="border-t border-border pt-16">
              <p className="font-mono text-sm tracking-wide text-muted-foreground max-w-[55ch]">
                Pieces in progress include performance studies, post-mortems from production launches,
                and short notes on how I ship. Check back soon.
              </p>
            </div>
          ) : (
            <ul className="border-t border-border">
              {posts.map((p, i) => (
                <li
                  key={p.slug + i}
                  className="border-b border-border"
                >
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group relative grid grid-cols-12 gap-4 md:gap-8 items-baseline py-6 md:py-8 transition-transform duration-500 hover:translate-x-3"
                  >
                    {/* Accent left bar on hover */}
                    <span
                      aria-hidden
                      className="absolute -left-3 top-1/2 -translate-y-1/2 h-0 w-[2px] bg-[hsl(var(--accent))] transition-all duration-500 group-hover:h-full"
                    />

                    <span className="col-span-3 md:col-span-2 font-mono text-[10px] md:text-xs tracking-[0.25em] uppercase text-muted-foreground">
                      {p.date || '—'}
                    </span>
                    <span className="col-span-3 md:col-span-2 font-mono text-[10px] md:text-xs tracking-[0.25em] uppercase text-foreground/70">
                      {p.category}
                    </span>
                    <span className="col-span-12 md:col-span-6 order-3 md:order-none text-base md:text-xl text-foreground font-medium leading-tight group-hover:underline underline-offset-[6px] decoration-[1px] decoration-foreground/40">
                      {p.title}
                    </span>
                    <span className="col-span-4 md:col-span-1 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-muted-foreground/80">
                      {p.readMins} min
                    </span>
                    <span className="col-span-2 md:col-span-1 flex justify-end text-muted-foreground group-hover:text-foreground transition-colors">
                      <ArrowRight
                        size={16}
                        weight="regular"
                        className="transition-transform duration-500 group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Blog
