import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '../../design-system'
import {
  PageHeader,
  SearchInput,
  Card,
  Badge,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from '../../components/ui'
import type { BadgeVariant } from '../../components/ui'
import { products } from '../../data/products'
import type { ProductStatus } from '../../types'
import styles from './ProductsPage.module.css'

function statusVariant(status: ProductStatus): BadgeVariant {
  switch (status) {
    case 'active':       return 'success'
    case 'draft':        return 'warning'
    case 'discontinued': return 'neutral'
  }
}

function formatPrice(price: number): string {
  if (price === 0) return '—'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(price)
}

export default function ProductsPage() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const q = query.trim().toLowerCase()
  const filtered = q
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.status.toLowerCase().includes(q),
      )
    : products

  return (
    <Box>
      <PageHeader
        title="Products"
        subtitle={`${filtered.length} of ${products.length} ${products.length === 1 ? 'product' : 'products'}`}
      />

      <Box className={styles.toolbar}>
        <SearchInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, SKU, category, or status…"
        />
      </Box>

      <Card padding={false}>
        {filtered.length === 0 ? (
          <p className={styles.empty}>No products match your search.</p>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>SKU</TableHeaderCell>
                <TableHeaderCell>Category</TableHeaderCell>
                <TableHeaderCell>Price</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Created</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((product) => (
                <TableRow
                  key={product.id}
                  onClick={() => navigate(`/products/${product.id}`)}
                  clickable
                >
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    <code className={styles.sku}>{product.sku}</code>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{formatPrice(product.price)}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(product.status)}>
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{product.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </Box>
  )
}
