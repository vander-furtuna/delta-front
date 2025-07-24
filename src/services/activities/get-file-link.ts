import { api } from '../api'

type GetFileLinkParams = {
  fileId: number
}

export async function getFileLink({ fileId }: GetFileLinkParams) {
  const { data } = await api.get<string>(`/activities/get-file-link/${fileId}`)

  return data
}
