import type { ReactNode } from 'react'
import './styles.css'

export interface CardProps {
  title?: ReactNode
  actions?: ReactNode
  children: ReactNode
}

/**
 * The sanctioned panel/section container. Pages compose their content inside
 * a `Card` rather than hand-rolling a `<section className="panel">` — the
 * layout, border, and spacing tokens live here, once.
 */
export function Card({ title, actions, children }: CardProps) {
  return (
    <section className="ds-card">
      {(title || actions) && (
        <div className="ds-card-head">
          {title && <h2 className="ds-card-title">{title}</h2>}
          {actions && <div className="ds-card-actions">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  )
}
