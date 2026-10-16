/** Weiche Wellenkante zwischen hellen und dunklen Bereichen – nur im Hybrid-Theme sichtbar. */
export function ToneEdge({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      className="tone-edge"
      viewBox="0 0 1440 64"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      style={flip ? { scale: '-1 1' } : undefined}
    >
      <path d="M0 64V38C180 6 360 0 600 22s520 44 840-4v48Z" />
    </svg>
  )
}
