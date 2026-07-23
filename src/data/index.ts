import usersRaw from './users.json'
import productsRaw from './products.json'
import type { Product, User } from '../types'

// Fixtures are the current data source. The UI depends only on the functions
// below, so replacing these with a real API later is a change in this file.
const users = usersRaw as unknown as User[]
const products = productsRaw as unknown as Product[]

function matches(haystack: string, query: string): boolean {
  return haystack.toLowerCase().includes(query.toLowerCase())
}

export function getUsers(query = ''): User[] {
  const q = query.trim()
  if (!q) return users
  return users.filter((user) =>
    [user.name, user.email, user.role, user.status, user.id].some((field) =>
      matches(field, q),
    ),
  )
}

export function getUserById(id: string): User | undefined {
  return users.find((user) => user.id === id)
}

export function getProducts(query = ''): Product[] {
  const q = query.trim()
  if (!q) return products
  return products.filter((product) =>
    [
      product.name,
      product.sku,
      product.category,
      product.status,
      product.id,
    ].some((field) => matches(field, q)),
  )
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}
