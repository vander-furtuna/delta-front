'use client'

import {
  BarbellIcon,
  GaugeIcon,
  HourglassLowIcon,
  PlusIcon,
  type Icon,
} from '@phosphor-icons/react'
import { use, useMemo } from 'react'
import { getFormattedDate } from '@/utils/get-formated-date'
import { DeltaIcon } from '@/components/icons/delta'
import { useQuery } from '@tanstack/react-query'
import { getActivityById } from '@/services/activities/get-activity-by-id'
import { FileCard } from '@/components/file-card'
import { LinkCard } from '@/components/link-card'
import { ActivityStatusPill } from './components/activity-status-pill'
import { Button } from '@/components/ui/button'

type DetailPillProps = {
  icon?: Icon
  value?: string
}

function DetailPill({ icon: Icon, value }: DetailPillProps) {
  return (
    <div className="bg-accent flex h-6 w-fit items-center gap-1 rounded-full border px-2 py-0.5">
      {Icon && <Icon className="text-primary size-4" />}
      <span className="text-accent-foreground/90 text-sm leading-tight">
        {value || 'Detalhes'}
      </span>
    </div>
  )
}

function ScorePill({ value }: DetailPillProps) {
  return (
    <div className="border-primary/50 bg-primary/20 flex h-6 w-fit items-center gap-1 rounded-full border px-2 py-0.5">
      <DeltaIcon className="fill-primary h-3.5" />
      <span className="text-accent-foreground/90 text-sm leading-tight font-medium">
        {value || 'Detalhes'}
      </span>
    </div>
  )
}

export default function ActivityPage({
  params,
}: {
  params: Promise<{ activityId: string }>
}) {
  const { activityId } = use(params)

  const { data: activity } = useQuery({
    queryKey: ['activity', activityId],
    queryFn: () =>
      getActivityById({
        activityId,
      }),
    refetchOnWindowFocus: false,
  })

  const deadline = useMemo(
    () => activity?.deadline && getFormattedDate(activity?.deadline),
    [activity?.deadline],
  )

  return (
    <article className="flex h-full w-full gap-8 p-10">
      <section className="ml-14 flex h-full w-full flex-col gap-4">
        <div className="flex w-full shrink flex-col gap-2">
          <div className="relative size-fit">
            <div className="bg-primary/50 absolute top-1/2 -left-10 flex size-12 -translate-1/2 items-center justify-center rounded-full">
              <BarbellIcon className="size-5" />
            </div>

            <h1 className="font-heading text-4xl font-bold first-letter:uppercase">
              {activity?.title}
            </h1>
          </div>
          <div className="flex gap-2">
            <ScorePill value={`+${activity?.maxScore} pontos`} />
            <DetailPill icon={HourglassLowIcon} value={deadline} />
            <DetailPill
              icon={GaugeIcon}
              value={`Nível ${activity?.difficultyLevel}`}
            />
          </div>
        </div>
        <hr className="border-border" />
        <p className="text-base">{activity?.description}</p>

        <div className="flex w-full flex-wrap gap-2">
          {activity?.files.map((file) => (
            <FileCard key={file.id} file={file} />
          ))}

          {activity?.links.map((link) => (
            <LinkCard key={link.description} link={link} />
          ))}
        </div>
      </section>
      <aside className="w-fit">
        <div className="flex w-80 flex-col gap-4 rounded-md border p-4">
          <div className="flex w-full justify-between">
            <h2 className="font-heading text-xl font-medium">Seus Anexos</h2>
            {activity?.status && (
              <ActivityStatusPill status={activity?.status} />
            )}
          </div>

          <button
            className="bg-accent text-accent-foreground hover:bg-accent/80 mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full border text-sm font-medium transition-colors disabled:opacity-50"
            disabled={activity?.status !== 'PENDING'}
          >
            <PlusIcon />
            Adicionar Anexo
          </button>

          <Button disabled={activity?.status !== 'PENDING'} size="xl">
            Marcar como concluída
          </Button>
        </div>
      </aside>
    </article>
  )
}
