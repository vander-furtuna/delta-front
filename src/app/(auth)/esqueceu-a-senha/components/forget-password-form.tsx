'use client'

import { Button } from '@/components/ui/button'
import { TextInput } from '@/components/forms/text-input'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeftIcon, AtIcon } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { useCallback } from 'react'
import { useMutation } from '@tanstack/react-query'
import { forgotPasswordService } from '@/services/auth/forgot-password-service'

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

  const { mutateAsync: forgotPassword, isPending: isEmailSending } =
    useMutation({
      mutationFn: forgotPasswordService,
      onSuccess: () => {
        toast.success('Email de recuperação enviado com sucesso!')
        push('/recuperar-senha')
      },
      onError: () => {
        toast.error(
          'Não foi possível enviar email de recuperação :/ Tente novamente.',
        )
      },
    })

  const handleForgetPassword = useCallback(
    async ({ email }: ForgetPasswordFormData) => {
      await forgotPassword({ email })
    },
    [forgotPassword],
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
            icon={AtIcon}
            label="Email"
            type="text"
            placeholder="Ex: victor_"
            error={error?.message}
            {...field}
          />
        )}
      />

      <div className="flex w-full flex-col gap-2">
        <Button size="xl" type="submit" isLoading={isEmailSending}>
          Enviar Código
        </Button>
        <Button
          variant="ghost"
          size="lg"
          type="button"
          disabled={isEmailSending}
          onClick={() => push('/entrar')}
        >
          <ArrowLeftIcon className="size-5" />
          Voltar
        </Button>
      </div>
    </form>
  )
}
