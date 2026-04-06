import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI & Data Portfolio',
  description: 'Interactive desktop portfolio showcasing AI and data projects',
  keywords: ['AI', 'Data', 'Machine Learning', 'Deep Learning', 'Data Science', 'Python', 'R'],
  authors: [{ name: 'MOULAI Joseph' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased overflow-hidden`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}