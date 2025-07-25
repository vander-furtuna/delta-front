import type { Role } from '@/types/user'
import {
  ChalkboardTeacherIcon,
  GearFineIcon,
  StudentIcon,
} from '@phosphor-icons/react'

export function getRoleIcon(role: Role) {
  switch (role) {
    case 'STUDENT':
      return StudentIcon
    case 'MONITOR':
      return ChalkboardTeacherIcon
    case 'ADMIN':
      return GearFineIcon
    default:
      return StudentIcon
  }
}
