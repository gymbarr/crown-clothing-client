import { apiRequest } from '../axios'

export const getUsers = (page) => {
  const params = { page }

  return apiRequest.get('/users', { params })
}

export const getCurrentUser = () => apiRequest.get('/user/me')
