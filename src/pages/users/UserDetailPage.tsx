import { useParams, useNavigate } from 'react-router-dom'
import { Box } from '../../design-system'
import {
  PageHeader,
  Button,
  Card,
  Badge,
} from '../../components/ui'
import type { BadgeVariant } from '../../components/ui'
import { users } from '../../data/users'
import type { UserStatus } from '../../types'
import styles from './UserDetailPage.module.css'

function statusVariant(status: UserStatus): BadgeVariant {
  switch (status) {
    case 'active':    return 'success'
    case 'suspended': return 'danger'
    case 'pending':   return 'warning'
  }
}

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const user = users.find((u) => u.id === id)

  if (!user) {
    return (
      <Box>
        <PageHeader title="User not found" />
        <Button variant="ghost" size="sm" onClick={() => navigate('/users')}>
          ← Back to Users
        </Button>
      </Box>
    )
  }

  return (
    <Box>
      <Box className={styles.back}>
        <Button variant="ghost" size="sm" onClick={() => navigate('/users')}>
          ← Back to Users
        </Button>
      </Box>

      <PageHeader title={user.name} subtitle={user.email} />

      <Card>
        <dl className={styles.fields}>
          <div className={styles.field}>
            <dt className={styles.fieldLabel}>User ID</dt>
            <dd className={styles.fieldValue}>
              <code className={styles.code}>{user.id}</code>
            </dd>
          </div>
          <div className={styles.field}>
            <dt className={styles.fieldLabel}>Role</dt>
            <dd className={styles.fieldValue}>{user.role}</dd>
          </div>
          <div className={styles.field}>
            <dt className={styles.fieldLabel}>Department</dt>
            <dd className={styles.fieldValue}>{user.department}</dd>
          </div>
          <div className={styles.field}>
            <dt className={styles.fieldLabel}>Status</dt>
            <dd className={styles.fieldValue}>
              <Badge variant={statusVariant(user.status)}>{user.status}</Badge>
            </dd>
          </div>
          <div className={styles.field}>
            <dt className={styles.fieldLabel}>Joined</dt>
            <dd className={styles.fieldValue}>{user.createdAt}</dd>
          </div>
          <div className={styles.field}>
            <dt className={styles.fieldLabel}>Last Login</dt>
            <dd className={styles.fieldValue}>{user.lastLogin}</dd>
          </div>
        </dl>
      </Card>
    </Box>
  )
}
