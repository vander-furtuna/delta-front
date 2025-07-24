'use client'

import { Button } from '@/components/ui/button'
import { TextInput } from '@/components/forms/text-input'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserIcon } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { useCallback } from 'react'

const recoverPasswordFormSchema = z.object({
  code: z
    .string({
      required_error: 'Código é obrigatório',
    })
    .min(6, 'Código inválido')
    .refine((val) => {
      return /^\d+$/.test(val)
    }, 'Código deve conter apenas números'),
})

type RecoverPasswordFormData = z.infer<typeof recoverPasswordFormSchema>

export function RecoverPasswordForm() {
  const { push } = useRouter()

  const { control, handleSubmit } = useForm<RecoverPasswordFormData>({
    resolver: zodResolver(recoverPasswordFormSchema),
    defaultValues: {
      code: '',
    },
  })

  const handleRecoverPassword = useCallback(
    async (data: RecoverPasswordFormData) => {
      try {
        console.log('Sending password reset request for:', data.code)

        toast.success('Email de recuperação enviado com sucesso!')

        push('/dashboard')
      } catch (error) {
        console.error('Error during password reset:', error)
        toast.error('Erro ao enviar email de recuperação. :(')
      }
    },
    [push],
  )

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={handleSubmit(handleRecoverPassword)}
    >
      <Controller
        name="code"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextInput
            icon={UserIcon}
            label="Código"
            type="text"
            placeholder="Ex: 123456"
            error={error?.message}
            {...field}
          />
        )}
      />

      <div className="flex w-full flex-col gap-1">
        <Button size="xl">Enviar código</Button>
        <Button
          variant="ghost"
          size="xl"
          type="button"
          onClick={() => push('/entrar')}
        >
          Voltar
        </Button>
      </div>
    </form>
  )
}
