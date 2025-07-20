'use client'

import { searchActivities } from '@/services/activities/search-activities'
import type { ActivityStatus, ActivityType } from '@/types/activity'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { ActivityCard } from './activity-card'
import { Pagination } from '@/components/pagination'
import { z } from 'zod'
import { ActivityCardSkeleton } from './activity-card-skeleton'
import { EmptyIcon } from '@phosphor-icons/react'

export function ActivitiesList() {
  const searchParams = useSearchParams()

  const status = searchParams.get('status') as ActivityStatus | null
  const activityType = searchParams.get('activityType') as ActivityType | null
  const query = searchParams.get('query') || ''
  const page = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const { data: activities, isPending: isActivitiesPending } = useQuery({
    queryKey: ['activities', 'search', status, page, activityType, query],
    queryFn: () =>
      searchActivities({
        status,
        activityType,
        query,
        page,
        size: null,
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  console.log('Activities:', activities)

  const handleSetPageParam = (page: number) => {
    const params = new URLSearchParams()
    params.set('page', String(page + 1))
    window.history.replaceState({}, '', `?${params.toString()}`)
  }

  return (
    <div className="flex h-full w-full shrink flex-col">
      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] gap-4">
        {isActivitiesPending ? (
          Array.from({ length: 10 }, (_, i) => <ActivityCardSkeleton key={i} />)
        ) : activities && activities.content.length > 0 ? (
          activities.content.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center gap-4 py-8 text-center">
            <EmptyIcon className="text-primary size-12" weight="duotone" />
            <p>Nenhuma atividade encontrada :(</p>
          </div>
        )}
      </div>

      {activities && activities.content.length > 0 && (
        <div className="h-fit w-full py-4">
          <Pagination
            numberOfElements={activities?.totalElements}
            page={activities?.number}
            size={activities?.size}
            onPageChange={handleSetPageParam}
          />
        </div>
      )}
    </div>
  )
}
