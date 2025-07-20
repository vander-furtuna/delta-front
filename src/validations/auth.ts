import { z } from 'zod'

export const usernameValidation = z
  .string({
    required_error: 'Nome de usuário é obrigatório',
  })
  .min(3, 'Nome de usuário deve ter ao menos 3 caracteres')
  .max(50, 'Nome de usuário não pode ultrapassar 50 caracteres')
  .regex(
    /^[a-zA-Z][a-zA-Z0-9._-]*$/,
    'Nome de usuário deve começar com letra e só pode conter letras, números, ponto, underscore ou hífen',
  )

export const passwordValidation = z
  .string({
    required_error: 'Senha é obrigatória',
  })
  .min(6, 'Senha deve ter pelo menos 6 caracteres')
  // ao menos uma letra maiúscula
  .regex(/.*[A-Z].*/, 'Senha deve conter ao menos uma letra maiúscula')
  // ao menos uma letra minúscula
  .regex(/.*[a-z].*/, 'Senha deve conter ao menos uma letra minúscula')
  // ao menos um dígito
  .regex(/.*\d.*/, 'Senha deve conter ao menos um dígito')
  // ao menos um caractere especial
  .regex(/.*[^a-zA-Z0-9].*/, 'Senha deve conter ao menos um caractere especial')
