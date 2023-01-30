import { apiRequest } from "../axios"

export const getProducts = (category, itemsPerPage, page) => {
  const params = { items: itemsPerPage, page: page }

  return apiRequest.get(`/categories/${category}/products`, { params: params })
}

export const getProduct = (category, productId, color = 'black') =>
  apiRequest.get(`/categories/${category}/products/${productId}`)
