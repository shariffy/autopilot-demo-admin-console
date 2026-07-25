import type { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
}

/** Raw button primitive. No styling — consumed by the ui layer to add variants. */
export function Button({ children, ...rest }: ButtonBaseProps) {
  return <button {...rest}>{children}</button>
}
