'use client'

import { Logo } from '@/components/logo'
import {
  HouseIcon,
  LineSegmentsIcon,
  BarbellIcon,
  GraduationCapIcon,
} from '@phosphor-icons/react'
import { SidebarItem } from './sidebar-item'
import type { Icon } from '@phosphor-icons/react'
import { AccountMenu } from '@/components/account-dialog'
import { UserAvatar } from '@/components/user-avatar'

type NavItem = {
  icon: Icon
  color: 'primary' | 'hike' | 'pratice' | 'monitore'
  href: string
  label: string
}

export const navItems: NavItem[] = [
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
    href: '/atividades',
    label: 'Atividades',
  },
  {
    icon: GraduationCapIcon,
    color: 'monitore',
    href: '/monitorias',
    label: 'Monitorias',
  },
]
export function Sidebar() {
  return (
    <aside className="border-border hidden h-full w-64 shrink-0 flex-col items-start gap-16 border-r px-4 py-5 md:flex">
      <Logo className="h-10" />

      <nav className="h-fit w-full">
        <ul className="flex h-fit w-full flex-col gap-1.5">
          {navItems.map((item) => (
            <SidebarItem
              key={item.href}
              icon={item.icon}
              color={item.color}
              href={item.href}
            >
              {item.label}
            </SidebarItem>
          ))}
        </ul>
      </nav>

      <AccountMenu>
        <UserAvatar className="mt-auto" />
      </AccountMenu>
    </aside>
  )
}
