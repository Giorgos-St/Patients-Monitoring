import { useMemo } from 'react'
import { useUser } from '../context/userContext'
import { usePublicRoutes } from './usePublicRoutes.jsx'
import { useSecureRoutes } from './useSecureRoutes.jsx'

export const useRoutesDispatcher = () => {
  const { user } = useUser()
  const publicRoutes = usePublicRoutes()
  const secureRoutes = useSecureRoutes()

  return useMemo(
    () => (user ? secureRoutes : publicRoutes),
    [user, publicRoutes, secureRoutes],
  )
}
