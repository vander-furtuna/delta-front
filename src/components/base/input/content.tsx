import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

type InputContentProps = ComponentProps<'div'>

export function InputContent({
  className,
  children,
  ...rest
}: InputContentProps) {
  return (
    <div className={cn('flex size-full flex-col', className)} {...rest}>
      {children}
    </div>
  )
}
