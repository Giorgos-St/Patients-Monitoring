import { useMemo } from 'react'
import LoginPage from '../pages/LoginPage/LoginPage'
import { Navigate } from 'react-router-dom'

export const usePublicRoutes = () => {
    return useMemo(
        () => [
            {
                path: '/',
                element: <LoginPage />,
            },
            {
                path: '*',
                element: <Navigate to="/" replace />,
            },
        ],
        [],
    )
}
