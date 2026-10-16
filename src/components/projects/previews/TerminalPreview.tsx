import { useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

// Beispielablauf – zeigt nur Funktionen, die im Projekt beschrieben sind.
const LOG = [
  { t: '08:02', tag: 'telegram', text: 'Neue Nachricht: „Bewerbung erstellen“' },
  { t: '08:02', tag: 'n8n', text: 'Workflow gestartet → bewerbung' },
  { t: '08:02', tag: 'worker', text: 'Stellenanzeige analysiert' },
  { t: '08:03', tag: 'llm', text: 'Anschreiben entworfen' },
  { t: '08:03', tag: 'telegram', text: 'Frage: Welches Design?' },
  { t: '08:04', tag: 'pdf', text: 'PDF erstellt · warte auf Freigabe' },
  { t: '08:06', tag: 'telegram', text: 'Freigabe erhalten', ok: true },
  { t: '08:06', tag: 'kalender', text: 'Termin eingetragen', ok: true },
  { t: '09:15', tag: 'kicktipp', text: 'Ausfälle & Form recherchiert' },
  { t: '09:16', tag: 'kicktipp', text: 'Spieltag getippt', ok: true },
  { t: '09:20', tag: 'e-mail', text: 'E-Mail verschickt', ok: true },
]

const tagColor: Record<string, string> = {
  telegram: 'text-accent-2',
  n8n: 'text-[#ea4b71]',
  worker: 'text-violet',
  llm: 'text-violet',
  pdf: 'text-accent',
  kalender: 'text-accent',
  kicktipp: 'text-warn',
  'e-mail': 'text-accent-2',
}

export function TerminalPreview({ large = false }: { large?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.3 })
  const reduce = useReducedMotion()
  const [count, setCount] = useState(reduce ? LOG.length : 3)

  useEffect(() => {
    if (reduce || !inView) return
    const id = window.setInterval(
      () => setCount((c) => (c >= LOG.length + 4 ? 3 : c + 1)),
      700,
    )
    return () => window.clearInterval(id)
  }, [inView, reduce])

  const visible = LOG.slice(0, Math.min(count, LOG.length))

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Illustration: Beispielablauf im Log des Muju Agent (Bewerbung, Kalender, Kicktipp, E-Mail)"
      className="flex h-full flex-col bg-pv-bg font-mono"
    >
      <div className="flex flex-none items-center gap-1.5 border-b border-pv-line px-3 py-2">
        <span className="size-2 rounded-full bg-[#ff5f57]" />
        <span className="size-2 rounded-full bg-[#febc2e]" />
        <span className="size-2 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate text-[0.62rem] text-dim">muju-agent@vps · beispielablauf</span>
      </div>
      <div
        className={`flex min-h-0 flex-1 flex-col justify-end overflow-hidden px-3 py-2.5 leading-[1.75] text-pv-text ${
          large ? 'text-[0.74rem]' : 'text-[clamp(0.58rem,1.6vw,0.7rem)]'
        }`}
      >
        {visible.map((line, i) => (
          <div key={i} className="flex min-w-0 gap-2 whitespace-nowrap">
            <span className="text-dim">{line.t}</span>
            <span className={`w-[4.6rem] flex-none ${tagColor[line.tag]}`}>[{line.tag}]</span>
            <span className="truncate">
              {line.text}
              {line.ok && <span className="ml-1.5 text-ok">✓</span>}
            </span>
          </div>
        ))}
        <div className="mt-0.5 text-accent-2">
          $ <span className="caret" />
        </div>
      </div>
    </div>
  )
}
