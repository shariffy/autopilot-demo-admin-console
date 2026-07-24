# 2. Safe category-label lookup with free-text fallback

Date: 2026-07-24

Status: Accepted

## Context

The CloudWatch sensor captured a 18.3% error rate against a 2% SLO ceiling
in the 09:00–09:15 UTC window on 2026-07-24, triggered by commit
`52ab4197` ("Display each product's category via the category catalogue
lookup"). Every request to `/products` that included `p-2008` ("Custom
Integration", `categoryId: "cat-integration"`) crashed with:

```
TypeError: Cannot read properties of undefined (reading 'label')
```

The root cause: `categories.find(c => c.id === product.categoryId).label`
assumed the lookup always resolves. The product `p-2008` carries a `categoryId`
of `"cat-integration"`, which has no matching entry in the catalogue
(`categories.json` contains only `cat-subscription`, `cat-service`,
`cat-addon`). The type contract in `types.ts` explicitly documents this
possibility:

> "Not every product's `categoryId` is guaranteed to resolve: a category can
> be retired or renamed while a product still carries its old id — callers must
> handle a missing lookup, not assume it always resolves."

The runtime envelope caught the error-rate breach and reverted the deploy,
leaving the Products page falling back to `product.category` (the pre-existing
free-text field) with no catalogue lookup at all. The ask is to re-implement
the catalogue lookup safely, so that:

- Products whose `categoryId` resolves display the canonical catalogue label.
- Products whose `categoryId` does not resolve degrade gracefully — never throw.

## Decision

Introduce a `CategoryLabel` component (`src/components/CategoryLabel.tsx`)
that encapsulates the lookup with explicit null-safety:

```tsx
const label = categories.find((c) => c.id === categoryId)?.label ?? fallback
```

- `?.label` — optional chaining: if `find` returns `undefined`, the expression
  short-circuits to `undefined` rather than throwing.
- `?? fallback` — nullish coalescing: if the lookup yields `undefined`, render
  the caller-supplied `fallback` instead (in practice, `product.category`, the
  free-text field that already carried a meaningful value — "Service" — for
  `p-2008`).

`ProductsPage` is updated to use `<CategoryLabel categoryId={...} fallback={...} />`
in place of the raw `{product.category}` expression. The catalogue array is
resolved once at module load (the fixture is static), not per render.

`ProductDetailPage` already reads `product.category` directly and is unchanged;
it remains consistent with the fallback that `CategoryLabel` would produce for
any product.

## Options considered

**A — Inline optional chaining in ProductsPage (no new component).**
Would fix the crash but scatters lookup logic without a meaningful abstraction.
The component boundary makes the safe contract explicit and reusable, and the
frozen contract test (`tests/contract/products-render.test.ts`) already
validates rendering at the page level regardless.

**B — Filter out unresolvable products before rendering.**
Hiding a product from the list because its category id is stale is worse than
showing it with a degraded label; the product is still a real, billable item.
Rejected.

**C — Throw an error boundary around the category cell.**
Catches the crash per-row but still drops the category cell silently. Worse UX
than showing the fallback text, and adds complexity. Rejected.

**D — Add `cat-integration` to the fixture.**
Out of reach under Maintenance (`src/data/` is frozen). Even if it were
reachable, the type contract documents that retired/renamed categories are a
permanent real-world possibility; the code must handle it, not the data.

## Consequences

- `p-2008` (and any future product whose `categoryId` is retired or missing)
  renders its free-text `category` value rather than crashing the whole page.
- Products with a resolving `categoryId` display the canonical catalogue label,
  which is the original goal of the feature.
- The `CategoryLabel` component is available for reuse in `ProductDetailPage`
  or elsewhere if a future change wants consistent catalogue-label rendering
  across views.
- The frozen contract test (`tests/contract/products-render.test.ts`) — which
  directly reproduces the production failure path — passes with this change.
