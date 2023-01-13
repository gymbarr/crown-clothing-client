import { apiRequest } from "../requests-handler/requests-handler"

export const getCategories = () => {
  return (
    apiRequest.get('/categories')
  )
}

export const getProductsOfCategory = (category, itemsPerPage, page) => {
  const params = { "items": itemsPerPage, "page": page }

  return (
    apiRequest.get(`/categories/${category}`, { params: params })
  )
}