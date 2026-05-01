'use client'

const items: { label: string; value: string }[] = [
  { label: 'Currently', value: 'Building AstroRekhaaji v2 — production launch' },
  { label: 'Latest ship', value: 'Cloudflare R2 migration + Payload CMS' },
  { label: 'Reading', value: 'A Philosophy of Software Design — John Ousterhout' },
  { label: 'Open to', value: 'Freelance · Founding-engineer roles' },
  { label: 'Reply time', value: 'Median 6 hours · IST working hours' },
  { label: 'Stack today', value: 'Next.js 15 · Rust · Solidity · Cloudflare' },
]

const styles = `
.ns-track { animation: ns-scroll 60s linear infinite; }
.ns-row:hover .ns-track { animation-play-state: paused; }
@keyframes ns-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
`

export default function NowStrip() {
  // Duplicate for seamless loop
  const stream = [...items, ...items]

  return (
    <section
      aria-label="Live status"
      className="ns-row border-y border-border bg-background py-4 overflow-hidden relative"
    >
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none"
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none"
      />
      <div className="ns-track flex gap-12 whitespace-nowrap will-change-transform" style={{ width: 'fit-content' }}>
        {stream.map((it, i) => (
          <span key={i} className="inline-flex items-center gap-3 shrink-0">
            <span className="relative flex w-1.5 h-1.5 shrink-0">
              <span className="absolute inset-0 rounded-full bg-[hsl(var(--accent))] animate-ping opacity-75" />
              <span className="relative w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent))]" />
            </span>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              {it.label}
            </span>
            <span className="text-foreground/85 text-sm">{it.value}</span>
          </span>
        ))}
      </div>
    </section>
  )
}
