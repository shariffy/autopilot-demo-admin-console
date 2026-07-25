import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Box } from '../../design-system'
import styles from './Shell.module.css'

interface NavItem {
  to: string
  label: string
}

const NAV_ITEMS: NavItem[] = [
  { to: '/users', label: 'Users' },
  { to: '/products', label: 'Products' },
]

export default function Shell({ children }: { children: ReactNode }) {
  return (
    <Box className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span className={styles.brandName}>Zynthar Admin</span>
        </div>

        <nav className={styles.nav} aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [styles.navLink, isActive ? styles.navLinkActive : '']
                  .filter(Boolean)
                  .join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <span className={styles.footerText}>Internal use only</span>
        </div>
      </aside>

      <main className={styles.main}>{children}</main>
    </Box>
  )
}
