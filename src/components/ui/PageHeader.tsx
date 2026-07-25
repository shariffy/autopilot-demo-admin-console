import type { ReactNode } from 'react'
import { Box } from '../../design-system'
import styles from './PageHeader.module.css'

export interface PageHeaderProps {
  title: string
  subtitle?: string
  action?: ReactNode
}

export default function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <Box className={styles.header}>
      <Box className={styles.text}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </Box>
      {action && <Box className={styles.action}>{action}</Box>}
    </Box>
  )
}
