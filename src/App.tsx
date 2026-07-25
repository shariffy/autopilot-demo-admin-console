import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Shell from './components/layout/Shell'
import UsersPage from './pages/users/UsersPage'
import UserDetailPage from './pages/users/UserDetailPage'

function ProductsPlaceholder() {
  return (
    <p
      style={{
        padding: 'var(--space-8)',
        color: 'var(--color-text-secondary)',
        fontStyle: 'italic',
      }}
    >
      Products screens coming in the next changeset…
    </p>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
          <Route path="/products" element={<ProductsPlaceholder />} />
          <Route path="/products/:id" element={<ProductsPlaceholder />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  )
}
