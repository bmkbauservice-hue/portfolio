import type { PreviewKind } from '../../../data/portfolio'
import { CallFlowPreview } from './CallFlowPreview'
import { DashboardPreview } from './DashboardPreview'
import { GalleryPreview } from './GalleryPreview'
import { TerminalPreview } from './TerminalPreview'
import { TravelPreview } from './TravelPreview'
import { YachtPreview } from './YachtPreview'

export function ProjectPreview({ kind, large = false }: { kind: PreviewKind; large?: boolean }) {
  switch (kind) {
    case 'terminal':
      return <TerminalPreview large={large} />
    case 'dashboard':
      return <DashboardPreview />
    case 'callflow':
      return <CallFlowPreview />
    case 'yacht':
      return <YachtPreview />
    case 'gallery':
      return <GalleryPreview />
    case 'travel':
      return <TravelPreview />
  }
}
