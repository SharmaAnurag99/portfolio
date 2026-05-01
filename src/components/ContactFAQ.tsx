import { Plus } from '@phosphor-icons/react/dist/ssr'

const FAQ: { q: string; a: string }[] = [
  {
    q: 'Do you take on small projects?',
    a: "Yes — if the scope is sharp. A landing page, a smart-contract audit, a one-week sprint to unblock a launch — happy to do it. The brief just has to be specific.",
  },
  {
    q: 'Do you work with crypto / Web3 teams?',
    a: 'Daily. Solidity, Foundry, ICP/Rust canisters, indexers, dashboards. I shipped on chain in 2024 and have not looked back.',
  },
  {
    q: 'Can you ship under tight deadlines?',
    a: "If the scope fits the time, yes. If it doesn't, I'll tell you on the first call instead of three weeks in. No silent slips.",
  },
  {
    q: 'Do you take equity or rev-share?',
    a: "For the right founder, partly. The default is paid hours; equity is on top, not instead of, and only when I believe in the wedge.",
  },
  {
    q: 'Async or sync?',
    a: 'Default async — Slack/email + a weekly 30-min sync. Sync-heavy is fine on focused sprints, but I move faster with quiet blocks.',
  },
]

export default function ContactFAQ() {
  return (
    <section className="py-24 md:py-32 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-10 md:mb-14">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            — Frequently asked
          </span>
          <span className="hidden md:inline-block w-20 h-px bg-border" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-12 items-start">
          <h2 className="lg:col-span-5 font-display text-[clamp(2rem,5.5vw,4.5rem)] leading-[0.95] tracking-tight">
            Before you<span className="text-foreground/30 italic font-light"> ask</span>.
          </h2>

          <div className="lg:col-span-7">
            <ul className="divide-y divide-border border-y border-border">
              {FAQ.map((item, i) => (
                <li key={i}>
                  <details className="group">
                    <summary className="flex items-start justify-between gap-6 py-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground/70 shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="font-display text-xl md:text-2xl leading-snug tracking-tight">
                          {item.q}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className="mt-1 shrink-0 transition-transform duration-300 group-open:rotate-45 text-muted-foreground"
                      >
                        <Plus size={18} weight="regular" />
                      </span>
                    </summary>
                    <p className="pb-6 pl-10 pr-2 text-foreground/75 leading-relaxed text-sm md:text-base max-w-[60ch]">
                      {item.a}
                    </p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
