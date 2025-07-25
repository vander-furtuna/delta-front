'use client'

import { AvatarUploadInput } from '@/components/avatar-upload-input'
import { TextInput } from '@/components/forms/text-input'
import { Textarea } from '@/components/forms/textarea'
import { LevelPill } from '@/components/level-pill'
import { RolePill } from '@/components/role-pill'
import { Button } from '@/components/ui/button'
import { useUser } from '@/hooks/contexts/use-user'
import { queryClient } from '@/lib/query-client'
import { getPhotoProfileUrlService } from '@/services/account/get-photo-profile-url-service'
import { updateAccountService } from '@/services/account/update-account-service'
import { getUserInfoService } from '@/services/auth/get-user-info-service'
import { usernameValidation } from '@/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { AtIcon, HashIcon, PhoneIcon, UserIcon } from '@phosphor-icons/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const editProfileSchema = z.object({
  username: usernameValidation,
  email: z.string().email('Email inválido'),
  fullName: z.string().min(1, 'Nome completo é obrigatório'),
  phoneNumber: z.string().min(1, 'Número de telefone é obrigatório'),
  bio: z.string().optional(),
})

type EditProfileFormData = z.infer<typeof editProfileSchema>

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

  const { control, handleSubmit } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    values: {
      username: account?.username || '',
      email: account?.email || '',
      fullName: account?.profile.name || '',
      phoneNumber: account?.profile.phoneNumber || '',
      bio: account?.profile.bio || '',
    },
  })

  const { mutateAsync: updateProfile, isPending: isProfileLoading } =
    useMutation({
      mutationFn: updateAccountService,
      onSuccess: () => {
        toast.success('Perfil atualizado com sucesso!')
        queryClient.refetchQueries({ queryKey: ['user', user?.id] })
      },
      onError: () => {
        toast.error('Erro ao atualizar perfil. Tente novamente.')
      },
    })

  const handleEditProfile = useCallback(
    async ({
      email,
      fullName,
      phoneNumber,
      bio,
      username,
    }: EditProfileFormData) => {
      await updateProfile({
        userInfo: {
          email,
          username,
        },
        name: fullName,
        phoneNumber,
        bio: bio || '',
      })
    },
    [updateProfile],
  )

  return (
    <article className="relative flex h-full w-full flex-col items-center justify-start gap-6 overflow-y-auto py-4 pb-32 md:pb-4">
      <h1 className="font-heading text-4xl font-bold">Seu Perfil</h1>

      <section className="flex w-80 flex-col items-center justify-center gap-3">
        <div className="mb-4">
          <AvatarUploadInput avatarUrl={photoProfileUrl} />
        </div>
        <div className="flex w-full items-center justify-center gap-1">
          {account?.role && <RolePill role={account?.role} />}
          <LevelPill level={account?.profile.level || 0} />
        </div>

        <form
          className="flex w-full flex-col gap-2"
          onSubmit={handleSubmit(handleEditProfile)}
        >
          <Controller
            name="username"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextInput
                icon={HashIcon}
                label="Usuário"
                type="text"
                placeholder="Ex: victor_"
                error={error?.message}
                {...field}
                readOnly
              />
            )}
          />

          <Controller
            name="fullName"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextInput
                icon={UserIcon}
                label="Nome"
                type="text"
                placeholder="Ex: Delta Furtado"
                error={error?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextInput
                icon={AtIcon}
                label="Email"
                type="text"
                placeholder="Ex: delta@exemplo.com"
                error={error?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="phoneNumber"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextInput
                icon={PhoneIcon}
                label="Telefone"
                type="text"
                placeholder="Ex: (11) 91234-5678"
                error={error?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="bio"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Textarea
                label="Bio"
                placeholder="Escreva algo sobre você"
                className="w-full"
                error={error?.message}
                {...field}
              />
            )}
          />

          <Button size="lg" isLoading={isProfileLoading} type="submit">
            Salvar Alterações
          </Button>
        </form>
      </section>
    </article>
  )
}
