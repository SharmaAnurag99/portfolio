'use client'

import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { ArrowRight } from '@phosphor-icons/react'
import MagneticButton from './MagneticButton'

const PROJECT_TYPES = ['Web2', 'Web3', 'AI', 'Audit', 'Other'] as const
const BUDGETS = ['<$5k', '$5k–$15k', '$15k–$50k', '$50k+', 'TBD'] as const
const TIMELINES = ['ASAP', '1–3 months', '3–6 months', 'Flexible'] as const

type ProjectType = (typeof PROJECT_TYPES)[number]
type Budget = (typeof BUDGETS)[number]
type Timeline = (typeof TIMELINES)[number]

export default function ContactForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [projectType, setProjectType] = useState<ProjectType>('Web2')
  const [budget, setBudget] = useState<Budget>('TBD')
  const [timeline, setTimeline] = useState<Timeline>('Flexible')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('Name, email, and a brief message are required.')
      return
    }
    setSubmitting(true)
    const subject = `[${projectType} · ${budget}] ${name}${company ? ` (${company})` : ''}`
    const composed = [
      `Project type: ${projectType}`,
      `Budget: ${budget}`,
      `Timeline: ${timeline}`,
      company ? `Company / Origin: ${company}` : null,
      '',
      'Message:',
      message.trim(),
    ]
      .filter((l) => l !== null)
      .join('\n')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message: composed }),
      })
      if (!res.ok) throw new Error('send failed')
      toast.success("Note received — I'll be in touch within 6 hours.")
      setName('')
      setEmail('')
      setCompany('')
      setMessage('')
      setProjectType('Web2')
      setBudget('TBD')
      setTimeline('Flexible')
    } catch (err) {
      console.error(err)
      toast.error('Could not send. Try email or WhatsApp on the right.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <Toaster position="bottom-right" />

      {/* Name + Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
        <FieldText
          id="name"
          label="Name"
          required
          value={name}
          onChange={setName}
          placeholder="What should I call you?"
          autoComplete="name"
        />
        <FieldText
          id="email"
          label="Email"
          required
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@somewhere.com"
          autoComplete="email"
        />
      </div>

      {/* Company */}
      <FieldText
        id="company"
        label="Company / Where you're from"
        value={company}
        onChange={setCompany}
        placeholder="Acme Labs · or just where you came from"
        autoComplete="organization"
      />

      {/* Project type */}
      <FieldGroup label="Project type" htmlFor="project-type-group">
        <PillRow
          id="project-type-group"
          options={PROJECT_TYPES as unknown as ProjectType[]}
          value={projectType}
          onChange={setProjectType}
          ariaLabel="Project type"
        />
      </FieldGroup>

      {/* Budget */}
      <FieldGroup label="Budget range" htmlFor="budget-group">
        <PillRow
          id="budget-group"
          options={BUDGETS as unknown as Budget[]}
          value={budget}
          onChange={setBudget}
          ariaLabel="Budget range"
        />
      </FieldGroup>

      {/* Timeline */}
      <FieldGroup label="Timeline" htmlFor="timeline-group">
        <PillRow
          id="timeline-group"
          options={TIMELINES as unknown as Timeline[]}
          value={timeline}
          onChange={setTimeline}
          ariaLabel="Timeline"
        />
      </FieldGroup>

      {/* Message */}
      <div className="flex flex-col gap-3">
        <label
          htmlFor="message"
          className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground"
        >
          — Message
          <span className="text-[hsl(var(--accent))] ml-1">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What are you trying to ship? Links, deadlines, scope, fun details — all welcome."
          className="w-full bg-transparent border-0 border-b border-border focus:border-foreground focus:outline-none px-0 py-3 text-base md:text-lg text-foreground placeholder:text-muted-foreground/55 resize-none"
        />
      </div>

      {/* Submit */}
      <div className="flex flex-wrap items-center gap-6 pt-4">
        <MagneticButton
          type="submit"
          disabled={submitting}
          className="group inline-flex items-center gap-3 px-7 py-4 bg-foreground text-background rounded-full text-sm font-medium tracking-wide hover:bg-foreground/90 transition-colors disabled:opacity-60"
        >
          <span className="inline-flex items-center gap-2">
            {submitting ? 'Sending…' : 'Send'}
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
      </div>
    </form>
  )
}

/* ---- Field primitives -------------------------------------------- */

function FieldText({
  id,
  label,
  value,
  onChange,
  placeholder,
  required,
  type = 'text',
  autoComplete,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  placeholder: string
  required?: boolean
  type?: string
  autoComplete?: string
}) {
  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor={id}
        className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground"
      >
        — {label}
        {required ? <span className="text-[hsl(var(--accent))] ml-1">*</span> : null}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full bg-transparent border-0 border-b border-border focus:border-foreground focus:outline-none px-0 py-3 text-base md:text-lg text-foreground placeholder:text-muted-foreground/55"
      />
    </div>
  )
}

function FieldGroup({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4">
      <span
        id={`${htmlFor}-label`}
        className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground"
      >
        — {label}
      </span>
      {children}
    </div>
  )
}

function PillRow<T extends string>({
  id,
  options,
  value,
  onChange,
  ariaLabel,
}: {
  id: string
  options: T[]
  value: T
  onChange: (v: T) => void
  ariaLabel: string
}) {
  return (
    <div
      id={id}
      role="radiogroup"
      aria-label={ariaLabel}
      className="flex flex-wrap gap-2"
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
              'inline-flex items-center px-4 py-2 rounded-full border text-sm transition-colors',
              selected
                ? 'border-foreground bg-foreground text-background'
                : 'border-border text-foreground/70 hover:border-foreground hover:text-foreground',
            ].join(' ')}
          >
            {o}
          </button>
        )
      })}
    </div>
  )
}
