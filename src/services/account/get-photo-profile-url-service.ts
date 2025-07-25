import { api } from '../api'

export async function getPhotoProfileUrlService() {
  const { data } = await api.get<string>('/account/profile/photo-profile-url')
  return data
}
