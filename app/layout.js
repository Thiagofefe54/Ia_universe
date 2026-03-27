import './globals.css'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export const metadata = {
  title: 'AI Universe — O Universo das IAs',
  description: 'Mais de 20 IAs catalogadas, comparadas e explicadas em português.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" data-theme="dark">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}