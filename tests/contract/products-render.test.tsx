import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProductsPage from '../../src/pages/products/ProductsPage'

// Frozen reproducer (ADR: the runtime envelope and the frozen oracle).
// This is the correctness oracle for a runtime fix: it must never be
// agent-authored, or the agent could certify its own bug. Its assertion is
// deliberately minimal and structural — render the real fixture data without
// throwing — so it stays valid across whatever the current display logic is,
// as long as it doesn't crash for any row in the fixture.
describe('ProductsPage (frozen reproducer)', () => {
  it('renders the full product list without throwing, for the fixture data as configured', () => {
    expect(() => {
      render(
        <MemoryRouter>
          <ProductsPage />
        </MemoryRouter>,
      )
    }).not.toThrow()
  })
})
