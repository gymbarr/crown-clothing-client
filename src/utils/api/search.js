import { apiRequest } from '../axios'

export const pgSearchProducts = (query, page) => {
  const params = { query, page }

  return apiRequest.get('/pg_search_results', { params })
}

export const elasticSearchProducts = (query, page) => {
  const params = { query, page }

  return apiRequest.get('/elastic_search_results', { params })
}

export const getSearchResults = (query, page, method) => {
  const params = { query, page }

  return apiRequest.get(`/${method}_search_results`, { params })
}
