import { describe, expect, it } from 'vitest'
import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ProductsPage } from '../../src/pages/ProductsPage'

// FROZEN — this is the correctness oracle, not an ordinary test. It is never
// authored or edited by the agent, under any clearance: the envelope refuses a
// write anywhere under `tests/contract/` regardless of Genesis's normally broad
// reach or Maintenance's normally narrow one (`envelope/src/invariants/reach.rs`).
// Its authority comes from the sensor, not from being clever: this is exactly
// what production telemetry already observed (see `sensors/cloudwatch/`) —
// ProductsPage crashed while rendering a real request. Written as `React.createElement`
// rather than JSX so the file can stay a plain `.ts`, matching its filename.
//
// Stable across a revert of the change under judgement: it imports only stable
// entry points — the page itself, and the app's own data module through the
// page — never a helper that exists solely inside the change being judged. A fix
// (or a revert) that keeps the page rendering keeps this test green; a change
// that makes rendering throw, for any reason, fails it.
describe('ProductsPage (frozen reproducer)', () => {
  it('renders the products list without throwing, for the data as configured', () => {
    expect(() => {
      render(
        React.createElement(
          MemoryRouter,
          { initialEntries: ['/products'] },
          React.createElement(ProductsPage),
        ),
      )
    }).not.toThrow()
  })
})
