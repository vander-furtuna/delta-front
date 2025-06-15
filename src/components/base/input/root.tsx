import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

type InputRootProps = ComponentProps<'div'>

export function InputRoot({ className, children, ...props }: InputRootProps) {
  return (
    <div
      className={cn('group/root flex h-fit w-full flex-col gap-1', className)}
      {...props}
    >
      {children}
    </div>
  )
}
