import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

type LabelRootProps = ComponentProps<'div'>

export function LabelRoot({ children, className, ...rest }: LabelRootProps) {
  return (
    <div
      className={cn(
        'flex h-fit w-full items-center justify-start gap-1',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
