'use client'
import { useState } from 'react'
import { AI_DATA } from '../../lib/data'
import AICard from '../../components/AICard'
import Modal from '../../components/Modal'

export default function IAs() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [selectedAI, setSelectedAI] = useState(null)

  const filters = ['all','texto','código','imagem','vídeo','pesquisa','voz','open-source']

  const filtered = AI_DATA.filter(ai => {
    const matchFilter = filter === 'all' || ai.cats.includes(filter)
    const matchSearch = !search || ai.name.toLowerCase().includes(search.toLowerCase()) || ai.cats.includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <>
      <div className="page-hero">
        <p className="breadcrumb"><a href="/">Início</a> / Catálogo</p>
        <h1>🤖 Catálogo de IAs</h1>
        <p>20+ IAs com detalhes, prós, contras e votação. Filtre e vote na sua favorita!</p>
      </div>

      <div style={{padding:'2rem 5vw 1rem',display:'flex',gap:'.8rem'}}>
        <div style={{position:'relative',flex:1}}>
          <span style={{position:'absolute',left:'.9rem',top:'50%',transform:'translateY(-50%)',color:'var(--muted)'}}>🔎</span>
          <input className="search-input" placeholder="Buscar por nome ou categoria..." value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
      </div>

      <div style={{padding:'0 5vw 1.5rem',display:'flex',gap:'.6rem',flexWrap:'wrap'}}>
        {filters.map(f=>(
          <button key={f} className={`filter-btn ${filter===f?'active':''}`} onClick={()=>setFilter(f)}>
            {f==='all'?'Todas':f}
          </button>
        ))}
      </div>

      <div className="grid-3">
        {filtered.map((ai,i) => (
          <AICard key={ai.id} ai={ai} delay={i*80} onClick={()=>setSelectedAI(ai)}/>
        ))}
      </div>

      {filtered.length===0 && (
        <p style={{textAlign:'center',padding:'3rem',color:'var(--muted)'}}>😅 Nenhuma IA encontrada!</p>
      )}

      {selectedAI && <Modal ai={selectedAI} onClose={()=>setSelectedAI(null)}/>}
    </>
  )
}