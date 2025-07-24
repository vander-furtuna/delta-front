import type { Activity } from '@/types/activity'
import { api } from '../api'

type GetActivityByIdRequest = {
  activityId: string
}

export async function getActivityByIdService({
  activityId,
}: GetActivityByIdRequest) {
  const { data } = await api.get<Activity>(`/activities/get/${activityId}`)
  return data
}
