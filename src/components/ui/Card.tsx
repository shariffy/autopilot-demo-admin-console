import type { ReactNode } from 'react'
import { Box } from '../../design-system'
import styles from './Card.module.css'

export interface CardProps {
  children: ReactNode
  /** When false, no internal padding — use for tables that need full-bleed rows. */
  padding?: boolean
  className?: string
}

export default function Card({ children, padding = true, className }: CardProps) {
  const cls = [styles.card, padding ? styles.padded : '', className]
    .filter(Boolean)
    .join(' ')
  return <Box className={cls}>{children}</Box>
}
