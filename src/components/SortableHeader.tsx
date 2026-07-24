interface SortableHeaderProps {
  label: string
  sortKey: string
  currentSort: string | null
  currentDir: 'asc' | 'desc'
  onSort: (key: string) => void
}

const INDICATOR: Record<string, string> = {
  inactive: '↕',
  asc: '↑',
  desc: '↓',
}

export function SortableHeader({
  label,
  sortKey,
  currentSort,
  currentDir,
  onSort,
}: SortableHeaderProps) {
  const isActive = currentSort === sortKey
  const indicator = isActive ? INDICATOR[currentDir] : INDICATOR.inactive

  return (
    <th>
      <button
        type="button"
        onClick={() => onSort(sortKey)}
        aria-label={
          isActive
            ? `Sort by ${label}, currently ${currentDir === 'asc' ? 'ascending' : 'descending'} — click to reverse`
            : `Sort by ${label}`
        }
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          font: 'inherit',
          cursor: 'pointer',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          fontSize: '0.78rem',
          color: isActive ? '#1f2430' : 'inherit',
          fontWeight: isActive ? 700 : 'inherit',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.3rem',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
        <span
          aria-hidden="true"
          style={{
            fontSize: '0.7rem',
            opacity: isActive ? 1 : 0.4,
          }}
        >
          {indicator}
        </span>
      </button>
    </th>
  )
}
