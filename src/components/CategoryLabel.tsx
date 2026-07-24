import { getCategories } from '../data'

// Resolved once at module load — the catalogue is a static fixture so this is
// safe and avoids re-calling getCategories() on every render.
const categories = getCategories()

interface CategoryLabelProps {
  /** Foreign key into the category catalogue. May not resolve — see types.ts. */
  categoryId: string
  /** Free-text fallback rendered when categoryId has no matching catalogue entry. */
  fallback: string
}

/**
 * Renders the catalogue label for a product's categoryId, falling back to the
 * free-text `fallback` value when the id has no matching entry.  Uses optional
 * chaining (`?.`) so an unresolved lookup produces `undefined`, not a throw,
 * and nullish coalescing (`??`) selects the fallback in that case.
 */
export function CategoryLabel({ categoryId, fallback }: CategoryLabelProps) {
  const label = categories.find((c) => c.id === categoryId)?.label ?? fallback
  return <>{label}</>
}
