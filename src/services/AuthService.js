import http from './BaseService'

export const login = (data) => http.post('/login', data)