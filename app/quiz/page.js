'use client'
import { useState } from 'react'

const questions = [
  {q:'Qual é o seu principal objetivo ao usar IA?',
   opts:[{i:'💻',t:'Escrever e revisar código',k:'code'},{i:'✍️',t:'Criar textos e conteúdo',k:'text'},{i:'🎨',t:'Gerar imagens e artes',k:'image'},{i:'🔍',t:'Pesquisar informações',k:'search'}]},
  {q:'Você prefere pagar ou usar gratuitamente?',
   opts:[{i:'🆓',t:'Somente grátis!',k:'free'},{i:'💰',t:'Topo pagar se valer',k:'paid'},{i:'🎓',t:'Sou estudante',k:'student'},{i:'🔥',t:'Quero o melhor',k:'best'}]},
  {q:'Em qual área você trabalha ou estuda?',
   opts:[{i:'🖥️',t:'Tecnologia / Programação',k:'tech'},{i:'🎭',t:'Design / Criativo',k:'creative'},{i:'📊',t:'Negócios / Marketing',k:'business'},{i:'📚',t:'Educação / Pesquisa',k:'edu'}]},
  {q:'O que mais importa em uma IA pra você?',
   opts:[{i:'⚡',t:'Velocidade e praticidade',k:'speed'},{i:'🎯',t:'Precisão máxima',k:'accuracy'},{i:'🌐',t:'Informações em tempo real',k:'realtime'},{i:'🔓',t:'Liberdade / sem restrições',k:'freedom'}]},
]

const results = {
  dev_free: {i:'💻',n:'GitHub Copilot',w:'Dev + grátis = Copilot! Como estudante, você pega grátis via GitHub Student Pack. Integra direto no VSCode.'},
  dev_paid: {i:'🟠',n:'Claude (Anthropic)',w:'Para desenvolvimento sério, Claude é #1 em código. Contexto de 200K tokens e raciocínio técnico excepcional.'},
  image:    {i:'🎨',n:'Midjourney',w:'Para imagens artísticas, Midjourney é inigualável. Se quiser grátis, Stable Diffusion roda local no PC.'},
  search:   {i:'🔍',n:'Perplexity AI',w:'Para pesquisa com fontes reais, Perplexity é perfeito. Gratuito, cita fontes e tem dados em tempo real.'},
  opensource:{i:'🦙',n:'Llama 3.3',w:'Você quer liberdade! Llama é open-source, 100% grátis e roda local. Instale via Ollama no seu PC.'},
  realtime: {i:'⚡',n:'Grok (xAI)',w:'Para dados em tempo real, Grok é imbatível. Informações fresquinhas direto do X/Twitter.'},
  general:  {i:'🟢',n:'ChatGPT (GPT-5)',w:'Para uso geral equilibrado, ChatGPT ainda lidera. O free já resolve bastante do dia a dia.'},
}

export default function Quiz() {
  const [curQ, setCurQ] = useState(0)
  const [answers, setAnswers] = useState([])
  const [selected, setSelected] = useState(null)
  const [result, setResult] = useState(null)

  function handleNext() {
    const newAnswers = [...answers, selected]
    if (curQ < questions.length - 1) {
      setAnswers(newAnswers)
      setCurQ(curQ + 1)
      setSelected(null)
    } else {
      const a = newAnswers
      let r
      if(a.includes('image')||a.includes('creative')) r = results.image
      else if(a.includes('freedom')) r = results.opensource
      else if(a.includes('realtime')) r = results.realtime
      else if(a.includes('search')||a.includes('edu')) r = results.search
      else if((a.includes('code')||a.includes('tech'))&&(a.includes('free')||a.includes('student'))) r = results.dev_free
      else if(a.includes('code')||a.includes('tech')) r = results.dev_paid
      else r = results.general
      setResult(r)
    }
  }

  if (result) return (
    <>
      <div className="page-hero">
        <p className="breadcrumb"><a href="/">Início</a> / Quiz</p>
        <h1>🎯 Resultado!</h1>
      </div>
      <div style={{padding:'2rem 5vw 5rem',maxWidth:640,margin:'0 auto'}}>
        <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:16,padding:'2.5rem',textAlign:'center'}}>
          <div style={{fontSize:'3.5rem',marginBottom:'1rem'}}>{result.i}</div>
          <h2 style={{fontSize:'1.5rem',fontWeight:800,marginBottom:'.8rem'}}>Sua IA ideal: {result.n}</h2>
          <p style={{color:'var(--muted)',lineHeight:1.7,marginBottom:'2rem'}}>{result.w}</p>
          <div style={{display:'flex',gap:'1rem',justifyContent:'center',flexWrap:'wrap'}}>
            <button className="btn btn-primary" onClick={()=>{setCurQ(0);setAnswers([]);setSelected(null);setResult(null)}}>↺ Refazer</button>
            <a href="/ias" className="btn btn-secondary">Ver todas as IAs →</a>
          </div>
        </div>
      </div>
    </>
  )

  const q = questions[curQ]
  return (
    <>
      <div className="page-hero">
        <p className="breadcrumb"><a href="/">Início</a> / Quiz</p>
        <h1>🎯 Qual IA é pra você?</h1>
        <p>4 perguntas para descobrir a IA perfeita pro seu perfil.</p>
      </div>
      <div style={{padding:'2rem 5vw 5rem',maxWidth:640,margin:'0 auto'}}>
        <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:16,padding:'2rem'}}>
          <div style={{display:'flex',gap:'.4rem',marginBottom:'1.8rem'}}>
            {questions.map((_,i)=>(
              <div key={i} style={{flex:1,height:4,borderRadius:2,background:i<=curQ?'var(--accent)':'var(--border)',transition:'background .3s'}}/>
            ))}
          </div>
          <p style={{fontFamily:'Space Mono,monospace',fontSize:'.68rem',color:'var(--muted)',marginBottom:'.8rem'}}>{curQ+1} / {questions.length}</p>
          <p style={{fontSize:'1.1rem',fontWeight:700,marginBottom:'1.3rem',lineHeight:1.4}}>{q.q}</p>
          <div style={{display:'flex',flexDirection:'column',gap:'.7rem'}}>
            {q.opts.map(o=>(
              <button key={o.k}
                onClick={()=>setSelected(o.k)}
                style={{background:selected===o.k?'rgba(0,229,255,.06)':'var(--surface)',border:`1px solid ${selected===o.k?'var(--accent)':'var(--border)'}`,borderRadius:8,padding:'.9rem 1.1rem',cursor:'pointer',fontSize:'.9rem',textAlign:'left',color:selected===o.k?'var(--accent)':'var(--text)',transition:'all .2s',display:'flex',alignItems:'center',gap:'.75rem'}}>
                <span style={{fontSize:'1.2rem'}}>{o.i}</span>{o.t}
              </button>
            ))}
          </div>
          <div style={{display:'flex',justifyContent:'flex-end',marginTop:'1.5rem'}}>
            {selected && <button className="btn btn-primary" onClick={handleNext}>{curQ<questions.length-1?'Próximo →':'Ver resultado 🎯'}</button>}
          </div>
        </div>
      </div>
    </>
  )
}