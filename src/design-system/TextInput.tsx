import type { InputHTMLAttributes } from 'react'
import './styles.css'

export type TextInputProps = InputHTMLAttributes<HTMLInputElement>

/**
 * The sanctioned text-entry control. Compose this instead of a raw
 * `<input>` — the envelope's design-conformance stage rejects a staged
 * `src/pages/`/`src/components/` file that reaches for one directly.
 */
export function TextInput({ className, type = 'text', ...rest }: TextInputProps) {
  const classes = ['ds-input', className].filter(Boolean).join(' ')
  return <input type={type} className={classes} {...rest} />
}
