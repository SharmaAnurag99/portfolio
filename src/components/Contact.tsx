'use client'

import { useState } from 'react'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import {
  ArrowRight,
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
  MapPin,
  Phone,
  WhatsappLogo,
} from '@phosphor-icons/react'
import MagneticButton from './MagneticButton'

const FOCUS_OPTIONS = ['Web2', 'Web3', 'AI', 'Other'] as const
const HELP_OPTIONS = ['design+dev', 'full build', 'audit', 'consult'] as const
const REPLY_OPTIONS = ['email', 'whatsapp', 'linkedin'] as const

type Focus = (typeof FOCUS_OPTIONS)[number]
type Help = (typeof HELP_OPTIONS)[number]
type Reply = (typeof REPLY_OPTIONS)[number]

const Contact = () => {
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [focus, setFocus] = useState<Focus>('Web2')
  const [help, setHelp] = useState<Help>('full build')
  const [reply, setReply] = useState<Reply>('email')
  const [note, setNote] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !company.trim()) {
      toast.error('Add your name, company, and email so I can write back.')
      return
    }

    setIsSubmitting(true)

    const subject = `[${focus}] ${help} — from ${name}`
    const message = [
      `Hi Anurag, I'm ${name} from ${company}.`,
      `I'm working on ${focus} and need help with ${help}.`,
      `Reach me at ${email} — best to reply via ${reply}.`,
      note.trim() ? `\nMore context:\n${note.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      })
      if (!res.ok) throw new Error('send failed')
      toast.success("Note received — I'll be in touch within 6 hours.")
      setName('')
      setCompany('')
      setEmail('')
      setNote('')
    } catch (err) {
      toast.error('Could not send. Try email or WhatsApp on the right.')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 bg-background overflow-hidden"
    >
      <Toaster position="bottom-right" />

      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-10 md:mb-14">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            — Get in touch / 08
          </span>
          <span className="hidden md:inline-block w-20 h-px bg-border" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-12">
          {/* Sentence form (left, ~70%) */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-8 order-2 lg:order-1"
          >
            <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.2] tracking-tight text-foreground/90">
              Hi Anurag, I&apos;m{' '}
              <SlotInput
                value={name}
                onChange={setName}
                placeholder="your name"
                ariaLabel="Your name"
                required
                size="md"
              />{' '}
              from{' '}
              <SlotInput
                value={company}
                onChange={setCompany}
                placeholder="company"
                ariaLabel="Your company"
                required
                size="md"
              />
              .{' '}
              <span className="text-foreground/60">I&apos;m working on</span>{' '}
              <PillGroup<Focus>
                options={FOCUS_OPTIONS as unknown as Focus[]}
                value={focus}
                onChange={setFocus}
                ariaLabel="Project focus"
              />{' '}
              <span className="text-foreground/60">and need help with</span>{' '}
              <PillGroup<Help>
                options={HELP_OPTIONS as unknown as Help[]}
                value={help}
                onChange={setHelp}
                ariaLabel="Help type"
              />
              .{' '}
              <span className="text-foreground/60">Reach me at</span>{' '}
              <SlotInput
                value={email}
                onChange={setEmail}
                placeholder="you@email.com"
                ariaLabel="Your email"
                required
                type="email"
                size="md"
              />
              {' '}— <span className="text-foreground/60">best to reply via</span>{' '}
              <RadioRow<Reply>
                options={REPLY_OPTIONS as unknown as Reply[]}
                value={reply}
                onChange={setReply}
                ariaLabel="Preferred reply channel"
              />
              .
            </h2>

            <div className="mt-12 max-w-3xl">
              <label
                htmlFor="contact-note"
                className="block font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3"
              >
                — Anything else? (optional)
              </label>
              <textarea
                id="contact-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                placeholder="Timelines, budget range, links, fun details..."
                className="w-full bg-transparent border-0 border-b border-border focus:border-foreground focus:outline-none px-0 py-2 text-base md:text-lg text-foreground placeholder:text-muted-foreground/50 resize-none"
              />
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <MagneticButton
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex items-center gap-3 px-7 py-4 bg-foreground text-background rounded-full text-sm font-medium tracking-wide hover:bg-foreground/90 transition-colors disabled:opacity-60"
              >
                <span className="inline-flex items-center gap-2">
                  {isSubmitting ? 'Sending…' : 'Send'}
                  <ArrowRight
                    size={16}
                    weight="regular"
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </MagneticButton>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                Median reply 6h · IST hours
              </span>
              <Link
                href="/contact"
                className="group ml-auto font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
              >
                Or use the full form
                <ArrowRight
                  size={12}
                  weight="regular"
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </form>

          {/* Side panel (right, ~30%) */}
          <aside className="lg:col-span-4 lg:col-start-9 order-1 lg:order-2 lg:pl-8 lg:border-l lg:border-border">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              — Direct lines
            </span>
            <div className="mt-6 space-y-5 text-sm">
              <DetailRow
                icon={<MapPin size={14} weight="regular" />}
                label="Based in"
                value="New Delhi · IND"
              />
              <DetailRow
                icon={<EnvelopeSimple size={14} weight="regular" />}
                label="Email"
                value={
                  <a
                    href="mailto:contact@sharmaanurag.in"
                    className="hover:text-[hsl(var(--accent))] transition-colors"
                  >
                    contact@sharmaanurag.in
                  </a>
                }
              />
              <DetailRow
                icon={<Phone size={14} weight="regular" />}
                label="Call"
                value={
                  <a
                    href="tel:+918318529481"
                    className="hover:text-[hsl(var(--accent))] transition-colors"
                  >
                    +91 83185 29481
                  </a>
                }
              />
              <DetailRow
                icon={<WhatsappLogo size={14} weight="regular" />}
                label="WhatsApp"
                value={
                  <a
                    href="https://wa.me/918318529481?text=Hi%20Anurag%2C%20I%20saw%20your%20portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[hsl(var(--accent))] transition-colors"
                  >
                    @SharmaAnurag99
                  </a>
                }
              />
              <DetailRow
                icon={<LinkedinLogo size={14} weight="regular" />}
                label="LinkedIn"
                value={
                  <a
                    href="https://linkedin.com/in/sharma-anurag-umesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[hsl(var(--accent))] transition-colors"
                  >
                    sharma-anurag-umesh
                  </a>
                }
              />
              <DetailRow
                icon={<GithubLogo size={14} weight="regular" />}
                label="GitHub"
                value={
                  <a
                    href="https://github.com/SharmaAnurag99"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[hsl(var(--accent))] transition-colors"
                  >
                    SharmaAnurag99
                  </a>
                }
              />
            </div>

            <div className="mt-10 pt-8 border-t border-border">
              <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                <span className="relative flex w-1.5 h-1.5">
                  <span className="absolute inset-0 rounded-full bg-[hsl(var(--accent))] animate-ping opacity-75" />
                  <span className="relative w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent))]" />
                </span>
                Available · Q2 slots open
              </span>
              <p className="mt-4 text-foreground/70 text-sm leading-relaxed max-w-[36ch]">
                If your project is time-sensitive, mention it in the form — I prioritise
                clear deadlines.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

function SlotInput({
  value,
  onChange,
  placeholder,
  ariaLabel,
  required,
  type = 'text',
  size = 'md',
}: {
  value: string
  onChange: (v: string) => void
  placeholder: string
  ariaLabel: string
  required?: boolean
  type?: string
  size?: 'sm' | 'md'
}) {
  const widthClass = size === 'sm' ? 'min-w-[6ch]' : 'min-w-[10ch]'
  return (
    <input
      type={type}
      value={value}
      required={required}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={ariaLabel}
      className={[
        'inline-block bg-transparent border-0 border-b border-foreground/30',
        'focus:border-[hsl(var(--accent))] focus:outline-none',
        'px-1 py-0 text-foreground placeholder:text-foreground/30',
        'font-display tracking-tight',
        'leading-[1.2]',
        widthClass,
      ].join(' ')}
      style={{
        font: 'inherit',
        width: `${Math.max(value.length, placeholder.length) + 1}ch`,
      }}
    />
  )
}

function PillGroup<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: {
  options: T[]
  value: T
  onChange: (v: T) => void
  ariaLabel: string
}) {
  return (
    <span
      role="radiogroup"
      aria-label={ariaLabel}
      className="inline-flex flex-wrap items-baseline gap-1.5 align-baseline"
    >
      {options.map((o) => {
        const selected = o === value
        return (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(o)}
            className={[
              'inline-block px-3 py-1 rounded-full border transition-colors',
              'font-display tracking-tight leading-[1]',
              'text-[0.75em]',
              selected
                ? 'border-foreground bg-foreground text-background'
                : 'border-foreground/30 text-foreground/70 hover:border-foreground hover:text-foreground',
            ].join(' ')}
            style={{ fontSize: '0.6em' }}
          >
            {o}
          </button>
        )
      })}
    </span>
  )
}

function RadioRow<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: {
  options: T[]
  value: T
  onChange: (v: T) => void
  ariaLabel: string
}) {
  return (
    <span
      role="radiogroup"
      aria-label={ariaLabel}
      className="inline-flex flex-wrap items-baseline gap-2 align-baseline"
    >
      {options.map((o, i) => {
        const selected = o === value
        return (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(o)}
            className={[
              'inline-flex items-baseline gap-1 transition-colors',
              'underline underline-offset-[6px] decoration-[1px]',
              'font-display tracking-tight',
              selected
                ? 'text-[hsl(var(--accent))] decoration-[hsl(var(--accent))]'
                : 'text-foreground/40 decoration-foreground/20 hover:text-foreground',
            ].join(' ')}
          >
            {o}
            {i < options.length - 1 ? (
              <span className="text-foreground/30 ml-1">/</span>
            ) : null}
          </button>
        )
      })}
    </span>
  )
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="text-muted-foreground translate-y-0.5">{icon}</span>
      <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground w-[10ch] shrink-0">
        {label}
      </span>
      <span className="text-foreground/85">{value}</span>
    </div>
  )
}

export default Contact
