'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function AICard({ ai, delay = 0, onClick }) {
  const [visible, setVisible] = useState(false)
  const [voted, setVoted] = useState(false)
  const [votes, setVotes] = useState(0)

  useEffect(() => {
    setTimeout(() => setVisible(true), delay)
    const v = localStorage.getItem('voted_' + ai.id)
    setVoted(!!v)

    async function fetchVotes() {
      const { count } = await supabase
        .from('votes')
        .select('*', { count: 'exact', head: true })
        .eq('ai_id', ai.id)
      setVotes(count || 0)
    }
    fetchVotes()
  }, [])

  async function handleVote(e) {
    e.stopPropagation()
    if (voted) return
    const { error } = await supabase
      .from('votes')
      .insert({ ai_id: ai.id })
    if (!error) {
      localStorage.setItem('voted_' + ai.id, '1')
      setVotes(v => v + 1)
      setVoted(true)
    }
  }

  return (
    <div
      className="ai-card"
      style={{
        '--card-accent': ai.accent,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity .4s, transform .4s, border-color .25s'
      }}
      onClick={onClick}
    >
      <div className="ai-card-header">
        <div className="ai-logo">{ai.logo}</div>
        <div>
          <div className="ai-name">{ai.name}</div>
          <div className="ai-maker">{ai.maker}</div>
        </div>
        <div className="ai-badge">{ai.badge}</div>
      </div>

      <p className="ai-desc">{ai.desc}</p>

      <div className="ai-tags">
        {ai.tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>

      <div className="usage-bar">
        <span className="usage-bar-label">USO</span>
        <div className="bar-track">
          <div className="bar-fill" style={{width: visible ? ai.pct+'%' : '0%', transition:'width 1.2s ease'}}/>
        </div>
        <span className="bar-pct">{ai.pct}%</span>
      </div>

      <div className="vote-row">
        <button className={`vote-btn ${voted?'voted':''}`} onClick={handleVote}>
          🔥 {voted ? 'Votado' : 'Votar favorita'}
        </button>
        <span className="vote-count">{votes} votos</span>
      </div>

      <p style={{marginTop:'.7rem',fontFamily:'Space Mono,monospace',fontSize:'.57rem',color:'var(--muted)',opacity:.4}}>
        ↗ clique para detalhes
      </p>
    </div>
  )
}