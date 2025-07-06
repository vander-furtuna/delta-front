'use client'

import type { Icon } from '@phosphor-icons/react'
import { cva, type VariantProps } from 'class-variance-authority'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { ComponentProps } from 'react'

const navItemVariants = cva(
  'flex h-12 w-full items-center gap-2 rounded-md bg-transparent px-3 transition-colors ease-in-out data-[state=active]:bg-primary/60',
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
  children,
  color,
  href,
  ...props
}: NavItemProps) {
  const currentPath = usePathname()

  return (
    <li>
      <Link
        className={navItemVariants({
          className,
          color,
        })}
        data-state={currentPath === href ? 'active' : 'inactive'}
        href={href}
        {...props}
      >
        <Icon className="size-6" weight="duotone" />
        <span className="font-heading text-lg font-normal">{children}</span>
      </Link>
    </li>
  )
}
