# 2. Products page: sortable Name and Price column headers

Date: 2026-07-24

Status: Accepted

## Context

The PostHog 30-day export (snapshot dated 2026-07-22) shows a clear and
concentrated signal on the Products page that is absent on every other page:

**Column header clicks (30 days)**
| Column   | Clicks |
|----------|--------|
| Price    | 3,940  |
| Name     | 2,150  |
| SKU      |    64  |
| Category |    51  |
| Status   |    38  |
| **Total**| **6,243** |

Price and Name together account for 6,090 of 6,243 header clicks — **97.5%**
— even though both headers are plain `<th>` text today and clicking them does
nothing. The Users page, by contrast, recorded only 202 header clicks in the
same period with no equivalent concentration.

**Search-box sort-intent queries (top terms, 30 days)**
Users are typing sort/ordering intent into the product search box, which is
a text match and cannot satisfy that intent. These are the notable zero- or
near-zero-result queries:

| Query              | Count |
|--------------------|-------|
| cheapest           |  310  |
| under 50           |  265  |
| lowest price       |  190  |
| highest price      |  175  |
| price low to high  |  120  |
| most expensive     |   84  |
| a-z                |   62  |
| alphabetical       |   59  |
| z-a                |   41  |

**In-app feedback (30 days)**
47 feedback submissions from the Products page; 42 explicitly ask for sort
capability, most naming price or name specifically. Representative verbatims:

> "Can you let us sort the products table by name? Clicking the header does
> nothing right now."

> "Please add sorting to the product list, at least by price. I click the
> Price column constantly out of habit from every other admin tool."

> "We manage ~200 SKUs and re-sort them in a spreadsheet after exporting
> because there's no way to sort by price here."

> "Add a sort control for the products list — price ascending/descending and
> name A-Z would cover most of what I need."

The signal is narrow, consistent, and self-corroborating across three
independent event types (autocaptured clicks, typed search queries, and
free-text feedback). It points at exactly two columns.

## Decision

Make the **Name** and **Price** column headers in the Products table
interactive sort controls. All other headers (SKU, Category, Status) remain
static — the sensor shows no meaningful demand for sorting on those columns.

Specifics:

- A new `SortableHeader` component (`src/components/SortableHeader.tsx`)
  renders a `<th>` containing a `<button>` that shows the column label, a
  directional indicator (↕ inactive, ↑ asc, ↓ desc), and an accessible
  `aria-label` describing the current state.
- Sort state — `sort=name|price` and `dir=asc|desc` — lives in the URL
  search params via `useSearchParams`. This means the sorted view is
  bookmarkable and survives page refresh, consistent with how the search
  query (`q=`) already works.
- Clicking an inactive header sets it as the active sort in ascending order.
  Clicking the active header toggles between ascending and descending.
- The sort is applied client-side in `ProductsPage` **after** `getProducts()`
  returns the filtered list. The data layer (`src/data/index.ts`) is not
  touched.
- Setting a new sort preserves the existing `q=` param; setting a new search
  query preserves the existing sort params. The two controls compose.
- Inline styles are used in `SortableHeader` because `src/index.css` is
  outside the maintenance reach boundary, and extracting a separate CSS file
  for a single small component would be disproportionate.

## Options considered

- **Sort only in the data layer (`getProducts` gains sort params).** Rejected:
  sorting is a presentation concern here — the data layer's job is filtered
  retrieval from the fixture, and mixing sort into it complicates the
  separation the ADR 0001 data layer was designed around.
- **Sort controls as a separate dropdown/select above the table.** Rejected:
  the sensor signal is specifically about column header clicks (6,090 of them);
  what users expect is the standard table sort affordance, not a separate
  widget. Adding a dropdown and leaving the headers inert would satisfy the
  intent but ignore the learned behaviour.
- **Sort all five columns.** Rejected: the sensor shows demand only for Name
  and Price. Making SKU, Category, and Status sortable adds UI noise for
  zero-evidenced benefit.
- **Session/local-storage for sort state.** Rejected: URL params are already
  the app's persistence mechanism for transient view state (`q=` for search),
  are shareable, and require no new dependency.

## Consequences

- The Name and Price headers are now interactive, responding to the 6,090
  frustrated clicks the sensor recorded.
- Sort intent typed into the search box (e.g. "cheapest", "a-z") will no
  longer be the only recourse — users can click the header directly.
- Sort state is bookmarkable and composable with text search.
- No changes to `src/data/`, `src/types.ts`, `src/App.tsx`, or any other
  frozen file.
- The Users page is deliberately left unchanged — the sensor shows no
  equivalent demand there.
