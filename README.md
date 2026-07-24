# Admin Console

> **Built and maintained autonomously by [Autopilot](https://github.com/shariffy/autopilot).**
> `git log` is the record, not this paragraph — read it and every feature commit
> shows the untrusted AI *advisor* as **author** and the trusted *envelope* as
> **committer**, verified against this app's own build before anything landed.
> The history is one continuous run, in order:
>
> 1. **Genesis** — the advisor built the app from nothing: a small admin console
>    over local fixtures. [Write-up](https://github.com/shariffy/autopilot/blob/main/docs/runs/0001-first-light.md).
> 2. **Autonomous maintenance** — reading a product-analytics signal, the advisor
>    added sortable Name/Price columns, unprompted by a human ask.
> 3. **A self-healing incident** — a later change built green but crashed at
>    runtime; the trusted core caught it in production with **no model
>    involved** (a telemetry-triggered `git revert`), then the advisor landed a
>    durable fix gated by a reproducer test it could not itself author.
>    [ADR 0011](https://github.com/shariffy/autopilot/blob/main/docs/adr/0011-the-runtime-envelope-and-the-frozen-oracle.md).
> 4. **Design governance** — the envelope began rejecting ad-hoc UI, so the
>    advisor's next feature composed only from a sanctioned design system.
>    [ADR 0012](https://github.com/shariffy/autopilot/blob/main/docs/adr/0012-the-design-system-invariant.md).
>
> A handful of commits are the operator's, not the agent's — attributed as such
> in `git log`, and each doing only what the agent structurally cannot: the
> initial lockfile (the envelope computes lockfiles but never authors them),
> seeding a test harness and a design system as trusted starting infrastructure
> (like the app's API contract), and this file.

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
npm test         # vitest — includes the frozen contract reproducer
```

## Layout

- `src/data/` — fixtures (`users.json`, `products.json`, `categories.json`) and
  the data-access module. The UI depends only on the functions here, so
  replacing fixtures with a real API later is a change confined to this folder.
- `src/pages/` — routed pages (lists, details, home, not-found).
- `src/components/` — shared UI (layout, search bar, status badge, category
  label, sortable column header).
- `src/design-system/` — the sanctioned UI primitives (`Button`, `TextInput`,
  `Card`, `Badge`). The envelope rejects staged UI that doesn't compose from
  these (ADR 0012 in the system repo).
- `tests/contract/` — frozen reproducer tests: the correctness oracle for a
  runtime fix, seeded from telemetry, never agent-authored (ADR 0011).
- `docs/adr/` — this app's own append-only decision record, written by
  whichever party (advisor or operator) made the decision.
- `src/types.ts` — the `User` and `Product` domain model.
