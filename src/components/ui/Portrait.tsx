import { person } from '../../data/portfolio'
import portraitCard from '../../assets/portrait-card.webp'
import portraitCircle from '../../assets/portrait-circle.webp'

// Echtes Foto aus referenz/portrait.jpg – nur zugeschnitten und skaliert (quadratisch & 4:5).
const sources = {
  circle: { src: portraitCircle, width: 640, height: 640 },
  card: { src: portraitCard, width: 640, height: 800 },
}

interface PortraitProps {
  crop: keyof typeof sources
  className?: string
  priority?: boolean
}

export function Portrait({ crop, className = '', priority = false }: PortraitProps) {
  const { src, width, height } = sources[crop]
  return (
    <img
      src={src}
      width={width}
      height={height}
      alt={person.portraitAlt}
      className={`h-full w-full object-cover ${className}`}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
    />
  )
}
