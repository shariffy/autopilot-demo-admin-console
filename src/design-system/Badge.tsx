import type { ReactNode } from 'react'
import './styles.css'

export type BadgeTone = 'neutral' | 'success' | 'warning' | 'danger'

export interface BadgeProps {
  tone?: BadgeTone
  children: ReactNode
}

/**
 * The sanctioned status/label pill. A tone-based API rather than a free-text
 * status string, so callers cannot smuggle arbitrary styling in through the
 * status value the way the app's original `StatusBadge` does.
 */
export function Badge({ tone = 'neutral', children }: BadgeProps) {
  return <span className={`ds-badge ds-badge-${tone}`}>{children}</span>
}
