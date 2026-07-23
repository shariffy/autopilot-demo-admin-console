import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <section className="panel">
      <h2>Welcome</h2>
      <p>
        Internal admin console for staff to look up users and products. Use the
        navigation above, or jump straight in:
      </p>
      <ul className="home-links">
        <li>
          <Link to="/users">Browse users</Link>
        </li>
        <li>
          <Link to="/products">Browse products</Link>
        </li>
      </ul>
    </section>
  )
}
