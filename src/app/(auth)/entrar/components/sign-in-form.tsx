'use client'

import { Button } from '@/components/forms/button'
import { PasswordInput } from '@/components/forms/password-input'
import { TextInput } from '@/components/forms/text-input'
import { useUser } from '@/hooks/contexts/use-user'
import { passwordValidation, usernameValidation } from '@/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { LockIcon, UserIcon } from '@phosphor-icons/react'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const signInFormSchema = z.object({
  username: usernameValidation,
  password: passwordValidation,
})

type SignInFormData = z.infer<typeof signInFormSchema>

export function SignInForm() {
  const { push } = useRouter()
  const { signIn } = useUser()

  const { control, handleSubmit } = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        await signIn(data)

        toast.success('Login realizado com sucesso!')

        push('/dashboard')
      } catch (error) {
        console.error('Error during sign in:', error)
        toast.error('Erro ao realizar login. :(')
      }
    },
    [signIn, push],
  )

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
