import { Link, useSearchParams } from 'react-router-dom'
import { getUsers } from '../data'
import { SearchBar } from '../components/SearchBar'
import { StatusBadge } from '../components/StatusBadge'

export function UsersPage() {
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const users = getUsers(query)

  const setQuery = (value: string) => {
    setParams(value ? { q: value } : {})
  }

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Users</h2>
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search users…"
        />
      </div>

      <p className="result-count">
        {users.length} {users.length === 1 ? 'user' : 'users'}
      </p>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <StatusBadge status={user.status} />
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={4} className="empty">
                No users match “{query}”.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  )
}
