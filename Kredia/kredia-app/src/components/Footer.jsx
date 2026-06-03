import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer>
      <Link to="/" className="footer-logo">Kred<em>ia</em></Link>
      <p>Obafemi Awolowo University · Ile-Ife · 2026</p>
      <p style={{ fontSize: '0.78rem', color: 'rgba(245,242,236,0.2)' }}>3 modules · 5 engineers · 12 weeks</p>
    </footer>
  )
}
