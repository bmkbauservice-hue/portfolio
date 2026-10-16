import { useMemo } from 'react'
import { useTheme } from '../../theme/theme'

// Deterministischer Zufall, damit die Sterne bei jedem Rendern gleich liegen.
function createStars(count: number) {
  let seed = 7
  const rand = () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
  return Array.from({ length: count }, (_, i) => ({
    x: rand() * 1600,
    y: rand() * 1000,
    r: 0.5 + rand() * 1.3,
    group: (['twinkle-a', 'twinkle-b', 'twinkle-c'] as const)[i % 3],
  }))
}

function Starfield() {
  const stars = useMemo(() => createStars(130), [])
  const groups = ['twinkle-a', 'twinkle-b', 'twinkle-c'] as const
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
      {groups.map((g) => (
        <g key={g} className={g} fill="#cfe1ff">
          {stars
            .filter((s) => s.group === g)
            .map((s, i) => (
              <circle key={i} cx={s.x} cy={s.y} r={s.r} />
            ))}
        </g>
      ))}
    </svg>
  )
}

/** Fester, dekorativer Hintergrund. Dark: Sterne + Aurora, Light: weiche Farbflächen, Hybrid: keiner. */
export function BackgroundFx() {
  const { theme } = useTheme()
  if (theme === 'hybrid') return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {theme === 'dark' ? (
        <>
          <div
            className="aurora aurora-1"
            style={{ width: '60vw', height: '50vw', right: '-18vw', top: '-20vw', background: 'rgb(47 139 255 / 0.22)' }}
          />
          <div
            className="aurora aurora-2"
            style={{ width: '50vw', height: '45vw', left: '-22vw', top: '30vh', background: 'rgb(124 92 255 / 0.13)' }}
          />
          <div
            className="aurora aurora-1"
            style={{ width: '40vw', height: '30vw', left: '30vw', bottom: '-18vw', background: 'rgb(34 211 238 / 0.08)' }}
          />
          <Starfield />
        </>
      ) : (
        <>
          <div
            className="aurora aurora-1"
            style={{ width: '55vw', height: '45vw', right: '-15vw', top: '-18vw', background: 'rgb(14 159 181 / 0.14)' }}
          />
          <div
            className="aurora aurora-2"
            style={{ width: '50vw', height: '40vw', left: '-20vw', top: '35vh', background: 'rgb(29 111 224 / 0.1)' }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(rgb(20 50 100 / 0.07) 1px, transparent 1px)',
              backgroundSize: '26px 26px',
              maskImage: 'linear-gradient(to bottom, #000, transparent 70%)',
              WebkitMaskImage: 'linear-gradient(to bottom, #000, transparent 70%)',
            }}
          />
        </>
      )}
    </div>
  )
}
