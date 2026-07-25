import type { ReactNode } from 'react'
import { Box } from '../../design-system'
import styles from './Badge.module.css'

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'neutral' | 'info'

export interface BadgeProps {
  variant?: BadgeVariant
  children: ReactNode
}

export default function Badge({ variant = 'neutral', children }: BadgeProps) {
  return (
    <Box className={[styles.badge, styles[variant]].join(' ')}>{children}</Box>
  )
}
