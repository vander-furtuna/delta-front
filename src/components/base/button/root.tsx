import type { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva('flex items-center justify-center rounded-md', {
  variants: {
    size: {
      full: 'w-full h-14',
      fit: 'h-10 px-4 w-fit',
    },
    variant: {
      default:
        'bg-primary text-foreground font-medium hover:bg-primary/90 border-b-2 border-foreground/10 active:border-0 active:translate-y-0.5 transition-all ease-in-out active:shadow-inner dark:text-accent',
      outline:
        'border border-blue-500 text-blue-500 hover:bg-blue-50 focus:ring-2 focus:ring-blue-300',
      ghost: 'text-blue-500 hover:bg-blue-50 focus:ring-2 focus:ring-blue-300',
    },
  },
  defaultVariants: {
    size: 'full',
    variant: 'default',
  },
})

type ButtonRootProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>

export function ButtonRoot({
  variant,
  size,
  className,
  ...rest
}: ButtonRootProps) {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      {...rest}
    />
  )
}
