import { ArrowRight } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { links, projects, type Project } from '../../data/portfolio'
import { ProjectCard } from '../projects/ProjectCard'
import { ProjectDialog } from '../projects/ProjectDialog'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { ToneEdge } from '../ui/ToneEdge'

// Raster: Top-Karte über volle Breite, dann zwei breite und drei schmale Karten.
const spans = [
  'md:col-span-2 xl:col-span-6',
  'xl:col-span-3',
  'xl:col-span-3',
  'xl:col-span-2',
  'xl:col-span-2',
  'md:col-span-2 xl:col-span-2',
]

export function Projects() {
  const [active, setActive] = useState<Project | null>(null)
  const trigger = useRef<HTMLElement | null>(null)

  const open = useCallback((project: Project, el: HTMLElement) => {
    trigger.current = el
    setActive(project)
  }, [])

  const close = useCallback(() => {
    setActive(null)
    trigger.current?.focus()
  }, [])

  return (
    <section id="projekte" data-tone="dark" aria-labelledby="projekte-title" className="tone-section section">
      <ToneEdge />
      <div className="container-x">
        <Reveal className="grid items-end gap-6 lg:grid-cols-[1fr_1.1fr_auto] lg:gap-10">
          <SectionHeading id="projekte-title" eyebrow="Ausgewählte Projekte" title="Woran ich arbeite" />
          <p className="max-w-[58ch] text-[0.95rem] leading-relaxed text-muted">
            Sechs Projekte, von meinem eigenen KI-Agenten bis zum Kundenprojekt. Bei jedem steht, wie weit es ist
            und welche Rolle ich hatte.
          </p>
          <a href={links.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm justify-self-start">
            Alle auf GitHub
            <ArrowRight size={15} className="nudge" />
            <span className="sr-only">(öffnet in neuem Tab)</span>
          </a>
        </Reveal>

        <ul className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-6">
          {projects.map((project, i) => (
            <li key={project.id} className={spans[i]}>
              <Reveal className="h-full" delay={(i % 3) * 0.08}>
                <ProjectCard project={project} onOpen={open} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <ProjectDialog project={active} onClose={close} />
    </section>
  )
}
