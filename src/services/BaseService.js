import axios from 'axios'
import { getAccessToken } from '../store/AccessTokenStore';

// const http = axios.create({
//   baseURL: 'http://localhost:3001/api',
//   withCredentials: false
// })

// http.interceptors.response.use((response) => response.data);

// export default http

const createHttp = (useAccessToken = false) => {
  const http = axios.create({
    baseURL: 'http://localhost:3001/api'
  })

  // interceptors response / request

  http.interceptors.request.use(
    (request) => {
      if (useAccessToken && getAccessToken()) {
        // meto el token en la cabezera Authorization

        request.headers.common.Authorization = `Bearer ${getAccessToken()}`
      }

      return request
    }
  )

  http.interceptors.response.use(
    (response) => response.data
  );

  return http
}

export default createHttp