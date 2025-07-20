import { REFRESH_TOKEN_KEY } from '@/constants/local-storage'

export function saveRefreshToken(token: string) {
  if (typeof window === 'undefined') {
    return
  }

  localStorage.setItem(REFRESH_TOKEN_KEY, token)
}
