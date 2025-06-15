'use client'

import { Logo } from '@/components/logo'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const { push } = useRouter()

  useEffect(() => {
    push('/entrar')
  }, [push])

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <Logo className="size-32" />
    </main>
  )
}
