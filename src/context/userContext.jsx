import { createContext, useContext, useEffect, useState } from 'react'
import { setAuthHeader } from '../api'
import Loader from '../components/loader/Loader'

const userContext = createContext()

export const useUser = () => useContext(userContext)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('accessToken')

    if (!storedUser || !token) {
      setIsLoading(false)
      return
    }

    setAuthHeader(token)
    setUser(JSON.parse(storedUser))
    setIsLoading(false)
  }, [])

  return (
    <userContext.Provider value={{ user, setUser }}>
      {isLoading ? <Loader /> : children}
    </userContext.Provider>
  )
}
