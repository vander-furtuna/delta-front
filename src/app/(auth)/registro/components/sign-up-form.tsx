'use client'

import { Button } from '@/components/ui/button'
import { PasswordInput } from '@/components/forms/password-input'
import { TextInput } from '@/components/forms/text-input'
import { signUpService } from '@/services/auth/sign-up-service'
import { passwordValidation, usernameValidation } from '@/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { AtIcon, LockIcon, LockKeyIcon, UserIcon } from '@phosphor-icons/react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const signUpFormSchema = z
  .object({
    username: usernameValidation,
    email: z
      .string({
        required_error: 'Email é obrigatório',
      })
      .email({
        message: 'Email inválido',
      }),
    password: passwordValidation,
    confirmPassword: z.string({
      required_error: 'Confirmação de senha é obrigatória',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type SignUpFormData = z.infer<typeof signUpFormSchema>

export function SignUpForm() {
  const { push } = useRouter()

  const { control, handleSubmit } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
      confirmPassword: '',
    },
  })

  const { mutateAsync: signUpServiceMutation, isPending: isSigningUp } =
    useMutation({
      mutationFn: signUpService,
      onSuccess: () => {
        toast.success('Registro realizado com sucesso! :D')
        push('/entrar')
      },
      onError: () => {
        toast.error('Não foi possível realizar registro. Tente novamente :(')
      },
    })

  const handleSignUp = useCallback(
    async ({ password, email, username }: SignUpFormData) => {
      await signUpServiceMutation({ password, email, username })
    },
    [signUpServiceMutation],
  )

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={handleSubmit(handleSignUp)}
    >
      <Controller
        name="username"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextInput
            icon={UserIcon}
            label="Nome de Usuário"
            type="text"
            placeholder="Ex: delta_"
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
            type="email"
            placeholder="Ex: victor@email.com"
            error={error?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <PasswordInput
            icon={LockIcon}
            label="Senha"
            placeholder="•••••••••"
            error={error?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <PasswordInput
            icon={LockKeyIcon}
            label="Confirme a Senha"
            placeholder="•••••••••"
            error={error?.message}
            {...field}
          />
        )}
      />
      <Button type="submit" size="xl" isLoading={isSigningUp}>
        Registrar
      </Button>
    </form>
  )
}
