'use client'
import { useEffect } from 'react'

export default function Modal({ ai, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handler = e => { if(e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handler) }
  }, [])

  return (
    <div className="modal-overlay open" onClick={e=>{ if(e.target===e.currentTarget) onClose() }}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-header">
          <div className="modal-icon">{ai.logo}</div>
          <div>
            <div className="modal-title">{ai.name}</div>
            <div className="modal-subtitle">{ai.maker}</div>
          </div>
        </div>

        <div className="modal-sec">
          <h4>SOBRE</h4>
          <p>{ai.about}</p>
        </div>

        <div className="modal-sec">
          <h4>ESPECIFICAÇÕES</h4>
          <div className="modal-specs">
            {ai.specs.map(s=>(
              <div key={s.l} className="spec-item">
                <div className="spec-label">{s.l}</div>
                <div className="spec-value">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-sec">
          <h4>PRÓS & CONTRAS</h4>
          <div className="modal-pros-cons">
            <div className="pros">
              <h5>✓ Pontos Fortes</h5>
              <ul>{ai.pros.map(p=><li key={p}>{p}</li>)}</ul>
            </div>
            <div className="cons">
              <h5>✗ Pontos Fracos</h5>
              <ul>{ai.cons.map(c=><li key={c}>{c}</li>)}</ul>
            </div>
          </div>
        </div>

        <a href={ai.url} target="_blank" rel="noopener" className="btn btn-primary btn-sm">
          Acessar {ai.name} →
        </a>
      </div>
    </div>
  )
}