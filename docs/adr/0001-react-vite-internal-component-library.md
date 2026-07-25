# ADR 0001 — React + Vite SPA with internal UI component library

**Status:** Accepted  
**Date:** 2026-07-25

---

## Context

Three standing observations shape this decision:

1. An internal admin console is needed so staff can look up and manage users and
   products without hand-crafting database queries. Initial scope: searchable list
   views and detail views. Editing deferred.

2. Greenfield, no backend yet. Must read from fixture data checked into the repo,
   build standalone, and verify with `npm run build`.

3. The tool will grow (more screens, different engineers over time). Each new
   screen should use shared building blocks rather than re-derive its own buttons,
   inputs, and cards, so the visual language stays consistent without central
   coordination.

---

## Decision

**Runtime stack:** React 18 + TypeScript 5 + Vite 5 + React Router 6

**Styling:** CSS Modules with CSS custom properties (design tokens in `src/index.css`)

**UI primitives:** A small hand-rolled internal component set under `src/components/ui/`
rather than a third-party library.

---

## Options considered and rejected

| Option | Why rejected |
|---|---|
| **Next.js** | SSR, file-based routing, and the deployment model add complexity for a standalone internal tool. No SEO requirement. A new engineer has more to learn before they can add a screen. |
| **MUI / Chakra UI / shadcn/ui** | Observation 3 specifically asks for an *internal* set of building blocks. Adopting an external library satisfies the short-term list pages but doesn't build the owned visual-language layer that keeps new screens consistent as the team grows and priorities shift. External libraries also lock the tool into update cycles and theming constraints the team doesn't control. |
| **Tailwind CSS** | Utility-first is productive, but components still need to be built on top of it. With no existing codebase to match, plain CSS Modules with design tokens give the same consistency without a JIT compiler dependency; the token-→-class pattern is clearer for engineers unfamiliar with Tailwind. |
| **No framework (plain HTML/JS)** | No component encapsulation means each new screen written by a different engineer drifts visually, exactly what observation 3 wants to prevent. |
| **HashRouter** | BrowserRouter is more conventional; the tool is always served (dev server or `vite preview`), not opened as a bare `file://` URL. |

---

## Component library scope (v1)

| Component | Purpose |
|---|---|
| `Button` | Primary / secondary / ghost / danger variants, sm/md sizes |
| `Input` | Labelled text input with error state |
| `SearchInput` | Icon-decorated search field used on list pages |
| `Card` | Surface container; `padding` prop controls bleed (false for tables) |
| `Badge` | Inline status chip: success / warning / danger / neutral / info |
| `Table` + family | `TableHead`, `TableBody`, `TableRow`, `TableHeaderCell`, `TableCell` |
| `PageHeader` | Title + optional subtitle + optional action slot |
| `Shell` (layout) | Sidebar navigation + main content area |

All design tokens (colours, spacing, radii, shadows, type scale) live in CSS custom
properties in `src/index.css` and are consumed by every module. New components
automatically inherit the visual system.

---

## Build plan (changeset sequence)

1. **Bootstrap** — package.json, tsconfig, vite config, entry point, global CSS, placeholder App
2. **Internal UI components** — all primitives listed above + Shell layout
3. **Fixture data + domain types** — 15 fictional users, 15 fictional products
4. **Users feature** — searchable list + detail view, routing wired
5. **Products feature** — searchable list + detail view, full routing

---

## What is intentionally deferred

- Editing / mutation of any record
- Backend integration (replace fixture imports with API calls once an API exists)
- Authentication / authorisation
- Pagination (fixture sets are small; add when data grows)
- Inventory, orders, and other future sections (add new pages; Shell nav is data-driven)
