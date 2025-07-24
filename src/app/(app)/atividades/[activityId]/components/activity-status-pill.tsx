import type { ActivityStatus } from '@/types/activity'
import { getActivityStatusName } from '@/utils/get-activity-status-name'
import {
  CheckIcon,
  ClockIcon,
  HourglassSimpleLowIcon,
} from '@phosphor-icons/react'
import { cva, type VariantProps } from 'class-variance-authority'
import { useMemo, type ComponentProps } from 'react'

const activityStatusPillVariants = cva(
  'bg-accent flex h-6 w-fit items-center gap-1 rounded-full border px-2 py-0.5',
  {
    variants: {
      status: {
        PENDING: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
        OVERDUE: 'bg-rose-500/10 text-rose-500 border-rose-500/30',
        COMPLETED: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30',
      },
    },
    defaultVariants: {
      status: 'PENDING',
    },
  },
)

function getFileIcon(status: ActivityStatus) {
  switch (status) {
    case 'PENDING':
      return ClockIcon
    case 'OVERDUE':
      return HourglassSimpleLowIcon
    case 'COMPLETED':
      return CheckIcon
    default:
      return ClockIcon
  }
}

type ActivityStatusPillProps = {
  status: ActivityStatus
} & VariantProps<typeof activityStatusPillVariants> &
  ComponentProps<'div'>

export function ActivityStatusPill({
  status,
  className,
  ...props
}: ActivityStatusPillProps) {
  const Icon = useMemo(() => getFileIcon(status), [status])
  const statusName = useMemo(() => getActivityStatusName(status), [status])

  return (
    <div
      className={activityStatusPillVariants({ status, className })}
      {...props}
    >
      <Icon className="size-4 text-inherit" weight="duotone" />
      <span className="text-sm leading-tight text-inherit">{statusName}</span>
    </div>
  )
}
