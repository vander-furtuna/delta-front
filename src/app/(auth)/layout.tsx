'use client'

import { Logo } from '@/components/logo'
import { useEffect, type ReactNode } from 'react'
import authFigure from '@/assets/auth-figure.svg'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/contexts/use-user'

type AuthLayout = Readonly<{
  children: ReactNode
}>

export default function AuthLayout({ children }: AuthLayout) {
  const { push } = useRouter()
  const { user, isUserLoading } = useUser()

  useEffect(() => {
    if (!isUserLoading) {
      if (user) {
        return push('/dashboard')
      } else {
        push('/entrar')
      }
    }
  }, [isUserLoading, user, push])

  return (
    <main className="flex h-dvh w-full gap-4 p-4">
      <article className="bg-primary/20 hidden w-full items-center justify-center rounded-2xl px-8 sm:flex">
        <img
          src={authFigure.src}
          alt="Auth Figure"
          className="w-full max-w-xl"
        />
      </article>
      <article className="relative flex h-full w-full shrink-0 flex-col items-center justify-center gap-16 px-4 sm:w-80">
        <Logo className="absolute top-4 left-4 h-10" />
        <section className="w-full">{children}</section>
      </article>
    </main>
  )
}
