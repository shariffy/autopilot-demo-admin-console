import type { ChangeEvent } from 'react'
import { Box, TextInput } from '../../design-system'
import styles from './SearchInput.module.css'

export interface SearchInputProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Search…',
}: SearchInputProps) {
  return (
    <Box className={styles.wrapper}>
      <span className={styles.icon} aria-hidden="true">
        {/* Inline SVG keeps icon dependency-free */}
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <circle
            cx="6.5"
            cy="6.5"
            r="4.5"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M10 10L13.5 13.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <TextInput
        type="search"
        className={styles.input}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={placeholder}
      />
    </Box>
  )
}
