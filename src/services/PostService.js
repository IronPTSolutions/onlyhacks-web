import createHttp from './BaseService'

const http = createHttp(true)

export const createPost = (data) => http.post('/post/new', data)

export const getPost = (id) => http.get(`/post/${id}`)

export const updatePost = (id, data) => http.patch(`/post/${id}`, data)

export const deletePost = (id) => http.delete(`/post/${id}`)