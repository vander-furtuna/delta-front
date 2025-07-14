'use client'

import { Button } from '@/components/forms/button'
import { SearchInput } from '@/components/forms/search-input'
import { Select, type Options } from '@/components/forms/select'
import type { ActivityStatus, ActivityType } from '@/types/activity'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  BarbellIcon,
  BookmarkSimpleIcon,
  CheckIcon,
  ClockIcon,
  DiceThreeIcon,
  FlagPennantIcon,
  HourglassSimpleLowIcon,
  MagnifyingGlassIcon,
} from '@phosphor-icons/react/ssr'
import { useSearchParams } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const statusOptions: Options[] = [
  { value: 'PENDING', label: 'Pendente', icon: <ClockIcon weight="duotone" /> },
  {
    value: 'OVERDUE',
    label: 'Atrasada',
    icon: <HourglassSimpleLowIcon weight="duotone" />,
  },
  {
    value: 'COMPLETED',
    label: 'Concluida',
    icon: <CheckIcon weight="duotone" />,
  },
]

const typeOptions: Options[] = [
  {
    value: 'EXERCISE',
    label: 'Exercício',
    icon: <BarbellIcon weight="duotone" />,
  },
  {
    value: 'CHALLENGE',
    label: 'Desafio',
    icon: <FlagPennantIcon weight="duotone" />,
  },
  { value: 'QUIZ', label: 'Quiz', icon: <DiceThreeIcon weight="duotone" /> },
  {
    value: 'LIST',
    label: 'Lista',
    icon: <BookmarkSimpleIcon weight="duotone" />,
  },
]

const activitiesFilterSchema = z.object({
  query: z.string().optional(),
  status: z.enum(['PENDING', 'OVERDUE', 'COMPLETED']).optional(),
  activityType: z.enum(['EXERCISE', 'CHALLENGE', 'QUIZ', 'LIST']).optional(),
})

type ActivitiesFilterFormData = z.infer<typeof activitiesFilterSchema>

export function ActivitiesFilter() {
  const searchParams = useSearchParams()

  const status = searchParams.get('status') as ActivityStatus | null
  const activityType = searchParams.get('activityType') as ActivityType | null
  const query = searchParams.get('query')

  const { control, handleSubmit } = useForm<ActivitiesFilterFormData>({
    resolver: zodResolver(activitiesFilterSchema),
    defaultValues: {
      query: query || '',
      status: status || undefined,
      activityType: activityType || undefined,
    },
  })

  const handleFilterSubmit = (data: ActivitiesFilterFormData) => {
    const params = new URLSearchParams()
    if (data.query) {
      params.set('query', data.query)
    }
    if (data.status) {
      params.set('status', data.status)
    }
    if (data.activityType) {
      params.set('activityType', data.activityType)
    }
    // Update the URL with the new search parameters
    window.history.replaceState({}, '', `?${params.toString()}`)

    console.log('Filter submitted:', data)
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilterSubmit)}
      className="flex w-fit gap-1"
    >
      <Controller
        name="query"
        control={control}
        render={({ field }) => (
          <SearchInput type="text" placeholder="Ex: victor_" {...field} />
        )}
      />
      <Controller
        name="status"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            options={statusOptions}
            placeholder="Status"
            onValueChange={onChange}
            value={value}
          />
        )}
      />
      <Controller
        name="activityType"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            options={typeOptions}
            placeholder="Tipo"
            onValueChange={onChange}
            value={value}
          />
        )}
      />

      <Button size="fit" className="h-12 w-12">
        <MagnifyingGlassIcon weight="duotone" className="size-5" />
      </Button>
    </form>
  )
}
