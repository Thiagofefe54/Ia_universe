'use client'

const rows = [
  {name:'🟢 ChatGPT / GPT-5',  texto:'S',codigo:'A',imagem:'A',pesquisa:'B',raciocinio:'S',open:'❌',preco:'Free / $20'},
  {name:'🟠 Claude Sonnet/Opus',texto:'S',codigo:'S',imagem:'C',pesquisa:'B',raciocinio:'S',open:'❌',preco:'Free / $20'},
  {name:'🔵 Gemini Pro',        texto:'A',codigo:'B',imagem:'B',pesquisa:'S',raciocinio:'A',open:'❌',preco:'Free / $20'},
  {name:'🦙 Llama 3.3',         texto:'A',codigo:'A',imagem:'C',pesquisa:'C',raciocinio:'A',open:'✅',preco:'100% Free'},
  {name:'🐋 DeepSeek V3',       texto:'A',codigo:'S',imagem:'C',pesquisa:'C',raciocinio:'S',open:'✅',preco:'100% Free'},
  {name:'⚡ Grok 4',            texto:'A',codigo:'B',imagem:'B',pesquisa:'S',raciocinio:'B',open:'❌',preco:'Free / $16'},
  {name:'🎨 Midjourney V7',     texto:'C',codigo:'C',imagem:'S',pesquisa:'C',raciocinio:'C',open:'❌',preco:'$10/mês'},
  {name:'💻 GitHub Copilot',    texto:'C',codigo:'S',imagem:'C',pesquisa:'C',raciocinio:'A',open:'❌',preco:'Free*/$10'},
  {name:'🖱️ Cursor AI',         texto:'C',codigo:'S',imagem:'C',pesquisa:'C',raciocinio:'S',open:'❌',preco:'Free/$20'},
  {name:'🔍 Perplexity',        texto:'B',codigo:'C',imagem:'C',pesquisa:'S',raciocinio:'B',open:'❌',preco:'Free/$20'},
]

const scoreStyle = {
  S:{background:'rgba(74,222,128,.15)',color:'#4ade80'},
  A:{background:'rgba(0,229,255,.12)',color:'var(--accent)'},
  B:{background:'rgba(251,191,36,.12)',color:'#fbbf24'},
  C:{background:'rgba(156,163,175,.12)',color:'#9ca3af'},
}

const best = [
  {cat:'💬 Texto Geral',  winner:'ChatGPT / Claude'},
  {cat:'💻 Código',       winner:'Claude / Cursor'},
  {cat:'🎨 Imagem',       winner:'Midjourney'},
  {cat:'🔍 Pesquisa',     winner:'Perplexity / Gemini'},
  {cat:'🆓 Melhor Free',  winner:'DeepSeek / Llama'},
  {cat:'🎓 Estudante',    winner:'GitHub Copilot'},
]

export default function Comparar() {
  return (
    <>
      <div className="page-hero">
        <p className="breadcrumb"><a href="/">Início</a> / Comparar</p>
        <h1>⚖️ Comparar IAs</h1>
        <p>Análise lado a lado. S = Excepcional · A = Ótimo · B = Bom · C = Básico</p>
      </div>

      <div style={{padding:'2rem 5vw 1rem',overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse',minWidth:600}}>
          <thead>
            <tr>
              {['IA','Texto','Código','Imagem','Pesquisa','Raciocínio','Open Source','Preço'].map(h=>(
                <th key={h} style={{background:'var(--surface)',padding:'.9rem',fontFamily:'Space Mono,monospace',fontSize:'.65rem',letterSpacing:'.07em',color:'var(--muted)',borderBottom:'1px solid var(--border)',textAlign:h==='IA'?'left':'center'}}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(row=>(
              <tr key={row.name}
                onMouseEnter={e=>[...e.currentTarget.cells].forEach(c=>c.style.background='var(--surface)')}
                onMouseLeave={e=>[...e.currentTarget.cells].forEach(c=>c.style.background='var(--card)')}>
                <td style={{padding:'.8rem .9rem',borderBottom:'1px solid var(--border)',fontWeight:700,fontSize:'.85rem',background:'var(--card)',transition:'background .15s'}}>{row.name}</td>
                {['texto','codigo','imagem','pesquisa','raciocinio'].map(k=>(
                  <td key={k} style={{padding:'.8rem',borderBottom:'1px solid var(--border)',textAlign:'center',background:'var(--card)',transition:'background .15s'}}>
                    <span style={{...scoreStyle[row[k]],padding:'.1rem .4rem',borderRadius:3,fontFamily:'Space Mono,monospace',fontSize:'.67rem',fontWeight:700}}>
                      {row[k]}
                    </span>
                  </td>
                ))}
                <td style={{padding:'.8rem',borderBottom:'1px solid var(--border)',textAlign:'center',background:'var(--card)',fontSize:'.85rem'}}>{row.open}</td>
                <td style={{padding:'.8rem',borderBottom:'1px solid var(--border)',textAlign:'center',background:'var(--card)',fontFamily:'Space Mono,monospace',fontSize:'.68rem',color:'var(--muted)'}}>{row.preco}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{fontFamily:'Space Mono,monospace',fontSize:'.6rem',color:'var(--muted)',marginTop:'.8rem'}}>* Copilot gratuito para estudantes via GitHub Student Pack</p>
      </div>

      <div style={{padding:'2rem 5vw 5rem'}}>
        <h3 style={{fontSize:'1.1rem',fontWeight:800,marginBottom:'1.2rem'}}>🏆 Melhores por Categoria</h3>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'.8rem'}}>
          {best.map(b=>(
            <div key={b.cat}
              style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:8,padding:'1rem',transition:'border-color .25s'}}
              onMouseEnter={e=>e.currentTarget.style.borderColor='var(--accent)'}
              onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
              <div style={{fontFamily:'Space Mono,monospace',fontSize:'.62rem',color:'var(--muted)',marginBottom:'.4rem'}}>{b.cat}</div>
              <div style={{fontWeight:800,color:'var(--accent)'}}>{b.winner}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}