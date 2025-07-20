'use client'

import { useEffect, type ReactNode } from 'react'
import { Navbar } from './components/nav-bar'
import { useUser } from '@/hooks/contexts/use-user'
import { useRouter } from 'next/navigation'

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
    <main className="flex h-dvh w-full">
      <Navbar />
      {children}
    </main>
  )
}
