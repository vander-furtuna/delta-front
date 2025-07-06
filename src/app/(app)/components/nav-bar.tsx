'use client'

import { Logo } from '@/components/logo'
import {
  HouseIcon,
  LineSegmentsIcon,
  BarbellIcon,
  GraduationCapIcon,
} from '@phosphor-icons/react'
import { NavItem } from './nav-item'
import type { Icon } from '@phosphor-icons/react'
import { AccountMenu } from '@/components/account-dialog'

type NavItem = {
  icon: Icon
  color: 'primary' | 'hike' | 'pratice' | 'monitore'
  href: string
  label: string
}

const navItems: NavItem[] = [
  {
    icon: HouseIcon,
    color: 'primary',
    href: '/dashboard',
    label: 'Dashboard',
  },
  {
    icon: LineSegmentsIcon,
    color: 'hike',
    href: '/trilhas',
    label: 'Trilhas',
  },
  {
    icon: BarbellIcon,
    color: 'pratice',
    href: '/praticas',
    label: 'Práticas',
  },
  {
    icon: GraduationCapIcon,
    color: 'monitore',
    href: '/monitorias',
    label: 'Monitorias',
  },
]
export function Navbar() {
  return (
    <aside className="border-border flex h-full w-64 shrink-0 flex-col items-start gap-16 border-r px-4 py-5">
      <Logo className="h-10" />

      <nav className="h-fit w-full">
        <ul className="flex h-fit w-full flex-col gap-1.5">
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              icon={item.icon}
              color={item.color}
              href={item.href}
            >
              {item.label}
            </NavItem>
          ))}
        </ul>
      </nav>

      <AccountMenu />
    </aside>
  )
}
