import { REFRESH_TOKEN_KEY } from '@/constants/local-storage'

export function getRefreshToken() {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)

  return refreshToken
}
