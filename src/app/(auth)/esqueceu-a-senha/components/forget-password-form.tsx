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

const forgetPasswordFormSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
})

type ForgetPasswordFormData = z.infer<typeof forgetPasswordFormSchema>

export function ForgetPasswordForm() {
  const { push } = useRouter()

  const { control, handleSubmit } = useForm<ForgetPasswordFormData>({
    resolver: zodResolver(forgetPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  })

  const handleForgetPassword = useCallback(
    async (data: ForgetPasswordFormData) => {
      try {
        console.log('Sending password reset request for:', data.email)

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
      onSubmit={handleSubmit(handleForgetPassword)}
    >
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextInput
            icon={UserIcon}
            label="Email"
            type="text"
            placeholder="Ex: victor_"
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
