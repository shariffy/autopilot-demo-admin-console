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

export interface Product {
  id: string
  name: string
  sku: string
  category: string
  price: number
  status: ProductStatus
  createdAt: string
}
