export default function Ticker() {
  const items = [
    'Skill Barter', 'Credit Economy', 'OAU Brain', 'RAG Pipeline',
    'Space Grid', 'Live Campus Map', 'React + Supabase', 'Vector Search',
  ]
  const doubled = [...items, ...items]

  return (
    <div className="ticker-wrap">
      <div className="ticker">
        {doubled.map((item, i) => (
          <span className="ticker-item" key={i}>{item}</span>
        ))}
      </div>
    </div>
  )
}
