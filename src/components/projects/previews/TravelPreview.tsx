/** Illustration: Reise-Karten der Reisebüro-App (abstrakte Ziele, keine Echtdaten). */
const scenes = [
  { sky: 'from-accent-2/50 to-accent/20', sun: 'bg-warn', kind: 'sea' },
  { sky: 'from-violet/45 to-accent/20', sun: 'bg-accent-2', kind: 'mountain' },
  { sky: 'from-accent/45 to-accent-2/20', sun: 'bg-warn', kind: 'city' },
] as const

function Scene({ kind }: { kind: (typeof scenes)[number]['kind'] }) {
  if (kind === 'sea')
    return (
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-1/2 w-full">
        <path d="M0 18c12-6 22 6 34 0s22-6 34 0 22 6 32 0v22H0z" className="fill-accent/60" />
        <path d="M0 26c12-5 22 5 34 0s22-5 34 0 22 5 32 0v14H0z" className="fill-accent" />
      </svg>
    )
  if (kind === 'mountain')
    return (
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-3/5 w-full">
        <path d="M0 40 28 8l18 18 14-12 40 26z" className="fill-violet/70" />
        <path d="m22 15 6-7 6 7-3 2-3-2-3 2z" className="fill-pv-text" opacity=".8" />
      </svg>
    )
  return (
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-3/5 w-full">
      <path d="M0 40V22h12V12h10v14h8V6h12v20h10V16h14v10h10V18h12v22z" className="fill-accent/70" />
    </svg>
  )
}

export function TravelPreview() {
  return (
    <div
      role="img"
      aria-label="Illustration: drei Reise-Karten mit Buchen-Button und Premiumstatus"
      className="flex h-full flex-col gap-[4%] bg-pv-bg p-[4%] font-sans"
    >
      <div className="flex items-center justify-between">
        <span className="h-2 w-[24%] rounded-full bg-pv-text/80" />
        <span className="rounded-full bg-warn/15 px-2 py-0.5 text-[clamp(0.45rem,1.2vw,0.6rem)] font-bold text-warn ring-1 ring-warn/40">
          ★ Premium
        </span>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-3 gap-[4%]">
        {scenes.map((s, i) => (
          <div key={i} className="flex min-w-0 flex-col overflow-hidden rounded-md border border-pv-line bg-pv-panel">
            <div className={`relative h-[52%] bg-gradient-to-b ${s.sky}`}>
              <span className={`absolute top-[18%] right-[18%] size-[18%] rounded-full ${s.sun} opacity-90`} />
              <Scene kind={s.kind} />
            </div>
            <div className="flex flex-1 flex-col justify-between gap-1 p-[8%]">
              <span className="h-1.5 w-4/5 rounded-full bg-pv-text/75" />
              <span className="h-1.5 w-1/2 rounded-full bg-pv-dim" />
              <span
                className={`mt-auto rounded px-1 py-0.5 text-center text-[clamp(0.42rem,1.1vw,0.56rem)] font-bold ${
                  i === 1 ? 'bg-ok/20 text-ok' : 'bg-accent text-on-accent'
                }`}
              >
                {i === 1 ? 'Gebucht ✓' : 'Buchen'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
