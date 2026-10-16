import { Check, Copy } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type CopyState = 'idle' | 'copied' | 'failed'

export function CopyButton({ value, label = 'E-Mail-Adresse kopieren' }: { value: string; label?: string }) {
  const [state, setState] = useState<CopyState>('idle')
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setState('copied')
    } catch {
      setState('failed')
    }
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setState('idle'), 2200)
  }

  return (
    <>
      <button type="button" onClick={copy} className="btn btn-ghost btn-sm" aria-label={label}>
        {state === 'copied' ? <Check size={16} className="text-ok" /> : <Copy size={16} />}
        <span aria-hidden="true">{state === 'copied' ? 'Kopiert' : 'Kopieren'}</span>
      </button>
      <span role="status" className="sr-only">
        {state === 'copied' && 'E-Mail-Adresse in die Zwischenablage kopiert.'}
        {state === 'failed' && 'Kopieren nicht möglich. Bitte die Adresse markieren und manuell kopieren.'}
      </span>
    </>
  )
}
