'use client'

import { searchActivities } from '@/services/activities/search-activities'
import type { ActivityStatus, ActivityType } from '@/types/activity'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { ActivityCard } from './activity-card'

export function ActivitiesList() {
  const searchParams = useSearchParams()

  const status = searchParams.get('status') as ActivityStatus | null
  const activityType = searchParams.get('activityType') as ActivityType | null
  const query = searchParams.get('query') || ''

  const { data: activities } = useQuery({
    queryKey: ['activities', 'search', status, activityType, query],
    queryFn: () =>
      searchActivities({
        status,
        activityType,
        query,
        page: null,
        size: null,
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  console.log('Activities:', activities)

  return (
    <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-4">
      {activities?.content.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  )
}
