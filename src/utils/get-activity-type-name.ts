import type { ActivityType } from '@/types/activity'

export function getActivityTypeName(activityType: ActivityType): string {
  const activityTypes: Record<ActivityType, string> = {
    EXERCISE: 'Exercício',
    CHALLENGE: 'Desafio',
    QUIZ: 'Quiz',
    LIST: 'Lista',
  }

  return activityTypes[activityType]
}
