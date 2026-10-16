import type { TechIconId } from '../../data/portfolio'
import type { ReactNode } from 'react'

// Vereinfachte, selbst gezeichnete Technologie-Symbole (24×24).
const icons: Record<TechIconId, ReactNode> = {
  react: (
    <g fill="none" stroke="#38bdf8" strokeWidth="1.2">
      <ellipse cx="12" cy="12" rx="10" ry="3.9" />
      <ellipse cx="12" cy="12" rx="10" ry="3.9" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="3.9" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.9" fill="#38bdf8" stroke="none" />
    </g>
  ),
  typescript: (
    <g>
      <rect x="2" y="2" width="20" height="20" rx="3.5" fill="#3178c6" />
      <text x="18.6" y="18.8" textAnchor="end" fontFamily="Sora, sans-serif" fontWeight="800" fontSize="9.5" fill="#fff">
        TS
      </text>
    </g>
  ),
  javascript: (
    <g>
      <rect x="2" y="2" width="20" height="20" rx="3.5" fill="#f7df1e" />
      <text x="18.6" y="18.8" textAnchor="end" fontFamily="Sora, sans-serif" fontWeight="800" fontSize="9.5" fill="#1a1a1a">
        JS
      </text>
    </g>
  ),
  python: (
    <g>
      <path
        fill="#3b82c4"
        d="M11.9 2c-5 0-4.7 2.2-4.7 2.2v2.3H12v.7H5.3S2 6.8 2 11.9s2.9 4.9 2.9 4.9h1.7v-2.4s-.1-2.9 2.8-2.9h4.8s2.7.1 2.7-2.6V4.6S17.3 2 11.9 2Zm-2.7 1.6a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Z"
      />
      <path
        fill="#f5c518"
        transform="rotate(180 12 12)"
        d="M11.9 2c-5 0-4.7 2.2-4.7 2.2v2.3H12v.7H5.3S2 6.8 2 11.9s2.9 4.9 2.9 4.9h1.7v-2.4s-.1-2.9 2.8-2.9h4.8s2.7.1 2.7-2.6V4.6S17.3 2 11.9 2Zm-2.7 1.6a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Z"
      />
    </g>
  ),
  node: (
    <g>
      <path d="M12 1.8 21 7v10l-9 5.2L3 17V7z" fill="none" stroke="#5fa04e" strokeWidth="1.6" strokeLinejoin="round" />
      <text x="12" y="15.2" textAnchor="middle" fontFamily="Sora, sans-serif" fontWeight="800" fontSize="7.5" fill="#5fa04e">
        JS
      </text>
    </g>
  ),
  dotnet: (
    <g>
      <path d="M12 1.8 21 7v10l-9 5.2L3 17V7z" fill="#6b4fd8" />
      <text x="12" y="15.3" textAnchor="middle" fontFamily="Sora, sans-serif" fontWeight="800" fontSize="7.5" fill="#fff">
        C#
      </text>
    </g>
  ),
  postgresql: (
    <g fill="none" stroke="#5b8fd6" strokeWidth="1.5">
      <ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" fill="#5b8fd6" fillOpacity=".2" />
      <path d="M4.5 5.5v13c0 1.6 3.4 2.8 7.5 2.8s7.5-1.2 7.5-2.8v-13" />
      <path d="M4.5 12c0 1.6 3.4 2.8 7.5 2.8s7.5-1.2 7.5-2.8" />
    </g>
  ),
  docker: (
    <g>
      <g fill="#2496ed">
        <rect x="4.5" y="9" width="2.8" height="2.5" rx=".4" />
        <rect x="7.8" y="9" width="2.8" height="2.5" rx=".4" />
        <rect x="11.1" y="9" width="2.8" height="2.5" rx=".4" />
        <rect x="14.4" y="9" width="2.8" height="2.5" rx=".4" />
        <rect x="7.8" y="6" width="2.8" height="2.5" rx=".4" />
        <rect x="11.1" y="6" width="2.8" height="2.5" rx=".4" />
        <rect x="11.1" y="3" width="2.8" height="2.5" rx=".4" />
      </g>
      <path
        fill="#2496ed"
        d="M2 12.4h18.2c.8 0 1.5-.6 1.8-1.3.5.2 1.2.7 1.2.7s-.5 1.6-2.3 1.9C19.6 17.6 15.8 21 10 21c-5.3 0-7.6-3.8-8-8.6Z"
      />
    </g>
  ),
  n8n: (
    <g fill="none" stroke="#ea4b71" strokeWidth="1.6">
      <circle cx="4.5" cy="12" r="2.3" />
      <circle cx="12" cy="12" r="2.3" />
      <circle cx="19.5" cy="6.5" r="2.3" />
      <circle cx="19.5" cy="17.5" r="2.3" />
      <path d="M6.8 12h2.9M14.3 12c2 0 1.7-5.5 2.9-5.5M14.3 12c2 0 1.7 5.5 2.9 5.5" />
    </g>
  ),
  linux: (
    <g>
      <ellipse cx="12" cy="14" rx="6.4" ry="7.5" fill="#1e293b" stroke="#94a3b8" strokeWidth=".9" />
      <ellipse cx="12" cy="15.4" rx="4.1" ry="5.4" fill="#f1f5f9" />
      <circle cx="10.3" cy="9.1" r="1" fill="#f1f5f9" />
      <circle cx="13.7" cy="9.1" r="1" fill="#f1f5f9" />
      <circle cx="10.4" cy="9.2" r=".45" fill="#0f172a" />
      <circle cx="13.6" cy="9.2" r=".45" fill="#0f172a" />
      <path d="M10.6 10.8h2.8L12 12.3z" fill="#f59e0b" />
      <ellipse cx="8.6" cy="21.4" rx="2.6" ry="1.1" fill="#f59e0b" />
      <ellipse cx="15.4" cy="21.4" rx="2.6" ry="1.1" fill="#f59e0b" />
    </g>
  ),
  git: (
    <g>
      <rect x="4.3" y="4.3" width="15.4" height="15.4" rx="2.6" transform="rotate(45 12 12)" fill="#f05032" />
      <g stroke="#fff" strokeWidth="1.5" strokeLinecap="round" fill="none">
        <path d="M9.6 7.4 14.2 12M10.4 9v6.8" />
      </g>
      <g fill="#fff">
        <circle cx="10.4" cy="9" r="1.4" />
        <circle cx="10.4" cy="15.8" r="1.4" />
        <circle cx="14.3" cy="12.1" r="1.4" />
      </g>
    </g>
  ),
}

export function TechIcon({ id, className = 'size-8' }: { id: TechIconId; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      {icons[id]}
    </svg>
  )
}
