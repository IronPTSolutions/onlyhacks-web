import createHttp from './BaseService'

const http = createHttp({ useAccessToken: false })

export const login = (data) => http.post('/login', data)
export const register = (data) => http.post('/users', data)