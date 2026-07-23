import { Link, useSearchParams } from 'react-router-dom'
import { getProducts } from '../data'
import { SearchBar } from '../components/SearchBar'
import { StatusBadge } from '../components/StatusBadge'

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function ProductsPage() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const products = getProducts(query)

  const setQuery = (value: string) => {
    setParams(value ? { q: value } : {})
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
            <th>Name</th>
            <th>SKU</th>
            <th>Category</th>
            <th>Price</th>
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
                No products match “{query}”.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  )
}
