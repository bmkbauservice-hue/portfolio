import { CalendarDays, Languages, MapPin } from 'lucide-react'
import { about, person, timeline } from '../../data/portfolio'
import { Portrait } from '../ui/Portrait'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { ToneEdge } from '../ui/ToneEdge'

const factIcons = { location: MapPin, calendar: CalendarDays, languages: Languages } as const

export function About() {
  return (
    <section id="ueber-mich" data-tone="dark" aria-labelledby="about-title" className="tone-section section overflow-x-clip">
      <ToneEdge />
      <div className="container-x grid gap-12 md:grid-cols-2 xl:grid-cols-[1.05fr_0.8fr_1.1fr] xl:gap-10">
        <Reveal className="min-w-0">
          <SectionHeading id="about-title" eyebrow="Über mich" title={about.heading} />
          <div className="mt-5 space-y-4 text-[0.97rem] leading-relaxed text-muted">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2.5 text-[0.86rem] font-medium">
            {about.facts.map((fact) => {
              const Icon = factIcons[fact.icon]
              return (
                <li key={fact.text} className="flex items-center gap-2">
                  <Icon size={16} className="text-accent-2" aria-hidden="true" />
                  {fact.text}
                </li>
              )
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.08} className="min-w-0">
          {/* Badge: ab sm wie bisher unten rechts im Bild, auf dem Handy unter dem Foto (nie über dem Gesicht) */}
          <figure className="mx-auto w-full max-w-[380px]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line-strong bg-[#000] shadow-[var(--shadow-card)]">
              <Portrait crop="card" />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, transparent 45%, rgb(3 8 20 / 0.85) 100%), radial-gradient(120% 80% at 100% 0%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 55%)',
                }}
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
                <span className="neon-script text-[clamp(2rem,6vw,2.6rem)] [--neon:#4ea8ff] [text-shadow:0_0_6px_rgb(78_168_255/0.9),0_0_18px_rgb(47_139_255/0.65),0_0_42px_rgb(47_139_255/0.4)]">
                  {person.fullName}
                </span>
                <span className="hidden flex-none sm:flex items-center gap-2 rounded-xl border border-white/15 bg-[rgb(6_12_28/0.75)] px-3 py-2 text-[0.74rem] leading-tight font-semibold text-white backdrop-blur-md">
                  <span className="pulse-dot size-2 rounded-full bg-[#22d3ee] shadow-[0_0_10px_#22d3ee]" aria-hidden="true" />
                  {about.badge}
                </span>
              </figcaption>
            </div>
            <div className="mt-3 flex justify-center sm:hidden">
              <span className="flex items-center gap-2 rounded-xl border border-white/15 bg-[rgb(6_12_28/0.75)] px-3 py-2 text-[0.74rem] leading-tight font-semibold text-white backdrop-blur-md">
                <span className="pulse-dot size-2 rounded-full bg-[#22d3ee] shadow-[0_0_10px_#22d3ee]" aria-hidden="true" />
                {about.badge}
              </span>
            </div>
          </figure>
        </Reveal>

        <Reveal delay={0.16} className="min-w-0 md:col-span-2 xl:col-span-1">
          <SectionHeading eyebrow="Mein Weg" title="Stationen" />
          <ol className="relative mt-8 space-y-7 before:absolute before:top-2 before:bottom-2 before:left-[7px] before:w-0.5 before:bg-gradient-to-b before:from-accent before:via-violet before:to-ok/60">
            {timeline.map((entry) => (
              <li key={entry.title} className="relative pl-9">
                <span
                  aria-hidden="true"
                  className={`absolute top-1 left-0 size-4 rounded-full border-2 bg-bg ${
                    entry.next
                      ? 'border-dashed border-ok shadow-[0_0_14px_var(--ok)]'
                      : 'border-accent shadow-[0_0_14px_var(--glow-a)]'
                  }`}
                />
                <p className={`font-mono text-[0.74rem] tabular-nums ${entry.next ? 'text-ok' : 'text-ink'}`}>{entry.period}</p>
                <h3 className="mt-1 flex flex-wrap items-center gap-2 font-display text-[1.02rem] leading-snug font-semibold">
                  {entry.title}
                  {entry.next && (
                    <span className="status" data-kind="live">
                      Nächster Schritt
                    </span>
                  )}
                </h3>
                <p className="mt-1 text-[0.88rem] leading-relaxed text-muted">{entry.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
