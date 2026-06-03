import { useState, useRef, useEffect } from 'react'

const COURSES = [
  { code: 'MTH 102', name: 'Calculus' },
  { code: 'CHM 201', name: 'Organic Chemistry' },
  { code: 'PHY 101', name: 'Mechanics' },
  { code: 'CSC 201', name: 'Data Structures' },
  { code: 'ENG 201', name: 'Thermodynamics' },
]

const AI_RESPONSES = {
  'MTH 102': [
    'Based on past questions from 2019–2023, Prof. Adekunle favours piecewise functions where you must verify continuity at the boundary point using left-limit, right-limit, and function value.',
    'Common structure: "Find the value of k such that f(x) is continuous at x = 2…"',
    '**Drill Question (2022 style):**\n\nGiven f(x) = { 3x + k, x < 2 ; x² − 1, x ≥ 2 }, find k such that f is continuous at x = 2. Show all working using the three-condition test. ⏱ 8 min suggested.',
  ],
  'CHM 201': [
    'Prof. Ogunlade consistently tests nomenclature of cyclic compounds and reaction mechanisms involving SN1 vs SN2 pathways.',
    'Focus on: stereochemistry, optical isomerism, and functional group interconversions. These appear in 80% of past exams.',
  ],
  'PHY 101': [
    'Newton\'s laws application problems dominate. Expect inclined plane + pulley system questions with friction coefficients.',
    'Prof. Bakare loves asking: "Two blocks of mass m1 and m2 are connected by a light string over a frictionless pulley…"',
  ],
  'CSC 201': [
    'Binary search tree traversals (in-order, pre-order, post-order) and time complexity analysis are exam staples.',
    'Practice: Given a sequence of insertions, draw the resulting BST and show the output of each traversal method.',
  ],
  'ENG 201': [
    'First and second law applications to closed systems. Expect problems involving ideal gas processes (isothermal, adiabatic).',
    'Key formula patterns: ΔU = Q - W, and PV diagrams with area calculations for work done.',
  ],
}

const EXAM_QUESTIONS = {
  'MTH 102': { q: 'Find the value of k such that f(x) = { 2x + k, x < 3 ; x² − 2, x ≥ 3 } is continuous at x = 3.', answer: 'k = 1', time: 480 },
  'CHM 201': { q: 'Draw the mechanism for the SN2 reaction of 1-bromobutane with NaOH. Show the transition state.', answer: 'Backside attack, Walden inversion', time: 600 },
  'PHY 101': { q: 'A 5 kg block on a 30° incline (μ = 0.3) is connected via a pulley to a 3 kg hanging mass. Find acceleration.', answer: 'a ≈ 0.49 m/s²', time: 600 },
  'CSC 201': { q: 'Insert the following keys into an empty BST: 50, 30, 70, 20, 40, 60, 80. Perform in-order traversal.', answer: '20, 30, 40, 50, 60, 70, 80', time: 300 },
  'ENG 201': { q: 'An ideal gas undergoes isothermal expansion from 2L to 6L at 300K. Calculate work done if n = 1 mol.', answer: 'W = nRT ln(V2/V1) ≈ 2740 J', time: 480 },
}

