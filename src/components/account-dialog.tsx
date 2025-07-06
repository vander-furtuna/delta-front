import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { UserAvatar } from './user-avatar'
import {
  SignOutIcon,
  SparkleIcon,
  SunIcon,
  MoonIcon,
} from '@phosphor-icons/react'

import { useTheme } from 'next-themes'
import { useUser } from '@/hooks/contexts/use-user'
import { useCallback } from 'react'
import { toast } from 'sonner'

export function AccountMenu() {
  const { signOut } = useUser()
  const { theme, setTheme } = useTheme()

  const handleSignOut = useCallback(async () => {
    try {
      await signOut()

      toast.success('Volte logo :D')
    } catch (error) {
      console.error('Error signing out:', error)
      toast.error('Não foi possível sair da conta :/ Tente novamente.')
    }
  }, [signOut])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserAvatar className="mt-auto" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup className="flex gap-1">
          <DropdownMenuItem
            className="border-border data-[state=active]:bg-primary/20 w-full items-center justify-center border data-[state=inactive]:bg-transparent"
            data-state={theme === 'light' ? 'active' : 'inactive'}
            onClick={() => setTheme('light')}
          >
            <SunIcon weight="duotone" />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="border-border data-[state=active]:bg-primary/20 w-full items-center justify-center border data-[state=inactive]:bg-transparent"
            data-state={theme === 'dark' ? 'active' : 'inactive'}
            onClick={() => setTheme('dark')}
          >
            <MoonIcon weight="duotone" />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="border-border data-[state=active]:bg-primary/20 w-full items-center justify-center border data-[state=inactive]:bg-transparent"
            data-state={theme === 'system' ? 'active' : 'inactive'}
            onClick={() => setTheme('system')}
          >
            <SparkleIcon weight="duotone" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-destructive hover:bg-destructive/10 focus:bg-destructive/10 hover:text-destructive focus:text-destructive"
          onClick={handleSignOut}
        >
          Sair
          <DropdownMenuShortcut>
            <SignOutIcon className="text-destructive" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
