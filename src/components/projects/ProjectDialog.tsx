import { Check, Circle, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { Project } from '../../data/portfolio'
import { GitHubIcon } from '../ui/BrandIcons'
import { ProjectPreview } from './previews'
import { RepoBadge, StatusBadge } from './ProjectCard'

interface ProjectDialogProps {
  project: Project | null
  onClose: () => void
}

/** Native <dialog>: Fokusfalle, Escape und Top-Layer kommen vom Browser. */
export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (project && !dialog.open) {
      dialog.showModal()
      // autoFocus greift vor showModal() nicht – Fokus daher erst jetzt setzen
      closeButton.current?.focus()
    }
    if (!project && dialog.open) dialog.close()
  }, [project])

  return (
    <dialog
      ref={ref}
      aria-labelledby="project-dialog-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close()
      }}
      className="project-dialog m-auto w-[calc(100%-24px)] max-w-[820px] overflow-hidden rounded-3xl border border-line-strong bg-elevated p-0 text-fg shadow-[0_40px_120px_-30px_rgb(0_0_0/0.8)] backdrop:bg-[rgb(2_6_16/0.72)] backdrop:backdrop-blur-sm"
    >
      {project && (
        <div className="max-h-[calc(100dvh-24px)] overflow-y-auto overscroll-contain">
          <div className="relative aspect-[16/8] border-b border-line bg-pv-bg sm:aspect-[16/7]">
            <ProjectPreview kind={project.preview} large />
            <button
              ref={closeButton}
              type="button"
              onClick={() => ref.current?.close()}
              className="icon-btn absolute top-3 right-3 bg-elevated/90 backdrop-blur"
              aria-label="Dialog schließen"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-5 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip text-ink">{project.category}</span>
              {project.context && <span className="chip">{project.context}</span>}
              <StatusBadge project={project} />
              {!project.repoUrl && <RepoBadge />}
            </div>

            <h2 id="project-dialog-title" className="mt-4 text-[clamp(1.5rem,4vw,2.1rem)] leading-tight font-bold">
              {project.title}
            </h2>
            <p className="mt-3 max-w-[62ch] leading-relaxed text-muted">{project.description}</p>

            {project.modules && (
              <section className="mt-7">
                <h3 className="eyebrow">Module</h3>
                <ul className="mt-3 grid gap-3 sm:grid-cols-3">
                  {project.modules.map((mod) => (
                    <li key={mod.name} className="rounded-2xl border border-line bg-sunken p-4">
                      <p className="font-display font-semibold">{mod.name}</p>
                      <p className="mt-1 text-[0.86rem] leading-snug text-muted">{mod.text}</p>
                      <span className="status mt-3" data-kind={mod.state === 'aktiv' ? 'live' : 'development'}>
                        {mod.state}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {project.featureGroups.map((group) => {
              const planned = group.title === 'Geplant'
              return (
                <section key={group.title} className="mt-7">
                  <h3 className="eyebrow">{group.title}</h3>
                  <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                    {group.items.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-[0.94rem]">
                        {planned ? (
                          <Circle size={15} className="mt-[3px] flex-none text-dim" aria-hidden="true" />
                        ) : (
                          <Check size={16} className="mt-[3px] flex-none text-accent-2" aria-hidden="true" />
                        )}
                        <span className={planned ? 'text-muted' : ''}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )
            })}

            {project.role && (
              <section className="mt-7 rounded-2xl border border-line border-l-violet bg-sunken/60 p-4 [border-left-width:3px]">
                <h3 className="eyebrow">Meine Rolle</h3>
                <p className="mt-2 text-[0.94rem] leading-relaxed">{project.role}</p>
              </section>
            )}

            <section className="mt-7">
              <h3 className="eyebrow">Technologien</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li key={tech} className="chip font-mono font-medium">
                    {tech}
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-line pt-6">
              {project.repoUrl ? (
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <GitHubIcon size={17} />
                  Auf GitHub ansehen
                  <span className="sr-only">(öffnet in neuem Tab)</span>
                </a>
              ) : (
                <p className="text-[0.88rem] text-dim">Das Repository ist privat, daher gibt es keinen öffentlichen Link.</p>
              )}
              <button type="button" className="btn btn-ghost ml-auto" onClick={() => ref.current?.close()}>
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  )
}
