export default function Historia() {
  const items = [
    {year:'1950',icon:'🧠',title:'Teste de Turing',desc:'Alan Turing propõe o "Jogo da Imitação" — se uma máquina engana um humano numa conversa, ela pode ser considerada inteligente.'},
    {year:'1956',icon:'🔬',title:'Nasce o termo "IA"',desc:'John McCarthy cunha o termo na Conferência de Dartmouth. Primeiro objetivo explícito de criar máquinas que pensam.'},
    {year:'1966',icon:'💬',title:'ELIZA — Primeiro Chatbot',desc:'Joseph Weizenbaum cria o ELIZA no MIT. Simulava um psicoterapeuta. Muitos acreditavam estar falando com humano real.'},
    {year:'1997',icon:'♟️',title:'Deep Blue vence Kasparov',desc:'IBM derrota o campeão mundial de xadrez. Primeiro marco de IA superando humanos em tarefa complexa.'},
    {year:'2011',icon:'🏆',title:'IBM Watson vence o Jeopardy!',desc:'Watson vence os maiores campeões do quiz americano. Processamento de linguagem natural em escala real.'},
    {year:'2012',icon:'👁️',title:'AlexNet — Deep Learning',desc:'Rede neural de Hinton domina o ImageNet. Portas abertas para visão computacional e IA moderna.'},
    {year:'2017',icon:'🤖',title:'Transformer — A Arquitetura Definitiva',desc:'Google publica "Attention is All You Need". Base de todos os modelos modernos: GPT, Claude, Gemini.'},
    {year:'2021',icon:'🎨',title:'DALL-E e GitHub Copilot',desc:'IAs capazes de gerar imagens e completar código chegam ao público. A IA começa a ser criativa.'},
    {year:'Nov 2022',icon:'🚀',title:'ChatGPT — IA para Todo Mundo',desc:'Em 5 dias, 1 milhão de usuários. Em 2 meses, 100 milhões. A IA deixa o laboratório e entra na vida cotidiana.'},
    {year:'2024',icon:'🐋',title:'DeepSeek choca o mercado',desc:'IA chinesa lança modelo comparável ao GPT-4 sendo 100% gratuito e open-source.'},
    {year:'2025–2026',icon:'⚡',title:'Era dos Agentes de IA',desc:'IAs deixam de responder e passam a agir: navegam na web, escrevem código, tomam decisões autônomas.'},
  ]

  return (
    <>
      <div className="page-hero">
        <p className="breadcrumb"><a href="/">Início</a> / História</p>
        <h1>📜 História da IA</h1>
        <p>De 1950 até hoje. A linha do tempo completa dos marcos da Inteligência Artificial.</p>
      </div>

      <div style={{padding:'2rem 5vw 5rem',position:'relative'}}>
        <div style={{position:'absolute',left:'calc(5vw + 20px)',top:0,bottom:0,width:1,background:'linear-gradient(to bottom,var(--accent),transparent)'}}/>
        {items.map((item,i)=>(
          <div key={i} style={{display:'flex',gap:'1.8rem',marginBottom:'2rem'}}>
            <div style={{width:40,height:40,minWidth:40,borderRadius:'50%',background:'var(--card)',border:'2px solid var(--accent)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.1rem',position:'relative',zIndex:1}}>
              {item.icon}
            </div>
            <div style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:8,padding:'1.3rem',flex:1}}>
              <p style={{fontFamily:'Space Mono,monospace',fontSize:'.68rem',color:'var(--accent)',letterSpacing:'.1em',marginBottom:'.25rem'}}>{item.year}</p>
              <h3 style={{fontSize:'1rem',fontWeight:700,marginBottom:'.35rem'}}>{item.title}</h3>
              <p style={{color:'var(--muted)',fontSize:'.85rem',lineHeight:1.62}}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}