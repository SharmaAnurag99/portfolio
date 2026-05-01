'use client'

import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  strength?: number
}

export default function MagneticButton({
  children,
  className,
  strength = 0.35,
  ...props
}: Props) {
  const ref = useRef<HTMLButtonElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  return (
    <button
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect()
        if (!r) return
        setPos({
          x: (e.clientX - (r.left + r.width / 2)) * strength,
          y: (e.clientY - (r.top + r.height / 2)) * strength,
        })
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
      className={cn(
        'transition-transform duration-200 ease-out will-change-transform',
        className,
      )}
      {...props}
    >
      <span className="block transition-transform duration-200 ease-out"
        style={{ transform: `translate3d(${pos.x * 0.4}px, ${pos.y * 0.4}px, 0)` }}
      >
        {children}
      </span>
    </button>
  )
}
