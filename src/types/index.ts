// ── Users ────────────────────────────────────────────────────────────────

export type UserRole   = 'admin' | 'manager' | 'staff'
export type UserStatus = 'active' | 'suspended' | 'pending'

export interface User {
  id:         string
  name:       string
  email:      string
  role:       UserRole
  status:     UserStatus
  department: string
  createdAt:  string   // ISO date string YYYY-MM-DD
  lastLogin:  string   // ISO date string YYYY-MM-DD
}

// ── Products ─────────────────────────────────────────────────────────────

export type ProductCategory = 'Platform' | 'Add-on' | 'Service' | 'Integration'
export type ProductStatus   = 'active' | 'draft' | 'discontinued'

export interface Product {
  id:          string
  name:        string
  sku:         string
  category:    ProductCategory
  price:       number    // USD, 0 = pricing TBD
  status:      ProductStatus
  description: string
  createdAt:   string    // ISO date string YYYY-MM-DD
  vendorId:    string    // references Vendor.id in ../data/vendors
}
