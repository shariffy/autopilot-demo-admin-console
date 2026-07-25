import type { ReactNode } from 'react'
import { Button } from '../../design-system'
import styles from './SortableHeaderCell.module.css'

export type SortDirection = 'asc' | 'desc' | null

export interface SortableHeaderCellProps {
  children: ReactNode
  direction: SortDirection
  onSort: () => void
}

export function SortableHeaderCell({
  children,
  direction,
  onSort,
}: SortableHeaderCellProps) {
  const ariaSort: 'ascending' | 'descending' | 'none' =
    direction === 'asc'
      ? 'ascending'
      : direction === 'desc'
        ? 'descending'
        : 'none'

  const buttonCls = [styles.button, direction !== null ? styles.active : '']
    .filter(Boolean)
    .join(' ')

  return (
    <th className={styles.th} aria-sort={ariaSort}>
      <Button className={buttonCls} onClick={onSort} type="button">
        <span>{children}</span>
        <span className={styles.indicator} aria-hidden="true">
          {direction === 'asc' ? '↑' : direction === 'desc' ? '↓' : '↕'}
        </span>
      </Button>
    </th>
  )
}
