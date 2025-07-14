export type Role = 'STUDENT' | 'MONITOR' | 'ADMIN'

export type User = {
  id: number
  username: string
  role: Role
}
export type TokenInfo = {
  username: string
  token: string
  expiresAt: string
}
