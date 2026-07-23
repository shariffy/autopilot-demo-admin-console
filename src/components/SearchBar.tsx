interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <input
      className="search"
      type="search"
      value={value}
      placeholder={placeholder ?? 'Search…'}
      onChange={(event) => onChange(event.target.value)}
      aria-label={placeholder ?? 'Search'}
    />
  )
}
