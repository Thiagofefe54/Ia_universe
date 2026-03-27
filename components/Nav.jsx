'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark'
    document.documentElement.dataset.theme = saved
    setDark(saved === 'dark')
  }, [])

  function toggleTheme() {
    const newTheme = dark ? 'light' : 'dark'
    document.documentElement.dataset.theme = newTheme
    localStorage.setItem('theme', newTheme)
    setDark(!dark)
  }

  return (
    <nav>
      <Link href="/" className="nav-logo">AI_UNIVERSE</Link>
      <ul className={`nav-links ${open ? 'open' : ''}`}>
        <li><Link href="/" onClick={() => setOpen(false)}>Início</Link></li>
        <li><Link href="/ias" onClick={() => setOpen(false)}>IAs</Link></li>
        <li><Link href="/historia" onClick={() => setOpen(false)}>História</Link></li>
        <li><Link href="/comparar" onClick={() => setOpen(false)}>Comparar</Link></li>
        <li><Link href="/como-funciona" onClick={() => setOpen(false)}>Como Funciona</Link></li>
        <li><Link href="/quiz" onClick={() => setOpen(false)}>Quiz</Link></li>
        <li><Link href="/calculadora" onClick={() => setOpen(false)}>Calculadora</Link></li>
        <li><Link href="/glossario" onClick={() => setOpen(false)}>Glossário</Link></li>
      </ul>
      <div className="nav-right">
        <button className="icon-btn" onClick={toggleTheme}>
          {dark ? '🌙' : '☀️'}
        </button>
        <button className="hamburger" onClick={() => setOpen(!open)}>☰</button>
      </div>
    </nav>
  )
}