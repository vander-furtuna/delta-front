import { cn } from '@/lib/utils'
import type { Role } from '@/types/user'
import { getRoleIcon } from '@/utils/get-role-icon'
import { getRoleName } from '@/utils/get-role-name'
import { useMemo, type ComponentProps } from 'react'

type RolePillProps = {
  role: Role
} & ComponentProps<'div'>

export function RolePill({ role, className, ...props }: RolePillProps) {
  const Icon = useMemo(() => getRoleIcon(role), [role])
  const roleName = useMemo(() => getRoleName(role), [role])

  return (
    <div
      className={cn(
        'bg-foreground/5 text-accent-foreground flex h-6 w-fit items-center gap-1 rounded-full border px-2 py-0.5',
        className,
      )}
      {...props}
    >
      <Icon className="size-4 text-inherit" weight="duotone" />
      <span className="text-sm leading-tight text-inherit">{roleName}</span>
    </div>
  )
}
