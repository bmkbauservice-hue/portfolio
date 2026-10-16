/** Illustration: geplanter Anruf-Flow von CallFlow AI (Konzept). */
const nodes = [
  { id: 'call', x: 14, y: 106, label: 'Anruf', tone: 'fill-accent-2' },
  { id: 'speech', x: 110, y: 106, label: 'Sprache', tone: 'fill-accent' },
  { id: 'intent', x: 206, y: 106, label: 'Absicht', tone: 'fill-violet' },
  { id: 'rag', x: 302, y: 46, label: 'Wissen (RAG)', tone: 'fill-accent-2' },
  { id: 'flow', x: 302, y: 106, label: 'Workflow', tone: 'fill-[#ea4b71]' },
  { id: 'dash', x: 302, y: 166, label: 'Dashboard', tone: 'fill-ok' },
]

const edges = [
  'M90 124h20',
  'M186 124h20',
  'M282 124c10 0 8-60 20-60',
  'M282 124h20',
  'M282 124c10 0 8 60 20 60',
]

export function CallFlowPreview() {
  return (
    <svg
      viewBox="0 0 400 250"
      className="h-full w-full"
      role="img"
      aria-label="Illustration des Konzepts: Anruf, Spracherkennung, Absichtserkennung, danach Wissensdatenbank, Workflow und Dashboard"
      fontFamily="Manrope, sans-serif"
    >
      <rect width="400" height="250" className="fill-pv-bg" />
      <g className="stroke-pv-line" strokeWidth=".6" opacity=".7">
        {Array.from({ length: 9 }, (_, i) => (
          <path key={i} d={`M0 ${i * 30 + 10}H400`} />
        ))}
      </g>

      <rect x="14" y="14" width="58" height="16" rx="8" className="fill-violet/15 stroke-violet/50" strokeWidth=".8" />
      <text x="43" y="25" fontSize="7.5" fontWeight="700" textAnchor="middle" className="fill-violet">
        Konzept
      </text>

      {/* Wellenform am Anruf */}
      <g className="fill-accent-2" opacity=".8">
        {[6, 12, 18, 9, 15, 7, 13, 5].map((h, i) => (
          <rect key={i} x={22 + i * 7} y={88 - h / 2} width="3" height={h} rx="1.5" />
        ))}
      </g>

      <g fill="none" className="stroke-accent" strokeWidth="1.6">
        {edges.map((d) => (
          <path key={d} d={d} className="flow-dash" />
        ))}
      </g>

      {nodes.map((n) => (
        <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
          <rect width={n.x > 300 ? 86 : 76} height="36" rx="10" className="fill-pv-panel stroke-pv-line" strokeWidth="1" />
          <circle cx="14" cy="18" r="5" className={n.tone} />
          <text x="25" y="21" fontSize="8.5" fontWeight="700" className="fill-pv-text">
            {n.label}
          </text>
        </g>
      ))}

      <text x="200" y="232" fontSize="7.5" textAnchor="middle" className="fill-pv-dim" fontFamily="JetBrains Mono, monospace">
        mehrere Firmen · eine Plattform
      </text>
    </svg>
  )
}
