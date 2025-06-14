import type { ReactNode } from 'react';

type AuthLayout = Readonly<{
  children: ReactNode
}>

export function AuthLayout({ 
  children,
}: AuthLayout) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-16">
      {children}
    </div>
  );
}