import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

type InputContainerProps = ComponentProps<'div'>

export function InputContainer({
  className,
  children,
  ...props
}: InputContainerProps) {
  return (
    <div
      className={cn(
        'bg-accent border-border focus-within:border-primary group group-has-[div[data-role=error]]/root:border-destructive flex h-14 w-full items-center rounded-md border-b-2 px-2.5 py-2',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
