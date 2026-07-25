# Zynthar Admin Console

Internal staff tool for looking up and managing users and products.
Reads from checked-in fixture data — no backend connection required.
Build and run it standalone on any machine with Node.

---

## Getting started

### Prerequisites

- **Node.js 18+** and **npm 9+**

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Opens at **http://localhost:5173** by default (Vite will print the actual URL).

### Build for production

```bash
npm run build
```

Type-checks with `tsc --noEmit`, then bundles to `dist/`.

### Preview the production build locally

```bash
npm run preview
```

### Tests

```bash
npm test
```

No automated tests yet. Add [Vitest](https://vitest.dev/) and write the first
unit or component test when it becomes worthwhile.

---

## What's in the box

| Screen | URL | What it does |
|---|---|---|
| **Users** | `/users` | Searchable table of all staff accounts; click any row to open the detail view |
| **User detail** | `/users/:id` | Full profile: role, status, department, join date, last login |
| **Products** | `/products` | Searchable table of the product catalogue; click any row to open the detail view |
| **Product detail** | `/products/:id` | Full record: SKU, category, price, status, description |

The app redirects `/` → `/users` on first load.

---

## Source layout

```
src/
├── design-system/          # Unstyled primitive elements (Box, Button, TextInput)
│   └── index.ts            # Barrel export — primitives are consumed by ui/ below
│
├── components/
│   ├── ui/                 # Styled, reusable building blocks — use these on every new screen
│   │   ├── Badge           # Status chip: success / warning / danger / neutral / info
│   │   ├── Button          # primary / secondary / ghost / danger variants; sm / md sizes
│   │   ├── Card            # Surface container (padding prop controls bleed for tables)
│   │   ├── Input           # Labelled text input with optional error state
│   │   ├── PageHeader      # Page title + optional subtitle + optional action slot
│   │   ├── SearchInput     # Icon-decorated search field for list pages
│   │   ├── Table           # Table, TableHead, TableBody, TableRow,
│   │   │                   # TableHeaderCell, TableCell
│   │   └── index.ts        # Barrel export for all ui/ components
│   │
│   └── layout/
│       └── Shell           # Sticky sidebar nav + scrollable main content area
│
├── data/                   # Fixture data (swap with API calls once a backend exists)
│   ├── users.ts            # 15 fictional Zynthar staff accounts
│   └── products.ts         # 15 fictional Zynthar products
│
├── pages/
│   ├── users/
│   │   ├── UsersPage.tsx         # Searchable users list
│   │   └── UserDetailPage.tsx    # User detail view
│   └── products/
│       ├── ProductsPage.tsx      # Searchable products list
│       └── ProductDetailPage.tsx # Product detail view
│
├── types/
│   └── index.ts            # Shared TypeScript types: User, Product, and their sub-types
│
├── App.tsx                 # Route table (BrowserRouter + Routes)
├── main.tsx                # React entry point
└── index.css               # Design tokens (CSS custom properties) + global reset
```

**Design tokens** (colours, spacing scale, border radii, type scale, shadows) live in
`src/index.css` as CSS custom properties. Every CSS Module file references them by name,
so new components automatically inherit the visual system without any extra configuration.

---

## Adding a new screen

1. **Create the page** — `src/pages/<section>/<Name>Page.tsx` and
   `src/pages/<section>/<Name>Page.module.css`.
2. **Use the component library** — import building blocks from `../../components/ui`
   (Badge, Button, Card, PageHeader, Table, …). Check what's there before writing
   bespoke markup.
3. **Register the route** — add a `<Route>` in `src/App.tsx`.
4. **Add nav entry** — append to the `NAV_ITEMS` array in
   `src/components/layout/Shell.tsx`; the sidebar renders it automatically.

---

## Architecture decision records

Long-lived decisions live in `docs/adr/`. Start there when you want to understand
why the stack and structure are shaped the way they are.

| ADR | Title |
|---|---|
| [0001](docs/adr/0001-react-vite-internal-component-library.md) | React + Vite SPA with internal UI component library |

---

## Intentionally deferred

| Item | Notes |
|---|---|
| Record editing | Read-only for now; forms and mutations come later |
| Backend integration | Swap fixture imports for `fetch` calls once an API exists |
| Authentication / authorisation | Out of scope for the initial internal tool |
| Pagination | Fixture sets are small; add when data volume demands it |
| Inventory, Orders, and other screens | Stubbed out in the ADR; follow the pattern above to add them |
