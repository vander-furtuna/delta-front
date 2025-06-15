import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

type InputElementProps = ComponentProps<'input'>

export function InputElement({ ref, className, ...props }: InputElementProps) {
  return (
    <input
      className={cn(
        'size-full shrink border-none bg-transparent outline-none',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
