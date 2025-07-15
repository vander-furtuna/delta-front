import type { Activity } from '@/types/activity'
import { getActivityStatusName } from '@/utils/get-activity-status-name'
import { getActivityTypeName } from '@/utils/get-activity-type-name'
import {
  BarbellIcon,
  BookmarkSimpleIcon,
  CheckIcon,
  ClockIcon,
  DiceThreeIcon,
  FlagPennantIcon,
  HourglassSimpleLowIcon,
} from '@phosphor-icons/react'
import { useMemo, type ComponentProps } from 'react'

type ActivityCardProps = {
  activity: Activity
} & ComponentProps<'div'>

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

  const ActivityStatusIcon = useMemo(() => {
    switch (activity.status) {
      case 'PENDING':
        return ClockIcon
      case 'OVERDUE':
        return HourglassSimpleLowIcon

      case 'COMPLETED':
        return CheckIcon
      default:
        return null
    }
  }, [activity.status])

  const activityTypeName = useMemo(
    () => getActivityTypeName(activity.activityType),
    [activity.activityType],
  )

  const activityStatusName = useMemo(() => {
    return getActivityStatusName(activity.status)
  }, [activity.status])

  return (
    <div
      className="bg-accent h-56 min-w-48 shrink-0 overflow-hidden rounded-md"
      {...props}
    >
      <div className="bg-primary relative flex h-24 w-full items-center justify-center">
        {ActivityTypeIcon && (
          <div className="absolute size-fit rounded-full bg-stone-700/50 p-2">
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
      <div className="flex h-fit flex-col items-start gap-1 p-3">
        <span className="h-12 text-base leading-tight font-medium first-letter:uppercase">
          {activity.title}
        </span>

        <div className="text-foreground/80 flex flex-col gap-1.5 text-sm">
          <div className="bg-foreground/5 flex w-fit items-center gap-1 rounded-full border-1 px-2">
            {ActivityTypeIcon && (
              <ActivityTypeIcon
                className="text-foreground size-4"
                weight="duotone"
              />
            )}
            <span>{activityTypeName}</span>
          </div>
          <div className="bg-foreground/5 flex w-fit items-center gap-1 rounded-full border-1 px-2">
            {ActivityStatusIcon && (
              <ActivityStatusIcon
                className="text-foreground size-4"
                weight="duotone"
              />
            )}
            <span>{activityStatusName}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
