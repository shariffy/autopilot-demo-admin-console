import { useParams, useNavigate } from 'react-router-dom'
import { Box } from '../../design-system'
import {
  PageHeader,
  Button,
  Card,
  Badge,
} from '../../components/ui'
import type { BadgeVariant } from '../../components/ui'
import { products } from '../../data/products'
import type { ProductStatus } from '../../types'
import styles from './ProductDetailPage.module.css'

function statusVariant(status: ProductStatus): BadgeVariant {
  switch (status) {
    case 'active':       return 'success'
    case 'draft':        return 'warning'
    case 'discontinued': return 'neutral'
  }
}

function formatPrice(price: number): string {
  if (price === 0) return 'Pricing TBD'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(price)
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const product = products.find((p) => p.id === id)

  if (!product) {
    return (
      <Box>
        <PageHeader title="Product not found" />
        <Button variant="ghost" size="sm" onClick={() => navigate('/products')}>
          ← Back to Products
        </Button>
      </Box>
    )
  }

  return (
    <Box>
      <Box className={styles.back}>
        <Button variant="ghost" size="sm" onClick={() => navigate('/products')}>
          ← Back to Products
        </Button>
      </Box>

      <PageHeader title={product.name} subtitle={product.sku} />

      <Card>
        <dl className={styles.fields}>
          <div className={styles.field}>
            <dt className={styles.fieldLabel}>Product ID</dt>
            <dd className={styles.fieldValue}>
              <code className={styles.code}>{product.id}</code>
            </dd>
          </div>
          <div className={styles.field}>
            <dt className={styles.fieldLabel}>SKU</dt>
            <dd className={styles.fieldValue}>
              <code className={styles.code}>{product.sku}</code>
            </dd>
          </div>
          <div className={styles.field}>
            <dt className={styles.fieldLabel}>Category</dt>
            <dd className={styles.fieldValue}>{product.category}</dd>
          </div>
          <div className={styles.field}>
            <dt className={styles.fieldLabel}>Price</dt>
            <dd className={styles.fieldValue}>{formatPrice(product.price)}</dd>
          </div>
          <div className={styles.field}>
            <dt className={styles.fieldLabel}>Status</dt>
            <dd className={styles.fieldValue}>
              <Badge variant={statusVariant(product.status)}>
                {product.status}
              </Badge>
            </dd>
          </div>
          <div className={styles.field}>
            <dt className={styles.fieldLabel}>Created</dt>
            <dd className={styles.fieldValue}>{product.createdAt}</dd>
          </div>
        </dl>

        <Box className={styles.descriptionSection}>
          <dt className={styles.fieldLabel}>Description</dt>
          <dd className={styles.description}>{product.description}</dd>
        </Box>
      </Card>
    </Box>
  )
}
