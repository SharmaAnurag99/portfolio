import PageProgress from '@/components/PageProgress'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import ContactInfoPanel from '@/components/ContactInfoPanel'
import ContactFAQ from '@/components/ContactFAQ'

export default function ContactPage() {
  return (
    <div className="min-h-[100dvh] bg-background">
      <PageProgress />
      <Header />
      <main className="pt-24 md:pt-28">
        {/* Hero band */}
        <section className="relative pb-16 md:pb-24 border-b border-border overflow-hidden">
          <div className="container mx-auto px-6 pt-12 md:pt-20">
            <div className="flex items-center justify-between mb-10 md:mb-14">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                — Contact / 11
              </span>
              <span className="hidden md:inline-block w-20 h-px bg-border" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-12 items-end">
              <h1 className="lg:col-span-8 font-display leading-[0.88] tracking-[-0.02em]">
                <span className="block text-[clamp(3rem,10vw,9rem)] font-[800]">LET&apos;S BUILD</span>
                <span className="block text-[clamp(2.5rem,8vw,7rem)] italic font-light text-foreground/35 pl-[6%]">
                  something.
                </span>
              </h1>

              <p className="lg:col-span-4 text-foreground/70 text-base md:text-lg leading-relaxed max-w-[44ch]">
                Tell me what you&apos;re shipping — scope, deadline, the metric you care about.
                I read every note personally and reply within 6 hours during IST working hours.
              </p>
            </div>

            {/* Trust strip */}
            <div className="mt-12 md:mt-16 flex flex-wrap items-center gap-x-5 gap-y-3">
              <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                <span className="relative flex w-1.5 h-1.5">
                  <span className="absolute inset-0 rounded-full bg-[hsl(var(--accent))] animate-ping opacity-75" />
                  <span className="relative w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent))]" />
                </span>
                Available · Q2 2026
              </span>
              <span className="hidden sm:inline-block w-px h-3 bg-border" />
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                Median reply 6h
              </span>
              <span className="hidden sm:inline-block w-px h-3 bg-border" />
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                New Delhi · India
              </span>
            </div>
          </div>
        </section>

        {/* Form + info panel */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-16">
              <div className="lg:col-span-7">
                <ContactForm />
              </div>
              <div className="lg:col-span-4 lg:col-start-9 lg:pl-8 lg:border-l lg:border-border">
                <ContactInfoPanel />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ band */}
        <ContactFAQ />

        {/* Bottom CTA */}
        <section className="py-24 md:py-32 border-t border-border">
          <div className="container mx-auto px-6">
            <div className="flex flex-col gap-6">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                — or just say hi
              </span>
              <a
                href="mailto:contact@sharmaanurag.in"
                className="font-display text-[clamp(2rem,8vw,7rem)] leading-[0.95] tracking-[-0.02em] text-[hsl(var(--accent))] hover:underline underline-offset-[0.12em] decoration-[0.04em] break-all"
              >
                contact@sharmaanurag.in
              </a>
              <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2">
                <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                  <span className="relative flex w-1.5 h-1.5">
                    <span className="absolute inset-0 rounded-full bg-[hsl(var(--accent))] animate-ping opacity-75" />
                    <span className="relative w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent))]" />
                  </span>
                  Available · Q2 slots open
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
