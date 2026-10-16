/** Illustration: Yacht-Dashboard von OceanMind AI (keine Echtdaten). */
export function YachtPreview() {
  const ticks = Array.from({ length: 24 }, (_, i) => i * 15)
  return (
    <svg
      viewBox="0 0 400 250"
      className="h-full w-full"
      role="img"
      aria-label="Illustration: Yacht-Dashboard mit Seekarte, Route, Kompass und Wartungsanzeige"
      fontFamily="Manrope, sans-serif"
    >
      <defs>
        <linearGradient id="sea" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--accent)" stopOpacity=".2" />
          <stop offset="1" stopColor="var(--accent-2)" stopOpacity=".06" />
        </linearGradient>
      </defs>
      <rect width="400" height="250" className="fill-pv-bg" />

      <text x="16" y="24" fontSize="10" fontWeight="700" className="fill-pv-text">
        OceanMind
      </text>
      <text x="76" y="24" fontSize="8" className="fill-pv-dim">
        · Dashboard
      </text>
      <rect x="318" y="13" width="66" height="15" rx="7.5" className="fill-violet/15 stroke-violet/50" strokeWidth=".8" />
      <text x="351" y="23.5" fontSize="7" fontWeight="700" textAnchor="middle" className="fill-violet">
        v0.1 Alpha
      </text>

      {/* Seekarte */}
      <rect x="14" y="38" width="236" height="198" rx="10" fill="url(#sea)" className="stroke-pv-line" strokeWidth="1" />
      <g fill="none" className="stroke-accent/25" strokeWidth="1">
        <path d="M14 90c50-20 90 10 140-6s70-30 96-20" />
        <path d="M14 130c60-24 100 8 150-10s60-20 86-14" />
        <path d="M14 180c40-10 80 16 130 0s80-24 106-16" />
      </g>
      <path d="M150 38c20 30 60 34 100 26v-26z" className="fill-pv-panel" opacity=".9" />
      <path
        d="M44 210C80 186 92 150 128 140s70-36 78-74"
        fill="none"
        className="stroke-accent-2 flow-dash"
        strokeWidth="2"
      />
      {[
        [44, 210],
        [128, 140],
        [206, 66],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="4" className="fill-pv-bg stroke-accent-2" strokeWidth="2" />
      ))}
      <path d="M128 128l7 18h-14z" className="fill-accent" transform="rotate(-38 128 140)" />

      {/* Kompass */}
      <rect x="262" y="38" width="124" height="118" rx="10" className="fill-pv-panel stroke-pv-line" strokeWidth="1" />
      <g transform="translate(324 98)">
        <circle r="40" fill="none" className="stroke-pv-line" strokeWidth="1.5" />
        {ticks.map((deg) => (
          <path
            key={deg}
            d={deg % 90 === 0 ? 'M0-40v8' : 'M0-40v4'}
            className={deg % 90 === 0 ? 'stroke-pv-text' : 'stroke-pv-dim'}
            strokeWidth="1.2"
            transform={`rotate(${deg})`}
          />
        ))}
        <text y="-22" fontSize="8" fontWeight="800" textAnchor="middle" className="fill-accent-2">
          N
        </text>
        <g transform="rotate(34)">
          <path d="M0-30l4 30h-8z" className="fill-accent-2" />
          <path d="M0 26l4-26h-8z" className="fill-pv-dim" />
        </g>
        <circle r="3" className="fill-pv-text" />
      </g>

      {/* Wartung */}
      <rect x="262" y="166" width="124" height="70" rx="10" className="fill-pv-panel stroke-pv-line" strokeWidth="1" />
      <text x="274" y="184" fontSize="7.5" fontWeight="700" className="fill-pv-text">
        Wartung
      </text>
      {[0.72, 0.45, 0.88].map((w, i) => (
        <g key={i} transform={`translate(274 ${194 + i * 12})`}>
          <rect width="100" height="5" rx="2.5" className="fill-pv-line" />
          <rect width={100 * w} height="5" rx="2.5" className={i === 1 ? 'fill-warn' : 'fill-ok'} />
        </g>
      ))}
    </svg>
  )
}
