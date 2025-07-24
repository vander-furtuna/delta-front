import {
  BarbellIcon,
  BookmarkSimpleIcon,
  DiceThreeIcon,
  FlagPennantIcon,
} from '@phosphor-icons/react'

import type { ActivityType } from '@/types/activity'

export function getActivityTypeIcon(type: ActivityType) {
  switch (type) {
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
}
