'use client'

import { Button } from '@/components/forms/button'
import { PasswordInput } from '@/components/forms/password-input'
import { TextInput } from '@/components/forms/text-input'
import { zodResolver } from '@hookform/resolvers/zod'
import { AtIcon, LockIcon } from '@phosphor-icons/react'
import { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const signInFormSchema = z.object({
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
})

type SignInFormData = z.infer<typeof signInFormSchema>

export function SignInForm() {
  const { control, handleSubmit } = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSignIn = useCallback((data: SignInFormData) => {
    // Handle sign-in logic here
    console.log('Sign In Data:', data)
    // You can call an API or perform any other action with the data
  }, [])

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={handleSubmit(handleSignIn)}
    >
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
      <Button>Entrar</Button>
    </form>
  )
}
