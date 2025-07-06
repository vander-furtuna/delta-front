import { REFRESH_TOKEN_KEY } from '@/constants/local-storage'

export function removeRefreshToken() {
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}
