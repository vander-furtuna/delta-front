import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

type InputLabelProps = ComponentProps<'label'>

export function InputLabel({ children, className, ...props }: InputLabelProps) {
  return (
    <label
      className={cn('text-sm leading-tight font-medium', className)}
      {...props}
    >
      {children}
    </label>
  )
}
