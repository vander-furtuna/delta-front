import { api } from '../api'

type SignInBody = {
  username: string
  password: string
}

export async function signIn({ username, password }: SignInBody) {
  const { data } = await api.post('/home/login', {
    username,
    password,
  })
  return data
}
