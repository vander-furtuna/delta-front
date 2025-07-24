import { api } from '../api'

export async function getFileService(fileId: number): Promise<File | null> {
  const { data } = await api.get<File>(`/activities/get-file/${fileId}`)
  return data
}
