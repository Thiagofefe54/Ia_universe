import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <p>© 2026 <span>AI_UNIVERSE</span></p>
      <div style={{ display:'flex', gap:'1.5rem', flexWrap:'wrap' }}>
        <Link href="/ias">IAs</Link>
        <Link href="/historia">História</Link>
        <Link href="/quiz">Quiz</Link>
        <Link href="/glossario">Glossário</Link>
      </div>
      <p>v2.0 · <span>2026</span></p>
    </footer>
  )
}