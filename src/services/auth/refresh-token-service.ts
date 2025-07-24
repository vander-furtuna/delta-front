import type { AuthResponse } from '@/types/auth'
import { api } from '../api'

type RefreshTokenBody = {
  token: string
}

export async function refreshTokenService({
  token,
}: RefreshTokenBody): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/refresh', { token })
  return data
}
