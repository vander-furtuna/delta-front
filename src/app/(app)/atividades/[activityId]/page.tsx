'use client'

import { ClockIcon } from '@phosphor-icons/react/ssr'
import { BarbellIcon, type Icon } from '@phosphor-icons/react'
import { useMemo } from 'react'
import { getFormattedDate } from '@/utils/get-formated-date'

type DetailPillProps = {
  icon?: Icon
  value?: string
}

function DetailPill({ icon: Icon, value }: DetailPillProps) {
  return (
    <div className="bg-accent flex h-fit w-fit items-center gap-1 rounded-full border px-2 py-0.5">
      {Icon && <Icon />}
      <span className="text-sm leading-tight">{value || 'Detalhes'}</span>
    </div>
  )
}

export default function ActivityPage({
  params,
}: {
  params: { activityId: string }
}) {
  const { activityId } = params

  const date = '2025-07-22T00:00:00'

  const deadline = useMemo(() => getFormattedDate(date), [date])

  return (
    <article className="h-full w-full p-6">
      <section className="ml-14 flex h-full w-full">
        <div className="flex flex-col gap-2">
          <div className="relative size-fit">
            <div className="bg-primary/50 absolute top-1/2 -left-10 flex size-12 -translate-1/2 items-center justify-center rounded-full">
              <BarbellIcon className="size-5" />
            </div>

            <h1 className="font-heading text-4xl font-bold">
              Atividade {activityId}
            </h1>
          </div>
          <div>
            <DetailPill icon={ClockIcon} value={deadline} />
          </div>
        </div>
      </section>
    </article>
  )
}
