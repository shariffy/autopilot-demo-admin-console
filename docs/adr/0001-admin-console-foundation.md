# 1. Admin console: greenfield React + Vite + TypeScript over local fixtures

Date: 2026-07-23

Status: Accepted

## Context

Staff manage users and products by hand against the database today, which is
slow and error-prone. We need an internal admin console — a small web tool to
look up and manage this data.

Observed constraints from the ledger:

- **Greenfield.** There is no predecessor to adopt and no backend to integrate
  with yet.
- **Standalone.** Read from local fixture data checked into the outcome, not a
  network service. The tool must build and run on its own.
- **Conventional stack.** Something a new engineer would recognise, with
  `npm run build` kept as the build so verification stays meaningful.
- **Scope now:** *seeing the data* — a list of users and a list of products,
  each searchable, with a detail view. Editing is explicitly deferred.

## Decision

Build a client-side single-page application with **React + TypeScript +
Vite**, routed with **react-router-dom**, reading from **JSON fixtures**
checked into `src/data/`. The build is `tsc && vite build` behind
`npm run build`, so verification typechecks the whole tree and produces a real
bundle.

Data is accessed through a thin module (`src/data/`) that exposes
`getUsers`/`getUserById`/`getProducts`/`getProductById` with in-memory search.
The UI never imports fixtures directly, so swapping the fixture source for a
real API later is a change in one file.

## Options considered

- **React + Vite + TS (chosen).** Ubiquitous, instantly recognisable, fast
  build, first-class TypeScript. `npm run build` genuinely typechecks and
  bundles, so the gate stays meaningful.
- **Next.js.** Rejected: server rendering, routing conventions and data-loading
  machinery are weight we don't need for a fixture-backed internal tool, and it
  pulls us toward a server we were told not to build yet.
- **Plain HTML + vanilla JS, no bundler.** Rejected: a new engineer expects a
  component model and typed data for a tool that will grow to editing; and
  `npm run build` would be a no-op, weakening verification.
- **Fetching fixtures over HTTP at runtime.** Rejected: the ask is explicitly
  standalone; importing JSON at build time keeps it self-contained and typed.

## Consequences

- Read-only now; the data layer is shaped so mutations (editing) slot in later
  without touching page components.
- No test runner yet — verification is the type checker plus a green bundle.
  A test harness is a deliberate post-launch follow-up.

## Build plan (one changeset each)

1. Foundation: manifest, TypeScript/Vite config, entry point, app shell with
   routing and a home page. Builds green.
2. Domain + data layer: `User`/`Product` types, JSON fixtures, the data-access
   module with search helpers.
3. Users feature: searchable list and detail view.
4. Products feature: searchable list and detail view.
5. Polish: shared styling and a not-found route.
