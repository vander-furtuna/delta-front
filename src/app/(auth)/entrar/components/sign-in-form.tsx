'use client'

import { Button } from '@/components/ui/button'
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
import { useMutation } from '@tanstack/react-query'

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

  const { mutateAsync: signInMutation, isPending: isSigningIn } = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      toast.success('Login realizado com sucesso! :D')
      push('/dashboard')
    },
    onError: () => {
      toast.error(
        'Não foi possível realizar login. Verifique suas credenciais :(',
      )
    },
  })

  const handleSignIn = useCallback(
    async ({ password, username }: SignInFormData) => {
      await signInMutation({ password, username })
    },
    [signInMutation],
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
      <div className="flex w-full flex-col gap-2">
        <Button size="xl" type="submit" isLoading={isSigningIn}>
          Entrar
        </Button>
        <Button
          variant="ghost"
          size="lg"
          type="button"
          disabled={isSigningIn}
          onClick={() => push('/esqueceu-a-senha')}
        >
          Esqueci a senha
        </Button>
      </div>
    </form>
  )
}
