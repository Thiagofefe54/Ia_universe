'use client'
import { useState } from 'react'
import { GLOSS_TERMS } from '../../lib/data'

export default function Glossario() {
  const [search, setSearch] = useState('')
  const filtered = GLOSS_TERMS.filter(g =>
    !search || g.t.toLowerCase().includes(search.toLowerCase()) || g.d.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <div className="page-hero">
        <p className="breadcrumb"><a href="/">Início</a> / Glossário</p>
        <h1>📖 Glossário de IA</h1>
        <p>Os principais termos do mundo da IA explicados em português simples.</p>
      </div>
      <div style={{padding:'2rem 5vw 5rem'}}>
        <div style={{position:'relative',maxWidth:420,marginBottom:'1.5rem'}}>
          <span style={{position:'absolute',left:'.9rem',top:'50%',transform:'translateY(-50%)',color:'var(--muted)'}}>🔎</span>
          <input className="search-input" placeholder="Buscar termo..." value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
        <p style={{fontFamily:'Space Mono,monospace',fontSize:'.65rem',color:'var(--muted)',marginBottom:'1.5rem'}}>{filtered.length} termos</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'1rem'}}>
          {filtered.map(g=>(
            <div key={g.t} style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:10,padding:'1.2rem',transition:'border-color .2s'}}
              onMouseEnter={e=>e.currentTarget.style.borderColor='var(--accent3)'}
              onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
              <div style={{fontSize:'1rem',fontWeight:800,color:'var(--accent)',marginBottom:'.35rem'}}>{g.t}</div>
              <div style={{color:'var(--muted)',fontSize:'.84rem',lineHeight:1.62}}>{g.d}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}