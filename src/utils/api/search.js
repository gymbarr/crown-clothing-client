import { apiRequest } from "../axios"

export const pgSearchProducts = (query, page) => {
  const params = { query: query, page: page }

  return apiRequest.get('/pg_search_results', { params: params })
}

export const elasticSearchProducts = (query, page) => {
  const params = { query: query, page: page }

  return apiRequest.get('/elastic_search_results', { params: params })
}