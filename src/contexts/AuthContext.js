import { createContext, useState, useContext, useEffect } from 'react'
import { setToken, getAccessToken } from '../store/AccessTokenStore'
import { getCurrentUser } from '../services/UsersService'

const AuthContext = createContext()

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState()

  const login = (token) => {
    setToken(token)
  }

  const getUser = () => {
    getCurrentUser()
      .then(user => {
        setUser(user)
      })
  }

  useEffect(() => {
    // Si existe token, me traigo al usuario
    if (getAccessToken()) {
      getUser()
    }
  }, [])

  const value = {
    user,
    login
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext