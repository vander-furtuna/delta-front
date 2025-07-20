import type { ActivityStatus } from '@/types/activity'

export function getActivityStatusName(status: ActivityStatus): string {
  const activityStatuses: Record<ActivityStatus, string> = {
    PENDING: 'Pendente',
    OVERDUE: 'Atrasada',
    COMPLETED: 'Concluída',
  }

  return activityStatuses[status]
}
