import Link from 'next/link'
import MagneticButton from './MagneticButton'

const floatingTechs: { text: string; className: string; rotate: string }[] = [
  { text: 'NEXT.JS', className: 'left-[6%] top-[18%]', rotate: '-rotate-6' },
  { text: 'RUST', className: 'right-[8%] top-[22%]', rotate: 'rotate-3' },
  { text: 'SOLIDITY', className: 'left-[10%] bottom-[28%]', rotate: 'rotate-2' },
  { text: 'REACT', className: 'right-[12%] bottom-[36%]', rotate: '-rotate-3' },
  { text: 'TYPESCRIPT', className: 'left-[42%] top-[10%]', rotate: 'rotate-2' },
]

export default function HeroMagnetic() {
  return (
    <section
      id="home"
      className="min-h-screen relative overflow-hidden bg-background pt-32 pb-24 flex items-center"
    >
      {/* Grid background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Floating tech badges */}
      {floatingTechs.map((t) => (
        <span
          key={t.text}
          aria-hidden
          className={`absolute hidden md:inline-block px-3 py-1.5 border border-border bg-card font-mono text-[10px] tracking-[0.3em] uppercase ${t.rotate} ${t.className}`}
        >
          {t.text}
        </span>
      ))}

      <div className="container mx-auto px-6 relative">
        <div className="mb-6">
          <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">
            — Founding Developer · QodeML Labs
          </span>
        </div>

        <h1 className="hero-title font-display text-[18vw] md:text-[12vw] lg:text-[10vw] leading-[0.85] tracking-tight">
          <span className="block">SHARMA</span>
          <span className="block italic font-light text-foreground/30">anurag.</span>
        </h1>

        <div className="grid md:grid-cols-12 gap-8 mt-12 md:mt-16">
          <p className="md:col-span-5 text-muted-foreground text-base md:text-lg leading-relaxed">
            Web and software developer building production-grade Next.js applications, smart
            contracts, and Rust systems. Based in India, working globally.
          </p>

          <div className="md:col-span-4 md:col-start-8 flex flex-col items-start md:items-end gap-6">
            <MagneticButton className="group inline-flex items-center gap-3 px-7 py-4 bg-foreground text-background rounded-full text-sm font-medium tracking-wide hover:bg-foreground/90">
              <span>Let&apos;s build something</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </MagneticButton>
            <Link
              href="/journey"
              className="group font-mono text-[10px] tracking-[0.3em] text-muted-foreground hover:text-foreground uppercase transition-colors"
            >
              Read my story{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
