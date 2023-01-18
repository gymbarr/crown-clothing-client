import { apiRequest } from "../axios"

export const getCategories = () => {
  return apiRequest.get("/categories")
}

export const getProductsOfCategory = (category, itemsPerPage, page) => {
  const params = { items: itemsPerPage, page: page }

  return apiRequest.get(`/categories/${category}`, { params: params })
}
