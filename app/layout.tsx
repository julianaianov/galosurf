import type { Metadata, Viewport } from 'next'
import { Outfit, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: '--font-outfit'
});
const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-mono'
});

export const metadata: Metadata = {
  title: 'Ingryd Galo | Aulas de Surf no Recreio - RJ',
  description: 'Aprenda a surfar com a professora Ingryd Galo no Recreio dos Bandeirantes, Rio de Janeiro. Aulas personalizadas, clima em tempo real, e a melhor experiencia de surf da cidade.',
  keywords: ['surf', 'aulas de surf', 'recreio', 'rio de janeiro', 'ingryd galo', 'surfista'],
  openGraph: {
    title: 'Ingryd Galo | Aulas de Surf no Recreio',
    description: 'Aprenda a surfar com a melhor instrutora do Recreio dos Bandeirantes',
    locale: 'pt_BR',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0891b2',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${outfit.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
