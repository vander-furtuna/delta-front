import { useUser } from '@/hooks/contexts/use-user'
import { getPhotoProfileUrlService } from '@/services/account/get-photo-profile-url-service'
import { getUserInfoService } from '@/services/auth/get-user-info-service'
import { getFirstLetter } from '@/utils/get-firts-letter'
import { useQuery } from '@tanstack/react-query'
import { useMemo, type ComponentProps } from 'react'

type UserAvatarSmallProps = ComponentProps<'button'>

export function UserAvatarSmall({ ...props }: UserAvatarSmallProps) {
  const { user } = useUser()

  const { data: account } = useQuery({
    queryKey: ['user', user?.id],
    queryFn: () => getUserInfoService(),
  })

  const { data: photoProfileUrl } = useQuery({
    queryKey: ['photoProfileUrl', user?.id],
    queryFn: () => getPhotoProfileUrlService(),
    refetchOnWindowFocus: false,
  })

  const firstLetter = useMemo(
    () => getFirstLetter(account?.username || ''),
    [account?.username],
  )

  return (
    <button
      className="bg-primary/30 ring-primary/60 relative flex size-12 items-center justify-center rounded-md ring-2"
      type="button"
      {...props}
    >
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
    </button>
  )
}
