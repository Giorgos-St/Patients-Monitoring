import { useMemo } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { UserProvider } from './context/userContext'
import { useRoutesDispatcher } from './routes/useRoutesDispatcher'

function AppRoutes() {

  const routes = useRoutesDispatcher()
  const router = useMemo(() => createBrowserRouter(routes), [routes])

  return <RouterProvider router={router} />
}

function App() {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  )
}

export default App
