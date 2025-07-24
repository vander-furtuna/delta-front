import type { AuthResponse } from '@/types/auth'
import { api } from '../api'

export type SignUpBody = {
  username: string
  email: string
  password: string
}

export async function signUpService({
  username,
  email,
  password,
}: SignUpBody): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/account/register', {
    username,
    email,
    passwordHash: password,
  })

  return data
}
