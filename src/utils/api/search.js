import { apiRequest } from "../axios"

export const searchProducts = (query, page) => {
  const params = { query: query, page: page }

  return apiRequest.get('/search_results', { params: params })
}