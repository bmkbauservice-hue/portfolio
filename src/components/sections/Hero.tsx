import { useReducedMotion, useScroll, useTransform, type Variants } from 'motion/react'
import * as m from 'motion/react-m'
import { ArrowRight, MessageSquare } from 'lucide-react'
import { heroSideLabels, heroStats, heroTagline, links, person } from '../../data/portfolio'
import { GitHubIcon } from '../ui/BrandIcons'
import { Portrait } from '../ui/Portrait'
import { useMediaQuery } from '../ui/useMediaQuery'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}

export function Hero({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion()
  const animate = reduce ? undefined : ready ? 'show' : 'hidden'

  return (
    <section
      id="start"
      data-tone="light"
      aria-labelledby="hero-title"
      className="tone-section relative overflow-x-clip pt-[72px]"
    >
      <div data-tone="dark" aria-hidden="true" className="hero-dark-panel" />

      <div className="container-x relative grid items-center gap-10 pt-10 pb-16 sm:pt-14 lg:min-h-[680px] lg:grid-cols-[1.08fr_0.92fr] lg:gap-6 lg:pt-12 lg:pb-20">
        <m.div
          className="relative z-10 min-w-0"
          variants={container}
          initial={reduce ? false : 'hidden'}
          animate={animate}
        >
          <m.p variants={item} className="eyebrow flex flex-wrap gap-x-3 gap-y-1">
            {person.eyebrow.map((word, i) => (
              <span key={word} className="flex items-center gap-3">
                {word}
                {i < person.eyebrow.length - 1 && <span aria-hidden="true" className="text-dim">·</span>}
              </span>
            ))}
          </m.p>

          <m.h1
            variants={item}
            id="hero-title"
            className="mt-5 text-[clamp(2.7rem,8.4vw,5.4rem)] leading-[0.98] font-extrabold tracking-[-0.035em]"
          >
            {person.firstName} <span className="text-gradient">{person.lastName}</span>
          </m.h1>

          <m.p
            variants={item}
            className="mt-5 flex flex-wrap gap-y-1 font-display text-[clamp(1.05rem,2.2vw,1.45rem)] font-semibold text-fg/90"
          >
            {person.subtitle.map((word, i) => (
              <span key={word} className="whitespace-nowrap">
                {word}
                {i < person.subtitle.length - 1 && <span className="mx-2 text-accent">·</span>}
              </span>
            ))}
          </m.p>

          <m.p variants={item} className="mt-5 max-w-[56ch] text-[1.02rem] leading-relaxed text-muted">
            {person.heroIntro}
          </m.p>

          <m.p
            variants={item}
            className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-ok/30 bg-ok/10 px-3.5 py-1.5 text-[0.84rem] font-semibold text-ok"
          >
            <span className="pulse-dot size-2 rounded-full bg-ok shadow-[0_0_10px_var(--ok)]" aria-hidden="true" />
            {person.availability.label} · {person.availability.period}
          </m.p>

          <m.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <a href="#projekte" className="btn btn-primary">
              Projekte entdecken
              <ArrowRight size={17} className="nudge" />
            </a>
            <a href="#kontakt" className="btn btn-ghost">
              <MessageSquare size={17} />
              Kontakt aufnehmen
            </a>
            <a href={links.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <GitHubIcon size={17} />
              GitHub besuchen
              <span className="sr-only">(öffnet in neuem Tab)</span>
            </a>
          </m.div>

          <m.dl variants={item} className="mt-11 grid max-w-[520px] grid-cols-3 border-t border-line pt-6">
            {heroStats.map((stat, i) => (
              <div key={stat.label} className={`min-w-0 ${i > 0 ? 'border-l border-line pl-4 sm:pl-6' : 'pr-4'}`}>
                <dt className="text-[0.75rem] leading-snug text-dim">{stat.label}</dt>
                <dd className="mt-1.5 flex items-center gap-2 font-display text-[clamp(1.1rem,2.6vw,1.45rem)] font-bold tabular-nums">
                  {stat.value}
                  {i === 0 && <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-2 shadow-[0_0_10px_var(--accent-2)]" />}
                </dd>
              </div>
            ))}
          </m.dl>
        </m.div>

        <HeroVisual ready={ready} />
      </div>
    </section>
  )
}

function HeroVisual({ ready }: { ready: boolean }) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const taglineY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : -50])
  const codeY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : -80])
  // Handy: Code-Fenster liegt unter dem Foto und bewegt sich nicht mit (sonst wandert es übers Gesicht)
  const isPhone = useMediaQuery('(max-width: 639px)')

  return (
    <m.div
      data-tone="dark"
      className="hero-visual relative mx-auto w-full max-w-[560px] min-w-0"
      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
      animate={reduce ? undefined : ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    >
      <div className="relative aspect-square">
        <div aria-hidden="true" className="hero-grid absolute inset-0" />

        {/* Leuchtender Kreisring mit Foto */}
        <div className="absolute top-[9%] left-[19%] aspect-square w-[72%]">
          <div
            aria-hidden="true"
            className="absolute -inset-[12%] rounded-full"
            style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 26%, transparent), transparent 62%)' }}
          />
          <div aria-hidden="true" className="orbit-halo" />
          <div aria-hidden="true" className="orbit-ring" />
          <div className="absolute inset-[3.5%] overflow-hidden rounded-full border border-line-strong bg-sunken shadow-[inset_0_0_40px_rgb(0_0_0/0.35)]">
            <Portrait crop="circle" priority />
          </div>
          <span aria-hidden="true" className="absolute top-[6%] right-[13%] size-2.5 rounded-full bg-accent-2 shadow-[0_0_14px_4px_var(--glow-c)]" />
          <span aria-hidden="true" className="absolute bottom-[14%] left-[3%] size-1.5 rounded-full bg-violet shadow-[0_0_12px_3px_var(--violet)]" />
        </div>

        {/* Handschriftliche Zeile */}
        <m.p
          aria-hidden="true"
          style={{ y: taglineY }}
          className="neon-script absolute top-[3%] left-0 z-10 -rotate-[16deg] text-[clamp(1.5rem,4.6vw,2.5rem)]"
        >
          {heroTagline.map((word, i) => (
            <span key={word} className="block" style={{ marginLeft: `${i * 0.55}em` }}>
              {word}
            </span>
          ))}
        </m.p>

        {/* Seitenlabels */}
        <ul
          aria-hidden="true"
          className="absolute top-[4%] right-0 z-10 space-y-1 font-mono text-[0.62rem] font-medium tracking-[0.24em] text-muted uppercase sm:text-[0.68rem]"
        >
          {heroSideLabels.map((label) => (
            <li key={label}>{label}</li>
          ))}
          <li className="!mt-2.5 h-px w-10 bg-gradient-to-r from-accent-2 to-transparent" />
        </ul>
      </div>

      {/* Schwebendes Code-Fenster – auf dem Handy unter dem Foto, ab sm wie bisher darüber */}
      <m.div
        style={{ y: isPhone ? 0 : codeY }}
        className="relative z-10 mx-auto -mt-[4%] mb-5 w-[min(calc(100%-32px),300px)] sm:absolute sm:right-0 sm:bottom-[4%] sm:m-0 sm:w-[min(64%,300px)]"
      >
        <div className="code-window float-y overflow-hidden" aria-hidden="true">
          <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
            <span className="size-2 rounded-full bg-[#ff5f57]" />
            <span className="size-2 rounded-full bg-[#febc2e]" />
            <span className="size-2 rounded-full bg-[#28c840]" />
            <span className="ml-2 font-mono text-[0.62rem] text-dim">mario.ts</span>
          </div>
          <pre className="overflow-hidden px-3 py-3 font-mono text-[clamp(0.56rem,1.5vw,0.72rem)] leading-[1.75] text-fg/90">
            <span className="text-violet">const</span> mario = {'{\n'}
            {'  '}focus: [<span className="text-accent-2">'Web'</span>, <span className="text-accent-2">'KI'</span>],{'\n'}
            {'  '}base: <span className="text-accent-2">'Oranienburg'</span>,{'\n'}
            {'  '}next: <span className="text-accent-2">'Praktikum 01/2027'</span>,{'\n'}
            {'}'}
            <span className="caret ml-1" />
          </pre>
        </div>
      </m.div>
    </m.div>
  )
}
