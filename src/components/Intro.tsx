import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import { useEffect, useRef, useState } from 'react'
import { intro } from '../data/portfolio'
import { markIntroSeen } from './introStorage'

const DURATION_MS = 2700

export function Intro({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true)
  const [step, setStep] = useState(0)
  const skipRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    markIntroSeen()
    skipRef.current?.focus({ preventScroll: true })
    const t1 = window.setTimeout(() => setStep(1), 1150)
    const t2 = window.setTimeout(() => setVisible(false), DURATION_MS)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setVisible(false)
    window.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <m.div
          role="dialog"
          aria-modal="true"
          aria-label="Begrüßung"
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-bg px-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: 'easeOut' } }}
        >
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 size-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 30%, transparent), transparent 70%)' }}
          />
          <div className="relative text-center" aria-live="polite">
            <AnimatePresence mode="wait">
              {step === 0 ? (
                <m.p
                  key="greeting"
                  className="font-display text-[clamp(2.2rem,7vw,4.5rem)] font-extrabold tracking-[-0.03em]"
                  initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -18, filter: 'blur(6px)' }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {intro.greeting.replace('Mario.', '')}
                  <span className="text-gradient">Mario.</span>
                </m.p>
              ) : (
                <m.p
                  key="claim"
                  className="max-w-[18ch] font-display text-[clamp(1.6rem,5vw,3.2rem)] leading-tight font-bold tracking-[-0.02em]"
                  initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {intro.claim}
                </m.p>
              )}
            </AnimatePresence>
            <m.span
              aria-hidden="true"
              className="mx-auto mt-8 block h-0.5 w-40 origin-left rounded-full bg-gradient-to-r from-accent-2 to-accent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: DURATION_MS / 1000 - 0.3, ease: 'linear' }}
            />
          </div>
          <button
            ref={skipRef}
            type="button"
            onClick={() => setVisible(false)}
            className="btn btn-ghost btn-sm absolute right-4 bottom-4 sm:right-8 sm:bottom-8"
          >
            Überspringen
            <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[0.65rem] text-dim">Esc</kbd>
          </button>
        </m.div>
      )}
    </AnimatePresence>
  )
}
