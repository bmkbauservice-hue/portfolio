import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { navigation, person } from '../../data/portfolio'
import { useTheme } from '../../theme/theme'
import { LogoMark } from '../ui/Logo'
import { ThemeSwitcher } from './ThemeSwitcher'
import { useActiveSection } from './useActiveSection'

const sectionIds = navigation.map((n) => n.id)

export function Header() {
  const active = useActiveSection(sectionIds)
  const { theme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const firstLink = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    firstLink.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }
    const onResize = () => window.innerWidth >= 1024 && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [menuOpen])

  // Im Hybrid-Theme liegt rechts die dunkle Diagonalfläche – dort braucht der Header immer einen Grund.
  const solid = scrolled || menuOpen || theme === 'hybrid'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid
          ? 'border-line bg-bg/80 backdrop-blur-xl backdrop-saturate-150'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="container-x flex h-[72px] items-center gap-4">
        <a href="#start" className="group flex min-w-0 items-center gap-3 rounded-lg" aria-label={`${person.fullName} – zum Seitenanfang`}>
          <LogoMark className="h-7 w-auto flex-none transition-transform duration-300 group-hover:scale-105" />
          <span className="hidden h-7 w-px bg-line-strong min-[400px]:block" aria-hidden="true" />
          <span className="hidden min-w-0 leading-tight min-[400px]:block">
            <span className="block font-display text-[0.95rem] font-semibold">{person.fullName}</span>
            <span className="block truncate text-[0.72rem] text-dim">Software Engineering · KI</span>
          </span>
        </a>

        <nav aria-label="Hauptnavigation" className="mx-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative block rounded-lg px-4 py-2 text-[0.88rem] font-medium transition-colors ${
                      isActive ? 'text-fg' : 'text-muted hover:text-fg'
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-accent-2 to-accent shadow-[0_0_10px_var(--glow-c)] transition-all duration-300 ${
                        isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                      }`}
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-3 lg:ml-0">
          <ThemeSwitcher />
          <a href="#kontakt" className="btn btn-ghost btn-sm hidden md:inline-flex">
            Lass uns sprechen
            <ArrowRight size={15} className="nudge" />
          </a>
          <button
            ref={menuButton}
            type="button"
            className="icon-btn lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <m.nav
            id="mobile-menu"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-line lg:hidden"
          >
            <ul className="container-x flex flex-col py-3">
              {navigation.map((item, i) => (
                <li key={item.id}>
                  <a
                    ref={i === 0 ? firstLink : undefined}
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active === item.id ? 'true' : undefined}
                    className={`flex items-center justify-between rounded-xl px-3 py-3.5 font-display text-lg font-semibold ${
                      active === item.id ? 'text-ink' : 'text-fg'
                    }`}
                  >
                    {item.label}
                    <ArrowRight size={18} className="text-dim" />
                  </a>
                </li>
              ))}
              <li className="mt-2 px-3 pb-2 md:hidden">
                <a href="#kontakt" onClick={() => setMenuOpen(false)} className="btn btn-primary w-full">
                  Lass uns sprechen
                  <ArrowRight size={16} />
                </a>
              </li>
            </ul>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
