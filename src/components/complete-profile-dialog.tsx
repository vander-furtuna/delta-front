'use client'

import { useCallback, type ComponentProps } from 'react'
import { ImagePlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { TextInput } from './forms/text-input'
import { AtIcon, PhoneIcon, UserIcon } from '@phosphor-icons/react'
import { Textarea } from './forms/textarea'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { completeProfileService } from '@/services/account/complete-profile-service'
import { toast } from 'sonner'

type CompleteProfileDialogProps = ComponentProps<typeof Dialog>

const completeProfileSchema = z.object({
  fullName: z.string().min(1, 'Nome completo é obrigatório'),
  phoneNumber: z.string().min(1, 'Número de telefone é obrigatório'),
  bio: z.string().optional(),
})

type CompleteProfileFormData = z.infer<typeof completeProfileSchema>

export default function CompleteProfileDialog({
  ...props
}: CompleteProfileDialogProps) {
  const { control, handleSubmit } = useForm<CompleteProfileFormData>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      bio: '',
    },
  })

  const handleCompleteProfile = useCallback(
    async ({ fullName, phoneNumber, bio }: CompleteProfileFormData) => {
      try {
        await completeProfileService({
          fullName,
          phoneNumber,
          bio,
        })
        toast.success('Perfil completado com sucesso!')
      } catch (error) {
        console.error('Error completing profile:', error)
        toast.error('Não foi possível completar perfil. :( Tente novamente.')
      }
    },
    [],
  )

  return (
    <Dialog {...props} modal>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-md [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            Complete seu Perfil
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Make changes to your profile here. You can change your photo and set a
          username.
        </DialogDescription>
        <div className="overflow-y-auto">
          <div className="bg-primary h-32"></div>
          <div className="-mt-10 px-6">
            <div className="border-background bg-muted relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 shadow-xs shadow-black/10">
              <button
                type="button"
                className="focus-visible:border-ring focus-visible:ring-ring/50 absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
                aria-label="Change profile picture"
              >
                <ImagePlusIcon size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="px-6 pt-4 pb-6">
            <form
              className="space-y-4"
              id="complete-profile-form"
              onSubmit={handleSubmit(handleCompleteProfile)}
            >
              <Controller
                name="fullName"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextInput
                    icon={UserIcon}
                    label="Nome completo"
                    type="text"
                    placeholder="Ex: Delta Furtado"
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
                    label="Número de Telefone"
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
                    icon={AtIcon}
                    label="Bio"
                    placeholder="Fale um pouco sobre você..."
                    error={error?.message}
                    {...field}
                  />
                )}
              />
            </form>
          </div>
        </div>
        <DialogFooter className="border-t px-6 py-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" form="complete-profile-form">
              Completar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
