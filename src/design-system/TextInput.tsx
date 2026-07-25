import type { InputHTMLAttributes } from 'react'

export type TextInputProps = InputHTMLAttributes<HTMLInputElement>

/** Raw text-input primitive. No styling — consumed by the ui layer. */
export function TextInput(props: TextInputProps) {
  return <input {...props} />
}
