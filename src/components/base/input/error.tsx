import { cn } from '@/lib/utils'
import { InfoIcon } from '@phosphor-icons/react/ssr'
import type { ComponentProps } from 'react'

type InputErrorProps = ComponentProps<'div'> & {
  message?: string
}

export function InputError({ className, message, ...rest }: InputErrorProps) {
  return (
    <div
      data-role="error"
      className={cn(
        'text-destructive flex h-fit w-full items-center justify-start gap-1 text-xs',
        className,
      )}
      {...rest}
    >
      <InfoIcon className="size-3" />
      <span>{message}</span>
    </div>
  )
}
