export type UserStatus = 'active' | 'invited' | 'suspended'

export interface User {
  id: string
  name: string
  email: string
  role: string
  status: UserStatus
  createdAt: string
}

export type ProductStatus = 'active' | 'draft' | 'archived'

// The category catalogue (frozen fixture/data contract, like Product/User
// above). `Product.categoryId` is a foreign key into this list — added
// alongside the existing free-text `category` label, not in place of it. Not
// every product's `categoryId` is guaranteed to resolve: a category can be
// retired or renamed while a product still carries its old id (see
// products.json's `cat-integration` reference, which has no matching entry
// here) — callers must handle a missing lookup, not assume it always resolves.
export interface Category {
  id: string
  label: string
}

export interface Product {
  id: string
  name: string
  sku: string
  category: string
  categoryId: string
  price: number
  status: ProductStatus
  createdAt: string
}
