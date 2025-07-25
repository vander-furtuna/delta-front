'use client'

import { useEffect, type ReactNode } from 'react'
import { Sidebar } from './components/sidebar'
import { useUser } from '@/hooks/contexts/use-user'
import { useRouter } from 'next/navigation'
import { NavBar } from './components/nav-bar'

type AppLayoutProps = {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { push } = useRouter()
  const { user, isUserLoading } = useUser()

  useEffect(() => {
    if (!isUserLoading && !user) {
      push('/entrar')
    }
  }, [isUserLoading, user, push])

  return (
    <main className="relative flex h-dvh w-full">
      <Sidebar />
      <NavBar />
      {children}
    </main>
  )
}
