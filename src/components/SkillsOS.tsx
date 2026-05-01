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
      {/* Subtle CRT scan-line overlay — premium, very low opacity */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, currentColor 0px, currentColor 1px, transparent 1px, transparent 3px)',
        }}
      />

      <div className="container mx-auto px-6 relative">
        {/* Section label */}
        <div className="flex items-center justify-between mb-10 md:mb-14">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            — Operating system / 07
          </span>
          <span className="hidden md:inline-block w-20 h-px bg-border" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-12 mb-16 md:mb-20">
          <h2 className="lg:col-span-8 font-display text-[clamp(3rem,9vw,8rem)] leading-[0.9] tracking-tight">
            STACK<span className="text-foreground/30">.</span>
          </h2>
          <p className="lg:col-span-4 text-foreground/70 text-sm md:text-base leading-relaxed max-w-[44ch]">
            What I reach for in production. Proficiency dots are honest — five means
            shipped revenue with it more than once.
          </p>
        </div>

        {/* Terminal-style window */}
        <div className="border border-border bg-card/40 backdrop-blur-[2px]">
          {/* Window chrome */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/40">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
              <span className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
            </div>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              ~/anurag/.stack — zsh
            </span>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60 hidden md:block">
              {String(skillsData.length).padStart(2, '0')} entries
            </span>
          </div>

          {/* Body */}
          <div className="divide-y divide-border">
            {ordered.map((group, gi) => {
              const term = CATEGORY_TO_TERMINAL[group.category] || group.category.toLowerCase().replace(/\s+/g, '.')
              return (
                <div key={gi} className="px-5 md:px-8 py-8 md:py-10">
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="font-mono text-[hsl(var(--accent))] text-sm">{'>'}</span>
                    <span className="font-mono text-xs md:text-sm tracking-[0.2em] uppercase text-foreground/90">
                      {term}
                    </span>
                    <span className="hidden md:inline-block flex-1 border-b border-dashed border-border/70 mb-1" />
                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground/70">
                      {String(group.items.length).padStart(2, '0')}
                    </span>
                  </div>

                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-3">
                    {group.items.map((skill, si) => (
                      <li
                        key={si}
                        className="flex items-center justify-between gap-4 py-2 border-b border-border/50 group"
                      >
                        <span className="text-foreground/90 text-sm md:text-base">
                          {skill.name}
                        </span>
                        <span className="flex items-center gap-3 shrink-0">
                          <span aria-hidden className="font-mono tracking-[0.15em] text-foreground/80 text-xs">
                            {renderDots(skill.proficiency)}
                          </span>
                          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground/80 text-right min-w-[10ch] hidden sm:inline-block">
                            {skill.meta}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}

            {/* Prompt line */}
            <div className="px-5 md:px-8 py-6 flex items-center gap-3">
              <span className="font-mono text-[hsl(var(--accent))] text-sm">{'>'}</span>
              <span className="font-mono text-xs text-foreground/70">
                _ <span className="inline-block w-2 h-4 align-middle bg-foreground animate-pulse ml-1" />
              </span>
            </div>
          </div>
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
