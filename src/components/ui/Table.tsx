import type { ReactNode } from 'react'
import { Box } from '../../design-system'
import styles from './Table.module.css'

export function Table({ children }: { children: ReactNode }) {
  return (
    <Box className={styles.wrapper}>
      <table className={styles.table}>{children}</table>
    </Box>
  )
}

export function TableHead({ children }: { children: ReactNode }) {
  return <thead className={styles.thead}>{children}</thead>
}

export function TableBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>
}

export interface TableRowProps {
  children: ReactNode
  onClick?: () => void
  clickable?: boolean
}

export function TableRow({ children, onClick, clickable }: TableRowProps) {
  return (
    <tr
      className={[styles.row, clickable ? styles.clickable : ''].filter(Boolean).join(' ')}
      onClick={onClick !== undefined ? () => onClick() : undefined}
    >
      {children}
    </tr>
  )
}

export function TableHeaderCell({ children }: { children: ReactNode }) {
  return <th className={styles.th}>{children}</th>
}

export function TableCell({ children }: { children: ReactNode }) {
  return <td className={styles.td}>{children}</td>
}
