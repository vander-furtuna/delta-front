import type { ReactNode } from 'react'

type AuthLayout = Readonly<{
  children: ReactNode
}>

export function AuthLayout({ children }: AuthLayout) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-16 p-8">
      {children}
    </div>
  )
}
