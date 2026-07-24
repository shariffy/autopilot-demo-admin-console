// The design system: the sanctioned building blocks for this app's UI.
//
// Frozen infrastructure, provided like the API contract (`src/api/`) or the
// data contract (`src/data/`) — the envelope's `reach` invariant blocks any
// write here under Maintenance clearance, so pages and components compose
// FROM these primitives but never fork or edit them. The envelope's
// design-conformance stage (`envelope/src/design.rs`) additionally requires
// every staged UI file to import from here, and rejects raw
// `<button>`/`<input>`/`<select>`/`<a>` and inline `style={{...}}` in favour
// of these. See docs/adr/0012-the-design-system-invariant.md in the
// Autopilot system repo.

export { Button } from './Button'
export type { ButtonProps, ButtonVariant } from './Button'

export { TextInput } from './TextInput'
export type { TextInputProps } from './TextInput'

export { Card } from './Card'
export type { CardProps } from './Card'

export { Badge } from './Badge'
export type { BadgeProps, BadgeTone } from './Badge'
