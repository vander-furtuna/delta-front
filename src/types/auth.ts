import type { Role, TokenInfo } from './user'

export type RefreshTokenInfo = {
  id: number
  token: string
  userbasicDTO: {
    id: number
    username: string
    role: Role
  }
  revoked: boolean
  expiresAt: string
  createdAt: string
}

export type AuthResponse = {
  meta: string
  refreshTokenDTO: RefreshTokenInfo
  tokenInfoValue: TokenInfo
}
