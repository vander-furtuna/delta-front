import { AccountMenu } from '@/components/account-dialog'
import { NavItem } from './nav-item'
import { navItems } from './sidebar'
import { UserAvatarSmall } from '@/components/user-avatar-small'

export function NavBar() {
  return (
    <nav className="bg-accent absolute bottom-0 left-1/2 z-50 flex size-fit -translate-1/2 items-center gap-3 rounded-md border p-2 md:hidden">
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

      <div className="bg-border block h-8 w-[1px] shrink-0 rounded-full" />

      <AccountMenu>
        <UserAvatarSmall />
      </AccountMenu>
    </nav>
  )
}
