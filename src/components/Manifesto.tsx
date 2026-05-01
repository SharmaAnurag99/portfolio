/**
 * Manifesto — replaces generic "About" bio.
 * Builds personality + point of view in one viewport.
 * Editorial pull-quote feel, left-aligned for high variance.
 */
export default function Manifesto() {
  return (
    <section
      id="about"
      className="py-24 md:py-32 bg-background relative"
    >
      <div className="container mx-auto px-6">
        {/* Section label */}
        <div className="flex items-center justify-between mb-10 md:mb-14">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            — A note on how I work
          </span>
          <span className="hidden md:inline-block w-20 h-px bg-border" />
        </div>

        {/* The manifesto itself */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-12">
          <h2 className="lg:col-span-9 font-display text-[clamp(2.5rem,7vw,7rem)] leading-[0.95] tracking-tight">
            I build software that makes
            <span className="text-foreground/30"> money </span>
            or saves
            <span className="text-foreground/30"> time</span>.
            <span className="block">Everything else is decoration.</span>
          </h2>

          <div className="lg:col-span-3 flex flex-col gap-6 lg:pt-4">
            <p className="text-foreground/70 leading-relaxed text-sm">
              Five years of writing code taught me one thing — clients don&apos;t
              pay for clever architecture. They pay for outcomes that hit a
              spreadsheet.
            </p>
            <p className="text-foreground/70 leading-relaxed text-sm">
              I treat every project like a P&amp;L. We agree the metric upfront,
              I ship to that metric, and we measure honestly afterward.
            </p>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mt-2">
              — Anurag Sharma
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
