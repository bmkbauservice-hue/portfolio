import { useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import * as m from 'motion/react-m'
import { ArrowUpRight, Lock } from 'lucide-react'
import type { PointerEvent } from 'react'
import type { Project } from '../../data/portfolio'
import { GitHubIcon } from '../ui/BrandIcons'
import { ProjectPreview } from './previews'

interface ProjectCardProps {
  project: Project
  onOpen: (project: Project, trigger: HTMLElement) => void
  className?: string
}

const MAX_STACK = 4

export function StatusBadge({ project }: { project: Project }) {
  return (
    <span className="status" data-kind={project.status.kind}>
      <span className="sr-only">Status: </span>
      {project.status.label}
    </span>
  )
}

export function RepoBadge() {
  return (
    <span className="status" data-kind="muted">
      <Lock size={11} aria-hidden="true" className="-ml-0.5" />
      Repo privat
    </span>
  )
}

export function ProjectCard({ project, onOpen, className = '' }: ProjectCardProps) {
  const reduce = useReducedMotion()
  const rotateX = useSpring(useMotionValue(0), { stiffness: 180, damping: 20 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 180, damping: 20 })
  const featured = project.featured === true
  const shownStack = project.stack.slice(0, MAX_STACK)
  const hiddenCount = project.stack.length - shownStack.length

  function onPointerMove(e: PointerEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    e.currentTarget.style.setProperty('--mx', `${x * 100}%`)
    e.currentTarget.style.setProperty('--my', `${y * 100}%`)
    if (reduce || e.pointerType !== 'mouse') return
    const strength = featured ? 1.2 : 2.6
    rotateY.set((x - 0.5) * strength * 2)
    rotateX.set(-(y - 0.5) * strength * 2)
  }

  function onPointerLeave() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <m.article
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      aria-labelledby={`project-${project.id}`}
      className={`card spotlight group @container h-full overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-[var(--shadow-hover)] ${className}`}
    >
      <div
        className={`grid h-full gap-6 p-5 sm:p-6 ${
          featured ? '@3xl:grid-cols-[1fr_1.1fr] @3xl:gap-10 @3xl:p-8' : '@lg:grid-cols-[1fr_0.95fr] @lg:gap-5'
        }`}
      >
        <div className="flex min-w-0 flex-col @lg:order-none">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip text-ink">{project.category}</span>
            {project.context && <span className="chip">{project.context}</span>}
          </div>

          <h3
            id={`project-${project.id}`}
            className={`mt-4 leading-tight font-bold ${featured ? 'text-[clamp(1.6rem,3vw,2.2rem)]' : 'text-[1.3rem]'}`}
          >
            {project.title}
          </h3>

          <div className="mt-3 flex flex-wrap gap-2">
            <StatusBadge project={project} />
            {!project.repoUrl && <RepoBadge />}
          </div>

          <p className="mt-3.5 text-[0.93rem] leading-relaxed text-muted">{project.summary}</p>

          {project.modules && (
            <ul className="mt-5 grid gap-2.5">
              {project.modules.map((mod) => (
                <li key={mod.name} className="rounded-xl border border-line bg-sunken/70 px-3.5 py-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-display text-[0.9rem] font-semibold">{mod.name}</span>
                    <span className="status" data-kind={mod.state === 'aktiv' ? 'live' : 'development'}>
                      {mod.state}
                    </span>
                  </div>
                  <p className="mt-1 text-[0.82rem] leading-snug text-muted">{mod.text}</p>
                </li>
              ))}
            </ul>
          )}

          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologien">
            {shownStack.map((tech) => (
              <li key={tech} className="chip font-mono font-medium">
                {tech}
              </li>
            ))}
            {hiddenCount > 0 && (
              <li className="chip font-mono font-medium text-dim">
                +{hiddenCount}
                <span className="sr-only"> weitere, siehe Details</span>
              </li>
            )}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-6">
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={(e) => onOpen(project, e.currentTarget)}
              aria-haspopup="dialog"
            >
              Details
              <span className="sr-only"> zu {project.title}</span>
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="icon-btn"
                aria-label={`${project.title} auf GitHub (öffnet in neuem Tab)`}
                title="Auf GitHub ansehen"
              >
                <GitHubIcon size={17} />
              </a>
            )}
          </div>
        </div>

        <div
          className={`relative order-first min-w-0 overflow-hidden rounded-2xl border border-line bg-pv-bg shadow-[0_20px_40px_-24px_rgb(0_0_0/0.6)] @lg:order-none ${
            featured ? 'aspect-[16/11] @3xl:self-center' : 'aspect-[16/10] @lg:aspect-auto @lg:min-h-[220px]'
          }`}
        >
          <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.03]">
            <ProjectPreview kind={project.preview} large={featured} />
          </div>
        </div>
      </div>
    </m.article>
  )
}
