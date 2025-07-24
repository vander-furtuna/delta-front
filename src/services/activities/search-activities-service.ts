import type {
  ActivityStatus,
  ActivityType,
  SearchActivitiesResponse,
} from '@/types/activity'
import { api } from '../api'

type SearchActivitiesParams = {
  query: string | null
  page: number | null
  size: number | null
  status: ActivityStatus | null
  activityType: ActivityType | null
}

export async function searchActivitiesService({
  query = '',
  page,
  size,
  status,
  activityType,
}: SearchActivitiesParams): Promise<SearchActivitiesResponse> {
  const { data } = await api.post<SearchActivitiesResponse>(
    '/activities/search',
    {
      status,
      activityType,
    },
    {
      params: {
        q: query,
        page,
        size,
      },
    },
  )

  return data
}
