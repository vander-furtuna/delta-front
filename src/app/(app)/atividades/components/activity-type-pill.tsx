import { cn } from '@/lib/utils'
import type { ActivityType } from '@/types/activity'
import { getActivityTypeIcon } from '@/utils/get-activity-type-icon'
import { getActivityTypeName } from '@/utils/get-activity-type-name'

import { useMemo, type ComponentProps } from 'react'

type ActivityTypePillProps = {
  type: ActivityType
} & ComponentProps<'div'>

export function ActivityTypePill({
  type,
  className,
  ...props
}: ActivityTypePillProps) {
  const Icon = useMemo(() => getActivityTypeIcon(type), [type])
  const typeName = useMemo(() => getActivityTypeName(type), [type])

  return (
    <div
      className={cn(
        'bg-foreground/5 text-accent-foreground flex h-6 w-fit items-center gap-1 rounded-full border px-2 py-0.5',
        className,
      )}
      {...props}
    >
      {Icon && <Icon className="size-4 text-inherit" weight="duotone" />}
      <span className="text-sm leading-tight text-inherit">{typeName}</span>
    </div>
  )
}
