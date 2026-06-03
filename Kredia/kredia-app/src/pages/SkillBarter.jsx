import { useState } from 'react'
import { Link } from 'react-router-dom'

const INITIAL_LISTINGS = [
  { id: 1, name: 'Adebayo K.', skill: 'MTH 202 Tutoring', category: 'Tutoring', rate: 4, rating: 4.8, reviews: 12 },
  { id: 2, name: 'Funmi A.', skill: 'CV & Resume Writing', category: 'Writing', rate: 2, rating: 4.9, reviews: 28 },
  { id: 3, name: 'Chidi O.', skill: 'React Frontend Dev', category: 'Coding', rate: 5, rating: 4.7, reviews: 8 },
  { id: 4, name: 'Amina B.', skill: 'Slide Design (PowerPoint)', category: 'Design', rate: 3, rating: 4.6, reviews: 15 },
  { id: 5, name: 'Tunde M.', skill: 'Python Data Analysis', category: 'Coding', rate: 4, rating: 4.5, reviews: 6 },
  { id: 6, name: 'Ngozi E.', skill: 'Academic Writing Help', category: 'Writing', rate: 3, rating: 4.8, reviews: 20 },
]

const TRANSACTIONS = [
  { name: 'MTH 202 Tutoring — Earned', time: 'Today, 3:15 PM', amount: '+4 cr', type: 'pos', color: 'var(--brain)' },
  { name: 'CV Writing — Spent', time: 'Yesterday, 11:00 AM', amount: '−2 cr', type: 'neg', color: '#c0392b' },
  { name: 'Past question verified', time: 'Mon, 9:00 AM', amount: '+2 cr', type: 'pos', color: 'var(--barter)' },
  { name: 'Welcome bonus', time: 'Account signup', amount: '+5 cr', type: 'pos', color: 'var(--grid)' },
]

export default function SkillBarter() {
  const [credits] = useState(24)
  const [pending] = useState(2)

  return (
    <main style={{ paddingTop: '5rem' }}>
      {/* HEADER */}
      <section id="barter" style={{ background: 'var(--barter-bg)', padding: '4rem 2rem 3rem' }}>
        <div className="container">
          <div className="section-eyebrow" style={{ color: 'var(--barter)' }}>Module 01 · Skill Barter</div>
          <h2 className="section-title">Trade skills. <em style={{ color: 'var(--barter)' }}>Not cash.</em></h2>
          <p className="section-desc">Students at OAU are highly skilled but often cash-constrained. Skill Barter replaces money with platform credits — so your knowledge has real value.</p>
        </div>
      </section>

      {/* TWO COL: FEATURES + WALLET */}
      <section style={{ padding: '4rem 2rem' }}>
        <div className="container">
          <div className="two-col">
            {/* Features */}
            <div>
              <div className="feat-grid">
                <div className="feat-box"><div className="feat-box-icon">📋</div><h4>Skill Listings</h4><p>Post your skills publicly. Set your rate, availability, and subject. Students find and book you directly.</p></div>
                <div className="feat-box"><div className="feat-box-icon">🔒</div><h4>Escrow System</h4><p>Credits lock in escrow before every session. Released only on mutual confirmation — both parties protected.</p></div>
                <div className="feat-box"><div className="feat-box-icon">⭐</div><h4>Reputation</h4><p>5-star ratings and written reviews after every session. Your profile builds real credibility over time.</p></div>
                <div className="feat-box"><div className="feat-box-icon">🎨</div><h4>Any Skill</h4><p>Not just academics. Slide design, CV writing, photography, coding help — every OAU skill has value here.</p></div>
              </div>
            </div>

            {/* Wallet */}
            <div>
              <div className="wallet-card">
                <div className="wallet-header">
                  <div>
                    <div className="wallet-label">Credit Wallet</div>
                    <div className="wallet-balance">{credits} <span>credits</span></div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: '0.3rem' }}>= {Math.floor(credits / 2)} hours of tutoring</div>
                    <div className="wallet-pending">+{pending} pending verification</div>
                  </div>
                </div>
                <div className="tx-list">
                  {TRANSACTIONS.map((tx, i) => (
                    <div className="tx" key={i}>
                      <div className="tx-left">
                        <div className="tx-dot" style={{ background: tx.color }}></div>
                        <div><div className="tx-name">{tx.name}</div><div className="tx-time">{tx.time}</div></div>
                      </div>
                      <div className={`tx-amount ${tx.type}`}>{tx.amount}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ECONOMY BAND */}
      <div className="economy-band">
        <div className="economy-inner">
          <div className="eco-item"><strong>1 cr</strong><p>= 30 minutes of tutoring or equivalent service</p></div>
          <div className="eco-item"><strong>5 cr</strong><p>Free credits on signup to bootstrap participation</p></div>
          <div className="eco-item"><strong>2 cr</strong><p>Earned per verified OAU past question uploaded</p></div>
          <div className="eco-item"><strong>0%</strong><p>Target dispute rate — escrow protects every session</p></div>
        </div>
      </div>

      {/* EXPLORE THE MARKETPLACE */}
      <section style={{ padding: '4rem 2rem', background: 'var(--surface)' }}>
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: '2.5rem' }}>Explore the Marketplace</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            
            <Link to="/marketplace?category=services" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="product-card" style={{ background: 'var(--bg)', border: '1px solid var(--border)', height: '100%' }}>
                <div className="card-icon" style={{ background: 'var(--barter-light)', color: 'var(--barter)' }}>💼</div>
                <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.4rem', fontWeight: 900, color: 'var(--text)', marginBottom: '0.5rem' }}>Services</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>Find student freelancers for design, writing, coding, photography, and other professional services.</p>
              </div>
            </Link>

            <Link to="/marketplace?category=goods" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="product-card" style={{ background: 'var(--bg)', border: '1px solid var(--border)', height: '100%' }}>
                <div className="card-icon" style={{ background: 'var(--grid-light)', color: 'var(--grid)' }}>📦</div>
                <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.4rem', fontWeight: 900, color: 'var(--text)', marginBottom: '0.5rem' }}>Goods</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>Buy and sell physical items like textbooks, lab coats, drawing boards, and electronics.</p>
              </div>
            </Link>

            <Link to="/marketplace?category=tutoring" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="product-card" style={{ background: 'var(--bg)', border: '1px solid var(--border)', height: '100%' }}>
                <div className="card-icon" style={{ background: 'var(--brain-light)', color: 'var(--brain)' }}>📚</div>
                <h3 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.4rem', fontWeight: 900, color: 'var(--text)', marginBottom: '0.5rem' }}>Academic Tutoring</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>Book sessions for MTH 202, PHY 105, CHM 101, and other courses from top students.</p>
              </div>
            </Link>

          </div>
        </div>
      </section>
    </main>
  )
}
