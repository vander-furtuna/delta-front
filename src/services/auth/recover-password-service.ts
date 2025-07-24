import { api } from '../api'

type RecoverPasswordServiceParams = {
  code: string
  email: string
  newPassword: string
}

export async function recoverPasswordService({
  code,
  email,
  newPassword,
}: RecoverPasswordServiceParams) {
  await api.post('/auth/reset-password', {
    code,
    email,
    newPassword,
  })
}
