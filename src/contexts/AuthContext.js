import { createContext, useState, useContext, useEffect } from 'react'
import { setToken, getAccessToken, logout } from '../store/AccessTokenStore'
import { getCurrentUser } from '../services/UsersService'
import { verifyJWT } from '../utils/jwtHelper'

const AuthContext = createContext()

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [isAuthenticationFetched, setIsAuthenticationFetched] = useState(false)

  const login = (token, navigateCb) => {
    setToken(token)

    getUser(navigateCb)
  }

  const getUser = (cb) => {
    getCurrentUser()
      .then(user => {
        setUser(user)
        setIsAuthenticationFetched(true)

        cb && cb()
      })
  }

  useEffect(() => {
    // Si existe token, me traigo al usuario
    if (getAccessToken()) {
      if ( !verifyJWT(getAccessToken()) ) {
        logout()
      } else {
        getUser()
      }
    } else {
      setIsAuthenticationFetched(true)
    }
  }, [])

  const value = {
    user,
    isAuthenticationFetched,
    login
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext