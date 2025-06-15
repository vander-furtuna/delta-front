'use client'

import { Button } from '@/components/forms/button'
import { PasswordInput } from '@/components/forms/password-input'
import { TextInput } from '@/components/forms/text-input'
import { zodResolver } from '@hookform/resolvers/zod'
import { AtIcon, LockIcon, UserIcon } from '@phosphor-icons/react'
import { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const signUpFormSchema = z
  .object({
    username: z
      .string({
        required_error: 'Nome de usuário é obrigatório',
      })
      .min(2, 'Nome de usuário deve ter pelo menos 2 caracteres')
      .max(100, 'Nome de usuário deve ter no máximo 100 caracteres'),
    email: z
      .string({
        required_error: 'Email é obrigatório',
      })
      .email({
        message: 'Email inválido',
      }),
    password: z
      .string({
        required_error: 'Senha é obrigatória',
      })
      .min(6, 'Senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z
      .string({
        required_error: 'Confirmação de senha é obrigatória',
      })
      .min(6, 'Confirmação de senha deve ter pelo menos 6 caracteres'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type SignUpFormData = z.infer<typeof signUpFormSchema>

export function SignUpForm() {
  const { control, handleSubmit } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSignUp = useCallback((data: SignUpFormData) => {
    // Handle sign-in logic here
    console.log('Sign In Data:', data)
    // You can call an API or perform any other action with the data
  }, [])

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
        name="password"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <PasswordInput
            icon={LockIcon}
            label="Confirme a Senha"
            placeholder="•••••••••"
            error={error?.message}
            {...field}
          />
        )}
      />
      <Button>Registrar</Button>
    </form>
  )
}
