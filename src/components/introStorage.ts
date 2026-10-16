const STORAGE_KEY = 'mk-intro-seen'

/**
 * Soll das Intro gezeigt werden? Einmal pro Besuch (sessionStorage gilt je Tab, bis er
 * geschlossen wird) und nie bei reduzierter Bewegung.
 */
export function shouldShowIntro() {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false
  try {
    return sessionStorage.getItem(STORAGE_KEY) !== '1'
  } catch {
    return true
  }
}

export function markIntroSeen() {
  try {
    sessionStorage.setItem(STORAGE_KEY, '1')
  } catch {
    // ohne Speicher erscheint das Intro beim nächsten Laden erneut
  }
}
