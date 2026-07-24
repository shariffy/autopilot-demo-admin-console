import type { ButtonHTMLAttributes } from 'react'
import './styles.css'

export type ButtonVariant = 'primary' | 'secondary'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

/**
 * The sanctioned interactive control. Compose this instead of a raw
 * `<button>` — the envelope's design-conformance stage rejects a staged
 * `src/pages/`/`src/components/` file that reaches for one directly.
 */
export function Button({ variant = 'primary', className, type = 'button', ...rest }: ButtonProps) {
  const classes = ['ds-button', `ds-button-${variant}`, className].filter(Boolean).join(' ')
  return <button type={type} className={classes} {...rest} />
}
