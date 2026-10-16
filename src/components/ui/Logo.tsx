import { useId } from 'react'

/** MK-Monogramm: Der rechte Strich des M ist zugleich der Stamm des K. */
export function LogoMark({ className = 'h-7 w-auto' }: { className?: string }) {
  const id = useId()
  return (
    <svg viewBox="0 0 44 30" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--accent-2)" />
          <stop offset="1" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
      <path
        d="M3 26V4l10.5 12.5L24 4v22M40 4 24 18.5m5.2-4.6L41 26"
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: 'drop-shadow(0 0 6px var(--glow-c))' }}
      />
    </svg>
  )
}
