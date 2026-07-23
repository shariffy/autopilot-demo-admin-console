import { NavLink, Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div className="app">
      <header className="app-header">
        <NavLink to="/" className="brand">
          Admin Console
        </NavLink>
        <nav className="app-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/users">Users</NavLink>
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
