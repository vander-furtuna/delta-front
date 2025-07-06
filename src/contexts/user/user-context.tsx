'use client'

import { createContext } from 'react'
import type { UserContextProps } from './user-provider'

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps,
)
