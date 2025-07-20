import type { User } from '@/types/user'
import { api } from '../api'

export async function getUserInfoService() {
  const { data } = await api.get<User>('/auth/get-user-info')
  return data
}
