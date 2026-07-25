# ADR 0003 — Safe vendor label on the Products page

**Status:** Accepted  
**Date:** 2026-07-25

---

## Observation (sensor signal)

CloudWatch export — log group `/prod/zynthar-admin/frontend-errors`,
30-minute window ending 2026-07-25T14:45:00Z:

| Metric | Value |
|---|---|
| Error rate on `/products` | **18.3 %** |
| Alarm threshold | 2 % |
| Unique occurrences in window | 214 |
| Affected product | `p008` (`vendorId: "v-summit"`) |

Every occurrence was the same `TypeError`:

```
TypeError: Cannot read properties of undefined (reading 'name')
  component: ProductsPage
  route:     /products
```

The runtime envelope detected the breach, reverted the deploy to the last
green commit (the commit before the vendor-lookup change was introduced),
and stamped the action as a `git revert`. The Products page in the current
workspace therefore has **no vendor column** — the lookup was removed
entirely by the revert, not made safe.

---

## Root cause

The prior implementation resolved a vendor by calling
`vendors.find(v => v.id === product.vendorId)` and then immediately reading
`.name` off the result. `Array.prototype.find` returns `undefined` when no
element satisfies the predicate; reading `.name` on `undefined` throws.

`p008` carries `vendorId: "v-summit"`. The vendor catalogue
(`src/data/vendors.ts`) contains four entries (`v-internal`, `v-northgate`,
`v-lucid`, `v-fernhollow`) — `v-summit` is not among them. Every Products
page render that included `p008` (i.e. all of them, since `p008` is in the
active fixture set) threw before the component could return any JSX.

---

## Decision

Re-implement the vendor label column on the Products page with an explicit
existence guard before any property access:

```ts
const vendor = vendors.find((v) => v.id === vendorId)
if (vendor) return <>{vendor.name}</>
return <Badge variant="neutral">Unknown vendor</Badge>
```

`.name` is only accessed when `vendor` is confirmed truthy. A product whose
`vendorId` does not resolve to a catalogue entry renders a neutral `Badge`
labelled **"Unknown vendor"**, which is:

- **Visible** — operators can see at a glance that data is inconsistent.
- **Non-throwing** — the page continues to render all other rows correctly.
- **Distinct** — `Badge` variant `neutral` is the same visual treatment
  already used for `discontinued` status, so it reads as "something to
  investigate" without being alarmist.

The lookup and fallback are encapsulated in a small co-located function
component (`VendorCell`) inside `ProductsPage.tsx`. It is not exported;
if the detail page later needs vendor display, the pattern should be
extracted to `src/components/ui/` at that point.

---

## Options considered

| Option | Outcome |
|---|---|
| **Optional-chain: `vendor?.name ?? 'Unknown vendor'`** | Correct and safe. Rejected in favour of the explicit `if` guard because the guard also gates the Badge fallback JSX without a second ternary, keeping the component body linear and easier to review in future. |
| **Fix the data (add `v-summit` to the catalogue)** | Rejected. `src/data/` is the frozen fixture/data contract; we cannot add entries there. Even if we could, the correct approach is defensive code — the data and the catalogue can diverge, and the UI should always be safe regardless. |
| **Filter `p008` out of the rendered list** | Rejected. Hiding data silently is worse than showing a clear fallback; operators need to see that the product exists and that its vendor is unresolved. |
| **Crash boundary (React `ErrorBoundary`)** | A boundary would catch the throw but show a degraded page for all users, not just `p008`. A targeted guard is a better fit for a single bad row. |
| **Show raw `vendorId` string as fallback** | Considered. Raw ID (`v-summit`) conveys more diagnostic detail than "Unknown vendor". Rejected for the Products list view where operators expect names, not IDs — the ID is more appropriate in a detail or debug view. |

---

## What stays unchanged

- `src/data/products.ts` — fixture data, including `p008`, untouched.
- `src/data/vendors.ts` — catalogue untouched (and frozen).
- `src/types/index.ts` — domain types untouched.
- `src/App.tsx` — no new routes.
- Users page — no changes.
- All other Products page behaviour (search, sort, navigation) — unchanged.
