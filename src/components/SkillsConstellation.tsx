import { getPayload } from 'payload'
import configPromise from '../../payload.config'
import { useCmsContent } from '@/lib/use-cms-content'
import { localSkills } from '@/data/local/skills'

type SkillDoc = {
  name: string
  category: string
}

const categoryOrder = [
  'Technical Skills',
  'Cloud & DevTools',
  'Coursework',
  'Soft Skills',
]

export default async function SkillsConstellation() {
  const cmsEnabled = useCmsContent()

  const skillsData: SkillDoc[] = cmsEnabled
    ? ((
        await (await getPayload({ config: configPromise })).find({
          collection: 'skills',
          limit: 100,
        })
      ).docs as unknown as SkillDoc[])
    : localSkills.flatMap((g) =>
        g.items.map((it) => ({ name: it.name, category: g.category })),
      )

  // Group by category
  const grouped: Record<string, SkillDoc[]> = {}
  for (const s of skillsData) {
    const cat = s.category || 'Technical Skills'
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(s)
  }

  // Pick chips for orbital layout (max 24 for visual balance)
  const orbitalSkills = skillsData.slice(0, 24)
  const total = orbitalSkills.length

  // Display category list
  const orderedCats = [
    ...categoryOrder.filter((c) => grouped[c]),
    ...Object.keys(grouped).filter((c) => !categoryOrder.includes(c)),
  ]

  return (
    <section
      id="skills"
      className="relative py-24 md:py-32 bg-background overflow-hidden"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-12 md:mb-16 animate-on-scroll">
          <div>
            <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase block mb-4">
              — Skills
            </span>
            <h2 className="font-display text-5xl md:text-7xl lg:text-9xl leading-[0.85] tracking-tight">
              CONSTELLATION
            </h2>
          </div>
          <div className="hidden md:flex flex-col items-end gap-2">
            <span className="font-mono text-xs text-muted-foreground tracking-[0.25em] uppercase">
              {String(skillsData.length).padStart(2, '0')} Skills
            </span>
            <div className="w-20 h-px bg-border" />
          </div>
        </div>

        {/* Orbital visual */}
        <div className="relative w-full max-w-3xl mx-auto aspect-square">
          {/* Concentric rings */}
          {[0.35, 0.6, 0.85].map((scale, i) => (
            <div
              key={i}
              aria-hidden
              className="absolute top-1/2 left-1/2 rounded-full border border-border/40"
              style={{
                width: `${scale * 100}%`,
                height: `${scale * 100}%`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}

          {/* Cross-hair guide lines */}
          <div
            aria-hidden
            className="absolute top-1/2 left-0 right-0 h-px bg-border/30"
          />
          <div
            aria-hidden
            className="absolute left-1/2 top-0 bottom-0 w-px bg-border/30"
          />

          {/* Center hub */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 md:w-36 md:h-36 rounded-full bg-foreground text-background flex flex-col items-center justify-center text-center px-2 z-10">
            <span className="font-display text-xl md:text-2xl tracking-tight leading-tight">
              ANURAG
            </span>
            <span className="font-mono text-[8px] md:text-[9px] tracking-[0.25em] uppercase opacity-60 mt-1">
              Stack
            </span>
          </div>

          {/* Orbital skill chips */}
          {orbitalSkills.map((skill, i) => {
            const angle = (i / total) * Math.PI * 2 - Math.PI / 2
            const ring = i % 3
            const radius = 25 + ring * 12
            const x = 50 + Math.cos(angle) * radius
            const y = 50 + Math.sin(angle) * radius
            return (
              <span
                key={i}
                className="absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 md:px-3 md:py-1.5 border border-border bg-card font-mono text-[8px] md:text-[10px] tracking-[0.2em] uppercase whitespace-nowrap hover:bg-foreground hover:text-background hover:scale-110 transition-all duration-300 cursor-default z-10"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                {skill.name}
              </span>
            )
          })}
        </div>

        {/* Categories grid */}
        <div className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 max-w-5xl mx-auto">
          {orderedCats.map((cat, i) => (
            <div key={cat} className="border-l border-border pl-4">
              <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase block mb-2">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-xl md:text-2xl leading-tight mb-1">
                {cat}
              </h3>
              <p className="text-muted-foreground text-xs">
                {grouped[cat].length} skills
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
