import { Link, useParams } from 'react-router-dom'
import { getProductById } from '../data'
import { StatusBadge } from '../components/StatusBadge'

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function ProductDetailPage() {
  const { id } = useParams()
  const product = id ? getProductById(id) : undefined

  if (!product) {
    return (
      <section className="panel">
        <h2>Product not found</h2>
        <p>
          No product exists with id “{id}”.{' '}
          <Link to="/products">Back to products</Link>
        </p>
      </section>
    )
  }

  return (
    <section className="panel">
      <p className="crumb">
        <Link to="/products">← Products</Link>
      </p>
      <h2>{product.name}</h2>
      <dl className="detail">
        <dt>ID</dt>
        <dd>{product.id}</dd>
        <dt>SKU</dt>
        <dd>{product.sku}</dd>
        <dt>Category</dt>
        <dd>{product.category}</dd>
        <dt>Price</dt>
        <dd>{priceFormatter.format(product.price)}</dd>
        <dt>Status</dt>
        <dd>
          <StatusBadge status={product.status} />
        </dd>
        <dt>Created</dt>
        <dd>{product.createdAt}</dd>
      </dl>
    </section>
  )
}
