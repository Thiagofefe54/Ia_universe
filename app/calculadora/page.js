'use client'
import { useState } from 'react'

const prices = {
  chatgpt:   {usd:20,free:true,fl:40,name:'ChatGPT Plus'},
  claude:    {usd:20,free:true,fl:30,name:'Claude Pro'},
  gemini:    {usd:20,free:true,fl:999,name:'Gemini Advanced'},
  grok:      {usd:16,free:true,fl:20,name:'Grok Premium'},
  midjourney:{usd:10,free:false,fl:0,name:'Midjourney Basic'},
  copilot:   {usd:10,free:true,fl:50,name:'GitHub Copilot'},
  perplexity:{usd:20,free:true,fl:999,name:'Perplexity Pro'},
  cursor:    {usd:20,free:true,fl:50,name:'Cursor Pro'},
  llama:     {usd:0,free:true,fl:9999,name:'Llama (Open Source)'},
  deepseek:  {usd:0,free:true,fl:9999,name:'DeepSeek (Open Source)'},
}

const BRL = 5.05

export default function Calculadora() {
  const [ai, setAi] = useState('chatgpt')
  const [msgs, setMsgs] = useState(20)
  const [users, setUsers] = useState(1)
  const [cur, setCur] = useState('brl')

  const p = prices[ai]
  const sym = cur === 'brl' ? 'R$' : '$'
  const rate = cur === 'brl' ? BRL : 1
  const monthly = msgs * 30 * users
  const total = p.usd * users
  const totalC = (total * rate).toFixed(2)
  const yearC = (total * rate * 12).toFixed(2)
  const note = p.usd === 0 ? '✅ Modelo 100% gratuito e open-source!' : p.free && msgs * users <= p.fl ? '✅ Seu uso cabe no plano GRATUITO!' : '💡 Verifique o plano free antes de assinar o Pro.'

  const fieldStyle = {width:'100%',background:'var(--surface)',border:'1px solid var(--border)',borderRadius:6,padding:'.65rem .9rem',color:'var(--text)',fontFamily:'Syne,sans-serif',fontSize:'.9rem',outline:'none'}

  return (
    <>
      <div className="page-hero">
        <p className="breadcrumb"><a href="/">Início</a> / Calculadora</p>
        <h1>💸 Calculadora de Custo</h1>
        <p>Simule quanto vai custar usar IA no seu perfil e descubra se o free é suficiente.</p>
      </div>
      <div style={{padding:'2rem 5vw 5rem',maxWidth:700,margin:'0 auto'}}>
        <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:16,padding:'2rem'}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1rem',marginBottom:'1rem'}}>
            <div><label style={{fontFamily:'Space Mono,monospace',fontSize:'.65rem',color:'var(--muted)',display:'block',marginBottom:'.4rem'}}>QUAL IA?</label>
              <select value={ai} onChange={e=>setAi(e.target.value)} style={fieldStyle}>
                {Object.entries(prices).map(([k,v])=><option key={k} value={k}>{v.name}</option>)}
              </select>
            </div>
            <div><label style={{fontFamily:'Space Mono,monospace',fontSize:'.65rem',color:'var(--muted)',display:'block',marginBottom:'.4rem'}}>MSGS POR DIA</label>
              <input type="number" value={msgs} min={1} max={500} onChange={e=>setMsgs(Number(e.target.value))} style={fieldStyle}/>
            </div>
            <div><label style={{fontFamily:'Space Mono,monospace',fontSize:'.65rem',color:'var(--muted)',display:'block',marginBottom:'.4rem'}}>USUÁRIOS</label>
              <input type="number" value={users} min={1} max={50} onChange={e=>setUsers(Number(e.target.value))} style={fieldStyle}/>
            </div>
            <div><label style={{fontFamily:'Space Mono,monospace',fontSize:'.65rem',color:'var(--muted)',display:'block',marginBottom:'.4rem'}}>MOEDA</label>
              <select value={cur} onChange={e=>setCur(e.target.value)} style={fieldStyle}>
                <option value="brl">🇧🇷 BRL (R$)</option>
                <option value="usd">🇺🇸 USD ($)</option>
              </select>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))',gap:'.8rem',marginTop:'1.5rem'}}>
            {[{n:monthly.toLocaleString('pt-BR'),l:'MSGS/MÊS'},{n:`${sym}${totalC}`,l:'CUSTO/MÊS'},{n:`${sym}${yearC}`,l:'CUSTO/ANO'},{n:p.free?'✅ Sim':'❌ Não',l:'FREE TIER'}].map(s=>(
              <div key={s.l} style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:8,padding:'1rem',textAlign:'center'}}>
                <span style={{fontSize:'1.4rem',fontWeight:800,color:'var(--accent)',display:'block'}}>{s.n}</span>
                <span style={{fontFamily:'Space Mono,monospace',fontSize:'.6rem',color:'var(--muted)',marginTop:'.25rem',display:'block'}}>{s.l}</span>
              </div>
            ))}
          </div>
          <div style={{marginTop:'1rem',fontFamily:'Space Mono,monospace',fontSize:'.65rem',color:'var(--muted)',background:'var(--surface)',borderRadius:6,padding:'.75rem 1rem'}}>
            {note}
          </div>
        </div>
      </div>
    </>
  )
}