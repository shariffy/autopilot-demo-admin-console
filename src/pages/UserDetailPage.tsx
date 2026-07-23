import { Link, useParams } from 'react-router-dom'
import { getUserById } from '../data'
import { StatusBadge } from '../components/StatusBadge'

export function UserDetailPage() {
  const { id } = useParams()
  const user = id ? getUserById(id) : undefined

  if (!user) {
    return (
      <section className="panel">
        <h2>User not found</h2>
        <p>
          No user exists with id “{id}”. <Link to="/users">Back to users</Link>
        </p>
      </section>
    )
  }

  return (
    <section className="panel">
      <p className="crumb">
        <Link to="/users">← Users</Link>
      </p>
      <h2>{user.name}</h2>
      <dl className="detail">
        <dt>ID</dt>
        <dd>{user.id}</dd>
        <dt>Email</dt>
        <dd>{user.email}</dd>
        <dt>Role</dt>
        <dd>{user.role}</dd>
        <dt>Status</dt>
        <dd>
          <StatusBadge status={user.status} />
        </dd>
        <dt>Created</dt>
        <dd>{user.createdAt}</dd>
      </dl>
    </section>
  )
}
