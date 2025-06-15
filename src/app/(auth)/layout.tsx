import { Logo } from '@/components/logo'
import type { ReactNode } from 'react'
import authFigure from '@/assets/auth-figure.svg'

type AuthLayout = Readonly<{
  children: ReactNode
}>

export default function AuthLayout({ children }: AuthLayout) {
  return (
    <main className="flex h-screen w-full gap-4 p-4">
      <article className="bg-primary/20 flex w-full items-center justify-center rounded-2xl">
        <img src={authFigure.src} alt="Auth Figure" />
      </article>
      <article className="flex h-full w-80 shrink-0 flex-col items-center justify-center gap-16 px-4">
        <Logo className="h-16" />
        <section className="w-full">{children}</section>
      </article>
    </main>
  )
}
