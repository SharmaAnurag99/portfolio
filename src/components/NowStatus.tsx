'use client'

import { useEffect, useState } from 'react'

const states: { label: string; value: string }[] = [
  { label: 'Currently building', value: 'Bento dashboard for a fintech startup' },
  { label: 'Listening to', value: 'Lo-fi house · Tycho' },
  { label: 'Reading', value: 'A Philosophy of Software Design' },
  { label: 'Open to', value: 'Freelance · Full-time roles' },
]

export default function NowStatus() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setI((p) => (p + 1) % states.length)
    }, 3500)
    return () => clearInterval(id)
  }, [])

  const s = states[i]

  return (
    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-primary-foreground/15 bg-primary-foreground/5 max-w-full">
      <span className="relative flex w-2 h-2 shrink-0">
        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
        <span className="relative w-2 h-2 rounded-full bg-emerald-400" />
      </span>
      <span className="font-mono text-[10px] tracking-[0.25em] text-primary-foreground/60 uppercase shrink-0">
        {s.label}
      </span>
      <span
        key={i}
        className="text-primary-foreground/90 text-xs truncate animate-[fade-up_0.6s_ease-out]"
      >
        {s.value}
      </span>
    </div>
  )
}
