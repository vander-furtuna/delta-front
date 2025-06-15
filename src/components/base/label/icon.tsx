import { cn } from '@/lib/utils'
import type { Icon, IconProps } from '@phosphor-icons/react'

type LabelIconProps = {
  icon: Icon
} & IconProps

export function LabelIcon({ icon: Icon, className, ...rest }: LabelIconProps) {
  return (
    <Icon
      weight="duotone"
      className={cn('size-4 text-inherit', className)}
      {...rest}
    />
  )
}
