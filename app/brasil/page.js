const items = [
  {flag:'🦜',name:'Sabiá-3 (Maritaca AI)',origin:'Maritaca AI · USP / Unicamp',desc:'LLM brasileiro focado em PT-BR. Supera modelos internacionais em benchmarks de língua portuguesa.'},
  {flag:'🤖',name:'BERTimbau',origin:'NLP-USP · 2020',desc:'Versão do BERT treinada em português. Usada em pesquisa acadêmica e NLP em PT-BR.'},
  {flag:'💼',name:'Cortex Intelligence',origin:'Cortex · São Paulo',desc:'IA para inteligência de mercado B2B. Processa dados do mercado brasileiro para insights de negócios.'},
  {flag:'🏦',name:'IAs dos Bancos BR',origin:'Itaú, Nubank, Bradesco',desc:'Lideram em IA para fraudes, crédito e atendimento. Nubank tem um dos melhores times de ML da América Latina.'},
  {flag:'🌾',name:'IA no Agronegócio',origin:'Embrapa · startups AgTech',desc:'Brasil usa IA para previsão de safras, pragas e otimização. Embrapa lidera pesquisa em IA tropical.'},
  {flag:'⚖️',name:'Victor (STF)',origin:'STF · UnB · 2018',desc:'IA do Supremo que classifica automaticamente peças processuais. Um dos projetos jurídicos mais avançados do mundo.'},
]

export default function Brasil() {
  return (
    <>
      <div className="page-hero">
        <p className="breadcrumb"><a href="/">Início</a> / IAs Brasileiras</p>
        <h1>🇧🇷 IAs Brasileiras</h1>
        <p>O Brasil também está na corrida da IA! Conheça os modelos e iniciativas desenvolvidas aqui.</p>
      </div>
      <div style={{padding:'2rem 5vw 5rem',display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'1.2rem'}}>
        {items.map(item=>(
          <div key={item.name} style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:12,padding:'1.6rem',position:'relative',overflow:'hidden',transition:'border-color .25s'}}
            onMouseEnter={e=>e.currentTarget.style.borderColor='#009c3b'}
            onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
            <div style={{position:'absolute',top:0,left:0,right:0,height:3,background:'linear-gradient(to right,#009c3b,#ffdf00,#002776)'}}/>
            <div style={{fontSize:'1.5rem',marginBottom:'.7rem'}}>{item.flag}</div>
            <h3 style={{fontSize:'1rem',fontWeight:800,marginBottom:'.25rem'}}>{item.name}</h3>
            <p style={{fontFamily:'Space Mono,monospace',fontSize:'.65rem',color:'var(--muted)',marginBottom:'.7rem'}}>{item.origin}</p>
            <p style={{color:'var(--muted)',fontSize:'.85rem',lineHeight:1.62}}>{item.desc}</p>
          </div>
        ))}
      </div>
    </>
  )
}