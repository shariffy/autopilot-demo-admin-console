import { Link, useSearchParams } from 'react-router-dom'
import { getProducts } from '../data'
import { SearchBar } from '../components/SearchBar'
import { StatusBadge } from '../components/StatusBadge'
import { SortableHeader } from '../components/SortableHeader'
import type { Product } from '../types'

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

type SortKey = 'name' | 'price'
type SortDir = 'asc' | 'desc'

function sortProducts(
  list: Product[],
  key: SortKey | null,
  dir: SortDir,
): Product[] {
  if (!key) return list
  return [...list].sort((a, b) => {
    const cmp =
      key === 'price' ? a.price - b.price : a.name.localeCompare(b.name)
    return dir === 'asc' ? cmp : -cmp
  })
}

export function ProductsPage() {
  const [params, setParams] = useSearchParams()

  const query = params.get('q') ?? ''
  const rawSort = params.get('sort')
  const sortKey: SortKey | null =
    rawSort === 'name' || rawSort === 'price' ? rawSort : null
  const sortDir: SortDir = params.get('dir') === 'desc' ? 'desc' : 'asc'

  const filtered = getProducts(query)
  const products = sortProducts(filtered, sortKey, sortDir)

  const setQuery = (value: string) => {
    const next = new URLSearchParams(params)
    if (value) {
      next.set('q', value)
    } else {
      next.delete('q')
    }
    setParams(next)
  }

  const handleSort = (key: string) => {
    const next = new URLSearchParams(params)
    if (sortKey === key) {
      next.set('dir', sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      next.set('sort', key)
      next.set('dir', 'asc')
    }
    setParams(next)
  }

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Products</h2>
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search products…"
        />
      </div>

      <p className="result-count">
        {products.length} {products.length === 1 ? 'product' : 'products'}
      </p>

      <table className="table">
        <thead>
          <tr>
            <SortableHeader
              label="Name"
              sortKey="name"
              currentSort={sortKey}
              currentDir={sortDir}
              onSort={handleSort}
            />
            <th>SKU</th>
            <th>Category</th>
            <SortableHeader
              label="Price"
              sortKey="price"
              currentSort={sortKey}
              currentDir={sortDir}
              onSort={handleSort}
            />
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <Link to={`/products/${product.id}`}>{product.name}</Link>
              </td>
              <td>{product.sku}</td>
              <td>{product.category}</td>
              <td>{priceFormatter.format(product.price)}</td>
              <td>
                <StatusBadge status={product.status} />
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan={5} className="empty">
                No products match "{query}".
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  )
}
