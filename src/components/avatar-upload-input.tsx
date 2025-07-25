'use client'

import { useFileUpload } from '@/hooks/use-file-upload'
import { Button } from '@/components/ui/button'
import { CameraIcon, CheckIcon, XIcon } from '@phosphor-icons/react'
import { useCallback, useEffect, useState } from 'react'
import { uploadPhotoProfile } from '@/services/account/upload-photo-profile'
import { toast } from 'sonner'
import { z } from 'zod'
import { queryClient } from '@/lib/query-client'

const fileValidator = z.custom<File | null>(
  (value) => {
    if (value === null) return true
    if (value instanceof File) {
      return (
        value.size <= 5 * 1024 * 1024 &&
        ['image/png', 'image/jpeg'].includes(value.type)
      )
    }
    return false
  },
  {
    message:
      'O arquivo deve ser uma imagem PNG ou JPEG e não pode exceder 5MB.',
  },
)

type AvatarUploadInputProps = {
  avatarUrl?: string | null
}

export function AvatarUploadInput({ avatarUrl }: AvatarUploadInputProps) {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    avatarUrl || null,
  )

  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept: 'image/png, image/jpeg',
    })

  console.log('Files:', avatarPreview)

  const previewUrl = files[0]?.preview || null

  const handleUploadAvatar = useCallback(async () => {
    console.log('Uploading avatar:', files[0]?.file)
    try {
      if (files[0]?.file instanceof File) {
        const isValid = fileValidator.safeParse(files[0].file)

        if (!isValid.success) {
          toast.error(isValid.error.message)
          return
        }

        await uploadPhotoProfile(files[0].file)

        removeFile(files[0].id)

        queryClient.refetchQueries({
          queryKey: ['photoProfileUrl'],
        })

        toast.success('Avatar atualizado com sucesso! :D')
      }
    } catch (error) {
      console.error('Error uploading avatar:', error)
      toast.error('Não foi possível atualizar o avatar. Tente novamente. :/')
    }
  }, [files, removeFile])

  useEffect(() => {
    setAvatarPreview(avatarUrl || null)
  }, [avatarUrl])

  return (
    <div className="relative size-fit">
      <div className="inline-flex">
        <Button
          variant="outline"
          className="bg-accent relative size-32 overflow-hidden border-b-2 p-0 shadow-none"
          onClick={openFileDialog}
          aria-label={previewUrl ? 'Change image' : 'Upload image'}
        >
          {previewUrl || avatarPreview ? (
            <img
              className="size-full object-cover"
              src={avatarPreview ?? previewUrl ?? undefined}
              alt="Preview of uploaded image"
              width={64}
              height={64}
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div aria-hidden="true">
              <CameraIcon weight="duotone" className="size-5 opacity-60" />
            </div>
          )}
        </Button>

        <input
          {...getInputProps()}
          className="sr-only"
          aria-label="Upload image file"
          tabIndex={-1}
        />
      </div>
      <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center justify-center gap-2">
        {(previewUrl || avatarPreview) && (
          <Button
            onClick={() =>
              !avatarPreview ? removeFile(files[0]?.id) : setAvatarPreview(null)
            }
            size="icon"
            variant="outline"
            className="border-border focus-visible:border-border bg-accent size-8 rounded-full border-2 shadow-none"
            aria-label="Remove image"
          >
            <XIcon className="size-3.5" weight="bold" />
          </Button>
        )}

        {previewUrl && (
          <Button
            onClick={handleUploadAvatar}
            size="icon"
            variant="default"
            className="border-border focus-visible:border-border size-8 rounded-full border-2 shadow-none"
            aria-label="Upload image"
          >
            <CheckIcon className="size-3.5" weight="bold" />
          </Button>
        )}
      </div>
    </div>
  )
}
