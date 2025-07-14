import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import { AppProvider } from './app-provider'
import type { ReactNode } from 'react'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const clashDisplay = localFont({
  src: '../assets/fonts/ClashDisplay-Variable.woff2',
  variable: '--font-clash-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: 'Delta | %s',
    default: 'Delta',
  },
  description: 'Aprenda, ensine e pratique com o Delta.',
  keywords: [
    'UFC',
    'Universidade Federal do Ceará',
    'Cursos',
    'Disciplina',
    'Aprendizado',
    'Ensino',
    'Prática',
    'Educação',
    'Delta',
  ],
  authors: [
    {
      name: 'Vanderlei Furtuna',
      url: 'https://github.com/vander-furtuna',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${clashDisplay.variable} pratice bg-background text-foreground has-[article[data-color="hike"]]:hike has-[article[data-color="pratice"]]:pratice has-[article[data-color="monitore"]]:monitore has-[article[data-color="play"]]:play font-sans antialiased`}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
