/** Illustration: filterbare Projektgalerie der BMSB-Website (abstrakte Motive, keine echten Fotos). */
const filters = ['Alle', 'Industrie', 'Bau', 'Instandhaltung']

function Motif({ kind }: { kind: number }) {
  switch (kind % 3) {
    case 0: // Zahnrad
      return (
        <g className="stroke-pv-text" fill="none" strokeWidth="2" opacity=".75">
          <circle r="9" />
          <circle r="3.5" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((d) => (
            <path key={d} d="M0-9v-4" transform={`rotate(${d})`} />
          ))}
        </g>
      )
    case 1: // Gebäude
      return (
        <g className="fill-pv-text" opacity=".75">
          <rect x="-14" y="-6" width="10" height="18" rx="1" />
          <rect x="-2" y="-14" width="12" height="26" rx="1" />
          <rect x="12" y="0" width="6" height="12" rx="1" />
        </g>
      )
    default: // Kran
      return (
        <g className="stroke-pv-text" fill="none" strokeWidth="2" opacity=".75" strokeLinecap="round">
          <path d="M-8 14V-12h24M-8-6l8-6M12-12v10" />
          <rect x="9" y="-2" width="6" height="5" className="fill-pv-text" stroke="none" />
        </g>
      )
  }
}

export function GalleryPreview() {
  const tiles = [
    'from-accent/45 to-violet/25',
    'from-accent-2/40 to-accent/15',
    'from-violet/40 to-accent-2/15',
    'from-accent/30 to-accent-2/35',
    'from-accent-2/30 to-violet/30',
    'from-violet/30 to-accent/40',
  ]
  return (
    <div
      role="img"
      aria-label="Illustration: Projektgalerie mit Filtern und Bildraster"
      className="flex h-full flex-col gap-[3%] bg-pv-bg p-[4%] font-sans"
    >
      <div className="flex items-center justify-between">
        <span className="h-2 w-[22%] rounded-full bg-pv-text/80" />
        <span className="flex gap-1.5">
          <span className="h-2 w-6 rounded-full bg-pv-dim" />
          <span className="h-2 w-6 rounded-full bg-pv-dim" />
          <span className="size-3 rounded-full border border-pv-dim" />
        </span>
      </div>
      <div className="flex gap-1.5 overflow-hidden">
        {filters.map((f, i) => (
          <span
            key={f}
            className={`rounded-full px-2 py-0.5 text-[clamp(0.45rem,1.2vw,0.6rem)] font-semibold whitespace-nowrap ${
              i === 0 ? 'bg-accent text-on-accent' : 'border border-pv-line text-pv-text/70'
            }`}
          >
            {f}
          </span>
        ))}
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-3 gap-[3%]">
        {tiles.map((g, i) => (
          <div key={i} className={`relative grid place-items-center overflow-hidden rounded-md bg-gradient-to-br ${g}`}>
            <svg viewBox="-20 -20 40 40" className="h-[55%] w-auto">
              <Motif kind={i} />
            </svg>
            {i === 1 && (
              <span className="absolute top-1 right-1 grid size-3.5 place-items-center rounded bg-pv-bg/80 text-[0.5rem] text-pv-text">
                ⤢
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
