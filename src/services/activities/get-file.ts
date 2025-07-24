import { api } from '../api'

export async function getFile(fileId: number): Promise<File | null> {
  const { data } = await api.get<File>(`/activities/get-file/${fileId}`)
  return data
}
