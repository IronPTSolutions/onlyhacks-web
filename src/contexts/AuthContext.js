import { createContext, useState } from 'react'
import { setToken } from '../store/accessTokenStore'

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState()

  const login = (token) => {
    setToken(token)
  }

  const getCurrentUser = () => {
    
  }

  return (
    <AuthContext.Provider>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext