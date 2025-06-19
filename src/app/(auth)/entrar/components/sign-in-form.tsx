'use client'

import { Button } from '@/components/forms/button'
import { PasswordInput } from '@/components/forms/password-input'
import { TextInput } from '@/components/forms/text-input'
import { passwordValidation, usernameValidation } from '@/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { LockIcon, UserIcon } from '@phosphor-icons/react'
import { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const signInFormSchema = z.object({
  username: usernameValidation,
  password: passwordValidation,
})

type SignInFormData = z.infer<typeof signInFormSchema>

export function SignInForm() {
  const { control, handleSubmit } = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      username: '',
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
        name="username"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextInput
            icon={UserIcon}
            label="Nome de Usuário"
            type="text"
            placeholder="Ex: victor_"
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
