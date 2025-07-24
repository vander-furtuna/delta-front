import type { Activity } from '@/types/activity'
import {
  BarbellIcon,
  BookmarkSimpleIcon,
  DiceThreeIcon,
  FlagPennantIcon,
} from '@phosphor-icons/react'
import Link from 'next/link'
import { useMemo, type ComponentProps } from 'react'
import { ActivityStatusPill } from '../[activityId]/components/activity-status-pill'
import { ActivityTypePill } from './activity-type-pill'

type ActivityCardProps = {
  activity: Activity
} & Omit<ComponentProps<typeof Link>, 'href'>

export function ActivityCard({ activity, ...props }: ActivityCardProps) {
  const ActivityTypeIcon = useMemo(() => {
    switch (activity.activityType) {
      case 'CHALLENGE':
        return BarbellIcon
      case 'EXERCISE':
        return FlagPennantIcon
      case 'LIST':
        return BookmarkSimpleIcon
      case 'QUIZ':
        return DiceThreeIcon
      default:
        return null
    }
  }, [activity.activityType])

  return (
    <Link
      className="bg-accent hover:bg-accent/80 hover: h-56 min-w-48 shrink-0 cursor-pointer overflow-hidden rounded-md transition-colors"
      {...props}
      href={`/atividades/${activity.id}`}
    >
      <div className="bg-primary relative flex h-24 w-full items-center justify-center">
        {ActivityTypeIcon && (
          <div className="absolute size-fit rounded-full bg-stone-700/50 p-2 backdrop-blur-xs">
            <ActivityTypeIcon
              className="text-primary size-8"
              weight="duotone"
            />
          </div>
        )}
        <img
          src={activity.imageUrl}
          alt=""
          className="size-full object-cover"
        />
      </div>
      <div className="flex h-fit w-full flex-col items-start gap-3 p-3">
        <span className="two-lines-ellipses h-10 w-full overflow-hidden text-base leading-tight font-medium overflow-ellipsis first-letter:uppercase">
          {activity.title}
        </span>

        <div className="text-foreground/80 flex flex-col gap-1.5 text-sm">
          <ActivityTypePill type={activity.activityType} />
          <ActivityStatusPill status={activity.status} />
        </div>
      </div>
    </Link>
  )
}
