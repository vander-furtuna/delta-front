import { api } from '../api'

type GetFileLinkParams = {
  fileId: number
}

export async function getFileLinkService({ fileId }: GetFileLinkParams) {
  const { data } = await api.get<string>(`/activities/get-file-link/${fileId}`)

  return data
}
