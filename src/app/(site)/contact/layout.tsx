import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact · Anurag Sharma',
  description:
    "Tell me what you're shipping. Reply within 6 hours during IST working hours. Available for Q2 2026 — full-stack, smart contracts, Rust systems.",
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
