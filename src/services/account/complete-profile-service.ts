import { api } from '../api'

type CompleteProfileResquest = {
  fullName: string
  phoneNumber: string
  bio?: string
}

export async function completeProfileService({
  fullName,
  phoneNumber,
  bio,
}: CompleteProfileResquest) {
  await api.post('/account/profile/create', {
    name: fullName,
    phoneNumber,
    bio,
    level: 0,
    score: 0,
  })
}
