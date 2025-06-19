import { cn } from '@/lib/utils'
import type { Icon } from '@phosphor-icons/react'

import type { ComponentProps } from 'react'

type NavItemProps = {
  icon: Icon
} & ComponentProps<'li'>

export function NavItem({
  icon: Icon,
  className,
  children,
  ...props
}: NavItemProps) {
  return (
    <li
      className={cn(
        'bg-accent flex h-12 w-full items-center gap-2 rounded-md px-2',
        className,
      )}
      {...props}
    >
      <Icon className="size-6" weight="duotone" />
      <span className="font-heading text-lg font-normal">{children}</span>
    </li>
  )
}
