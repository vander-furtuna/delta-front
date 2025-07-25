import { api } from '../api'

export async function uploadPhotoProfile(file: File): Promise<void> {
  const formData = new FormData()
  formData.append('file', file)

  await api.post('/account/profile/upload-photo-profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
