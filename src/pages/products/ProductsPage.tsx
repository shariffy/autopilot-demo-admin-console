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
  SortableHeaderCell,
} from '../../components/ui'
import type { BadgeVariant, SortDirection } from '../../components/ui'
import { products } from '../../data/products'
import { vendors } from '../../data/vendors'
import type { ProductStatus } from '../../types'
import styles from './ProductsPage.module.css'

type SortColumn = 'name' | 'price'

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
  const [sortColumn, setSortColumn] = useState<SortColumn | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
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

  // Apply sort after filtering; spread to avoid mutating the fixture array.
  const sorted = sortColumn
    ? [...filtered].sort((a, b) => {
        if (sortColumn === 'name') {
          const cmp = a.name.localeCompare(b.name)
          return sortDirection === 'asc' ? cmp : -cmp
        }
        // sortColumn === 'price'
        const cmp = a.price - b.price
        return sortDirection === 'asc' ? cmp : -cmp
      })
    : filtered

  function handleSort(column: SortColumn) {
    if (sortColumn === column) {
      // Second click on the same column: flip direction.
      // Third click (desc → next): clear sort back to fixture order.
      if (sortDirection === 'asc') {
        setSortDirection('desc')
      } else {
        setSortColumn(null)
        setSortDirection('asc')
      }
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  function directionFor(column: SortColumn): SortDirection {
    return sortColumn === column ? sortDirection : null
  }

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
                <SortableHeaderCell
                  direction={directionFor('name')}
                  onSort={() => handleSort('name')}
                >
                  Name
                </SortableHeaderCell>
                <TableHeaderCell>SKU</TableHeaderCell>
                <TableHeaderCell>Category</TableHeaderCell>
                <TableHeaderCell>Vendor</TableHeaderCell>
                <SortableHeaderCell
                  direction={directionFor('price')}
                  onSort={() => handleSort('price')}
                >
                  Price
                </SortableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Created</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sorted.map((product) => (
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
                  <TableCell>
                    {vendors.find((v) => v.id === product.vendorId)!.name}
                  </TableCell>
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
