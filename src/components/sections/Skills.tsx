import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { skillCategories, techStack } from '../../data/portfolio'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { TechIcon } from '../ui/TechIcon'
import { ToneEdge } from '../ui/ToneEdge'

export function Skills() {
  const reduce = useReducedMotion()

  return (
    <section id="skills" data-tone="light" aria-labelledby="skills-title" className="tone-section section">
      <ToneEdge flip />
      <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1fr] xl:grid-cols-[0.8fr_1fr_1.15fr] xl:gap-12">
        <Reveal className="min-w-0 lg:col-span-2 xl:col-span-1">
          <SectionHeading
            id="skills-title"
            eyebrow="Skills & Expertise"
            title={
              <>
                Technologien, <br className="hidden sm:block" />
                mit denen ich arbeite
              </>
            }
          />
          <p className="mt-5 max-w-[44ch] text-[0.95rem] leading-relaxed text-muted">
            Aus der Weiterbildung und aus meinen eigenen Projekten. Bewusst ohne Prozentangaben: Was ich kann, zeigen
            die Projekte.
          </p>
        </Reveal>

        <Reveal delay={0.08} className="min-w-0">
          <ul className="grid grid-cols-3 gap-x-3 gap-y-5 min-[420px]:grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 xl:grid-cols-4" aria-label="Tech-Stack">
            {techStack.map((tech) => (
              <li key={tech.id} className="group flex flex-col items-center gap-2 text-center">
                <span className="grid size-[60px] place-items-center rounded-2xl border border-line bg-surface shadow-[var(--shadow-card)] transition-[transform,border-color,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:border-line-strong group-hover:shadow-[0_0_28px_-8px_var(--glow-a)]">
                  <TechIcon id={tech.id} className="size-8" />
                </span>
                <span className="text-[0.76rem] font-semibold text-muted">{tech.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.16} className="min-w-0">
          <ul className="space-y-5">
            {skillCategories.map((cat, i) => (
              <li key={cat.name}>
                <h3 className="font-display text-[0.95rem] font-semibold">{cat.name}</h3>
                <div className="skill-track mt-2" aria-hidden="true">
                  <m.span
                    className="skill-fill"
                    initial={reduce ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 + i * 0.1 }}
                  />
                </div>
                <p className="mt-2 font-mono text-[0.76rem] leading-relaxed text-muted">{cat.items.join(' · ')}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
