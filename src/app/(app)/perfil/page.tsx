'use client'

import { AvatarUploadInput } from '@/components/avatar-upload-input'
import { TextInput } from '@/components/forms/text-input'
import { LevelPill } from '@/components/level-pill'
import { RolePill } from '@/components/role-pill'
import { useUser } from '@/hooks/contexts/use-user'
import { getPhotoProfileUrlService } from '@/services/account/get-photo-profile-url-service'
import { getUserInfoService } from '@/services/auth/get-user-info-service'
import { AtIcon, HashIcon, UserIcon } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'

export default function ProfilePage() {
  const { user } = useUser()

  const { data: account } = useQuery({
    queryKey: ['user', user?.id],
    queryFn: () => getUserInfoService(),
  })

  const { data: photoProfileUrl } = useQuery({
    queryKey: ['photoProfileUrl', user?.id],
    queryFn: () => getPhotoProfileUrlService(),
  })

  return (
    <article className="relative flex h-full w-full flex-col items-center justify-center">
      <h1 className="font-heading absolute top-[10%] text-4xl font-bold">
        Seu Perfil
      </h1>

      <section className="flex h-full w-80 flex-col items-center justify-center gap-3">
        <div className="mb-4">
          <AvatarUploadInput avatarUrl={photoProfileUrl} />
        </div>
        <div className="flex w-full items-center justify-center gap-1">
          {account?.role && <RolePill role={account?.role} />}
          <LevelPill level={account?.profile.level || 0} />
        </div>
        <TextInput
          value={account?.username}
          placeholder="Usuário"
          icon={HashIcon}
          label="Usuário"
          readOnly
        />
        <TextInput
          value={account?.profile.name}
          placeholder="Nome"
          icon={UserIcon}
          label="Nome"
          readOnly
        />
        <TextInput
          value={account?.email}
          placeholder="Email"
          label="Email"
          icon={AtIcon}
        />
      </section>
    </article>
  )
}
