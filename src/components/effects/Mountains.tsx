/** Bergsilhouette für das Kontakt-Band. Farben kommen aus den Theme-Tokens --m-*. */
export function Mountains({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 260"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="mountain-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0.55" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        style={{ fill: 'var(--m-1)' }}
        opacity="0.75"
        d="M0 170 80 122l70 26 90-70 80 50 90-72 90 62 80-26 80 44 100-70 90 56 90-34 90 48 90-64 90 44 90-34 80 40 60-26v160H0Z"
      />
      <path
        fill="none"
        stroke="url(#mountain-glow)"
        strokeWidth="1.5"
        d="M0 170 80 122l70 26 90-70 80 50 90-72 90 62 80-26 80 44 100-70 90 56 90-34 90 48 90-64 90 44 90-34 80 40 60-26"
      />
      <path
        style={{ fill: 'var(--m-2)' }}
        d="m0 202 90-42 80 26 90-56 100 50 90-40 90 50 100-40 80 34 100-50 90 40 90-30 100 46 90-40 100 30 80-36 70 26v90H0Z"
      />
      <path
        style={{ fill: 'var(--m-3)' }}
        d="m0 236 110-30 100 22 110-32 110 34 110-20 110 26 110-30 110 26 110-24 110 26 110-22 110 24 130-22v46H0Z"
      />
    </svg>
  )
}
