'use client'

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
import {
  SignOutIcon,
  SparkleIcon,
  SunIcon,
  MoonIcon,
  ArrowRightIcon,
} from '@phosphor-icons/react'

import { useTheme } from 'next-themes'
import { useUser } from '@/hooks/contexts/use-user'
import { useCallback, useState, type ComponentProps } from 'react'
import { toast } from 'sonner'
import CompleteProfileDialog from './complete-profile-dialog'
import { UserIcon } from 'lucide-react'
import Link from 'next/link'

type AccountMenuProps = ComponentProps<typeof DropdownMenu>

export function AccountMenu({ children, ...props }: AccountMenuProps) {
  const [isCompleteProfileDialogOpen, setCompleteProfileDialogOpen] =
    useState(false)

  const { signOut, user } = useUser()
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
    <DropdownMenu {...props}>
      <CompleteProfileDialog
        open={isCompleteProfileDialogOpen}
        onOpenChange={(open) => setCompleteProfileDialogOpen(open)}
      />
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
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

        {!user?.profile ? (
          <DropdownMenuItem
            className="bg-primary/10"
            onClick={() => setCompleteProfileDialogOpen(true)}
          >
            <div className="bg-primary size-2 animate-pulse rounded-full" />
            Completar Perfil
            <DropdownMenuShortcut>
              <ArrowRightIcon className="text-primary" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem asChild>
            <Link href="/perfil">
              Ver Perfil
              <DropdownMenuShortcut>
                <UserIcon />
              </DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        )}

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
