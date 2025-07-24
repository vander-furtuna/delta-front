import { api } from '../api'

type ForgotPasswordParams = {
  email: string
}

export async function forgotPasswordService({ email }: ForgotPasswordParams) {
  await api.post('/auth/forgot-password', { email })
}
