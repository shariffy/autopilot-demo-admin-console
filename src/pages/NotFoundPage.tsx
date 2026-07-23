import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="panel">
      <h2>Page not found</h2>
      <p>
        That page doesn’t exist. <Link to="/">Go home</Link>.
      </p>
    </section>
  )
}
