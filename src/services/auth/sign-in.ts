import type { AuthResponse } from '@/types/auth'
import { api } from '../api'

export type SignInBody = {
  username: string
  password: string
}

export async function signInService({
  username,
  password,
}: SignInBody): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/login', {
    username,
    password,
  })

  return data
}
