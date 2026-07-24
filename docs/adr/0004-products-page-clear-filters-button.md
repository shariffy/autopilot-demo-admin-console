# 4. Products page: "Clear filters" button in the toolbar

Date: 2026-07-24

Status: Accepted

## Context

ADR 0002 introduced a text search box (`q=`) and sortable Name/Price column
headers (`sort=`, `dir=`) on the Products page, both persisted as URL search
params so they compose and are bookmarkable.

The composability creates a reset problem: once a user has both typed a query
**and** activated a sort, returning to the default view requires two separate
actions:

1. Clear the text in the search box.
2. Return the sort to its neutral state — but there is no "off" click on a
   sort header; the header only cycles asc → desc → asc. The neutral state
   is not reachable from the header alone once a sort is active.

The observation logged on 2026-07-24 describes this friction directly and
asks for a single-click escape hatch in the toolbar.

## Decision

Add a **"Clear filters" button** to the Products page toolbar, rendered
immediately after the search `TextInput` inside the `Card`'s `actions` slot.

Specifics:

- Implemented as the design system's `Button` component with
  `variant="secondary"`, imported from `../design-system`. No raw
  `<button>` elements; no inline styles.
- The button is **conditionally rendered** — it appears only when at least
  one filter is active (`query !== ''` or `sortKey !== null`). When the view
  is already in its default state the toolbar shows nothing extra.
- Clicking the button calls `setParams(new URLSearchParams())`, which drops
  all three params (`q`, `sort`, `dir`) at once and returns the URL — and
  therefore the table — to its unfiltered, unsorted default.
- The change is confined to `src/pages/ProductsPage.tsx`. The `Button`
  import is added to the existing `../design-system` import line; no new
  files are needed.

## Options considered

- **Separate "Clear search" and "Clear sort" controls.** Rejected: the
  observation specifically asks for a single-action reset. Two buttons would
  reproduce the two-step problem in a different form.
- **Always-visible "Reset" button (even when no filters active).** Rejected:
  a button that does nothing when no filters are set is confusing. Hiding it
  when redundant keeps the toolbar clean and makes its appearance itself a
  signal that something is active.
- **Clear-icon (×) inside the search input.** Rejected: this would only clear
  the text query, not the sort state, so it doesn't solve the two-step
  problem. The `TextInput` primitive does not expose an internal clear
  affordance, and forking it is outside reach.
- **Reset via a URL link (`<Link to="?">`) rather than a button.** Rejected:
  the design system's `Button` is the sanctioned interactive control; `<a>`
  is explicitly linted against in staged UI files.

## Consequences

- Users can return to the default Products view in a single click regardless
  of which combination of search and sort filters is active.
- The "Clear filters" button is invisible when there is nothing to clear,
  so the toolbar does not gain permanent visual weight.
- No changes to `src/data/`, `src/types.ts`, `src/App.tsx`,
  `src/design-system/`, or any other frozen file.
- The Users page is unaffected.
