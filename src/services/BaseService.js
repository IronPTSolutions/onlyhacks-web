import axios from 'axios'
import { getAccessToken, logout } from '../store/accessTokenStore';

// const http = axios.create({
//   baseURL: 'http://localhost:3001/api',
//   withCredentials: false
// })

const create = ({ useAccessToken } = { useAccessToken: true }) => {
  const http = axios.create({
    baseURL: 'http://localhost:3001/api',
    withCredentials: false
  })

  http.interceptors.request.use(
    (request) => {
      if (useAccessToken && getAccessToken()) {
        request.headers.common.Authorization = `Bearer ${getAccessToken()}`;
      }

      return request;
    }
  )

  http.interceptors.response.use(
    (response) => response.data,
    (error) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error

      if (error?.response?.status && [401, 403].includes(error.response.status)) {
        if (getAccessToken()) {
          // delete token
          logout()

          if (window.location.pathname !== '/login') {
            window.location.assign('/login')
          }
        }
      }

      return Promise.reject(error);
    }
  )

  return http
}

export default create