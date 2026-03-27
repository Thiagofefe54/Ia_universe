'use client'

const items = [
  {n:'01',title:'Redes Neurais',desc:'Inspiradas no cérebro humano, são camadas de neurônios matemáticos. Cada conexão tem peso ajustado no treino para melhorar as respostas.'},
  {n:'02',title:'Treinamento com Dados',desc:'Modelos são treinados em trilhões de palavras da internet, livros e código. O modelo aprende padrões — qual palavra provavelmente vem depois.'},
  {n:'03',title:'Transformer & Atenção',desc:'Arquitetura de 2017 que revolucionou tudo. O mecanismo de atenção permite entender o contexto de palavras distantes numa mesma frase.'},
  {n:'04',title:'RLHF',desc:'Reinforcement Learning from Human Feedback — humanos avaliam respostas e ensinam o modelo a ser útil e seguro.'},
  {n:'05',title:'Tokens & Probabilidade',desc:'A IA não lê palavras — lê tokens (~4 caracteres). Para cada token, calcula probabilidades dos próximos e escolhe o mais adequado.'},
  {n:'06',title:'Modelos de Difusão',desc:'Para imagens: começa com ruído aleatório e vai limpando guiado pelo texto até criar uma imagem coerente. Base do Midjourney e DALL-E.'},
  {n:'07',title:'RAG',desc:'Retrieval-Augmented Generation — a IA busca informações em documentos externos antes de responder, reduzindo alucinações.'},
  {n:'08',title:'Fine-tuning',desc:'Especializar um modelo genérico num domínio específico usando dados menores. Mais barato que treinar do zero.'},
  {n:'09',title:'Constitutional AI',desc:'Método da Anthropic usado no Claude: a IA aprende princípios éticos e auto-avalia suas respostas antes de responder.'},
  {n:'10',title:'Agentes Autônomos',desc:'A IA mais moderna não só responde — age. Usa ferramentas, navega na web, escreve e executa código para alcançar um objetivo.'},
]

const fluxo = ['📝 Você digita','🔤 Tokenização','🧠 Transformer','📊 Probabilidades','✍️ Gera tokens','💬 Você lê']

export default function ComoFunciona() {
  return (
    <>
      <div className="page-hero">
        <p className="breadcrumb"><a href="/">Início</a> / Como Funciona</p>
        <h1>⚙️ Como as IAs Funcionam?</h1>
        <p>Os mecanismos por baixo do capô que fazem os modelos modernos pensar e criar.</p>
      </div>

      <div style={{margin:'2rem 5vw',background:'var(--card)',border:'1px solid var(--border)',borderRadius:16,padding:'2rem'}}>
        <h3 style={{fontSize:'1.1rem',fontWeight:800,marginBottom:'1.2rem'}}>🔄 Fluxo de uma resposta</h3>
        <div style={{display:'flex',alignItems:'center',gap:'.8rem',flexWrap:'wrap'}}>
          {fluxo.map((s,i)=>(
            <div key={s} style={{display:'contents'}}>
              <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:8,padding:'.7rem 1rem',fontSize:'.85rem',fontWeight:700,textAlign:'center',flex:1,minWidth:90}}>{s}</div>
              {i < fluxo.length-1 && <span style={{color:'var(--accent)',fontSize:'1.1rem',flexShrink:0}}>→</span>}
            </div>
          ))}
        </div>
      </div>

      <div style={{padding:'0 5vw 5rem',display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:'1.2rem'}}>
        {items.map(item=>(
          <div key={item.n}
            style={{background:'var(--card)',border:'1px solid var(--border)',borderRadius:12,padding:'1.8rem',transition:'border-color .25s',cursor:'default'}}
            onMouseEnter={e=>e.currentTarget.style.borderColor='var(--accent3)'}
            onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
            <div style={{fontFamily:'Space Mono,monospace',fontSize:'2rem',fontWeight:700,color:'var(--border)',marginBottom:'.7rem'}}>{item.n}</div>
            <h3 style={{fontSize:'1rem',fontWeight:700,marginBottom:'.5rem'}}>{item.title}</h3>
            <p style={{color:'var(--muted)',fontSize:'.85rem',lineHeight:1.65}}>{item.desc}</p>
          </div>
        ))}
      </div>
    </>
  )
}