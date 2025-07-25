import { api } from '../api'

type UpdateAccountServiceParams = {
  userInfo: {
    username: string
    email: string
  }
  name: string
  phoneNumber: string
  bio: string
}

export async function updateAccountService({
  userInfo,
  name,
  phoneNumber,
  bio,
}: UpdateAccountServiceParams) {
  await api.patch('/account/profile/update', {
    userInfo,
    name,
    phoneNumber,
    bio,
  })
}
