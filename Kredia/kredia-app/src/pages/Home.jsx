import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Ticker from '../components/Ticker'

function RevealSection({ children, className = '', style }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('revealed'); obs.unobserve(el) }
    }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${className}`} style={style}>{children}</div>
}

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-texture"></div>
        <div className="hero-eyebrow">Obafemi Awolowo University · 2026</div>
        <h1>One platform.<br /><em>Three modules.</em><br /><span className="line2">Built for OAU.</span></h1>
        <p className="hero-sub">A unified ecosystem transforming the student experience — from cashless skill trading to AI-powered exam prep and real-time campus navigation.</p>
        <div className="hero-actions">
          <Link to="/barter" className="btn-dark">Explore Platform</Link>
        </div>
      </section>

      <Ticker />

      {/* OVERVIEW */}
      <section className="overview-section">
        <RevealSection className="container">
          <div className="section-eyebrow" style={{ color: 'var(--muted)' }}>Platform Overview</div>
          <h2 className="section-title">Three modules.<br />One shared economy.</h2>
          <p className="section-desc">Shared authentication, shared user profiles, and a credit economy that ties every product together into a single ecosystem.</p>
        </RevealSection>
        <RevealSection className="container" style={{ marginTop: 0 }}>
          <div className="products-grid">
            <Link to="/barter" className="product-card card-barter" style={{ textDecoration: 'none' }}>
              <div className="card-num">01 · Live Now</div>
              <div className="card-icon">🤝</div>
              <h3>Skill Barter</h3>
              <p>Cashless peer-to-peer skill exchange. Trade tutoring, design, coding, and writing — no cash needed, just credits.</p>
              <span className="card-status status-live">Active</span>
            </Link>
            <Link to="/brain" className="product-card card-brain" style={{ textDecoration: 'none' }}>
              <div className="card-num">02 · Live Now</div>
              <div className="card-icon">🧠</div>
              <h3>OAU Brain</h3>
              <p>AI tutor trained on OAU past questions and lecture materials. Understands how your specific lecturers set their exams.</p>
              <span className="card-status status-live">Active</span>
            </Link>
            <Link to="/grid" className="product-card card-grid" style={{ textDecoration: 'none' }}>
              <div className="card-num">03 · Coming Soon</div>
              <div className="card-icon">🗺️</div>
              <h3>Space Grid</h3>
              <p>Real-time crowdsourced campus study space map. See which rooms have power, how crowded they are, and join study pods.</p>
              <span className="card-status status-soon">Coming Soon</span>
            </Link>
          </div>
        </RevealSection>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <h2>The OAU student<br />experience, <em>rebuilt.</em></h2>
          <p>One platform. Credits that flow between every module. Built by OAU students, for OAU students.</p>
          <Link to="/barter" className="btn-light">Start with Skill Barter</Link>
          <Link to="/brain" className="btn-ghost-light">Try OAU Brain</Link>
        </div>
      </section>
    </>
  )
}
