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
import { users } from '../../data/users'
import type { UserStatus } from '../../types'
import styles from './UsersPage.module.css'

function statusVariant(status: UserStatus): BadgeVariant {
  switch (status) {
    case 'active':    return 'success'
    case 'suspended': return 'danger'
    case 'pending':   return 'warning'
  }
}

export default function UsersPage() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const q = query.trim().toLowerCase()
  const filtered = q
    ? users.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.role.toLowerCase().includes(q) ||
          u.department.toLowerCase().includes(q),
      )
    : users

  return (
    <Box>
      <PageHeader
        title="Users"
        subtitle={`${filtered.length} of ${users.length} ${users.length === 1 ? 'user' : 'users'}`}
      />

      <Box className={styles.toolbar}>
        <SearchInput
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, email, role, or department…"
        />
      </Box>

      <Card padding={false}>
        {filtered.length === 0 ? (
          <p className={styles.empty}>No users match your search.</p>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
                <TableHeaderCell>Role</TableHeaderCell>
                <TableHeaderCell>Department</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Joined</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((user) => (
                <TableRow
                  key={user.id}
                  onClick={() => navigate(`/users/${user.id}`)}
                  clickable
                >
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </Box>
  )
}
