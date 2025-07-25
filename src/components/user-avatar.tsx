import { cn } from '@/lib/utils'
import { getPhotoProfileUrlService } from '@/services/account/get-photo-profile-url-service'
import { getUserInfoService } from '@/services/auth/get-user-info-service'
import { getFirstName } from '@/utils/get-first-name'
import { getFirstLetter } from '@/utils/get-firts-letter'
import { getRoleIcon } from '@/utils/get-role-icon'
import { DotsThreeVerticalIcon } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'
import { useMemo, type ComponentProps } from 'react'
import { DeltaIcon } from './icons/delta'
import { useUser } from '@/hooks/contexts/use-user'

type UserAvatarProps = ComponentProps<'button'>

export function UserAvatar({ className, ...rest }: UserAvatarProps) {
  const { user } = useUser()

  const { data: account, isLoading: isUserLoading } = useQuery({
    queryKey: ['user', user?.id],
    queryFn: () => getUserInfoService(),
  })

  const { data: photoProfileUrl } = useQuery({
    queryKey: ['photoProfileUrl', user?.id],
    queryFn: () => getPhotoProfileUrlService(),
    refetchOnWindowFocus: false,
  })

  const RoleIcon = useMemo(
    () => account?.role && getRoleIcon(account.role),
    [account?.role],
  )

  const firstLetter = useMemo(
    () => getFirstLetter(account?.username || ''),
    [account?.username],
  )

  return (
    <button
      type="button"
      className={cn(
        'bg-primary/15 flex w-full items-center justify-start gap-2 rounded-md border px-2 py-2',
        className,
      )}
      {...rest}
    >
      <div className="flex w-full items-center gap-3">
        <div className="bg-primary/30 ring-primary/60 relative flex size-12 items-center justify-center rounded-sm ring-2">
          {!account?.profile && (
            <div className="bg-primary absolute top-1 right-1 size-2 animate-pulse rounded-full" />
          )}
          <span className="font-heading leading-tight font-semibold uppercase">
            {firstLetter}
          </span>
          {photoProfileUrl && (
            <img
              src={photoProfileUrl}
              alt="User Avatar"
              className="absolute inset-0 size-full rounded-sm object-cover"
            />
          )}
        </div>
        <div className="flex flex-col items-start gap-1">
          {!isUserLoading ? (
            <span className="text-start leading-tight">
              {getFirstName(account?.profile?.name) || account?.username}
            </span>
          ) : (
            <div className="bg-foreground/20 h-5 w-24 animate-pulse rounded-full"></div>
          )}

          {!isUserLoading ? (
            <div className="text-muted-foreground flex items-center gap-1 text-xs">
              {RoleIcon && (
                <div className="flex size-6 items-center justify-center rounded-full border">
                  <RoleIcon className="text-foreground size-4" />
                </div>
              )}

              <div className="flex h-6 w-fit items-center justify-center gap-1 rounded-full border px-1.5">
                <DeltaIcon className="fill-primary size-3 shrink-0" />
                <div className="text-foreground text-xs font-semibold">
                  {account?.profile?.level || 0}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-muted-foreground flex items-center gap-1 text-xs">
              <div className="bg-foreground/20 h-5 w-5 animate-pulse rounded-full" />
              <div className="bg-foreground/20 h-5 w-10 animate-pulse rounded-full" />
            </div>
          )}
        </div>
      </div>
      <DotsThreeVerticalIcon className="text-muted-foreground size-6" />
    </button>
  )
}
