import { Logo } from '@/components/logo'
import { HouseIcon } from '@phosphor-icons/react/ssr'
import { NavItem } from './nav-item'

export function Navbar() {
  return (
    <aside className="border-border flex h-full w-72 shrink-0 flex-col items-start gap-16 border-r px-4 py-4">
      <Logo className="h-10" />

      <nav className="flex h-fit w-full flex-col gap-2">
        <NavItem icon={HouseIcon} className="icon-primary">
          Dashboard
        </NavItem>
        <NavItem icon={HouseIcon} className="icon-hike">
          Trilhas
        </NavItem>
        <NavItem icon={HouseIcon} className="icon-pratice">
          Práticas
        </NavItem>
        <NavItem icon={HouseIcon} className="icon-monitore">
          Monitorias
        </NavItem>
      </nav>
    </aside>
  )
}
