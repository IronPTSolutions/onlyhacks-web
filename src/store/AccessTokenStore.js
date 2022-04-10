const ACCESS_TOKEN_KEY = 'access_token'

let accessToken = ''

export const setToken = (token) => {
  accessToken = token
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

export const getToken = () => {
  return accessToken
}

export const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)

  window.location.assign('/login')
}