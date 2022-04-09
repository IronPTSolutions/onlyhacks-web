import { createContext, useContext, useState, useEffect } from 'react'
import { getCurrentUser } from '../services/UsersService'
import { getAccessToken, setAccessToken } from '../store/accessTokenStore'

const AuthContext = createContext()

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState()

  const login = (token) => {
    setAccessToken(token)

    getUser()
  }

  const getUser = () => {
    getCurrentUser()
      .then(userFromAPI => setUser(userFromAPI))
  }

  useEffect(() => {
    // token?
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