'use client'

import type { TokenInfo, User } from '@/types/user'
import { UserContext } from './user-context'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { signInService, type SignInBody } from '@/services/auth/sign-in-service'
import { api } from '@/services/api'
import { refreshTokenService } from '@/services/auth/refresh-token-service'
import { getRefreshToken } from '@/storage/local/get-refresh-token'
import { saveRefreshToken } from '@/storage/local/save-refresh-token'
import { signOutService } from '@/services/auth/sign-out-service'
import { removeRefreshToken } from '@/storage/local/remove-refrash-token'
import { getUserInfoService } from '@/services/auth/get-user-info-service'

export type UserContextProps = {
  user: User | null
  signIn: (body: SignInBody) => Promise<void>
  isUserLoading: boolean
  signOut: () => Promise<void>
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [isUserLoading, setIsUserLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<TokenInfo | null>(null)

  const signIn = useCallback(async ({ username, password }: SignInBody) => {
    const { refreshTokenDTO, tokenInfoValue } = await signInService({
      username,
      password,
    })

    setToken(tokenInfoValue)

    api.defaults.headers.common.Authorization = `Bearer ${tokenInfoValue.token}`

    saveRefreshToken(refreshTokenDTO.token)

    const user = await getUserInfoService()

    setUser(user)
  }, [])

  const verifiyToken = useCallback(async () => {
    try {
      setIsUserLoading(true)
      const token = getRefreshToken()

      console.log('Verifying token:', token)

      if (!token) {
        return
      }

      const tokenInfo = await refreshTokenService({ token })

      console.log('Token info:', tokenInfo)

      setToken(tokenInfo.tokenInfoValue)
      saveRefreshToken(tokenInfo.refreshTokenDTO.token)
      api.defaults.headers.common.Authorization = `Bearer ${tokenInfo.tokenInfoValue.token}`

      const user = await getUserInfoService()
      setUser(user)
    } catch {
      setToken(null)
      setUser(null)
      api.defaults.headers.common.Authorization = ''
    } finally {
      setIsUserLoading(false)
    }
  }, [])

  const signOut = useCallback(async () => {
    const token = getRefreshToken()
    if (token) {
      await signOutService({ token })

      setToken(null)
      setUser(null)
      api.defaults.headers.common.Authorization = ''
      removeRefreshToken()
    }
  }, [])

  useEffect(() => {
    verifiyToken()
  }, [verifiyToken])

  useEffect(() => {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token.token}`
    }
  }, [token])

  const value = useMemo(
    () => ({ user, signIn, isUserLoading, signOut }),
    [user, signIn, isUserLoading, signOut],
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
