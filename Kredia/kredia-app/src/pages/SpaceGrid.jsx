import { useState } from 'react'

const VENUES = [
  { id: 1, name: 'Bookshop Overflow C', short: 'BOO-C', crowd: 2, noise: 1, power: true, top: '18%', left: '18%', color: 'var(--brain)' },
  { id: 2, name: 'Main Library', short: 'Library', crowd: 5, noise: 2, power: true, top: '52%', left: '52%', color: '#c0392b' },
  { id: 3, name: 'Science Complex', short: 'Sci Lab', crowd: 1, noise: 1, power: true, top: '32%', left: '65%', color: 'var(--brain)' },
  { id: 4, name: 'Engineering Hall', short: 'Eng Hall', crowd: 3, noise: 3, power: false, top: '68%', left: '28%', color: 'var(--faint)' },
  { id: 5, name: 'Faculty of Arts', short: 'Arts', crowd: 2, noise: 2, power: true, top: '45%', left: '35%', color: 'var(--brain)' },
]

const PODS = [
  { id: 1, venue: 'BOO-C', course: 'MTH 102', slots: 3, creator: 'Adebayo K.', expiresIn: 95 },
  { id: 2, venue: 'Sci Lab', course: 'CHM 201', slots: 1, creator: 'Funmi A.', expiresIn: 42 },
]

