import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ArrowSquareOut, GithubLogo } from '@phosphor-icons/react/dist/ssr'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MagneticButton from '@/components/MagneticButton'
import ProjectCaseCTA from '@/components/ProjectCaseCTA'

import { getPayload } from 'payload'
import configPromise from '../../../../../payload.config'
import { resolveMediaUrl } from '@/lib/media'
import { useCmsContent } from '@/lib/use-cms-content'
import { localPortfolioProjects } from '@/data/local/portfolio'
import { slugify } from '@/lib/slugify'

export const revalidate = 60

type CaseStudy = {
  slug: string
  title: string
  category: string
  outcome: string
  description: string
  image: string
  url?: string
  githubUrl?: string
  roleSummary?: string
  year?: string
  brief?: string
  approach: string[]
  outcomeStats: { value: string; label: string }[]
  stack: string[]
  gallery: { src: string; caption?: string }[]
}

async function loadAllProjects(): Promise<CaseStudy[]> {
  const cmsEnabled = useCmsContent()

  const rawDocs = cmsEnabled
    ? (
        await (await getPayload({ config: configPromise })).find({
          collection: 'projects',
          depth: 2,
          limit: 100,
          sort: '-createdAt',
        })
      ).docs
    : localPortfolioProjects

  return rawDocs.map((p: any) => {
    const cmsImage = cmsEnabled ? resolveMediaUrl(p.image) : p.image
    const title: string = p.title || 'Untitled'
    const slug: string = (p.slug && String(p.slug).trim()) || slugify(title)
    const description: string = p.content || ''
    const outcome: string = p.outcome || description.split('. ')[0].slice(0, 140)

    const tagsList: string[] = Array.isArray(p.tags)
      ? p.tags.map((t: any) => t?.tag).filter(Boolean)
      : []
    const stackList: string[] = Array.isArray(p.stackList)
      ? p.stackList.map((s: any) => s?.name).filter(Boolean)
      : []
    const stack = stackList.length > 0 ? stackList : tagsList

    const approach: string[] = Array.isArray(p.approach)
      ? p.approach.map((a: any) => a?.point).filter(Boolean)
      : []
    const outcomeStats = Array.isArray(p.outcomeStats)
      ? p.outcomeStats
          .map((s: any) => ({ value: s?.value || '', label: s?.label || '' }))
          .filter((s: any) => s.value)
      : []
    const gallery = Array.isArray(p.gallery)
      ? p.gallery
          .map((g: any) => ({
            src: cmsEnabled ? resolveMediaUrl(g?.image) : (g?.src || ''),
            caption: g?.caption || '',
          }))
          .filter((g: any) => g.src)
      : []

    return {
      slug,
      title,
      category: String(p.category || '').toUpperCase(),
      outcome,
      description,
      image: cmsImage || '/placeholder.svg',
      url: p.url || undefined,
      githubUrl: p.githubUrl || undefined,
      roleSummary: p.roleSummary || undefined,
      year: p.year || undefined,
      brief: p.brief || description,
      approach,
      outcomeStats,
      stack,
      gallery,
    }
  })
}

export async function generateStaticParams() {
  try {
    const projects = await loadAllProjects()
    // Don't shadow the static /projects/web2 + /projects/web3 routes
    const RESERVED = new Set(['web2', 'web3'])
    return projects
      .map((p) => ({ slug: p.slug }))
      .filter((p) => p.slug && !RESERVED.has(p.slug))
  } catch {
    return []
  }
}

