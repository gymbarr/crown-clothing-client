import { apiRequest } from '../axios'

export const getCategories = () => apiRequest.get('/categories')
