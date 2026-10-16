import { Contrast, Moon, Sun } from 'lucide-react'
import { useRef, type KeyboardEvent } from 'react'
import { THEMES, useTheme, type Theme } from '../../theme/theme'

const icons: Record<Theme, typeof Moon> = { dark: Moon, light: Sun, hybrid: Contrast }

/** Drei Themes als Radiogruppe: Pfeiltasten wechseln, Tab springt aus der Gruppe. */
export function ThemeSwitcher({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const activeIndex = THEMES.findIndex((t) => t.id === theme)

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const delta = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
    if (!delta) return
    e.preventDefault()
    const next = (activeIndex + delta + THEMES.length) % THEMES.length
    setTheme(THEMES[next].id)
    refs.current[next]?.focus()
  }

  return (
    <div
      role="radiogroup"
      aria-label="Design wählen"
      onKeyDown={onKeyDown}
      className={`relative flex items-center rounded-full border border-line-strong bg-surface p-1 ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute top-1 left-1 size-8 rounded-full bg-accent/15 shadow-[0_0_16px_-4px_var(--glow-a)] ring-1 ring-accent/40 transition-transform duration-300 ease-out"
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
      />
      {THEMES.map((t, i) => {
        const Icon = icons[t.id]
        const active = t.id === theme
        return (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`${t.label} – ${t.description}`}
            title={`${t.label} – ${t.description}`}
            tabIndex={active ? 0 : -1}
            onClick={() => setTheme(t.id)}
            className={`relative grid size-8 place-items-center rounded-full transition-colors ${
              active ? 'text-ink' : 'text-dim hover:text-fg'
            }`}
          >
            <Icon size={16} strokeWidth={2} />
          </button>
        )
      })}
    </div>
  )
}
