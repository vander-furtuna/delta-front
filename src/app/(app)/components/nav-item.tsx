'use client'

import type { Icon } from '@phosphor-icons/react'
import { cva, type VariantProps } from 'class-variance-authority'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { ComponentProps } from 'react'

const navItemVariants = cva(
  'flex size-12 items-center gap-2 rounded-md bg-transparent justify-center transition-colors ease-in-out data-[state=active]:bg-primary/60 shrink-0',
  {
    variants: {
      color: {
        primary: 'icon-primary hover:bg-primary/20',
        hike: 'icon-hike hover:bg-hike/20',
        pratice: 'icon-pratice hover:bg-pratice/20',
        monitore: 'icon-monitore hover:bg-monitore/20',
      },
    },
    defaultVariants: {
      color: 'primary',
    },
  },
)

type NavItemProps = {
  icon: Icon
} & ComponentProps<typeof Link> &
  VariantProps<typeof navItemVariants>

export function NavItem({
  icon: Icon,
  className,
  color,
  href,
  ...props
}: NavItemProps) {
  const currentPath = usePathname()

  return (
    <Link
      className={navItemVariants({
        className,
        color,
      })}
      data-state={currentPath.includes(href.toString()) ? 'active' : 'inactive'}
      href={href}
      {...props}
    >
      <Icon className="size-6" weight="duotone" />
    </Link>
  )
}
