const STORAGE_KEY = 'mk-intro-seen'

/** Soll das Intro gezeigt werden? Nur beim ersten Besuch und nie bei reduzierter Bewegung. */
export function shouldShowIntro() {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false
  try {
    return localStorage.getItem(STORAGE_KEY) !== '1'
  } catch {
    return true
  }
}

export function markIntroSeen() {
  try {
    localStorage.setItem(STORAGE_KEY, '1')
  } catch {
    // ohne Speicher erscheint das Intro beim nächsten Besuch erneut
  }
}
