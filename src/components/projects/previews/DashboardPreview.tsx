/** Illustration: Admin-Dashboard der Zeiterfassung (keine Echtdaten). */
export function DashboardPreview() {
  const rows = [
    { time: '06:00 – 14:00', active: true },
    { time: '07:30 – 15:30', active: true },
    { time: '14:00 – 22:00', active: false },
    { time: '22:00 – 06:00', active: false },
  ]
  return (
    <svg
      viewBox="0 0 400 250"
      className="h-full w-full"
      role="img"
      aria-label="Illustration: Admin-Dashboard mit drei Stationen, Schichtliste und NFC-Stempel-Terminal"
      fontFamily="Manrope, sans-serif"
    >
      <rect width="400" height="250" className="fill-pv-bg" />
      {/* Sidebar */}
      <rect width="74" height="250" className="fill-pv-panel" />
      <rect x="12" y="14" width="18" height="18" rx="5" className="fill-accent" />
      <rect x="34" y="20" width="28" height="6" rx="3" className="fill-pv-dim" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x="8" y={50 + i * 24} width="58" height="18" rx="5" className={i === 0 ? 'fill-accent/20' : 'fill-transparent'} />
          <rect x="14" y={56 + i * 24} width="6" height="6" rx="2" className={i === 0 ? 'fill-accent' : 'fill-pv-dim'} />
          <rect x="26" y={57 + i * 24} width={30 - (i % 2) * 8} height="4" rx="2" className={i === 0 ? 'fill-pv-text' : 'fill-pv-dim'} />
        </g>
      ))}

      {/* Kopfzeile */}
      <text x="88" y="26" fontSize="10" fontWeight="700" className="fill-pv-text">
        Zeiterfassung · Admin
      </text>
      <circle cx="380" cy="22" r="8" className="fill-pv-line" />

      {/* Stationen */}
      {['Station 1', 'Station 2', 'Station 3'].map((label, i) => (
        <g key={label} transform={`translate(${88 + i * 102} 40)`}>
          <rect width="94" height="52" rx="8" className="fill-pv-panel stroke-pv-line" strokeWidth="1" />
          <text x="10" y="17" fontSize="7.5" fontWeight="600" className="fill-pv-dim">
            {label}
          </text>
          <rect x="10" y="25" width={46 + i * 8} height="7" rx="3.5" className="fill-pv-text" opacity=".85" />
          {[0, 1, 2, 3].map((d) => (
            <circle key={d} cx={14 + d * 10} cy="42" r="3" className={d < 3 - (i % 2) ? 'fill-ok' : 'fill-pv-line'} />
          ))}
        </g>
      ))}

      {/* Schichten */}
      <rect x="88" y="102" width="200" height="136" rx="8" className="fill-pv-panel stroke-pv-line" strokeWidth="1" />
      <text x="98" y="119" fontSize="7.5" fontWeight="700" className="fill-pv-text">
        Schichten heute
      </text>
      {rows.map((row, i) => (
        <g key={i} transform={`translate(98 ${130 + i * 26})`}>
          <circle cx="7" cy="8" r="7" className="fill-pv-line" />
          <rect x="20" y="5" width={44 - i * 4} height="6" rx="3" className="fill-pv-dim" />
          <text x="82" y="11" fontSize="7" fontFamily="JetBrains Mono, monospace" className="fill-pv-text">
            {row.time}
          </text>
          <rect x="146" y="2" width="34" height="12" rx="6" className={row.active ? 'fill-ok/20' : 'fill-pv-line'} />
          <circle cx="153" cy="8" r="2" className={row.active ? 'fill-ok' : 'fill-pv-dim'} />
        </g>
      ))}

      {/* NFC-Terminal */}
      <rect x="298" y="102" width="90" height="136" rx="8" className="fill-pv-panel stroke-pv-line" strokeWidth="1" />
      <text x="343" y="120" fontSize="7.5" fontWeight="700" textAnchor="middle" className="fill-pv-text">
        Stempel-Terminal
      </text>
      <circle cx="343" cy="166" r="28" className="fill-accent/10 stroke-accent" strokeWidth="1.2" />
      <g fill="none" className="stroke-accent-2" strokeWidth="2" strokeLinecap="round">
        <path d="M338 156a14 14 0 0 1 0 20" />
        <path d="M344 151a21 21 0 0 1 0 30" opacity=".7" />
        <path d="M332 161a7 7 0 0 1 0 10" />
      </g>
      <text x="343" y="214" fontSize="7" textAnchor="middle" className="fill-pv-dim">
        NFC-Karte auflegen
      </text>
    </svg>
  )
}
