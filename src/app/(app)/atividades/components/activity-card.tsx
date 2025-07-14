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
    <div className="bg-accent min-w-48 overflow-hidden rounded-md" {...props}>
      <div className="bg-primary relative flex h-24 w-full items-center justify-center">
        {ActivityTypeIcon && (
          <div className="bg-accent/50 absolute size-fit rounded-full p-2">
            <ActivityTypeIcon
              className="text-primary/90 size-8"
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
      <div className="flex flex-col items-start gap-3 p-3">
        <span className="h-12 text-base font-medium first-letter:uppercase">
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
