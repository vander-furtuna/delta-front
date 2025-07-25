'use client'

import { AvatarUploadInput } from '@/components/avatar-upload-input'
import { TextInput } from '@/components/forms/text-input'
import { LevelPill } from '@/components/level-pill'
import { RolePill } from '@/components/role-pill'
import { getPhotoProfileUrlService } from '@/services/account/get-photo-profile-url-service'
import { getUserInfoService } from '@/services/auth/get-user-info-service'
import { AtIcon, HashIcon, UserIcon } from '@phosphor-icons/react'
import { useQuery } from '@tanstack/react-query'

export default function ProfilePage() {
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => getUserInfoService(),
  })

  const { data: photoProfileUrl } = useQuery({
    queryKey: ['photoProfileUrl'],
    queryFn: () => getPhotoProfileUrlService(),
  })

  return (
    <article className="flex h-full w-full flex-col items-center justify-center">
      <section className="flex w-80 flex-col items-center gap-3">
        <div className="mb-4">
          <AvatarUploadInput avatarUrl={photoProfileUrl} />
        </div>
        <div className="flex w-full items-center justify-center gap-1">
          {user?.role && <RolePill role={user?.role} />}
          <LevelPill level={user?.profile.level || 0} />
        </div>
        <TextInput
          value={user?.username}
          placeholder="Usuário"
          icon={HashIcon}
          label="Usuário"
          readOnly
        />
        <TextInput
          value={user?.profile.name}
          placeholder="Nome"
          icon={UserIcon}
          label="Nome"
          readOnly
        />
        <TextInput
          value={user?.email}
          placeholder="Email"
          label="Email"
          icon={AtIcon}
        />
      </section>
    </article>
  )
}
