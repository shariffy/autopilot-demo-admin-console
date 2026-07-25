import type { HTMLAttributes, ReactNode } from 'react'

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

/** Generic block container primitive. No styling — pass className for all decoration. */
export function Box({ children, ...rest }: BoxProps) {
  return <div {...rest}>{children}</div>
}
