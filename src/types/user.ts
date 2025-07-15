export type Role = 'STUDENT' | 'MONITOR' | 'ADMIN'

export type AuthUser = {
  id: number
  username: string
  role: Role
}

export type TokenInfo = {
  username: string
  token: string
  expiresAt: string
}

export type UserProfile = {
  name: string
  profileImage: string
  phoneNumber: string
  totalScore: number
  level: number
  bio: string
}

export type User = {
  id: number
  username: string
  email: string
  createdAt: string
  role: Role
  profile: UserProfile
}
