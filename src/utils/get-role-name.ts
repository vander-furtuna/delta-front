import type { Role } from '@/types/user'

export function getRoleName(role: Role): string {
  switch (role) {
    case 'STUDENT':
      return 'Estudante'
    case 'MONITOR':
      return 'Monitor'
    case 'ADMIN':
      return 'Administrador'
    default:
      return 'Estudante'
  }
}
