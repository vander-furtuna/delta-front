import type { ReactNode } from 'react'
import { Navbar } from './components/nav-bar'

type AppLayoutProps = {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <main className="flex h-dvh w-full">
      <Navbar />
      {children}
    </main>
  )
}
