import type { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  id?: string
  className?: string
}

export function SectionHeading({ eyebrow, title, id, className = '' }: SectionHeadingProps) {
  return (
    <div className={className}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="mt-3 text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.12] font-bold">
        {title}
      </h2>
    </div>
  )
}
