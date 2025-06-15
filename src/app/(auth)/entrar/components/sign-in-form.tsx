'use client'

import { PasswordInput } from '@/components/forms/password-input'
import { TextInput } from '@/components/forms/text-input'
import { AtIcon, LockIcon } from '@phosphor-icons/react'

export function SignInForm() {
  return (
    <form className="flex w-full flex-col gap-4">
      <TextInput
        icon={AtIcon}
        label="Email"
        type="email"
        placeholder="Ex: victor@email.com"
        required
      />
      <PasswordInput
        icon={LockIcon}
        label="Senha"
        placeholder="•••••••••"
        required
      />
      <button type="submit">Entrar</button>
    </form>
  )
}
