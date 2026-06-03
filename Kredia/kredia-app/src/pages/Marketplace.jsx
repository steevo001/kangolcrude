import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'

const ALL_LISTINGS = [
  { id: 1, title: 'MTH 202 Tutoring', category: 'Academic Tutoring', price: '4 cr', seller: 'Adebayo K.', rating: 4.8 },
  { id: 2, title: 'CV & Resume Writing', category: 'Services', price: '2 cr', seller: 'Funmi A.', rating: 4.9 },
  { id: 3, title: 'Used Engineering Drawing Set', category: 'Goods', price: '15 cr', seller: 'Chidi O.', rating: 4.7 },
  { id: 4, title: 'Slide Design (PowerPoint)', category: 'Services', price: '3 cr', seller: 'Amina B.', rating: 4.6 },
  { id: 5, title: 'Python Data Analysis', category: 'Services', price: '4 cr', seller: 'Tunde M.', rating: 4.5 },
  { id: 6, title: 'PHY 105 Crash Course', category: 'Academic Tutoring', price: '5 cr', seller: 'Ngozi E.', rating: 4.8 },
  { id: 7, title: 'Fairly Used Lab Coat', category: 'Goods', price: '8 cr', seller: 'Daniel S.', rating: 4.2 },
]

export default function Marketplace() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const initialCategory = queryParams.get('category') || 'All'

  const [activeCategory, setActiveCategory] = useState(initialCategory)

  useEffect(() => {
    const cat = queryParams.get('category')
    if (cat) {
      // Map URL params to exact category names
      if (cat === 'services') setActiveCategory('Services')
      else if (cat === 'goods') setActiveCategory('Goods')
      else if (cat === 'tutoring') setActiveCategory('Academic Tutoring')
      else setActiveCategory('All')
    } else {
      setActiveCategory('All')
    }
  }, [location.search])

  const categories = ['All', 'Services', 'Goods', 'Academic Tutoring']

  const filteredListings = activeCategory === 'All' 
    ? ALL_LISTINGS 
    : ALL_LISTINGS.filter(l => l.category === activeCategory)

  return (
    <main style={{ paddingTop: '6rem', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="container" style={{ flex: 1, display: 'flex', gap: '2rem', paddingBottom: '4rem' }}>
        
        {/* Sidebar */}
        <aside style={{ width: '250px', flexShrink: 0, paddingRight: '2rem', borderRight: '1px solid var(--border)' }}>
          <div style={{ marginBottom: '2rem' }}>
            <Link to="/barter" style={{ textDecoration: 'none', color: 'var(--muted)', fontSize: '0.9rem', fontWeight: 600 }}>
              ← Back to Barter
            </Link>
          </div>
          <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.2rem', marginBottom: '1.5rem' }}>Categories</h3>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {categories.map(cat => (
              <li key={cat}>
                <button 
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.6rem 1rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: activeCategory === cat ? 'var(--barter-bg)' : 'transparent',
                    color: activeCategory === cat ? 'var(--barter)' : 'var(--text)',
                    fontWeight: activeCategory === cat ? 700 : 500,
                    cursor: 'pointer',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.95rem',
                    transition: 'all 0.2s'
                  }}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <section style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: 'Fraunces, serif', fontSize: '2rem', color: 'var(--text)', margin: 0 }}>
              {activeCategory === 'All' ? 'Marketplace' : activeCategory}
            </h2>
            <div style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
              Showing {filteredListings.length} results
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {filteredListings.map(l => (
              <div key={l.id} className="product-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div>
                    <div style={{ fontFamily: 'Fraunces, serif', fontWeight: 900, fontSize: '1.1rem', color: 'var(--text)', marginBottom: '0.3rem' }}>{l.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Seller: {l.seller}</div>
                  </div>
                </div>
                <span style={{ display: 'inline-block', fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: '999px', background: 'var(--bg2)', color: 'var(--text)', fontWeight: 600, marginBottom: '1rem' }}>
                  {l.category}
                </span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <span style={{ fontFamily: 'Fraunces, serif', fontWeight: 900, color: 'var(--barter)', fontSize: '1.3rem' }}>{l.price}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>⭐ {l.rating}</span>
                </div>
                <button style={{ width: '100%', padding: '0.7rem', borderRadius: '10px', border: '1.5px solid var(--barter)', background: 'var(--barter-bg)', color: 'var(--barter)', fontWeight: 700, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', transition: 'all 0.2s' }}>
                  Purchase / Book
                </button>
              </div>
            ))}
          </div>

          {filteredListings.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--muted)' }}>
              No listings available in this category yet.
            </div>
          )}
        </section>

      </div>
    </main>
  )
}
