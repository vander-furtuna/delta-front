'use client'

import { TextInput } from '@/components/forms/input'
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
      <TextInput
        icon={LockIcon}
        label="Senha"
        type="password"
        placeholder="•••••••••"
        required
      />
      <button type="submit">Entrar</button>
    </form>
  )
}
