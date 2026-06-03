import { Link, useLocation } from 'react-router-dom'

export default function Navigation() {
  const location = useLocation()
  const links = [
    { to: '/barter', label: 'Skill Barter' },
    { to: '/brain', label: 'OAU Brain' },
    { to: '/grid', label: 'Space Grid' },
  ]

  return (
    <nav>
      <Link to="/" className="nav-logo">Kred<em>ia</em></Link>
      <ul className="nav-links">
        {links.map(l => (
          <li key={l.to}>
            <Link to={l.to} className={location.pathname === l.to ? 'active' : ''}>{l.label}</Link>
          </li>
        ))}
      </ul>
      <Link to="/barter" className="nav-cta">Get Started</Link>
    </nav>
  )
}
