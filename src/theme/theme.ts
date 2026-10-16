import { createContext, useContext } from 'react'

export const THEMES = [
  { id: 'dark', label: 'Dark', description: 'Cyber & Neon' },
  { id: 'light', label: 'Light', description: 'Clean & Premium' },
  { id: 'hybrid', label: 'Hybrid', description: 'Light meets Dark' },
] as const

export type Theme = (typeof THEMES)[number]['id']

export const DEFAULT_THEME: Theme = 'dark'
const STORAGE_KEY = 'mk-theme'

export function isTheme(value: unknown): value is Theme {
  return THEMES.some((t) => t.id === value)
}

export function readStoredTheme(): Theme {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return isTheme(value) ? value : DEFAULT_THEME
  } catch {
    return DEFAULT_THEME
  }
}

export function storeTheme(theme: Theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Speicher nicht verfügbar (privater Modus o. Ä.) – Auswahl gilt nur für diese Sitzung.
  }
}

interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme muss innerhalb von ThemeProvider verwendet werden')
  return ctx
}
