import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { flushSync } from 'react-dom'
import { ThemeContext, readStoredTheme, storeTheme, type Theme } from './theme'

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const initial = readStoredTheme()
    applyTheme(initial)
    return initial
  })

  const setTheme = useCallback((next: Theme) => {
    storeTheme(next)
    const commit = () => {
      flushSync(() => setThemeState(next))
      applyTheme(next)
    }

    if (prefersReducedMotion()) {
      commit()
      return
    }

    // Sanfter Übergang: View Transitions, wo verfügbar – sonst kurze CSS-Transition.
    if (typeof document.startViewTransition === 'function') {
      document.startViewTransition(commit)
      return
    }
    const root = document.documentElement
    root.classList.add('theme-fade')
    commit()
    window.setTimeout(() => root.classList.remove('theme-fade'), 500)
  }, [])

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
