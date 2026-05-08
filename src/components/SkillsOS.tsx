import { getPayload } from 'payload'
import configPromise from '../../payload.config'
import { useCmsContent } from '@/lib/use-cms-content'
import { localSkills } from '@/data/local/skills'

type SkillRow = {
  name: string
  category: string
  proficiency: number // 1..5
  meta: string
}

const CATEGORY_TO_TERMINAL: Record<string, string> = {
  'Technical Skills': 'languages.frameworks',
  'Cloud & DevTools': 'infra.toolchain',
  'Coursework': 'fundamentals.coursework',
  'Soft Skills': 'soft.skills',
}

const CATEGORY_ORDER = [
  'Technical Skills',
  'Cloud & DevTools',
  'Coursework',
  'Soft Skills',
]

// Static heuristic: high-confidence skills get higher proficiency dots and "production"
// metadata. Falls back to sensible defaults for unknown skills.
const PROFICIENCY_OVERRIDES: Record<string, { p: number; m: string }> = {
  // Languages
  'JavaScript': { p: 5, m: 'production · 5 yrs' },
  'TypeScript': { p: 5, m: 'production · 4 yrs' },
  'Python': { p: 4, m: 'production · 3 yrs' },
  'Rust': { p: 3, m: 'production · since 2024' },
  'C++': { p: 3, m: 'fundamentals' },
  'Solidity': { p: 4, m: 'production · since 2024' },

  // Frameworks
  'ReactJS': { p: 5, m: 'production · 4 yrs' },
  'Next.js': { p: 5, m: 'daily driver' },
  'Node.js': { p: 5, m: 'production' },
  'TailwindCSS': { p: 5, m: 'daily driver' },
  'REST APIs': { p: 5, m: 'production' },

  // Data / DB
  'SQL': { p: 4, m: 'production' },
  'MongoDB': { p: 4, m: 'production' },

  // Cloud
  'Cloudflare (D1, R2)': { p: 4, m: 'production · this site' },
  'Supabase': { p: 4, m: 'production' },
  'Git': { p: 5, m: 'daily driver' },
  'Linux': { p: 4, m: 'production' },
  'Docker': { p: 3, m: 'production' },
  'Agile': { p: 4, m: 'team workflow' },
}

const ROW_FALLBACK = { p: 4, m: 'studied' }

const SkillsOS = async () => {
  const cmsEnabled = useCmsContent()

  const skillsData = cmsEnabled
    ? ((
        await (await getPayload({ config: configPromise })).find({
          collection: 'skills',
          limit: 100,
        })
      ).docs as unknown as { name: string; category: string }[])
    : localSkills.flatMap((g) =>
        g.items.map((it) => ({ name: it.name, category: g.category })),
      )

  if (!skillsData || skillsData.length === 0) return null

  const grouped = skillsData.reduce(
    (acc, s) => {
      const cat = s.category || 'Technical Skills'
      const override = PROFICIENCY_OVERRIDES[s.name] || ROW_FALLBACK
      const row: SkillRow = {
        name: s.name,
        category: cat,
        proficiency: override.p,
        meta: override.m,
      }
      if (!acc[cat]) acc[cat] = []
      acc[cat].push(row)
      return acc
    },
    {} as Record<string, SkillRow[]>,
  )

  const ordered = [
    ...CATEGORY_ORDER.filter((c) => grouped[c]),
    ...Object.keys(grouped).filter((c) => !CATEGORY_ORDER.includes(c)),
  ].map((c) => ({ category: c, items: grouped[c] }))

  return (
    <section id="stack" className="relative py-24 md:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <div className="flex items-center justify-between mb-10 md:mb-14">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            — Core stack / 07
          </span>
          <span className="hidden md:inline-block w-20 h-px bg-border" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-12 mb-16 md:mb-20">
          <h2 className="lg:col-span-8 font-display text-[clamp(3rem,9vw,8rem)] leading-[0.9] tracking-tight">
            SKILLS<span className="text-foreground/30">.</span>
          </h2>
          <p className="lg:col-span-4 text-foreground/70 text-sm md:text-base leading-relaxed max-w-[44ch]">
            Cleaner view: top production-ready tools first, then full grouped stack.
          </p>
        </div>

        <div className="mb-10 rounded-2xl border border-border bg-card/30 p-5 md:p-8">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Top tools I use daily
          </p>
          <div className="flex flex-wrap gap-2.5">
            {skillsData
              .slice()
              .sort((a, b) => {
                const aP = (PROFICIENCY_OVERRIDES[a.name] || ROW_FALLBACK).p
                const bP = (PROFICIENCY_OVERRIDES[b.name] || ROW_FALLBACK).p
                return bP - aP
              })
              .slice(0, 10)
              .map((skill) => (
                <span
                  key={skill.name}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm text-foreground/90 bg-background/60"
                >
                  {skill.name}
                  <span className="font-mono text-[9px] text-muted-foreground">
                    {renderDots((PROFICIENCY_OVERRIDES[skill.name] || ROW_FALLBACK).p)}
                  </span>
                </span>
              ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {ordered.map((group) => {
            const term =
              CATEGORY_TO_TERMINAL[group.category] ||
              group.category.toLowerCase().replace(/\s+/g, '.')
            const visible = group.items.slice(0, 8)
            const remaining = Math.max(0, group.items.length - visible.length)

            return (
              <article
                key={group.category}
                className="rounded-2xl border border-border bg-card/25 p-5 md:p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs tracking-[0.2em] uppercase text-foreground/90">
                    {term}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                    {String(group.items.length).padStart(2, '0')}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {visible.map((skill) => (
                    <span
                      key={skill.name}
                      className="rounded-full border border-border/80 px-2.5 py-1 text-xs md:text-sm text-foreground/80"
                    >
                      {skill.name}
                    </span>
                  ))}
                  {remaining > 0 ? (
                    <span className="rounded-full border border-dashed border-border/80 px-2.5 py-1 text-xs md:text-sm text-muted-foreground">
                      +{remaining} more
                    </span>
                  ) : null}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function renderDots(p: number): string {
  const max = 5
  const filled = Math.max(0, Math.min(max, p))
  return '●'.repeat(filled) + '○'.repeat(max - filled)
}

export default SkillsOS
