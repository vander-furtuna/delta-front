import { cn } from '@/lib/utils'
import type { Icon, IconProps } from '@phosphor-icons/react'

type InputIconProps = {
  icon: Icon
} & IconProps

export function InputIcon({ icon: Icon, className, ...rest }: InputIconProps) {
  return (
    <Icon
      weight="duotone"
      className={cn('text-inherit', className)}
      {...rest}
    />
  )
}