export default function OAUBrain() {
  const [course, setCourse] = useState('MTH 102')
  const [mode, setMode] = useState('study')
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [examActive, setExamActive] = useState(false)
  const [examTime, setExamTime] = useState(0)
  const [examAnswer, setExamAnswer] = useState('')
  const [examGraded, setExamGraded] = useState(null)
  const [weakPoints, setWeakPoints] = useState({ correct: 7, total: 10 })
  const msgsEnd = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    msgsEnd.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (examActive && examTime > 0) {
      timerRef.current = setTimeout(() => setExamTime(t => t - 1), 1000)
      return () => clearTimeout(timerRef.current)
    }
    if (examActive && examTime === 0) {
      handleGrade()
    }
  }, [examActive, examTime])

  const sendMessage = () => {
    if (!input.trim()) return
    const userMsg = { role: 'user', text: input }
    setMessages(m => [...m, userMsg])
    setInput('')
    setTyping(true)

    const responses = AI_RESPONSES[course] || ['I can help with that course. Ask me about past questions, concepts, or exam patterns.']
    const responseIdx = messages.filter(m => m.role === 'ai').length % responses.length
    
    setTimeout(() => {
      setMessages(m => [...m, { role: 'ai', text: responses[responseIdx] }])
      setTyping(false)
    }, 1200)
  }

  const startExam = () => {
    const eq = EXAM_QUESTIONS[course]
    setExamActive(true)
    setExamTime(eq.time)
    setExamAnswer('')
    setExamGraded(null)
    setMessages([{ role: 'ai', text: `**EXAM MODE — ${course}**\n\n${eq.q}\n\n⏱ Time: ${Math.floor(eq.time / 60)} minutes` }])
  }

  const handleGrade = () => {
    clearTimeout(timerRef.current)
    setExamActive(false)
    const eq = EXAM_QUESTIONS[course]
    const passed = examAnswer.trim().length > 5
    if (passed) setWeakPoints(w => ({ correct: w.correct + 1, total: w.total + 1 }))
    else setWeakPoints(w => ({ ...w, total: w.total + 1 }))
    setExamGraded(passed)
    setMessages(m => [...m,
      { role: 'user', text: examAnswer || '(no answer submitted)' },
      { role: 'ai', text: passed ? `✅ **Answer received.** Expected: ${eq.answer}\n\nYour response shows understanding. Score logged to your Weak Point Detector.` : `⚠️ **Time's up or insufficient answer.** Expected: ${eq.answer}\n\nThis topic has been flagged in your Weak Point Detector for extra practice.` }
    ])
  }

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  return (
    <main style={{ paddingTop: '5rem' }}>
      <section id="brain" style={{ background: 'var(--brain-bg)', padding: '4rem 2rem 3rem' }}>
        <div className="container">
          <div className="section-eyebrow" style={{ color: 'var(--brain)' }}>Module 02 · OAU Brain</div>
          <h2 className="section-title">Your AI tutor knows <em style={{ color: 'var(--brain)' }}>your exams.</em></h2>
          <p className="section-desc">Generic AI tools are useless for Nigerian university exams. OAU Brain is trained on your department's past questions, lecture handouts, and senior students' annotated notes.</p>
        </div>
      </section>

      <section style={{ padding: '3rem 2rem' }}>
        <div className="container">
          <div className="two-col" style={{ alignItems: 'start' }}>
            {/* Left: Features + Weak Point */}
            <div>
              <ul className="brain-feats">
                <li><div className="bfeat-icon">📚</div><div className="bfeat-text"><h4>Course-Scoped Chat</h4><p>Select any course. Every conversation is scoped to that course's OAU-specific knowledge base.</p></div></li>
                <li><div className="bfeat-icon">🎯</div><div className="bfeat-text"><h4>Weak Point Detector</h4><p>Tracks which question types you get wrong. Auto-generates custom drill sessions targeting your exact gaps.</p></div></li>
                <li><div className="bfeat-icon">📖</div><div className="bfeat-text"><h4>Community Question Bank</h4><p>Searchable past exam questions per course per year, community-contributed and admin-verified.</p></div></li>
                <li><div className="bfeat-icon">⚡</div><div className="bfeat-text"><h4>RAG Architecture</h4><p>Retrieval Augmented Generation — not hallucination. Every answer is grounded in actual OAU material.</p></div></li>
              </ul>

              {/* Weak Point Detector */}
              <div style={{ marginTop: '2rem', background: 'var(--surface)', border: '1px solid var(--brain-border)', borderRadius: '20px', padding: '1.5rem' }}>
                <h4 style={{ fontFamily: 'Fraunces, serif', fontSize: '1rem', marginBottom: '1rem', color: 'var(--brain)' }}>🎯 Weak Point Detector</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Accuracy</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--brain)' }}>{Math.round((weakPoints.correct / weakPoints.total) * 100)}%</span>
                </div>
                <div style={{ height: '8px', background: 'var(--brain-bg)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(weakPoints.correct / weakPoints.total) * 100}%`, background: 'var(--brain)', borderRadius: '4px', transition: 'width 0.5s' }}></div>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.5rem' }}>{weakPoints.correct}/{weakPoints.total} questions answered correctly</div>
              </div>
            </div>

            {/* Right: Chat */}
            <div>
              {/* Course + Mode selector */}
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <select value={course} onChange={e => { setCourse(e.target.value); setMessages([]); setExamActive(false) }} style={{ padding: '0.5rem 1rem', borderRadius: '10px', border: '1px solid var(--brain-border)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', background: 'var(--brain-bg)', color: 'var(--brain)', fontWeight: 600 }}>
                  {COURSES.map(c => <option key={c.code} value={c.code}>{c.code} · {c.name}</option>)}
                </select>
                <button onClick={() => { setMode('study'); setExamActive(false); setMessages([]) }} style={{ padding: '0.5rem 1rem', borderRadius: '10px', border: mode === 'study' ? '1.5px solid var(--brain)' : '1.5px solid var(--border2)', background: mode === 'study' ? 'var(--brain-bg)' : 'var(--surface)', color: mode === 'study' ? 'var(--brain)' : 'var(--muted)', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>💡 Study</button>
                <button onClick={() => { setMode('exam'); setMessages([]); startExam() }} style={{ padding: '0.5rem 1rem', borderRadius: '10px', border: mode === 'exam' ? '1.5px solid #c0392b' : '1.5px solid var(--border2)', background: mode === 'exam' ? '#fff5f5' : 'var(--surface)', color: mode === 'exam' ? '#c0392b' : 'var(--muted)', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}>⏱️ Exam</button>
              </div>

              {/* Chat card */}
              <div className="chat-card">
                <div className="chat-top">
                  <div className="chat-avatar">🧠</div>
                  <div className="chat-top-info"><h4>OAU Brain</h4><span>{course} · {COURSES.find(c => c.code === course)?.name}</span></div>
                  <div className="chat-mode" style={{ background: mode === 'exam' ? '#c0392b' : 'var(--brain)' }}>{mode === 'exam' ? 'Exam Mode' : 'Study Mode'}</div>
                </div>

                {/* Timer */}
                {examActive && (
                  <div style={{ background: '#fff5f5', padding: '0.75rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#c0392b' }}>⏱ {formatTime(examTime)}</span>
                    <button onClick={handleGrade} style={{ padding: '0.35rem 1rem', borderRadius: '8px', border: 'none', background: '#c0392b', color: '#fff', fontWeight: 700, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem' }}>Submit Answer</button>
                  </div>
                )}

                <div className="chat-msgs" style={{ minHeight: '280px', maxHeight: '400px', overflowY: 'auto' }}>
                  {messages.length === 0 && !examActive && (
                    <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--faint)' }}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🧠</div>
                      <p style={{ fontSize: '0.88rem' }}>Ask OAU Brain about {course}...</p>
                    </div>
                  )}
                  {messages.map((msg, i) => (
                    <div className={`msg ${msg.role === 'user' ? 'user' : 'ai'}`} key={i}>
                      <div className="lbl">{msg.role === 'user' ? 'You' : 'OAU Brain'}</div>
                      {msg.text.split('\n').map((line, j) => <span key={j}>{line}<br /></span>)}
                    </div>
                  ))}
                  {typing && <div className="msg ai"><div className="lbl">OAU Brain</div><em style={{ color: 'var(--faint)' }}>Thinking...</em></div>}
                  <div ref={msgsEnd}></div>
                </div>

                {/* Input */}
                {examActive ? (
                  <div style={{ margin: '0 1.5rem 1.25rem' }}>
                    <textarea value={examAnswer} onChange={e => setExamAnswer(e.target.value)} placeholder="Type your answer here..." rows={3} style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--border)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', resize: 'vertical' }}></textarea>
                  </div>
                ) : (
                  <div className="chat-input-row">
                    <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder={`Ask about ${course}...`} style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: 'var(--text)' }} />
                    <button className="chat-send" onClick={sendMessage}>↑</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODES */}
      <div className="modes-section">
        <div className="modes-grid container">
          <div className="mode-card study">
            <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>💡</div>
            <h3>Study Mode</h3>
            <p>Deep understanding first. OAU Brain walks you through methodology, hints, and step-by-step breakdowns.</p>
            <ul><li>Step-by-step hint system</li><li>Methodology explanations</li><li>LaTeX and Markdown rendering</li><li>Linked to community question bank</li></ul>
          </div>
          <div className="mode-card exam">
            <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>⏱️</div>
            <h3>Exam Mode</h3>
            <p>Simulate real exam conditions. Timed, no hints, graded instantly from the OAU-specific question bank.</p>
            <ul><li>Timed sessions with countdown</li><li>Zero hints — exam discipline</li><li>Instant AI grading and feedback</li><li>Score feeds into Weak Point Detector</li></ul>
          </div>
        </div>
      </div>
    </main>
  )
}
