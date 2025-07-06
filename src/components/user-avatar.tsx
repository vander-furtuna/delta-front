import { useUser } from '@/hooks/contexts/use-user'
import { cn } from '@/lib/utils'
import { getFirstLetter } from '@/utils/get-firts-letter'
import { getRoleName } from '@/utils/get-role-name'
import { DotsThreeVerticalIcon } from '@phosphor-icons/react'
import { useMemo, type ComponentProps } from 'react'

type UserAvatarProps = ComponentProps<'button'>

export function UserAvatar({ className, ...rest }: UserAvatarProps) {
  const { user } = useUser()

  const rolename = useMemo(
    () => user?.role && getRoleName(user.role),
    [user?.role],
  )

  const firstLetter = useMemo(
    () => getFirstLetter(user?.username || ''),
    [user?.username],
  )

  return (
    <button
      type="button"
      className={cn(
        'bg-muted/50 flex w-full items-center justify-start gap-2 rounded-md px-2 py-2',
        className,
      )}
      {...rest}
    >
      <div className="flex w-full items-center gap-2">
        <div className="bg-primary/30 flex size-10 items-center justify-center rounded-full">
          <span className="font-heading leading-tight font-semibold uppercase">
            {firstLetter}
          </span>
        </div>
        <div className="flex flex-col items-start">
          <span className="leading-tight">{user?.username}</span>
          <span className="text-xs">{rolename}</span>
        </div>
      </div>
      <DotsThreeVerticalIcon className="text-muted-foreground size-6" />
    </button>
  )
}
