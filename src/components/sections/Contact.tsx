import { Info, Mail, MapPin, Send } from 'lucide-react'
import { useId, useState, type FormEvent } from 'react'
import { contact, links, person } from '../../data/portfolio'
import { Mountains } from '../effects/Mountains'
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons'
import { CopyButton } from '../ui/CopyButton'
import { Reveal } from '../ui/Reveal'
import { ToneEdge } from '../ui/ToneEdge'

export function Contact() {
  return (
    <section id="kontakt" data-tone="light" aria-labelledby="kontakt-title" className="tone-section section overflow-x-clip">
      <ToneEdge flip />
      <div className="container-x">
        <Reveal>
          <div
            data-tone="dark"
            className="contact-band relative isolate overflow-hidden rounded-[28px] border border-line-strong px-5 pt-10 pb-28 sm:px-10 sm:pt-12 lg:px-14 lg:pb-32"
          >
            <Mountains className="absolute inset-x-0 bottom-0 -z-10 h-[150px] w-full sm:h-[190px]" />
            <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-12">
              <div className="min-w-0">
                <p className="eyebrow">{contact.eyebrow}</p>
                <h2 id="kontakt-title" className="mt-3 text-[clamp(1.7rem,3.6vw,2.6rem)] leading-[1.12] font-bold">
                  {contact.heading}
                </h2>
                <p className="mt-4 max-w-[52ch] leading-relaxed text-muted">{contact.text}</p>
              </div>

              <div className="min-w-0 space-y-4">
                <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-line-strong bg-sunken/80 p-3 pl-4 backdrop-blur">
                  <Mail size={18} className="flex-none text-accent-2" aria-hidden="true" />
                  <a
                    href={`mailto:${links.email}`}
                    className="flex-1 font-mono text-[0.92rem] whitespace-nowrap hover:text-ink"
                  >
                    {links.email}
                  </a>
                  <CopyButton value={links.email} />
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href={`mailto:${links.email}`} className="btn btn-primary">
                    <Mail size={17} />
                    E-Mail schreiben
                  </a>
                  <a href={links.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                    <GitHubIcon size={17} />
                    GitHub
                    <span className="sr-only">(öffnet in neuem Tab)</span>
                  </a>
                  {links.linkedin && (
                    <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                      <LinkedInIcon size={17} />
                      LinkedIn
                      <span className="sr-only">(öffnet in neuem Tab)</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <Reveal className="min-w-0">
            <DemoForm />
          </Reveal>
          <Reveal delay={0.08} className="min-w-0">
            <aside className="card h-full p-6 sm:p-7" aria-label="Kurzinfo">
              <p className="eyebrow">Kurz & knapp</p>
              <dl className="mt-5 space-y-4 text-[0.92rem]">
                <div>
                  <dt className="text-dim">Gesucht</dt>
                  <dd className="mt-0.5 font-semibold">
                    Praktikum vom {person.availability.period.replace('–', ' bis ')}
                  </dd>
                </div>
                <div>
                  <dt className="text-dim">Wo</dt>
                  <dd className="mt-0.5 font-semibold">{person.availability.preference}</dd>
                </div>
                <div>
                  <dt className="text-dim">Standort</dt>
                  <dd className="mt-0.5 flex items-center gap-2 font-semibold">
                    <MapPin size={15} className="text-accent-2" aria-hidden="true" />
                    {person.location} · {person.region}
                  </dd>
                </div>
                <div>
                  <dt className="text-dim">Sprachen</dt>
                  <dd className="mt-0.5 font-semibold">{person.languages}</dd>
                </div>
              </dl>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

type Fields = { name: string; email: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>

function validate(values: Fields): Errors {
  const errors: Errors = {}
  if (values.name.trim().length < 2) errors.name = 'Bitte gib deinen Namen an.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = 'Bitte gib eine gültige E-Mail-Adresse an.'
  if (values.message.trim().length < 20) errors.message = 'Die Nachricht sollte mindestens 20 Zeichen lang sein.'
  return errors
}

/** Formular als klar gekennzeichnete Demo: prüft Eingaben, versendet aber nichts. */
function DemoForm() {
  const uid = useId()
  const [values, setValues] = useState<Fields>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [checked, setChecked] = useState(false)

  const update = (key: keyof Fields) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    setChecked(false)
    if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }))
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const next = validate(values)
    setErrors(next)
    const firstInvalid = (Object.keys(next) as (keyof Fields)[])[0]
    if (firstInvalid) {
      document.getElementById(`${uid}-${firstInvalid}`)?.focus()
      setChecked(false)
      return
    }
    setChecked(true)
  }

  const mailto = `mailto:${links.email}?subject=${encodeURIComponent(`Nachricht von ${values.name.trim()}`)}&body=${encodeURIComponent(
    `${values.message.trim()}\n\n${values.name.trim()} · ${values.email.trim()}`,
  )}`

  const field = (key: keyof Fields, label: string, type: 'text' | 'email' | 'textarea', autoComplete?: string) => {
    const id = `${uid}-${key}`
    const errorId = `${id}-error`
    const props = {
      id,
      name: key,
      value: values[key],
      onChange: update(key),
      'aria-invalid': errors[key] ? true : undefined,
      'aria-describedby': errors[key] ? errorId : undefined,
      required: true,
      className: 'field',
      autoComplete,
    }
    return (
      <div className={key === 'message' ? 'sm:col-span-2' : ''}>
        <label htmlFor={id} className="mb-1.5 block text-[0.84rem] font-semibold">
          {label}
        </label>
        {type === 'textarea' ? <textarea {...props} rows={5} className="field min-h-[140px] resize-y" /> : <input {...props} type={type} />}
        {errors[key] && (
          <p id={errorId} className="mt-1.5 text-[0.8rem] font-medium text-[#f87171]">
            {errors[key]}
          </p>
        )}
      </div>
    )
  }

  return (
    <form noValidate onSubmit={onSubmit} className="card p-6 sm:p-7" aria-describedby={`${uid}-notice`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-lg font-semibold">Nachricht schreiben</h3>
        <span className="status" data-kind="development">
          Demo
        </span>
      </div>
      <p
        id={`${uid}-notice`}
        className="mt-4 flex items-start gap-2.5 rounded-xl border border-warn/30 bg-warn/10 px-3.5 py-2.5 text-[0.86rem] font-medium text-warn"
      >
        <Info size={16} className="mt-0.5 flex-none" aria-hidden="true" />
        {contact.formNotice}
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {field('name', 'Name', 'text', 'name')}
        {field('email', 'E-Mail', 'email', 'email')}
        {field('message', 'Nachricht', 'textarea')}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button type="submit" className="btn btn-ghost">
          <Send size={16} />
          Eingaben prüfen
        </button>
        <span className="text-[0.8rem] text-dim">Es wird nichts gesendet oder gespeichert.</span>
      </div>

      <div role="status" aria-live="polite">
        {checked && (
          <div className="mt-5 rounded-xl border border-line-strong bg-sunken p-4 text-[0.9rem]">
            <p className="font-semibold">Eingaben sind vollständig – aber noch nicht gesendet.</p>
            <p className="mt-1 text-muted">
              Der Versand über das Formular ist noch nicht aktiv. Übernimm die Nachricht einfach in dein E-Mail-Programm.
            </p>
            <a href={mailto} className="btn btn-primary btn-sm mt-3">
              <Mail size={15} />
              In E-Mail übernehmen
            </a>
          </div>
        )}
      </div>
    </form>
  )
}
