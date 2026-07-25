import type { InputHTMLAttributes } from 'react'
import { Box, TextInput } from '../../design-system'
import styles from './Input.module.css'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({ label, error, id, className, ...rest }: InputProps) {
  const inputCls = [styles.input, error ? styles.hasError : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <Box className={styles.wrapper}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <TextInput id={id} className={inputCls} {...rest} />
      {error && <span className={styles.error}>{error}</span>}
    </Box>
  )
}
