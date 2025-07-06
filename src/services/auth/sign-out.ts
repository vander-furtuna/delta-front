import { api } from '../api'

type SignOutBody = {
  token?: string
}

export async function signOutService({ token }: SignOutBody) {
  await api.post('/auth/revoke', { token })
}
