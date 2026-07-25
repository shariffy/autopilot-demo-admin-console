export interface Vendor {
  id:   string
  name: string
}

/**
 * Fictional supplier/vendor catalogue for Zynthar Inc.
 * Every product should reference one of these by `vendorId`.
 */
export const vendors: Vendor[] = [
  { id: 'v-internal',   name: 'Zynthar Inc. (in-house)' },
  { id: 'v-northgate',  name: 'Northgate Cloud Partners' },
  { id: 'v-lucid',      name: 'Lucid Data Systems' },
  { id: 'v-fernhollow', name: 'Fernhollow Labs' },
]