export default async function ProjectCaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const projects = await loadAllProjects()
  const idx = projects.findIndex((p) => p.slug === slug)
  if (idx === -1) notFound()

  const project = projects[idx]
  const next = projects[(idx + 1) % projects.length]

  return (
    <div className="min-h-[100dvh] bg-background">
      <Header />

      <main className="pt-32 pb-32">
        {/* Hero */}
        <section className="container mx-auto px-6">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft size={12} weight="regular" />
            All work
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-12 items-end mb-16">
            <div className="lg:col-span-8">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                {project.category}
                {project.year ? ` · ${project.year}` : ''}
              </span>
              <h1 className="font-display leading-[0.88] tracking-tight mt-6 text-[clamp(3rem,10vw,9rem)]">
                {project.title}
                <span className="text-foreground/30">.</span>
              </h1>
            </div>
            <p className="lg:col-span-4 text-foreground/70 text-base md:text-lg leading-relaxed max-w-[42ch]">
              {project.outcome}
            </p>
          </div>

          {/* Cover */}
          <div className="relative w-full aspect-[16/9] overflow-hidden border border-border bg-muted">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </section>

        {/* Meta strip */}
        <section className="border-y border-border mt-24 mb-24">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border">
              <MetaCell label="Role" value={project.roleSummary || 'Founding engineer'} />
              <MetaCell
                label="Stack"
                value={project.stack.slice(0, 4).join(' · ') || '—'}
              />
              <MetaCell label="Year" value={project.year || '—'} />
              <MetaCell
                label="Live"
                value={
                  project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 hover:text-[hsl(var(--accent))] transition-colors"
                    >
                      <span className="truncate max-w-[16ch]">
                        {prettyHost(project.url)}
                      </span>
                      <ArrowSquareOut size={12} weight="regular" />
                    </a>
                  ) : (
                    '—'
                  )
                }
              />
            </div>
          </div>
        </section>

        {/* Brief / Approach */}
        <section className="container mx-auto px-6 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-12">
            <div className="lg:col-span-5">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                — The brief
              </span>
              <h2 className="font-display text-3xl md:text-5xl leading-[1] tracking-tight mt-6">
                Why it existed.
              </h2>
            </div>
            <p className="lg:col-span-7 lg:col-start-7 text-foreground/80 text-lg md:text-xl leading-relaxed">
              {project.brief}
            </p>
          </div>
        </section>

        {project.approach.length > 0 ? (
          <section className="container mx-auto px-6 mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-12">
              <div className="lg:col-span-5">
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                  — What we shipped
                </span>
                <h2 className="font-display text-3xl md:text-5xl leading-[1] tracking-tight mt-6">
                  The approach.
                </h2>
              </div>
              <ul className="lg:col-span-7 lg:col-start-7 space-y-6">
                {project.approach.map((a, i) => (
                  <li
                    key={i}
                    className="flex gap-5 pb-6 border-b border-border last:border-0 last:pb-0"
                  >
                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60 mt-1 w-8 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="text-foreground/85 leading-relaxed text-base md:text-lg">
                      {a}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {/* Outcome stats */}
        {project.outcomeStats.length > 0 ? (
          <section className="border-y border-border py-20 md:py-24 mb-24 bg-background">
            <div className="container mx-auto px-6">
              <div className="flex items-center justify-between mb-12 md:mb-16">
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                  — Outcome
                </span>
                <span className="hidden md:inline-block w-20 h-px bg-border" />
              </div>
              <div
                className={[
                  'grid grid-cols-1 divide-y md:divide-y-0',
                  project.outcomeStats.length === 1 ? 'md:grid-cols-1' : '',
                  project.outcomeStats.length === 2 ? 'md:grid-cols-2 md:divide-x divide-border' : '',
                  project.outcomeStats.length >= 3 ? 'md:grid-cols-3 md:divide-x divide-border' : '',
                ].join(' ')}
              >
                {project.outcomeStats.map((s, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-3 px-0 md:px-8 lg:px-10 py-8 md:py-0 first:pl-0 last:pr-0"
                  >
                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-display text-5xl md:text-6xl lg:text-7xl leading-none tracking-tight">
                      {s.value}
                    </span>
                    <span className="text-foreground/85 text-sm font-medium leading-snug">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* Stack chips */}
        {project.stack.length > 0 ? (
          <section className="container mx-auto px-6 mb-24">
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                — Stack
              </span>
              <span className="hidden md:inline-block w-20 h-px bg-border" />
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 border border-border bg-card font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/80"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>
        ) : null}

        {/* Gallery */}
        {project.gallery.length > 0 ? (
          <section className="container mx-auto px-6 mb-24">
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                — Gallery
              </span>
              <span className="hidden md:inline-block w-20 h-px bg-border" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
              {project.gallery.map((g, i) => {
                const span = i % 3 === 0 ? 'md:col-span-8' : 'md:col-span-4'
                const offset = i % 3 === 2 ? 'md:col-start-9' : ''
                return (
                  <figure
                    key={i}
                    className={`relative ${span} ${offset}`.trim()}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden border border-border bg-muted">
                      <Image
                        src={g.src}
                        alt={g.caption || `${project.title} screenshot ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="(min-width: 768px) 50vw, 100vw"
                      />
                    </div>
                    {g.caption ? (
                      <figcaption className="mt-3 font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                        {g.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                )
              })}
            </div>
          </section>
        ) : null}

        {/* CTA */}
        <section className="container mx-auto px-6 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-12 items-end">
            <div className="lg:col-span-8">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                — Next step
              </span>
              <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tight mt-6">
                Want something <span className="italic font-light text-foreground/30">like this?</span>
              </h2>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <ProjectCaseCTA />
            </div>
          </div>

          {project.githubUrl ? (
            <p className="mt-10 font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <GithubLogo size={12} weight="regular" />
                Source on GitHub
              </a>
            </p>
          ) : null}
        </section>

        {/* Next project */}
        {next && next.slug !== project.slug ? (
          <section className="border-t border-border">
            <Link
              href={`/projects/${next.slug}`}
              className="group block container mx-auto px-6 py-16 md:py-24"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                  — Next project
                </span>
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                  {next.category}
                </span>
              </div>
              <div className="flex items-center justify-between gap-6">
                <h3 className="font-display text-[clamp(2.5rem,8vw,6rem)] leading-[0.95] tracking-tight group-hover:text-[hsl(var(--accent))] transition-colors">
                  {next.title}
                </h3>
                <ArrowRight
                  size={32}
                  weight="regular"
                  className="shrink-0 transition-transform duration-500 group-hover:translate-x-2"
                />
              </div>
            </Link>
          </section>
        ) : null}
      </main>

      <Footer />
    </div>
  )
}

function MetaCell({
  label,
  value,
}: {
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="px-0 md:px-6 py-6 md:py-8 first:pl-0 last:pr-0 flex flex-col gap-2">
      <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground/70">
        {label}
      </span>
      <span className="text-foreground/90 text-sm md:text-base">{value}</span>
    </div>
  )
}

function prettyHost(url: string): string {
  try {
    const u = new URL(url)
    return u.hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}
