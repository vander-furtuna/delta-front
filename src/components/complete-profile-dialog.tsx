'use client'

import { type ComponentProps } from 'react'
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

type CompleteProfileDialogProps = ComponentProps<typeof Dialog>

export default function CompleteProfileDialog({
  ...props
}: CompleteProfileDialogProps) {
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
            <form className="space-y-4">
              <TextInput label="Nome completo" icon={UserIcon} />
              <TextInput label="Número de Telefone" icon={PhoneIcon} />
              <Textarea label="Bio" icon={AtIcon} />
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
            <Button type="button">Completar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
