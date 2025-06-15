import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

type LabelElementProps = ComponentProps<'label'>

export function LabelElement({
  children,
  className,
  ...props
}: LabelElementProps) {
  return (
    <label
      className={cn('text-sm leading-tight font-medium', className)}
      {...props}
    >
      {children}
    </label>
  )
}
