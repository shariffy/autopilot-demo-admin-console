import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// Trusted, pre-existing project infrastructure (like the API contract): the
// project already has tests before any agent touches it. jsdom gives the
// reproducer test a real DOM to render into, so it can catch a component that
// throws while rendering, not just one that fails to typecheck.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
  },
})
