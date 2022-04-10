import { createContext, useState, useContext } from 'react'
import { setToken } from '../store/AccessTokenStore'

const AuthContext = createContext()

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState()

  const login = (token) => {
    setToken(token)
  }

  const getCurrentUser = () => {

  }

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