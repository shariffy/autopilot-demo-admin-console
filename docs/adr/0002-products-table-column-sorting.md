# ADR 0002 — Clickable column sorting on the Products table

**Status:** Accepted  
**Date:** 2026-07-25

---

## Observation (sensor signal)

PostHog export for admin-console (prod), 2026-06-22 → 2026-07-22:

| Signal | Count |
|---|---|
| Products page views | 8,412 |
| Products table header clicks — total | 6,243 |
| … Name header clicks | 2,150 |
| … Price header clicks | 3,940 |
| … SKU / Category / Status combined | 153 |
| Products page in-app feedback submissions | 47 |
| … explicitly mentioning sort / ordering | 42 |

97.5 % of all header clicks landed on Name or Price. Those headers are plain `<th>` text; clicking them does nothing.

Users are also typing sort-intent queries into the search box — "cheapest", "lowest price", "a-z", "alphabetical", "most expensive", "price low to high" — that match no product names or SKUs and return 0 results. These queries appear hundreds of times each in the 30-day window. The feedback verbatims include statements like *"We manage ~200 SKUs and re-sort them in a spreadsheet after exporting"* and *"I click the Price column constantly out of habit from every other admin tool."*

---

## Decision

Add client-side click-to-sort on the **Name** and **Price** columns of the Products table. All other columns (SKU, Category, Status, Created) stay as inert `TableHeaderCell` elements — their combined header-click count (153) is negligible and adding sort to every column would dilute the affordance without proportionate benefit.

Sort state cycles: **no sort → ascending → descending → no sort** (returns to fixture order). Default: no sort (fixture order preserved until the user acts).

---

## Implementation

A new `SortableHeaderCell` component is introduced in `src/components/ui/`. It composes the design-system `Button` primitive inside a `<th>` element, carrying:

- The same typographic treatment as `TableHeaderCell` (uppercase, xs, secondary colour) — visually consistent but with pointer cursor and hover feedback.
- An `aria-sort` attribute on the `<th>` for screen-reader semantics.
- A small sort indicator glyph (↕ / ↑ / ↓) whose opacity signals idle / active state.

`ProductsPage` holds the sort state (`sortColumn`, `sortDirection`) as local `useState`. After the existing search filter is applied, the filtered array is spread and sorted before rendering. The fixture array is never mutated.

---

## Options considered

| Option | Outcome |
|---|---|
| **Extend `TableHeaderCell` with optional sort props** | Rejected. `TableHeaderCell` is used on the Users page, which has no equivalent click signal. Adding optional props risks accidentally making Users headers look interactive. A separate component is clearer. |
| **Sort all six columns** | Rejected. SKU/Category/Status/Created account for only 153 header clicks across 30 days. The analytics signal is specifically about Name and Price. Over-sorting adds visual noise. |
| **Server-side / URL-param sort** | Deferred. There is no backend (fixture data only). URL params can be added later once an API exists, at which point they can replace the local state with no change to the component contract. |
| **Sort by all columns via a separate `<Select>` control** | Rejected. The user behaviour (clicking column headers) is already expressing the intended affordance. Meeting them where they are (making headers clickable) is the least-friction fix. |

---

## What stays unchanged

- `src/data/products.ts` — fixture data contract untouched.
- `src/types/index.ts` — domain types untouched.
- `src/components/ui/Table.tsx` — existing `TableHeaderCell` untouched; the two pages share it as-is.
- Users page — no sort added (Users table header clicks: 202 across 30 days vs 6,243 on Products; no equivalent feedback signal).
