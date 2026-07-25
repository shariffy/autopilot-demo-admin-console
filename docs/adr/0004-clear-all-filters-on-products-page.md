# ADR 0004 — Clear all filters action on the Products page

**Status:** Accepted  
**Date:** 2026-07-25

---

## Observation (sensor signal)

Staff reported they regularly combine search text with column sorting on the
Products page and then want to return to the unfiltered, unsorted view. The
current experience requires two separate manual steps:

1. Delete the text in the search box by hand (or triple-click-and-type).
2. Click the active sorted column header twice to cycle it back to its neutral
   state (ascending → descending → neutral), or click the opposite column to
   cancel the active sort.

These steps are independent controls with no shared reset. The ask was a
single action that clears both at once.

---

## State model

`ProductsPage` holds three pieces of local state that together describe the
active filter/sort configuration:

| State variable | Type | Idle value |
|---|---|---|
| `query` | `string` | `''` |
| `sortColumn` | `'name' \| 'price' \| null` | `null` |
| `sortDirection` | `'asc' \| 'desc'` | `'asc'` |

A "clear all" action simply resets all three to their idle values in one
call. No new state is needed.

---

## Decision

Add a **"Clear filters"** button to the existing toolbar on the Products page.
It is conditionally rendered: it only appears when at least one filter is
active (`query !== ''` or `sortColumn !== null`). When clicked it calls
`handleClearFilters`, which sets all three state variables to their idle
values in a single event handler — one click, no intermediate state.

```tsx
const hasActiveFilters = query !== '' || sortColumn !== null

function handleClearFilters() {
  setQuery('')
  setSortColumn(null)
  setSortDirection('asc')
}

// In JSX, inside .toolbar:
{hasActiveFilters && (
  <Button variant="ghost" size="sm" onClick={handleClearFilters}>
    Clear filters
  </Button>
)}
```

The toolbar `div` is updated to `display: flex` with `align-items: center`
and `gap: var(--space-3)` so the search input and button sit on the same
baseline without a separate layout wrapper.

---

## Design choices

**Conditional rendering (hidden when idle).** The button is absent when no
filters are active. Showing a disabled button instead would leave a permanent
element that does nothing most of the time and invites a click that produces
no result. Absence is cleaner than a permanently greyed control.

**`ghost` variant, `sm` size.** The primary action on the toolbar is
_searching_. The reset is a supporting action. Ghost/sm keeps visual weight
proportionate — the button is reachable without competing with the search
field.

**Label "Clear filters".** "Reset" is more ambiguous (reset the whole page?
the form?). "Clear filters" is specific: it tells the user exactly which
controls will be cleared. It matches the phrasing used in the existing
feedback from staff ("clear the search box", "clear the sort").

**Toolbar placement (beside the search input).** The clear action is
semantically bound to the filter controls; placing it in the toolbar keeps it
co-located. Placing it elsewhere (e.g. near the table header) would
disconnect it from the controls it affects.

---

## Options considered

| Option | Outcome |
|---|---|
| **New `ClearFiltersButton` component in `src/components/ui/`** | Rejected. The logic (`hasActiveFilters`, `handleClearFilters`) is entirely local to `ProductsPage` — there is no equivalent pattern on the Users page and no cross-page sharing needed. Extracting a component would just move lines without adding reuse. |
| **Always-visible disabled button when idle** | Rejected. A permanently greyed button adds visual noise on the default (no filter) state, which is the majority of the time for many users. Conditional rendering keeps the idle toolbar uncluttered. |
| **`danger` variant to signal "destructive" action** | Rejected. Clearing filters is not destructive — no data is changed and the filters can be re-applied immediately. `ghost` correctly signals low-stakes. |
| **"Reset" label** | Rejected. Ambiguous for this page. "Clear filters" is explicit and matches the language in the staff feedback. |
| **X icon only (no label)** | Rejected. An unlabelled icon requires tooltip discovery and fails keyboard-only users who rely on button text. A short text label is accessible by default with no extra work. |
| **URL search params instead of local state** | Deferred (as noted in ADR 0002). When an API exists and sort/filter need to survive navigation, local state can be lifted to URL params. The `handleClearFilters` contract (reset to idle values) translates directly to clearing the URL params at that point. |

---

## What stays unchanged

- `src/data/products.ts` — fixture data untouched.
- `src/types/index.ts` — domain types untouched.
- `src/App.tsx` — no new routes.
- `src/components/ui/` — no new or modified primitives; the existing `Button`
  component is used as-is.
- Users page — no changes (no equivalent combined-filter request observed).
- All existing Products page behaviour (search, sort, row navigation, vendor
  label safety) — unchanged.
