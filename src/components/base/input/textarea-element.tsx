import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

type TextareaProps = ComponentProps<'textarea'>

export function TextareaElement({ ref, className, ...props }: TextareaProps) {
  return (
    <textarea
      rows={3}
      className={cn(
        'size-full shrink resize-none border-none bg-transparent outline-none',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
}
