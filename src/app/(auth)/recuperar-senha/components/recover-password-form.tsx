'use client'

import { Button } from '@/components/ui/button'
import { TextInput } from '@/components/forms/text-input'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowLeftIcon,
  AtIcon,
  HashIcon,
  LockIcon,
  LockKeyIcon,
} from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { useCallback } from 'react'
import { passwordValidation } from '@/validations/auth'
import { useMutation } from '@tanstack/react-query'
import { recoverPasswordService } from '@/services/auth/recover-password-service'

const recoverPasswordFormSchema = z
  .object({
    code: z
      .string({
        required_error: 'Código é obrigatório',
      })
      .min(6, 'Código inválido')
      .refine((val) => {
        return /^\d+$/.test(val)
      }, 'Código deve conter apenas números'),
    email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
    password: passwordValidation,
    passwordConfirmation: z
      .string()
      .min(1, 'Confirmação de senha é obrigatória'),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirmation
    },
    {
      message: 'As senhas não coincidem',
      path: ['passwordConfirmation'],
    },
  )

type RecoverPasswordFormData = z.infer<typeof recoverPasswordFormSchema>

export function RecoverPasswordForm() {
  const { push } = useRouter()

  const { control, handleSubmit } = useForm<RecoverPasswordFormData>({
    resolver: zodResolver(recoverPasswordFormSchema),
    defaultValues: {
      code: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  const { mutateAsync: recoverPassword, isPending: isPasswordRecovering } =
    useMutation({
      mutationFn: recoverPasswordService,
      onSuccess: () => {
        toast.success('Senha recuperada com sucesso!')
        push('/entrar')
      },
      onError: () => {
        toast.error('Não foi possível recuperar senha. Tente novamente :(')
      },
    })

  const handleRecoverPassword = useCallback(
    async ({ code, email, password }: RecoverPasswordFormData) => {
      await recoverPassword({
        code,
        email,
        newPassword: password,
      })
    },
    [recoverPassword],
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
            icon={HashIcon}
            label="Código"
            type="text"
            placeholder="Ex: 123456"
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
            placeholder="Ex: delta@email.com"
            error={error?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextInput
            icon={LockIcon}
            label="Senha"
            type="password"
            placeholder="Ex: ********"
            error={error?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="passwordConfirmation"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextInput
            icon={LockKeyIcon}
            label="Confirmação de senha"
            type="password"
            placeholder="Ex: ********"
            error={error?.message}
            {...field}
          />
        )}
      />

      <div className="flex w-full flex-col gap-2">
        <Button size="xl" type="submit" isLoading={isPasswordRecovering}>
          Recuperar Senha
        </Button>
        <Button
          variant="ghost"
          size="lg"
          type="button"
          disabled={isPasswordRecovering}
          onClick={() => push('/entrar')}
        >
          <ArrowLeftIcon className="size-5" />
          Voltar
        </Button>
      </div>
    </form>
  )
}
