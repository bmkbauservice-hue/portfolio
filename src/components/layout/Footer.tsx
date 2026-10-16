import { Mail } from 'lucide-react'
import { links, navigation, person, site } from '../../data/portfolio'
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons'
import { LogoMark } from '../ui/Logo'

export function Footer() {
  const socials = [
    { href: links.github, label: 'GitHub', Icon: GitHubIcon, external: true },
    ...(links.linkedin ? [{ href: links.linkedin, label: 'LinkedIn', Icon: LinkedInIcon, external: true }] : []),
  ]

  return (
    <footer data-tone="dark" className="tone-section relative border-t border-line">
      <div className="container-x grid gap-8 py-10 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div className="flex items-center gap-3">
          <LogoMark className="h-7 w-auto" />
          <div className="leading-tight">
            <p className="font-display text-[0.95rem] font-semibold">{person.fullName}</p>
            <p className="text-[0.76rem] text-dim">{person.subtitle.join(' · ')}</p>
          </div>
        </div>

        <nav aria-label="Fußzeilen-Navigation">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.86rem] text-muted">
            {navigation.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="rounded hover:text-fg">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-wrap items-center gap-4 md:justify-end">
          <ul className="flex items-center gap-2">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-btn size-10"
                  aria-label={`${label} (öffnet in neuem Tab)`}
                >
                  <Icon size={17} />
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${links.email}`} className="icon-btn size-10" aria-label="E-Mail schreiben">
                <Mail size={17} />
              </a>
            </li>
          </ul>
          <p className="text-[0.78rem] text-dim">{site.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