export default function SpaceGrid() {
  const [venues, setVenues] = useState(VENUES)
  const [selectedVenue, setSelectedVenue] = useState(null)
  const [pods, setPods] = useState(PODS)
  const [joinedPods, setJoinedPods] = useState([])
  const [email, setEmail] = useState('')
  const [waitlisted, setWaitlisted] = useState(false)
  const [showCheckin, setShowCheckin] = useState(false)
  const [checkin, setCheckin] = useState({ venueId: 1, crowd: 2, noise: 1, power: true })
  const [showPodForm, setShowPodForm] = useState(false)
  const [newPod, setNewPod] = useState({ venue: 'BOO-C', course: '', slots: 3 })

  const handleCheckin = (e) => {
    e.preventDefault()
    setVenues(vs => vs.map(v => v.id === checkin.venueId ? { ...v, crowd: checkin.crowd, noise: checkin.noise, power: checkin.power, color: !checkin.power ? 'var(--faint)' : checkin.crowd >= 4 ? '#c0392b' : 'var(--brain)' } : v))
    setShowCheckin(false)
  }

  const handlePodPost = (e) => {
    e.preventDefault()
    setPods(p => [...p, { id: Date.now(), venue: newPod.venue, course: newPod.course, slots: newPod.slots, creator: 'You', expiresIn: 120 }])
    setNewPod({ venue: 'BOO-C', course: '', slots: 3 })
    setShowPodForm(false)
  }

  const crowdLabel = (c) => c <= 1 ? 'Empty' : c <= 2 ? 'Light' : c <= 3 ? 'Moderate' : c <= 4 ? 'Busy' : 'Full'

  return (
    <main style={{ paddingTop: '5rem' }}>
      <section id="grid" style={{ background: 'var(--grid-bg)', padding: '4rem 2rem 3rem' }}>
        <div className="container">
          <div className="cs-banner"><div className="cs-pulse"></div><span>Live Campus Map</span><small>Updated every 90 min</small></div>
          <div className="section-eyebrow" style={{ color: 'var(--grid)' }}>Module 03 · Space Grid</div>
          <h2 className="section-title">Never waste time hunting for a <em style={{ color: 'var(--grid)', fontStyle: 'italic' }}>study spot again.</em></h2>
          <p className="section-desc">Real-time crowdsourced map of every study venue on OAU campus.</p>
        </div>
      </section>

      <section style={{ padding: '3rem 2rem' }}>
        <div className="container">
          <div className="two-col">
            {/* Map */}
            <div>
              <div className="map-mock" style={{ position: 'relative' }}>
                <div className="map-inner">
                  <div className="map-hdr">
                    <h4>🗺️ OAU Campus — Live</h4>
                    <div className="map-legend">
                      <div className="leg"><div className="leg-dot" style={{ background: 'var(--brain)' }}></div>Open</div>
                      <div className="leg"><div className="leg-dot" style={{ background: '#c0392b' }}></div>Full</div>
                      <div className="leg"><div className="leg-dot" style={{ background: 'var(--faint)' }}></div>No power</div>
                    </div>
                  </div>
                  <div className="map-area" style={{ minHeight: '220px' }}>
                    {venues.map(v => (
                      <div key={v.id} className="pin" style={{ top: v.top, left: v.left, cursor: 'pointer', border: selectedVenue?.id === v.id ? '2px solid var(--grid)' : '1px solid var(--border)' }} onClick={() => setSelectedVenue(v)}>
                        <div className="pin-dot" style={{ background: v.color }}></div>{v.short}
                      </div>
                    ))}
                  </div>
                  <div className="venue-rows">
                    {venues.map(v => (
                      <div className="venue-row" key={v.id} onClick={() => setSelectedVenue(v)} style={{ cursor: 'pointer', border: selectedVenue?.id === v.id ? '1.5px solid var(--grid)' : '1px solid var(--border)' }}>
                        <span>{v.name}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div className="crowd-bar">
                            {[1,2,3,4,5].map(i => <div key={i} className={`cseg ${i <= v.crowd ? 'on' : ''}`}></div>)}
                          </div>
                          {v.power ? <span className="venue-tag">⚡ Power</span> : <span style={{ fontSize: '0.7rem', color: '#c0392b', fontWeight: 600 }}>No Power</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Venue Detail */}
              {selectedVenue && (
                <div style={{ marginTop: '1rem', background: 'var(--surface)', border: '1px solid var(--grid-border)', borderRadius: '16px', padding: '1.5rem' }}>
                  <h4 style={{ fontFamily: 'Fraunces, serif', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{selectedVenue.name}</h4>
                  <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
                    <span>👥 {crowdLabel(selectedVenue.crowd)}</span>
                    <span>{selectedVenue.power ? '⚡ Power available' : '🔌 No power'}</span>
                    <span>🔊 Noise: {selectedVenue.noise <= 1 ? 'Quiet' : selectedVenue.noise <= 2 ? 'Moderate' : 'Loud'}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right column */}
            <div>
              {/* Features */}
              <div className="grid-feats">
                <div className="gf"><div className="gf-icon">⚡</div><h4>Power Alerts</h4><p>3+ reports of no power triggers instant push notifications.</p></div>
                <div className="gf"><div className="gf-icon">👥</div><h4>Study Pods</h4><p>Broadcast: "Space at BOO-C, MTH 102, 3 slots." Others join with one tap.</p></div>
                <div className="gf"><div className="gf-icon">📊</div><h4>Live Status</h4><p>Crowd level, noise level, power status — aggregated from check-ins.</p></div>
                <div className="gf"><div className="gf-icon">🔮</div><h4>Predictive (Phase 2)</h4><p>Historical check-ins predict which venues will be free.</p></div>
              </div>

              {/* Check-in button */}
              <button onClick={() => setShowCheckin(!showCheckin)} className="btn-dark" style={{ width: '100%', marginTop: '1.5rem', border: 'none', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', textAlign: 'center' }}>
                {showCheckin ? '✕ Cancel' : '📍 Check In to a Venue'}
              </button>

              {showCheckin && (
                <form onSubmit={handleCheckin} style={{ marginTop: '1rem', background: 'var(--grid-bg)', border: '1px solid var(--grid-border)', borderRadius: '16px', padding: '1.5rem' }}>
                  <h4 style={{ fontFamily: 'Fraunces, serif', marginBottom: '1rem', color: 'var(--grid)' }}>Check In</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <select value={checkin.venueId} onChange={e => setCheckin({ ...checkin, venueId: Number(e.target.value) })} style={{ padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border2)', fontFamily: 'DM Sans, sans-serif' }}>
                      {venues.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                    </select>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <label style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>Crowd: <input type="range" min="1" max="5" value={checkin.crowd} onChange={e => setCheckin({ ...checkin, crowd: Number(e.target.value) })} /> {checkin.crowd}/5</label>
                      <label style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>Noise: <input type="range" min="1" max="3" value={checkin.noise} onChange={e => setCheckin({ ...checkin, noise: Number(e.target.value) })} /> {checkin.noise}/3</label>
                    </div>
                    <label style={{ fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><input type="checkbox" checked={checkin.power} onChange={e => setCheckin({ ...checkin, power: e.target.checked })} /> Power available</label>
                    <button type="submit" className="btn-dark" style={{ border: 'none', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>Submit Check-In</button>
                  </div>
                </form>
              )}

              {/* Study Pods */}
              <div style={{ marginTop: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ fontFamily: 'Fraunces, serif', fontSize: '1rem' }}>Active Study Pods</h4>
                  <button onClick={() => setShowPodForm(!showPodForm)} style={{ padding: '0.35rem 0.75rem', borderRadius: '8px', border: '1px solid var(--grid-border)', background: 'var(--grid-bg)', color: 'var(--grid)', fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>+ New Pod</button>
                </div>

                {showPodForm && (
                  <form onSubmit={handlePodPost} style={{ background: 'var(--grid-bg)', border: '1px solid var(--grid-border)', borderRadius: '12px', padding: '1rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <select value={newPod.venue} onChange={e => setNewPod({ ...newPod, venue: e.target.value })} style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border2)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem' }}>
                        {venues.map(v => <option key={v.id} value={v.short}>{v.short}</option>)}
                      </select>
                      <input value={newPod.course} onChange={e => setNewPod({ ...newPod, course: e.target.value })} placeholder="Course (e.g. MTH 102)" required style={{ flex: 1, padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border2)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem' }} />
                      <input type="number" min={1} max={8} value={newPod.slots} onChange={e => setNewPod({ ...newPod, slots: Number(e.target.value) })} style={{ width: '50px', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border2)', fontFamily: 'DM Sans, sans-serif' }} />
                      <button type="submit" style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', background: 'var(--grid)', color: '#fff', fontWeight: 700, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem' }}>Post</button>
                    </div>
                  </form>
                )}

                {pods.map(p => (
                  <div key={p.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1rem', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{p.venue} — {p.course}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>by {p.creator} · {p.slots} slots · expires in {p.expiresIn} min</div>
                    </div>
                    {joinedPods.includes(p.id) ? (
                      <span style={{ fontSize: '0.78rem', color: 'var(--brain)', fontWeight: 700 }}>✓ Joined</span>
                    ) : (
                      <button onClick={() => setJoinedPods(j => [...j, p.id])} style={{ padding: '0.4rem 0.85rem', borderRadius: '8px', border: 'none', background: 'var(--grid)', color: '#fff', fontWeight: 700, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem' }}>Join</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Waitlist */}
          <div className="waitlist-box" style={{ marginTop: '3rem' }}>
            <div><h3>Be first on Space Grid.</h3><p>Drop your email to get early access and updates.</p></div>
            <div className="wl-form">
              <input className="wl-input" type="email" placeholder="your.email@oauife.edu.ng" value={email} onChange={e => setEmail(e.target.value)} disabled={waitlisted} />
              <button className="wl-btn" onClick={() => { if (email) setWaitlisted(true) }} style={{ background: waitlisted ? '#d4eee1' : '#fff', color: waitlisted ? 'var(--brain)' : 'var(--grid)' }}>
                {waitlisted ? '✓ You\'re on the list!' : 'Join Waitlist'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
