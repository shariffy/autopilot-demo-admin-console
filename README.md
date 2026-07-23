# Admin Console

Internal admin console for staff to look up and manage users and products.

This is a standalone single-page app (React + TypeScript + Vite) that reads
from JSON fixtures checked into the repository — no backend or network service
is required to build or run it.

## Scope

- Users: searchable list + detail view.
- Products: searchable list + detail view.

Search is held in the URL (`?q=`), so results are shareable and bookmarkable.
Editing is intentionally out of scope for this first version (see
`docs/adr/0001-admin-console-foundation.md`).

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # typecheck + production bundle
npm run preview  # serve the built bundle
```

## Layout

- `src/data/` — fixtures (`users.json`, `products.json`) and the data-access
  module. The UI depends only on the functions here, so replacing fixtures with
  a real API later is a change confined to this folder.
- `src/pages/` — routed pages (lists, details, home, not-found).
- `src/components/` — shared UI (layout, search bar, status badge).
- `src/types.ts` — the `User` and `Product` domain model.
