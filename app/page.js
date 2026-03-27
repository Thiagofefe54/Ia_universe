'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function Home() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W, H, nodes = []
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    class Node {
      constructor() { this.x=Math.random()*W; this.y=Math.random()*H; this.vx=(Math.random()-.5)*.35; this.vy=(Math.random()-.5)*.35; this.r=Math.random()*1.8+.8 }
      update() { this.x+=this.vx; this.y+=this.vy; if(this.x<0||this.x>W)this.vx*=-1; if(this.y<0||this.y>H)this.vy*=-1 }
    }
    for(let i=0;i<50;i++) nodes.push(new Node())
    let raf
    const draw = () => {
      ctx.clearRect(0,0,W,H)
      nodes.forEach((n,i) => {
        n.update()
        ctx.beginPath(); ctx.arc(n.x,n.y,n.r,0,Math.PI*2); ctx.fillStyle='rgba(0,229,255,.5)'; ctx.fill()
        nodes.slice(i+1).forEach(m => {
          const d = Math.hypot(n.x-m.x,n.y-m.y)
          if(d<140){ ctx.beginPath(); ctx.moveTo(n.x,n.y); ctx.lineTo(m.x,m.y); ctx.strokeStyle=`rgba(0,229,255,${.12*(1-d/140)})`; ctx.lineWidth=.4; ctx.stroke() }
        })
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} style={{position:'fixed',inset:0,zIndex:0,opacity:.22,pointerEvents:'none'}}/>

      {/* HERO */}
      <section style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',padding:'7rem 5vw 5rem',position:'relative',zIndex:1}}>
        <p style={{fontFamily:'Space Mono,monospace',fontSize:'.68rem',letterSpacing:'.22em',color:'var(--accent)',marginBottom:'1.5rem',animation:'fadeUp .8s .3s both'}}>
          // O UNIVERSO DA INTELIGÊNCIA ARTIFICIAL
        </p>
        <h1 style={{fontSize:'clamp(2.8rem,10vw,8rem)',fontWeight:800,lineHeight:.95,letterSpacing:'-.03em',animation:'fadeUp .8s .5s both'}}>
          <span style={{display:'block'}}>Explore</span>
          <span style={{display:'block',color:'var(--accent)'}}>a IA</span>
          <span style={{display:'block',color:'var(--accent2)',fontStyle:'italic'}}>agora.</span>
        </h1>
        <p style={{maxWidth:480,margin:'2rem auto 0',fontSize:'1rem',color:'var(--muted)',lineHeight:1.75,animation:'fadeUp .8s .7s both'}}>
          Mais de 20 IAs catalogadas, comparadas e explicadas. Do ChatGPT ao Llama, tudo em um lugar só.
        </p>
        <div style={{display:'flex',gap:'1rem',marginTop:'2.5rem',justifyContent:'center',flexWrap:'wrap',animation:'fadeUp .8s .9s both'}}>
          <Link href="/ias" className="btn btn-primary">Ver todas as IAs →</Link>
          <Link href="/quiz" className="btn btn-secondary">Qual IA é pra mim?</Link>
        </div>
      </section>

      {/* STATS */}
      <div style={{borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)',padding:'2rem 5vw',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))',gap:'1.5rem',background:'var(--surface)',position:'relative',zIndex:1}}>
        {[{n:'20+',l:'IAS CATALOGADAS'},{n:'75+',l:'ANOS DE HISTÓRIA'},{n:'1800+',l:'BI USUÁRIOS'},{n:'184+',l:'BI USD INVESTIDOS'}].map(s=>(
          <div key={s.l} style={{textAlign:'center'}}>
            <span style={{fontSize:'2rem',fontWeight:800,color:'var(--accent)',display:'block'}}>{s.n}</span>
            <span style={{fontFamily:'Space Mono,monospace',fontSize:'.6rem',color:'var(--muted)',letterSpacing:'.1em'}}>{s.l}</span>
          </div>
        ))}
      </div>

      {/* CATEGORIAS */}
      <section style={{position:'relative',zIndex:1,padding:'4rem 5vw 5rem'}}>
        <p className="section-tag">// EXPLORE O SITE</p>
        <h2 style={{fontSize:'clamp(1.8rem,4vw,3rem)',fontWeight:800,letterSpacing:'-.02em',marginBottom:'2rem'}}>Tudo sobre IA<br/>em um lugar só</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(250px,1fr))',gap:'1rem'}}>
          {[
            {href:'/ias',icon:'🤖',title:'Catálogo de IAs',desc:'20+ IAs com busca, filtros e detalhes completos',color:'#00e5ff'},
            {href:'/historia',icon:'📜',title:'História da IA',desc:'De 1950 até hoje: linha do tempo completa',color:'#ff6b35'},
            {href:'/comparar',icon:'⚖️',title:'Comparar IAs',desc:'Tabela lado a lado com notas em cada categoria',color:'#7c3aed'},
            {href:'/como-funciona',icon:'⚙️',title:'Como Funciona',desc:'Redes neurais, Transformers, RLHF e mais',color:'#4ade80'},
            {href:'/quiz',icon:'🎯',title:'Quiz',desc:'Descubra qual IA é ideal pro seu perfil',color:'#fbbf24'},
            {href:'/calculadora',icon:'💸',title:'Calculadora',desc:'Simule o custo mensal de usar IA',color:'#f97316'},
            {href:'/glossario',icon:'📖',title:'Glossário',desc:'22 termos de IA em português simples',color:'#06b6d4'},
            {href:'/brasil',icon:'🇧🇷',title:'IAs Brasileiras',desc:'Modelos de IA desenvolvidos no Brasil',color:'#009c3b'},
          ].map(c=>(
            <Link key={c.href} href={c.href} style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:12,padding:'1.8rem',textDecoration:'none',color:'var(--text)',transition:'all .25s',display:'flex',alignItems:'flex-start',gap:'1rem',position:'relative',overflow:'hidden'}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=c.color;e.currentTarget.style.transform='translateY(-3px)'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.transform='translateY(0)'}}>
              <div style={{position:'absolute',top:0,left:0,right:0,height:3,background:c.color}}/>
              <span style={{fontSize:'2rem'}}>{c.icon}</span>
              <div>
                <div style={{fontSize:'1rem',fontWeight:800,marginBottom:'.3rem'}}>{c.title}</div>
                <div style={{fontSize:'.82rem',color:'var(--muted)',lineHeight:1.6}}>{c.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}