'use client'

import { useEffect, useState } from 'react'
import {
  EnvelopeSimple,
  WhatsappLogo,
  LinkedinLogo,
  CalendarBlank,
  ArrowRight,
} from '@phosphor-icons/react'

export default function ContactInfoPanel() {
  const [now, setNow] = useState<string>('')

  useEffect(() => {
    const fmt = (d: Date) =>
      d.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    setNow(fmt(new Date()))
    const id = setInterval(() => setNow(fmt(new Date())), 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <aside className="lg:sticky lg:top-32 self-start">
      <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
        — Direct lines
      </span>

      <ul className="mt-6 space-y-5">
        <DirectLine
          icon={<EnvelopeSimple size={16} weight="regular" />}
          label="Email"
          value="contact@sharmaanurag.in"
          href="mailto:contact@sharmaanurag.in"
        />
        <DirectLine
          icon={<WhatsappLogo size={16} weight="regular" />}
          label="WhatsApp"
          value="@SharmaAnurag99"
          href="https://wa.me/918318529481?text=Hi%20Anurag%2C%20I%20saw%20your%20portfolio"
          external
        />
        <DirectLine
          icon={<LinkedinLogo size={16} weight="regular" />}
          label="LinkedIn"
          value="sharma-anurag-umesh"
          href="https://linkedin.com/in/sharma-anurag-umesh"
          external
        />
      </ul>

      {/* Located in / reply window */}
      <div className="mt-10 pt-8 border-t border-border space-y-5">
        <InfoRow
          label="Located in"
          value={`New Delhi · India · ${now ? `${now} IST` : '— IST'}`}
        />
        <InfoRow
          label="Reply within"
          value="6 hours · IST working hours"
        />
        <div className="pt-2">
          <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inset-0 rounded-full bg-[hsl(var(--accent))] animate-ping opacity-75" />
              <span className="relative w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent))]" />
            </span>
            Available · Q2 slots open
          </span>
        </div>
      </div>

      {/* Calendly CTA */}
      <a
        href="https://calendly.com/sharmaanurag99"
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-10 flex items-center justify-between gap-4 px-5 py-4 border border-border hover:border-foreground transition-colors"
      >
        <span className="flex items-center gap-3">
          <CalendarBlank size={18} weight="regular" />
          <span className="flex flex-col">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              Or, skip the form
            </span>
            <span className="text-sm md:text-base">Book a 30-min call</span>
          </span>
        </span>
        <ArrowRight
          size={16}
          weight="regular"
          className="transition-transform group-hover:translate-x-1"
        />
      </a>

      {/* What to expect */}
      <div className="mt-10 pt-8 border-t border-border">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
          — What to expect
        </span>
        <ul className="mt-5 space-y-3 text-sm text-foreground/85">
          {[
            'I reply personally — never assistants, never templates.',
            'Scope-locked proposals — fixed deliverables, fixed price.',
            'No-AI fluff replies — straight answers with real numbers.',
          ].map((line, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                aria-hidden
                className="mt-2 w-1 h-1 rounded-full bg-[hsl(var(--accent))] shrink-0"
              />
              <span className="leading-relaxed">{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

function DirectLine({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href: string
  external?: boolean
}) {
  return (
    <li>
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className="group flex items-baseline gap-3"
      >
        <span className="text-muted-foreground translate-y-[3px] shrink-0">
          {icon}
        </span>
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground w-[10ch] shrink-0">
          {label}
        </span>
        <span className="text-foreground/85 group-hover:text-[hsl(var(--accent))] transition-colors break-all">
          {value}
        </span>
      </a>
    </li>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground w-[10ch] shrink-0">
        {label}
      </span>
      <span className="text-foreground/85 text-sm">{value}</span>
    </div>
  )
}
